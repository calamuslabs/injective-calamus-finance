import { createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { hubAddress, config } from "state/chain/config";

const loadContract = createAsyncThunk("stream/create", async (_payload, { getState }) => {
    let state = await getState();
    if (state.chain.account) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(hubAddress, Hub.abi, signer);
        return { contract: contract, isSigner: true }
    } else if (state.chain.selectedChain) {
        const provider = new ethers.providers.WebSocketProvider(config[selectedChain].wssAddress);
        const contract = new ethers.Contract(hubAddress, Hub.abi, provider);
        return { contract: contract, isSigner: false }
    } else {
        const provider = new ethers.providers.WebSocketProvider(config.calamus.wssAddress);
        const contract = new ethers.Contract(hubAddress, Hub.abi, provider);
        return { contract: contract, isSigner: false }
    }
})
export default loadContract;