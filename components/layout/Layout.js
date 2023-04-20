import React, { useEffect, useState} from 'react';
import {
    Box, useColorModeValue,
    useDisclosure, useStyleConfig,
} from '@chakra-ui/react';
import NavigationMenu from 'components/layout/NavigationMenu';
import Header from 'components/layout/Header'
import {useRouter} from "next/router";

export default function SidebarWithHeader({children}) {
    const router = useRouter();
    const {onOpen, isOpen, onClose} = useDisclosure();
    const [title, setTitle] = useState('Dashboard');
    const [openSidebar, setOpenSidebar] = useState(true);
    const [ bgColor, setBgColor ] = useState('gray.100')
    const layoutContainerStyle = useStyleConfig('LayoutContainer');
    const contentContainerStyle = useStyleConfig('ContentContainer');
    const contentContainerCollapseStyle = useStyleConfig('ContentContainerCollapse');
    const bg = useColorModeValue(bgColor, 'gray.900')
    useEffect(() => {
        if (router && router?.pathname) {
            if (['/incoming-stream', '/outgoing-stream'].indexOf(router.pathname) !== -1) {
                setBgColor('white');
            } else {
                setBgColor('gray.100');
            }
        }
    }, [router])
    return (
        <Box sx={layoutContainerStyle} bg={bg}>
            <NavigationMenu isOpen={isOpen} onClose={onClose} onOpen={onOpen} openSidebar={openSidebar} setOpenSidebar={setOpenSidebar}/>
            <Header onOpen={onOpen} title={title} setTitle={setTitle} openSidebar={openSidebar}/>
            <Box sx={openSidebar ? contentContainerStyle : contentContainerCollapseStyle}>
                {children}
            </Box>
        </Box>
    );
}

