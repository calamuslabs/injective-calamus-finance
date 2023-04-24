import {createSlice} from "@reduxjs/toolkit";
import moment from "moment";
import { getAvailableTokens } from "state/chain/thunk/getTokens";
let now = moment();

const initialState = {
    isCreating: false,
    selectedToken: null,
    formData: {
        release_amount: "0",
        start_time: (now.add(1, "hours").unix() * 1000).toString(),
        stop_time: (now.add(1, "minutes").unix() * 1000).toString(),
        vesting_release: "0",
        recipient: "",
        can_submit: false
    },
    formError: {
        vesting_release: "",
        recipient_amount: "",
        recipient_address: "",
        start_time: "",
        stop_time: "",
    },
    isCancelling: false,
    isTransferring: false,
    isWithdrawing: false,
    toastMessage: "",
    toastActive: false,
    toastStatus: "success",
    completeAction: false,
    pendingTransaction: false
}

const transactionMsg = "Transaction signed successfully. Please reload when transaction is confirmed on-chain.";

export const slice = createSlice({
    name: 'stream',
    initialState,
    reducers: {
        selectToken: (state, action) => {
            state.selectedToken = action.payload;
        },
        updateState: (state, action) => {
            if (action.payload.prefix) {
                state.formData[action.payload.prefix][action.payload.key] = action.payload.value;
            } else {
                state.formData[action.payload.key] = action.payload.value;
            }
        },
        updateError: (state, action) => {
            state.formError[action.payload.key] = action.payload.value;
        },
        setIsCreating: (state, action) => {
            console.log("Change State status");
            state.isCreating = action.payload;
        },
        setIsCancelling: (state, action) => {
            state.isCancelling = action.payload;
        },
        setIsTransferring: (state, action) => {
            state.isTransferring = action.payload;
        },
        setIsWithdrawing: (state, action) => {
            state.isWithdrawing = action.payload;
        },
        setToastActive: (state, action) => {
            state.toastActive = action.payload;
        },
        setCompleteAction: (state, action) => {
            state.completeAction = action.payload;
        },
        updateInitialRelease: (state, action) => {
            state.formData.vesting_release = action.payload;
        },
        resetFormData: (state, action) => {
            let isError = false;
            let errorList= Object.values(state.formError);
            for (let i =0 ; i < errorList.length; i++) {
                if (errorList[i] !== "") {
                    isError = true;
                    break;
                }
            }
            if (!isError) {
                state.formData = initialState.formData;
            }
        },
        setCanSubmit: (state, action) => {
            state.formData.can_submit = action.payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(getAvailableTokens.fulfilled, (state, action) => {
            if (action.payload) {
                state.selectedToken =  action.payload[0];
            }
        });
    }

})

export const {
    selectToken,
    updateState,
    setIsCreating,
    setIsCancelling,
    setIsTransferring,
    setIsWithdrawing,
    setToastActive,
    setCompleteAction,
    updateInitialRelease,
    resetFormData,
    updateError,
    setCanSubmit
} = slice.actions;
export default slice.reducer;