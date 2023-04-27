import { createAsyncThunk } from "@reduxjs/toolkit";
import { InjNetwork } from "state/config";
import { MsgBroadcaster } from '@injectivelabs/wallet-ts'
import {
    MsgExecuteContract
} from '@injectivelabs/sdk-ts'
import { BigNumberInBase, BigNumber } from '@injectivelabs/utils'
import { config } from "state/config";

const createStream = createAsyncThunk("stream/create", async (_payload, { getState }) => {
    let state = await getState();
    let { formData, formError, selectedToken } = state.stream;

    try {
        let errorList = Object.values(formError);
        for (let i = 0; i < errorList.length; i++) {
            if (errorList[i] !== "") {
                return {
                    result: false,
                    type: "create",
                    message: "Please correct all error field",
                    fieldErr: ""
                }
            }
        }

        const injectiveAddress = state.chain.account;
        const keplrObj = state.wallet.keplrObj;
        const msgBroadcastClient = new MsgBroadcaster({
            walletStrategy: keplrObj,
            network: InjNetwork,
        })

        const msg = MsgExecuteContract.fromJSON({
            funds: {
                denom: selectedToken.tokenId,
                amount: new BigNumberInBase(formData.release_amount).toWei(selectedToken.tokenDecimal).toFixed()
            },
            sender: injectiveAddress,
            contractAddress: config.inj.contractAddress,
            exec: {
                msg: {
                    recipient: formData.recipient,
                    start_time:  new BigNumber(parseInt(formData.start_time) / 1000),
                    duration: new BigNumber(parseInt(formData.stop_time) / 1000 - parseInt(formData.start_time) / 1000),
                    vesting_release: new BigNumberInBase(formData.vesting_release).toWei(2).toFixed()
                },
                action: "create"
            }
        });
        await msgBroadcastClient.broadcast({
            injectiveAddress: injectiveAddress,
            msgs: msg
        })
        return {
            result: true,
            type: "create",
            message: "Create stream success",
            fieldErr: ""
        }
    } catch (e) {
        console.log(e)
        let errMsg = e.message.length > 100 ? e.message.slice(0, 100) + "..." + " (See detail in console)" : e.message;
        return {
            result: false,
            type: "create",
            message: errMsg,
            fieldErr: ""
        }
    }

})
export default createStream;