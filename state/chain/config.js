
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
        contractAddress: hubAddress,
    },
}

export const chainInfos = {
    "injective": { label: "Injective", logo: "/injective.png", disabled: false },
}