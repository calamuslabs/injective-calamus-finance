import { createAsyncThunk } from "@reduxjs/toolkit";
import { InjNetwork } from "state/config";
import { MsgBroadcaster } from '@injectivelabs/wallet-ts'
import {
    MsgExecuteContract
} from '@injectivelabs/sdk-ts'
import { config } from "state/config";
import { BigNumberInBase } from '@injectivelabs/utils'

const topupStream = createAsyncThunk("stream/topup", async (payload, { getState }) => {
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
                denom: payload.tokenId,
                amount: new BigNumberInBase(payload.amount).toWei(payload.tokenDecimal).toFixed()
            },
            sender: injectiveAddress,
            contractAddress: config.inj.contractAddress,
            exec: {
                msg: {
                    topup_id: payload.streamId
                },
                action: "topup"
            }
        });
        await msgBroadcastClient.broadcast({
            injectiveAddress: injectiveAddress,
            msgs: msg
        })
        return {
            result: true,
            type: "stream",
            message: "Withdraw stream success",
            fieldErr: ""
        }
    } catch (e) {
        console.log(e)
        let errMsg = e.message.length > 100 ? e.message.slice(0, 100) + "..." + " (See detail in console)" : e.message;
        return {
            result: false,
            type: "withdraw",
            message: errMsg,
            fieldErr: ""
        }
    }

})
export default topupStream;