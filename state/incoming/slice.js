import { createSlice } from "@reduxjs/toolkit";
import { filter } from "helper/searchUtils";
import { getStreams } from "./thunk/getStreams";
let initialState = {
    streams: [],
    filteredStreams: [],
    loading: false
}
export const slice = createSlice({
    name: 'incomingStreams',
    initialState,
    reducers: {
        setLoadingList: (state, action) => {
            console.log("List is loading");
        },
        resetStreams: (state, action) => {
            state.streams = [];
            state.filteredStreams = []
        },
        filterIncomingStream: (state, action) => {
            state.filteredStreams = filter(state.streams, action.payload);
        }
    },
    extraReducers(builder) {
        builder.addCase(getStreams.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getStreams.fulfilled, (state, action) => {
            state.streams = action.payload;
            state.filteredStreams = action.payload;
            state.loading = false;
        })
    }

})

export const { setLoadingList, resetStreams, filterIncomingStream } = slice.actions;
export default slice.reducer;