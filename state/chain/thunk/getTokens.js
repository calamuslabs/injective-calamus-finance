import {createAsyncThunk} from "@reduxjs/toolkit";
import { ChainRestBankApi, DenomClient } from '@injectivelabs/sdk-ts'
import { getNetworkEndpoints, Network } from '@injectivelabs/networks'
export const getAvailableTokens = createAsyncThunk("wallet/availableToken", async (_payload, {getState}) => {
    let tokens = [];
    let account = await getState().chain.account;
    if (account) {
        const endpoints = getNetworkEndpoints(Network.TestnetK8s)
        const denomClient = new DenomClient(Network.TestnetK8s)
        const chainBankApi = new ChainRestBankApi(endpoints.rest)

        const accountBalance = await chainBankApi.fetchBalances(account);
        let promises = [];
        if (accountBalance.balances) {
            accountBalance.balances.forEach(item => {
                promises.push(denomClient.getDenomToken(item.denom))
            })
        }
        let result = await Promise.all(promises);
        tokens = result.filter(item => typeof item !== "undefined");        
    }
    return tokens;
})