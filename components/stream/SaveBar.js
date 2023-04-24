import { Button, Center, Image, useStyleConfig } from "@chakra-ui/react";
import {useCallback, useEffect, useState} from "react";
import {resetFormData, setCanSubmit, setIsCreating} from "state/stream/slice";
import { useDispatch, useSelector } from "react-redux";

export default function SaveBar() {
    const dispatch = useDispatch();
    const {selectedChain} = useSelector((state) => state.chain)
    const {can_submit: canSubmit} = useSelector((state) => state.stream.formData)
    const saveBarStyle = useStyleConfig('SaveBar'); 
    const saveButtonStyle = useStyleConfig('SaveButton'); 
    const saveIconStyle = useStyleConfig('SaveIcon');

    const handleSave = useCallback(async () => {
        // await dispatch(connectToWallet(selectedChain));
        // await dispatch(loadSmartContract(selectedChain)),
        // dispatch(setIsCreating(true))
        // if (selectedChain === "tron") {
        //     await dispatch(createTronStream())
        // } else if (selectedChain === "polygon") {
        //     await dispatch(createPolygonStream())
        // } else if (selectedChain === "evmos") {
        //     await dispatch(createEvmosStream())
        // } else if (selectedChain === "bnb") {
        //     await dispatch(createBnbStream())
        // } else {
        //     console.log("Not implemented yet for ", selectedChain, " Network");
        // }
    }, [selectedChain])

    useEffect(() => {
        dispatch(resetFormData());
    }, []);

    return (
        <Center sx={saveBarStyle}>
            <Button
                sx={saveButtonStyle}
                disabled={!canSubmit}
                leftIcon={<Image sx={saveIconStyle} src={`/icons/Done.svg`}/>}
                onClick={() => handleSave()}
            >SAVE & APPLY</Button>
        </Center>
    )
}