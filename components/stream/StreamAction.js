import { useState, useCallback, useEffect } from "react";

import { setIsCancelling, setIsTransferring, setIsWithdrawing } from "state/stream/slice";
import {
    Icon,
    Menu,
    MenuButton,
    FormControl,
    FormHelperText,
    MenuList,
    Button,
    useStyleConfig,
    MenuDivider,
    VStack,
    Text,
    Input,
    Collapse,
    useDisclosure,
    Radio,
    RadioGroup,
    Box,
    HStack,
    FormErrorMessage
} from "@chakra-ui/react";
import { FiMoreHorizontal } from "react-icons/fi";
import Image from 'next/image'
import { BigNumber, ethers } from "ethers";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import withdrawStream from "state/stream/thunk/withdraw";
import cancelStream from "state/stream/thunk/cancel";
export default function StreamAction({ account, stream, isIncoming }) {
    const dispatch = useDispatch();
    const router = useRouter()
    const { isWithdrawing, isTransferring, isCancelling, isTopuping } = useSelector((state) => state.stream)
    const selectedChain = useSelector((state) => state.chain.selectedChain)

    const [newRecipient, setNewRecipient] = useState("");
    const [recipientErr, setRecipientErr] = useState("");
    const [topupErr, setTopupErr] = useState("");
    const [topupAmount, setTopupAmount] = useState("");

    const [disableTransfer, setDisableTransfer] = useState(false);
    const [disableWithdraw, setDisableWithdraw] = useState(false);
    const [disableCancel, setDisableCancel] = useState(false);
    const [disableTopup, setDisableTopup] = useState(false);

    const handleChangeTopupAmount = useCallback(async (e) => {
        setTopupAmount(e.target.value);
        if (e.target.value) {
            let realAmount = ethers.utils.parseUnits(e.target.value, stream.tokenDecimal);
            if (realAmount.isNegative() || realAmount.isZero()) {
                setTopupErr("Topup amount must be greater than zero.");
            } else {
                setTopupErr("");
            }
        }
    }, []);

    const handleCancel = useCallback(
        async () => {
            try {
                dispatch(setIsCancelling(true));
                dispatch(cancelStream(stream.streamId));
            } catch (e) {
                console.log("Cancel stream Error:", e);
                dispatch(setIsCancelling(false))
            }

        },
        [stream.streamId]
    );

    const handleWithdraw = useCallback(
        async () => {
            try {
                dispatch(setIsWithdrawing(true));
                dispatch(withdrawStream(stream.streamId));
            } catch (e) {
                console.log("Withdraw stream Error:", e);
                dispatch(setIsWithdrawing(false))
            }
        },
        [stream.streamId]
    );

    const handleChangeRecipient = useCallback(async (e) => {
        const value = e.target.value;
        setNewRecipient(value);
        if (value.toLowerCase() == stream.sender.toLowerCase() || value.toLowerCase() == stream.recipient.toLowerCase()) {
            setRecipientErr("Address must be different from sender/recipient");
        } else if (value == "") {
            setRecipientErr("Address must not empty");
        } else {
            setRecipientErr("");
        }
    }, [])

    const handleTransfer = useCallback(async () => {
        try {
            dispatch(setIsTransferring(true));
            if (stream.chain === "tron") {
                await dispatch(transferTronStream({ stream: stream, newRecipient: newRecipient }));
            } else if (isSupportedEVMChain(stream.chain)) {
                await dispatch(transferEVMStream({ stream: stream, newRecipient: newRecipient }));
            }
        } catch (e) {
            console.log("Transfer stream Error:", e);
            dispatch(setIsTransferring(false));
        }

    }, [newRecipient])

    const handleTopup = useCallback(
        async () => {
            try {
                dispatch(setIsTopuping(true));
                await dispatch(topupEVMStream({ stream: stream, amount: ethers.utils.parseUnits(topupAmount, stream.tokenDecimal) }));
            } catch (e) {
                console.log("Withdraw stream Error:", e);
                dispatch(setIsTopuping(false))
            }

        },
        [topupAmount]
    );

    useEffect(() => {
        let currentTime = Math.floor(new Date().getTime() / 1000);
        let stopTime = parseInt(stream.stopTime);
        setDisableCancel(stream.originStatus !== 1 || !(account === stream.sender));
        setDisableTransfer(stream.originStatus !== 1 || !(account === stream.recipient));
        setDisableWithdraw(stream.recipient !== account);
        setDisableTopup(stream.originStatus !== 1 || (stopTime < currentTime) || !(account === stream.sender));
    }, [stream, recipientErr, newRecipient]);

    const actionOptionsContainerStyle = useStyleConfig('ActionOptionsContainer');
    const actionButtonStyle = useStyleConfig('ActionButton');
    const withdrawActionButtonStyle = useStyleConfig('WithdrawActionButton');
    const fakeInputStyle = useStyleConfig('FakeInput');

    const { isOpen, onToggle } = useDisclosure();
    const { isOpen: isOpenTransfer, onToggle: onToggleTransfer } = useDisclosure();
    const { isOpen: isOpenTopup, onToggle: onToggleTopup } = useDisclosure();

    return (
        <Menu isLazy={true} preventOverflow={true} strategy={'fixed'} closeOnSelect={false}
            computePositionOnMount={true}>
            <MenuButton><Icon as={FiMoreHorizontal} /></MenuButton>
            <MenuList sx={actionOptionsContainerStyle}>
                {/* <Button
                    sx={actionButtonStyle}
                    isDisabled={disableTransfer}
                    variant={'ghost'}
                    leftIcon={<Image alt={'transfer icon'} src={'/icons/Data_Transfer.svg'} width={20} height={20} />}
                    onClick={onToggleTransfer}>
                    Transfer
                </Button>
                <Collapse in={isOpenTransfer} animateOpacity>
                    <VStack sx={actionOptionsContainerStyle}>
                        <Input size={'sm'} placeholder={'Recipient address'} value={newRecipient}
                            onChange={handleChangeRecipient} />
                        {recipientErr ? <Text color={'red'} sx={errorTextStyle}>{recipientErr}</Text> : null}
                        <Button sx={withdrawActionButtonStyle} size={'sm'} isDisabled={disableTransfer || isTransferring}
                            isLoading={isTransferring} onClick={handleTransfer}>Transfer</Button>
                    </VStack>
                </Collapse>
                <MenuDivider /> */}

                <Button
                    sx={actionButtonStyle}
                    isDisabled={disableWithdraw}
                    isLoading={isWithdrawing}
                    variant={'ghost'}
                    leftIcon={<Image alt={'turn icon'} src={'/icons/U_Turn.svg'} width={20} height={20} />}
                    onClick={handleWithdraw}>
                    Withdraw
                </Button>
                <MenuDivider />
                {/* <Box>
                    <Button
                        sx={actionButtonStyle}
                        isDisabled={disableTopup}
                        variant={'ghost'}
                        leftIcon={<Image alt={'topup icon'} src={'/icons/Coin_Wallet.svg'} width={20} height={20} />}
                        onClick={onToggleTopup}>
                        Topup
                    </Button>
                    <Collapse in={isOpenTopup} animateOpacity>
                        <VStack sx={actionOptionsContainerStyle}>
                            <FormControl isInvalid={topupErr !== ""}>
                                <Input size={'sm'} placeholder={'Amount'} value={topupAmount} type='number'
                                    onChange={handleChangeTopupAmount} />
                                <FormErrorMessage>
                                    {topupErr}
                                </FormErrorMessage>

                            </FormControl>
                            <Button sx={withdrawActionButtonStyle} size={'sm'}
                                isDisabled={isTopuping || topupErr !== ""}
                                isLoading={isTopuping} onClick={handleTopup}>Topup</Button>
                        </VStack>
                    </Collapse>
                    <MenuDivider />
                </Box> */}
                <Button
                    sx={actionButtonStyle}
                    isDisabled={disableCancel}
                    isLoading={isCancelling}
                    variant={'ghost'}
                    leftIcon={<Image alt={'cancel icon'} src={'/icons/Cancel_Red.svg'} width={20} height={20} />}
                    onClick={handleCancel}
                >
                    Cancel stream
                </Button>
            </MenuList>
        </Menu>
    );
}