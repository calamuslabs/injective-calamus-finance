export const config = {
    "calamus": {
        rpcAddress: "http://localhost:8545",
        logoURL: "",
        wssAddress: "wss://localhost:8545",
        chainId: 1337,
        blockchainExplorer: "http://localhost:8545",
        name: "Injective chain",
        nativeCurrency: {
            name: "Injective Coin",
            symbol: "INJ",
            decimals: 18
        },
        contractAddress: "",
    },
}

export const chainInfos = {
    "inj": {label: "Injective", logo: "/injective.png", disabled: false, wallets: ["metamask"]},
    // "bnb": {label: "BNB", logo: "/networkAndWallet/active/BNB.png", disabled: false, wallets: ["metamask"]},
    // "polygon": {label: "Polygon", logo: "/networkAndWallet/active/Polygon.png", disabled: false, wallets: ["metamask"]},
    // "avalanche": {label: "Avalanche", logo: "/networkAndWallet/active/Avalanche.png", disabled: false, wallets: ["metamask"]},
    // "optimism": {label: "Optimism", logo: "/networkAndWallet/active/optimism.svg", disabled: false, wallets: ["metamask"]},
    // "arbitrum": {label: "Arbitrum", logo: "/networkAndWallet/active/Arbitrum.png", disabled: false, wallets: ["metamask"]},
    // "fantom": {label: "Fantom", logo: "/networkAndWallet/active/Fantom.png", disabled: false, wallets: ["metamask"]},
    // "near": {label: "Near", logo: "/networkAndWallet/inactive/Near.png", disabled: true, wallets: ["nearwallet"]},
}

export const walletInfos = {
    "metamask": {label: "Meta Mask", logo: "/networkAndWallet/active/Metamask.png", disabled: false},
    "trustWallet": {label: "Trust Wallet", logo: "/networkAndWallet/inactive/Trust_wallet.png", disabled: true},
    "walletConnect": {label: "Wallet Connect", logo: "/networkAndWallet/inactive/wallet_connect.png", disabled: true},
}

export const supportedEVMChains = [
    "bnb",
    "polygon",
    "ethereum",
    "avalanche",
    "aurora",
    "evmos",
    "optimism",
    "arbitrum",
    "fantom"
]

export const isSupportedEVMChain = (chain) => {
    return (supportedEVMChains.indexOf(chain) !== -1)
}

export const nativeTokenSymbols = ["BNB", "BNBT", "MATIC", "PHOTON", "GoerliETH", "ETH", "AVAX", "FTM"];
