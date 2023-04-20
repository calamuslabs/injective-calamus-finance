const listLinkItem = [
    {name: 'Dashboard', icon: '/icons/Control_Panel.svg',selectedIcon: '/icons/Control_Panel.svg', badgeContent: '', badgeColor: '', disabled: false, path: '/'},
    {name: 'Incoming', icon: '/icons/In.svg', selectedIcon: '/icons/In.svg', badgeContent: '', badgeColor: '', disabled: false, path: '/incoming-stream'},
    {name: 'Outgoing', icon: '/icons/Out.svg', selectedIcon: '/icons/Out.svg', badgeContent: '', badgeColor: '', disabled: false, path: '/outgoing-stream'},
    {name: 'Address Book', icon: '/icons/Cheque_Gradient.svg', selectedIcon: '/icons/Cheque_White.svg', badgeContent: '', badgeColor: '', disabled: true , path: '/address'},
    // {name: 'Deposit', icon: '/icons/Coin_Wallet.svg', selectedIcon: '/icons/Coin_Wallet.svg', badgeContent: '', badgeColor: '', disabled: false, path: '/deposit'},
    // {name: 'Batch Payment', icon: '/icons/Filing_Cabinet_Gradient.svg', selectedIcon: '/icons/Filing_Cabinet_Hover.svg', badgeContent: '', badgeColor: '', disabled: false, path: '/batch-payment'},
    // {
    //     name: 'Multisig Wallet',
    //     icon: '/icons/Coin_Wallet_Grey.svg',
    //     selectedIcon: '/icons/Coin_Wallet_Grey.svg',
    //     badgeContent: 'soon',
    //     badgeColor: '#18DEDE',
    //     disabled: true,
    //     path: '/a'
    // },
    // {name: 'Faucet', icon: '/icons/Plumbing.svg', selectedIcon: '/icons/Plumbing_Selected.svg', badgeContent: '', badgeColor: '', disabled: false, path: '/faucet'},
    // {name: 'Help', icon: '/icons/Help.svg', selectedIcon: '/icons/Help.svg', badgeContent: '', badgeColor: '', disabled: false, path: '/help'},
    // {name: 'Developers', icon: "/icons/Developer.svg", selectedIcon: '/icons/Developer.svg', badgeContent: '', badgeColor: '', disabled: true, path: '/b'},
    // {name: 'Settings', icon: '/icons/Settings.svg', selectedIcon: '/icons/Settings.svg', badgeContent: '', badgeColor: '', disabled: true, path: '/c'},
    {name: 'More', icon: '/icons/View_More.svg', selectedIcon: '/icons/View_More.svg', badgeContent: '', badgeColor: '', disabled: false, path: '/more'},
];
export default listLinkItem;

export const titleMap = {
    '/': 'Dashboard',
    '/incoming-stream': 'Incoming',
    '/outgoing-stream': 'Outgoing',
    '/new-stream': 'New Stream',
    '/a': 'Multisig Wallet',
    '/faucet': 'Faucet',
    '/help': 'Help',
    '/b': 'Developers',
    '/c': 'Settings',
    '/d': 'More',
}