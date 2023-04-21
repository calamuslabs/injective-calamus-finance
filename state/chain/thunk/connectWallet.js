import { createAsyncThunk } from "@reduxjs/toolkit";
import { getKeplr } from "./connectInj";

const connectToWallet = createAsyncThunk("wallet/connect", async (chain) => {
    let result = await getKeplr();
    if (result.accounts.length) {
        return { chain: chain, account: result.accounts[0].address };
    } else {
        return { chain: chain, account: "" };
    }
})

export default connectToWallet;