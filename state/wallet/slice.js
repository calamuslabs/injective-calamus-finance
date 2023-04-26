import { createSlice } from "@reduxjs/toolkit";
import connectToWallet from "state/chain/thunk/connectWallet";
import { DenomClient } from "@injectivelabs/sdk-ts";
import { InjNetwork } from "state/config";
const initialState = {
    loaded: false,
    keplrObj: {},
    denomClient: new DenomClient(InjNetwork)
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
            if (action.payload.account) {
                state.loaded = true;
                state.keplrObj = action.payload.strategy;
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