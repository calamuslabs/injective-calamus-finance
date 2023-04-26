import { createAsyncThunk } from "@reduxjs/toolkit";
import { getKeplr } from "./connectInj";
import { Wallet, WalletStrategy } from '@injectivelabs/wallet-ts'
import { InjChainId } from "state/config";
const connectToWallet = createAsyncThunk("wallet/connect", async (chain) => {
    let result = await getKeplr();
    const walletStrategy = new WalletStrategy({
        chainId: InjChainId,
        wallet: Wallet.Keplr
    })

    if (result.accounts.length) {
        return { chain: chain, account: result.accounts[0].address, obj: result, strategy: walletStrategy};
    } else {
        return { chain: chain, account: "" };
    }
})

export default connectToWallet;