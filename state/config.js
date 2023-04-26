import { ChainId, EthereumChainId } from '@injectivelabs/ts-types'
import { Network } from '@injectivelabs/networks'

export const config = {
    "inj": {
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
        contractAddress: "inj1tna3283sjqd4vdehglz9r8hgswel3jl6vx8q4a",
    },
}

export const InjChainId = process.env.NEXT_PUBLIC_NETWORK_ENVIRONMENT === 'main' ? ChainId.Mainnet : ChainId.Testnet;
export const InjEthChainId = process.env.NEXT_PUBLIC_NETWORK_ENVIRONMENT === 'main' ? EthereumChainId.Mainnet : EthereumChainId.Goerli;
export const InjNetwork = process.env.NEXT_PUBLIC_NETWORK_ENVIRONMENT === 'main' ? Network.Mainnet : Network.TestnetK8s;
export const InjCalamus = process.env.NEXT_PUBLIC_NETWORK_ENVIRONMENT === 'main' ? ChainId.Mainnet : ChainId.Testnet;

export const chainInfos = {
    "inj": {label: "Injective", logo: "/injective.png", disabled: false, wallets: ["keplr"]},
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


export const statusConfig = {
    1: {
        label: "Not Started",
        color: "rgba(0, 116, 253, 1)",
        background: "rgba(0, 116, 253, 0.2)"
    },
    2: {
        label: "Cancelled",
        color: "rgba(255, 162, 192, 1)",
        background: "rgba(255, 162, 192, 0.2)",

    },
    3: {
        label: "Completed",
        color: "rgba(32, 203, 152, 1)",
        background: "rgba(32, 203, 152, 0.2)",
    },
    4: {
        label: "Processing",
        color: "rgba(108, 93, 211, 1)",
        background: "rgba(108, 93, 211, 0.2)",
    }
}

export const columnConfigObj = {
    // "title": { type: "text", label: "Contract Title" },
    // "transaction": { type: "text", label: "Transaction" },
    "sender": { type: "text", label: "Sender" },
    "recipient": { type: "text", label: "Recipient" },
    "status": { type: "text", label: "Status" },
    "start_time": { type: "text", label: "Start Time" },
    "stop_time": { type: "text", label: "Stop Time" },
    "unlock": { type: "text", label: "Unlock" },
    "withdraw": { type: "text", label: "Withdraw" },
    "token": { type: "text", label: "Token" },
    "release_rate": { type: "text", label: "Release Rate" },
    "initial_release": { type: "text", label: "Initial Release" },
    "action": { type: "text", label: "Actions" }
}

export const listStatusOptions = [
    {label: 'All status', value: '-1'},
    {label: 'Not Started', value: '1'},
    {label: 'Cancelled', value: '2'},
    {label: 'Completed', value: '3'},
    {label: 'Processing', value: '4'}
]