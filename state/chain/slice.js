import { createSlice } from "@reduxjs/toolkit";
import connectToWallet from "./thunk/connectWallet";
import { getAvailableTokens } from "./thunk/getTokens";

const initialState = {
    isConnecting: false,
    selectedChain: "",
    availableChains: ["inj"],
    availableTokens: [],
    account: "",
    web3Loaded: false,
    infoLoaded: false,
    registered: false,
    isInstalledMetamask: false
}

export const slice = createSlice({
    name: 'chain',
    initialState,
    reducers: {
        select: (state, action) => {
            state.chain = action.payload;
        },
        setIsConnecting: (state, action) => {
            state.isConnecting = action.payload;
        },
        disconnectNetwork: (state, _action) => {
            state.account = "";
            state.selectedChain = "";
        },
    },
    extraReducers(builder) {
        builder.addCase(connectToWallet.fulfilled, (state, action) => {
            state.account = action.payload.account;
            state.selectedChain = action.payload.chain;
        })
        builder.addCase(getAvailableTokens.fulfilled, (state, action) => {
            if (action.payload) {
                state.availableTokens = action.payload;
            }
        })
    }
})

export const {
    select,
    setIsConnecting,
    disconnectNetwork,
} = slice.actions;
export default slice.reducer;