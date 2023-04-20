import { createAsyncThunk } from "@reduxjs/toolkit";

const connectToWallet = createAsyncThunk("wallet/connect", async (chain) => {
    let connectResult = false;
    let account = "";

    // @ts-ignore
    const allAccounts = await window.ethereum.request({ method: 'eth_accounts' });

    if (allAccounts && allAccounts.length) {
        console.log('Success!', 'Wallet Connected!', 'success')
        account = allAccounts[0];
    }

    if (connectResult) {
        return { chain: chain, account: account };
    } else {
        return { chain: chain, account: "" };
    }
})

export default connectToWallet;