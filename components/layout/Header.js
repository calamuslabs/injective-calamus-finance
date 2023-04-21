import {
    Flex,
    FlexProps,
    HStack,
    IconButton,
    Text,
    useColorModeValue,
    Button, useColorMode, useStyleConfig
} from "@chakra-ui/react";
import Image from "next/image";
import React, {useCallback, useEffect} from "react";
import NetworkSelection from "./NetworkSelection";
import {useRouter} from "next/router";
import {titleMap} from "../../data/SidebarOption";
import {useSelector} from "react-redux";

export default function Header({onOpen, title, setTitle, openSidebar, ...rest}) {
    const router = useRouter();
    const redirectToNewStream = useCallback(() => {
        setTitle('New Stream');
        router.push('/new-stream');
    }, [])
    const {selectedChain} = useSelector(state => state.chain);
    const {colorMode, toggleColorMode} = useColorMode()
    const headerContainerStyle = useStyleConfig('HeaderContainer');
    const headerContainerCollapseStyle = useStyleConfig('HeaderContainerCollapse');
    const headerTitleStyle = useStyleConfig('HeaderTitle');
    const openMenuMobileStyle = useStyleConfig('OpenMenuMobile');
    const newStreamButtonStyle = useStyleConfig('NewStreamButton');
    const newStreamButtonContainerStyle = useStyleConfig('NewStreamButtonContainer');
    const newStreamButtonTextStyle = useStyleConfig('NewStreamButtonText');
    useEffect(() => {
        setTitle(titleMap[router.pathname]);
    }, [router.pathname])
    return (
        <Flex sx={openSidebar ? headerContainerStyle : headerContainerCollapseStyle}{...rest}>
            <Text sx={headerTitleStyle}>
                {title}
            </Text>

            <IconButton
                sx={openMenuMobileStyle}
                aria-label="open menu"
                variant="ghost"
                onClick={onOpen}
                icon={<Image alt={'menu icon'} src={`/icons/Content.svg`} layout={'fill'}/>}
            />
            <HStack sx={newStreamButtonContainerStyle}>
                {(router.pathname !== '/new-stream' && selectedChain) ?
                    <Button sx={newStreamButtonStyle}
                            leftIcon={<Image alt={'new stream icon'} src={'/icons/Data_Transfer_Gray.svg'} width={30} height={30}/>}
                            rightIcon={null}
                            variant='solid'
                            onClick={redirectToNewStream}
                    >
                        <Text sx={newStreamButtonTextStyle}>
                            New Stream
                        </Text>
                    </Button>
                    : null}
                <NetworkSelection/>

            </HStack>
        </Flex>
    );
};