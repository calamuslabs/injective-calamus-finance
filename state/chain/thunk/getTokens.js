import {createAsyncThunk} from "@reduxjs/toolkit";
import { ChainRestBankApi, DenomClient } from '@injectivelabs/sdk-ts'
import { getNetworkEndpoints, Network } from '@injectivelabs/networks'
import { InjNetwork } from "state/config";

export const getAvailableTokens = createAsyncThunk("wallet/availableToken", async (_payload, {getState}) => {
    let tokens = [];
    let state = await getState();
    let account = state.chain.account;
    if (account) {
        let denomClient = state.wallet.denomClient;

        const endpoints = getNetworkEndpoints(InjNetwork)
        const chainBankApi = new ChainRestBankApi(endpoints.rest)

        const accountBalance = await chainBankApi.fetchBalances(account);
        let promises = [];
        if (accountBalance.balances) {
            accountBalance.balances.forEach(item => {
                promises.push(denomClient.getDenomToken(item.denom))
            })
        }
        let result = await Promise.all(promises);
        result.forEach((item, index) => {
            if (typeof item !== "undefined") {
                tokens.push({
                    balance: accountBalance.balances[index].amount,
                    name: item.name,
                    tokenAbbr: item.symbol,
                    tokenDecimal: item.decimals,
                    tokenId: item.denom,
                    tokenLogo: `https://testnet.explorer.injective.network/vendor/@injectivelabs/token-metadata/${item.logo}`
                })
            }
        })
    }
    return tokens;
})