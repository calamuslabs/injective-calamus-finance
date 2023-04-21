import {
    Button,
    Avatar,
    Text,
    Image,
    useStyleConfig,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    FormControl,
    FormLabel,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
// import { selectToken } from "src/app/stream/streamSlice";
import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PaginationOption, ChainRestBankApi, DenomClient } from '@injectivelabs/sdk-ts'
import { getNetworkEndpoints, Network } from '@injectivelabs/networks'
import { selectToken } from "state/stream/slice";
import { getAvailableTokens } from "state/chain/thunk/getTokens";

export default function TokenList() {
    const availableTokens = useSelector((state) => state.chain.availableTokens)
    const selectedToken = useSelector((state) => state.stream.selectedToken)
    const dispatch = useDispatch();
    const account = useSelector(state => state.chain.account)
    const formSelectStyle = useStyleConfig("FormSelect");
    const tokenLogoStyle = useStyleConfig("TokenLogo");
    const formSelectTextStyle = useStyleConfig("FormSelectText");
    const formLabelStyle = useStyleConfig("FormLabel");

    const { isOpen, onToggle, onClose } = useDisclosure();

    const handleSelectToken = useCallback((value) => {
        let filteredTokens = availableTokens.filter(tk => tk.denom === value);
        dispatch(selectToken(filteredTokens.length ? filteredTokens[0] : availableTokens[0]));
        onClose();
    }, [availableTokens])

    useEffect(() => {
        if (availableTokens.length) {
            dispatch(selectToken(availableTokens[0]))
        }
    }, [availableTokens]);

    useEffect(() => {
        if (account) {
            dispatch(getAvailableTokens())
        }
    }, [account]);
    return (
        <FormControl isRequired>
            <FormLabel sx={formLabelStyle}>Select Token</FormLabel>
            <Popover
                matchWidth
                isOpen={isOpen}
                onClose={onClose}
            >
                <PopoverTrigger>
                    <Button
                        sx={formSelectStyle}
                        aria-label='Options'
                        variant='outline'
                        onClick={onToggle}
                        leftIcon={<Avatar sx={tokenLogoStyle} src={`https://testnet.explorer.injective.network/vendor/@injectivelabs/token-metadata/${selectedToken?.logo}`} name={selectedToken?.symbol} />}
                        rightIcon={<Image src={`/icons/Down_Button_Gray.svg`} width={'30'}
                            height={'30'}
                        />}
                    >
                        <Text sx={formSelectTextStyle}>{(selectedToken && selectedToken?.name) ? selectedToken.name + ` (${selectedToken.symbol})` : ''}</Text>
                    </Button>
                </PopoverTrigger>
                <PopoverContent w='full'>
                    <PopoverBody>
                        <VStack w='full'>
                            {availableTokens.length ?
                                availableTokens.map((token) =>
                                    <Button
                                        sx={formSelectStyle}
                                        leftIcon={<Avatar sx={tokenLogoStyle} src={`https://testnet.explorer.injective.network/vendor/@injectivelabs/token-metadata/${token.logo}`} name={token.symbol} />}
                                        onClick={() => {handleSelectToken(token.denom)}}
                                        >
                                        <Text sx={formSelectTextStyle}>{(token && token.name) ? token.name + ` (${token.symbol})` : ''}</Text>
                                    </Button>) :
                                <Text>No token available</Text>
                            }
                        </VStack>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </FormControl>
    )
}