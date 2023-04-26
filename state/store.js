import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// import cacheReducer from "./cache/slice";
import chainReducer from "./chain/slice";
import streamReducer from "./stream/slice";
import walletReducer from "./wallet/slice";
import incomingReducer from "./incoming/slice";
import outgoingReducer from "./outgoing/slice";

const chainPersistConfig = {
    key: 'chain',
    storage,
}

const chainPersist = persistReducer(chainPersistConfig, chainReducer)

export const store = configureStore({
    reducer: {
        chain: chainPersist,
        stream: streamReducer,
        wallet: walletReducer,
        incoming: incomingReducer,
        outgoing: outgoingReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export const persistor = persistStore(store)