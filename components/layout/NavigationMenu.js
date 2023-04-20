import React, { useCallback } from 'react';
import {
    Box,
    CloseButton,
    Flex,
    Drawer,
    DrawerContent,
    Text,
    TagLabel,
    Tag, VStack, HStack,
    Divider, useStyleConfig,
    Popover,
    PopoverTrigger,
    Portal,
    PopoverContent,
    PopoverBody, Link
} from '@chakra-ui/react';
import Image from 'next/image'
import listLinkItem from 'data/SidebarOption'
import router, { useRouter } from "next/router";

const LinkItems = listLinkItem;

export default function SidebarWithHeader({
    isOpen,
    onClose,
    onOpen,
    openSidebar,
    setOpenSidebar
}) {
    return (
        <>
            <SidebarContent
                onClose={onClose}
                onOpen={onOpen}
                display={{ base: 'none', md: 'block' }}
                openSidebar={openSidebar}
                setOpenSidebar={setOpenSidebar}
                key={'desktop-sidebar'}
            />

            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                <DrawerContent>
                    <SidebarContent onClose={onClose} onOpen={onOpen}
                        openSidebar={openSidebar}
                        setOpenSidebar={setOpenSidebar} key={'mobile-sidebar'} />
                </DrawerContent>
            </Drawer>

        </>
    );
}

const SidebarContent = ({
    onClose,
    onOpen,
    openSidebar,
    setOpenSidebar,
    ...rest
}) => {
    const navItemDisabledStyle = useStyleConfig('NavItemDisabled');
    const sidebarDividerStyle = useStyleConfig('SidebarDivider');
    const sidebarContentStyle = useStyleConfig('SidebarContent');
    const sidebarContentCollapseStyle = useStyleConfig('SidebarContentCollapse');
    const sidebarLogoContainerStyle = useStyleConfig('SidebarLogoContainer');
    const sidebarLogoCollapseContainerStyle = useStyleConfig('SidebarLogoCollapseContainer');
    const navItemTextDisabledStyle = useStyleConfig('NavItemTextDisabled');

    const collapseMenu = useCallback(() => {
        // @ts-ignore
        setOpenSidebar(openSidebar => !openSidebar);
    }, [openSidebar])

    const redirectTo = useCallback(async path => {
        await router.push(path)
    }, [])
    return (
        <Box
            sx={openSidebar ? sidebarContentStyle : sidebarContentCollapseStyle}
            {...rest}>
            <Flex sx={openSidebar ? sidebarLogoContainerStyle : sidebarLogoCollapseContainerStyle} justifyContent='center' w='full'>
                <Image alt={'calamus logo'} src={openSidebar ? `/calamus_logo.svg` : `/Logo_Small.svg`}
                    width={openSidebar ? 163 : 40}
                    height={openSidebar ? 100 : 40}
                    style={{ cursor: 'pointer' }}
                    onClick={() => redirectTo('/')} />
            </Flex>
            {LinkItems.map((link, index) => (
                <Box key={`navitem-${index}`}>
                    <NavItem icon={link.icon} selectedIcon={link.selectedIcon} badgeContent={link.badgeContent}
                        badgeColor={link.badgeColor} disabled={link.disabled} path={link.path}
                        openSidebar={openSidebar}>
                        {link.name}
                    </NavItem>
                    {[3].indexOf(index) !== -1 && <Divider sx={sidebarDividerStyle} />}
                </Box>
            ))}
            <Flex
                sx={navItemDisabledStyle}
                {...rest}
                onClick={collapseMenu}
                bg={'white'}
            >
                <HStack>
                    <VStack>
                        <Image alt={'back'} src={openSidebar ? '/icons/Back_To.svg' : '/icons/Next_Page.svg'}
                            width={30} height={30}
                            style={{ filter: "grayscale(1)" }} />
                    </VStack>
                    {openSidebar ? <VStack>
                        <Text sx={navItemTextDisabledStyle}>Collapse</Text>
                    </VStack> : null}

                </HStack>
            </Flex>
        </Box>
    );
};

