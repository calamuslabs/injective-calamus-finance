import { createAsyncThunk } from "@reduxjs/toolkit";
import { ChainGrpcWasmApi, DenomClient } from "@injectivelabs/sdk-ts";
import { convertStreams } from "helper/converter";
import { config } from "state/config";
import { InjNetwork } from "state/config";
import { getNetworkEndpoints } from '@injectivelabs/networks'
export const getStreams = createAsyncThunk("incoming/get-streams", async (_payload, { getState }) => {
    // @ts-ignore
    let state = await getState();
    let streams = []

    try {
        if (state.chain.account) {
            let denomClient = state.wallet.denomClient;
            const endpoints = getNetworkEndpoints(InjNetwork)
            const chainGrpcWasmApi = new ChainGrpcWasmApi(endpoints.grpc)

            const injectiveAddress = state.chain.account;
            const payload = {
                recipient_stream : {
                    recipient: injectiveAddress,
                    start_after: 0,
                    limit: 100
                }
            };
            const query = Buffer.from(JSON.stringify(payload)).toString("base64");
            const response = await chainGrpcWasmApi.fetchSmartContractState(
                config.inj.contractAddress,
                query
            );
            const data = JSON.parse(Buffer.from(response.data).toString());
            return convertStreams(denomClient, data.streams);
        }    
    } catch (e) {
        console.log(e)
        return [];
    }
    return streams;
})