import { createAsyncThunk } from "@reduxjs/toolkit";
import { InjNetwork } from "state/config";
import { MsgBroadcaster } from '@injectivelabs/wallet-ts'
import {
    MsgExecuteContract
} from '@injectivelabs/sdk-ts'
import { config } from "state/config";
import { BigNumber } from "@injectivelabs/utils"
const cancelStream = createAsyncThunk("stream/cancel", async (streamId, { getState }) => {
    let state = await getState();

    try {
        const injectiveAddress = state.chain.account;
        const keplrObj = state.wallet.keplrObj;
        const msgBroadcastClient = new MsgBroadcaster({
            walletStrategy: keplrObj,
            network: InjNetwork,
        })
        const msg = MsgExecuteContract.fromJSON({
            funds: {
                denom: 'inj',
                amount: new BigNumber(0).toFixed()
            },
            sender: injectiveAddress,
            contractAddress: config.inj.contractAddress,
            exec: {
                msg: {
                    cancel_id: streamId
                },
                action: "cancel"
            }
        });
        await msgBroadcastClient.broadcast({
            injectiveAddress: injectiveAddress,
            msgs: msg
        })
        return {
            result: true,
            type: "stream",
            message: "Cancel stream success",
            fieldErr: ""
        }
    } catch (e) {
        console.log(e)
        let errMsg = e.message.length > 100 ? e.message.slice(0, 100) + "..." + " (See detail in console)" : e.message;
        return {
            result: false,
            type: "cancel",
            message: errMsg,
            fieldErr: ""
        }
    }
})
export default cancelStream;