const NavItem = ({
    icon,
    selectedIcon,
    badgeColor,
    badgeContent,
    children,
    disabled,
    path,
    openSidebar,
    ...rest
}) => {
    const router = useRouter();
    const redirectToNewPage = useCallback(path => {
        if (path === '/help') {
            window.open("https://docs.calamus.finance/overview/about-calamus-finance", "_blank")
        } else if (path !== '/more') {
            router.push(path);
        }
    }, [])
    const navItemContainerStyle = useStyleConfig('NavItemContainer');
    const navItemDisabledContainerStyle = useStyleConfig('NavItemDisabledContainer');
    const navItemTextStyle = useStyleConfig('NavItemText');
    const navItemTextSelectedStyle = useStyleConfig('NavItemTextSelected');
    const navItemTextDisabledStyle = useStyleConfig('NavItemTextDisabled');
    const navItemBadgeStyle = useStyleConfig('NavItemBadge');
    const socialContentStyle = useStyleConfig('SocialContent');
    const socialContentTitleStyle = useStyleConfig('SocialContentTitle');
    const socialItemContainerStyle = useStyleConfig('SocialItemContainer');
    const socialItemStyle = useStyleConfig('SocialItem');
    return (
        <Popover>
            <Portal>
                <PopoverContent sx={socialContentStyle}>
                    <PopoverBody>
                        <Text sx={socialContentTitleStyle}>Stay up-to-date</Text>
                        <VStack sx={socialItemContainerStyle}>
                            <Link href={'https://discord.com/invite/BpM8TTgc7z'} isExternal={true}>
                                <HStack>
                                    <Image src={'/icons/icon_1.png'} width={24} height={24} alt={'discord icon'} />
                                    <Text sx={socialItemStyle}>Discord</Text>

                                </HStack>
                            </Link>
                            <Link href={'https://twitter.com/calamusfinance'} isExternal={true}>
                                <HStack>
                                    <Image src={'/icons/icon_2.png'} width={24} height={24} alt={'discord icon'} />
                                    <Text sx={socialItemStyle}>Twitter</Text></HStack>
                            </Link>
                            <Link href={'https://t.me/CalamusFinance'} isExternal={true}>
                                <HStack>
                                    <Image src={'/icons/icon_4.png'} width={24} height={24} alt={'discord icon'} />
                                    <Text sx={socialItemStyle}>Telegram</Text>
                                </HStack>
                            </Link>
                        </VStack>
                    </PopoverBody>
                </PopoverContent>
            </Portal>
            {path === '/more' ? <PopoverTrigger>
                <Flex
                    sx={disabled ? navItemDisabledContainerStyle : navItemContainerStyle}
                    {...rest}
                    bg={router.pathname === path ? 'linear-gradient(25deg, #007ADF 0%, #00ECBC 100%)' : null}
                    onClick={disabled ? null : () => redirectToNewPage(path)}
                >
                    <HStack>
                        {icon && (
                            <VStack>
                                <Image alt={router.pathname} src={router.pathname === path ? selectedIcon : icon}
                                    width={openSidebar ? '30' : '35'} height={openSidebar ? '30' : '35'}
                                    style={{ filter: (disabled ? "grayscale(1)" : "none") }} />
                            </VStack>
                        )}
                        {openSidebar ? <VStack>
                            <Text
                                sx={disabled ? navItemTextDisabledStyle : (router.pathname === path ? navItemTextSelectedStyle : navItemTextStyle)}>{children}</Text>
                        </VStack> : null}
                        {openSidebar ? <VStack h="52px" display={openSidebar ? 'block' : 'none'}>
                            <Tag sx={navItemBadgeStyle} bg={badgeColor}>
                                <TagLabel color={'white'}>{badgeContent}</TagLabel>
                            </Tag>
                        </VStack> : null}
                    </HStack>
                </Flex>
            </PopoverTrigger> : <Flex
                sx={disabled ? navItemDisabledContainerStyle : navItemContainerStyle}
                {...rest}
                bg={router.pathname === path ? 'linear-gradient(25deg, #007ADF 0%, #00ECBC 100%)' : null}
                onClick={disabled ? null : () => redirectToNewPage(path)}
            >
                <HStack>
                    {icon && (
                        <VStack>
                            <Image alt={router.pathname} src={router.pathname === path ? selectedIcon : icon}
                                width={openSidebar ? '30' : '35'} height={openSidebar ? '30' : '35'}
                                style={{ filter: (disabled ? "grayscale(1)" : "none") }} />
                        </VStack>
                    )}
                    {openSidebar ? <VStack>
                        <Text
                            sx={disabled ? navItemTextDisabledStyle : (router.pathname === path ? navItemTextSelectedStyle : navItemTextStyle)}>{children}</Text>
                    </VStack> : null}
                    {openSidebar ? <VStack h="52px" display={openSidebar ? 'block' : 'none'}>
                        <Tag sx={navItemBadgeStyle} bg={badgeColor}>
                            <TagLabel color={'white'}>{badgeContent}</TagLabel>
                        </Tag>
                    </VStack> : null}
                </HStack>
            </Flex>}

        </Popover>
    );
};
