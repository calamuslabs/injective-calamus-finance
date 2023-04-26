import { Button, Center, Image, useStyleConfig } from "@chakra-ui/react";
import { useCallback, useEffect } from "react";
import { resetFormData } from "state/stream/slice";
import { useDispatch, useSelector } from "react-redux";
import createStream from "state/stream/thunk/create";

export default function SaveBar() {
    const dispatch = useDispatch();
    const { formData: { can_submit: canSubmit }, isCreating } = useSelector((state) => state.stream)
    const saveBarStyle = useStyleConfig('SaveBar');
    const saveButtonStyle = useStyleConfig('SaveButton');
    const saveIconStyle = useStyleConfig('SaveIcon');

    const handleSave = useCallback(async () => {
        dispatch(createStream())
    }, [])

    useEffect(() => {
        dispatch(resetFormData());
    }, []);

    return (
        <Center sx={saveBarStyle}>
            <Button
                sx={saveButtonStyle}
                isDisabled={!canSubmit}
                isLoading={isCreating}
                leftIcon={<Image sx={saveIconStyle} src={`/icons/Done.svg`} />}
                onClick={() => handleSave()}
            >SAVE & APPLY</Button>
        </Center>
    )
}