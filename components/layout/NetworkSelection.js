import {
    Button,
    VStack,
    Text,
    MenuList,
    Icon,
    MenuItem,
    MenuDivider,
    Menu,
    MenuButton,
    HStack,
    useStyleConfig
} from '@chakra-ui/react'
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setIsConnecting
} from "state/chain/slice";
import connectToWallet from 'state/chain/thunk/connectWallet';
import { chainInfos } from "state/config";
import { useRouter } from "next/router";
import Image from 'next/image'
import { shortenAddress } from 'helper/address';
import { disconnectNetwork } from 'state/chain/slice';
import { MdOutlineExitToApp } from "react-icons/md";

export default function NetworkSelection() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { isConnecting, selectedChain } = useSelector(state => state.chain);
    const { loaded } = useSelector(state => state.wallet);
    const chain = useSelector(state => state.chain);

    const handleConnectNetwork = useCallback(async (chain) => {
        dispatch(setIsConnecting(true));
        await dispatch(connectToWallet(chain));
        dispatch(setIsConnecting(false));
    }, [])

    const handleDisconnect = useCallback(async () => {
        dispatch(disconnectNetwork())
    }, [])
    useEffect(() => {
        if (!loaded && selectedChain) {
            handleConnectNetwork(selectedChain)
        }
    }, [loaded, selectedChain])
    const networkSelectButtonStyle = useStyleConfig('NetworkSelectButton');
    const networkSelectInfoStyle = useStyleConfig('NetworkSelectInfo');
    const networkSelectNameStyle = useStyleConfig('NetworkSelectName');
    const networkSelectIdStyle = useStyleConfig('NetworkSelectId');
    const networkSelectOptionContainerStyle = useStyleConfig('NetworkSelectOptionContainer');
    const networkSelectOptionStyle = useStyleConfig('NetworkSelectOption');
    const newStreamButtonStyle = useStyleConfig('NewStreamButton');
    const newStreamButtonTextStyle = useStyleConfig('NewStreamButtonText');

    return (
        <>
            <Menu>
                <MenuButton as={Button}
                    leftIcon={<Image src={selectedChain ? `/${selectedChain}.png` : `/icons/Wallet.svg`}
                        width={'30'} height={'30'} />}
                    sx={selectedChain ? networkSelectButtonStyle : newStreamButtonStyle}
                    rightIcon={selectedChain ? <Image src={`/icons/Down_Button_No_Background.svg`} width={'30'}
                        height={'30'}
                        style={{ filter: 'grayscale(1)' }} /> : null}
                    variant='solid'
                    isLoading={isConnecting}>

                    <VStack
                        sx={networkSelectInfoStyle}>
                        {
                            selectedChain ? <Text sx={networkSelectNameStyle}>
                                <span>{chainInfos[selectedChain].label}</span>
                            </Text>
                                : <Text sx={newStreamButtonTextStyle}>
                                    <span>Connect Wallets</span>
                                </Text>
                        }
                        {selectedChain ?
                            <Text sx={networkSelectIdStyle}>
                                {shortenAddress(chain.account)}
                            </Text> : null}
                    </VStack>
                </MenuButton>
                <MenuList sx={networkSelectOptionContainerStyle} zIndex={100}>
                    {Object.entries(chainInfos).filter(item => !item[1].disabled).map(([key, value]) =>
                        <MenuItem as={Button}
                            leftIcon={<Image src={value.logo} width={20} height={20} />} variant='ghost'
                            sx={networkSelectOptionStyle} onClick={() => handleConnectNetwork(key)}
                            justifyContent='left'
                            key={`menu-${key}`}>
                            {value.label}
                        </MenuItem>
                    )}
                    {selectedChain && <MenuDivider />}
                    {selectedChain && 
                        <MenuItem as={Button}
                            onClick={() => handleDisconnect()}
                            leftIcon={<Icon as={MdOutlineExitToApp} />}
                            justifyContent='left'
                            key={`menu-disconnect`}
                            colorScheme='red'
                            bgColor='red.400'
                            color='whiteAlpha'
                        >
                            Disconnect
                        </MenuItem>
                    }
                </MenuList>
            </Menu>
        </>
    )
}