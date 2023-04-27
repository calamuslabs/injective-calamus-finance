import { useCallback, useEffect } from "react";
import {
    Box,
    VStack,
    useStyleConfig,
    Text,
    useToast,
    SimpleGrid
} from "@chakra-ui/react";

import TokenList from "components/stream/TokenList";
import General from "components/stream/General";
import Summary from "components/stream/Summary";
import SaveBar from "components/stream/SaveBar";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setToastActive, triggerRedirect } from "state/stream/slice";
import Balance from "components/stream/Balance";

export default function NewStream() {
    const router = useRouter();
    const dispatch = useDispatch();
    const formContainerStyle = useStyleConfig("FormContainer");
    const formDataStyle = useStyleConfig("FormData");
    const formMainStyle = useStyleConfig("FormMain");

    const formSummaryStyle = useStyleConfig("FormSummary");
    const formTitleStyle = useStyleConfig("SectionTitle");
    const toast = useToast()

    const { toastActive, toastMessage, toastStatus, isRedirect } = useSelector((state) => state.stream)
    const toggleToast = useCallback(() => {
        dispatch(setToastActive(false))
    }, [])

    useEffect(() => {
        if (toastActive) {
            toast({
                title: toastMessage,
                status: toastStatus,
                duration: 2000,
                isClosable: true,
                onCloseComplete: toggleToast
              })
        }
    }, [toastActive, toastMessage])

    useEffect(() => {
        if (isRedirect) {
            dispatch(triggerRedirect())
            setTimeout(() => router.push("outgoing-stream"), 2000)
        }
    }, [isRedirect]);

    return (
        <SimpleGrid sx={formContainerStyle}>
            <VStack  sx={formDataStyle}>
                <Text sx={formTitleStyle}>Stream Infomation</Text>      
                <VStack sx={formMainStyle} gap={2} >
                    <TokenList />
                    <General />
                </VStack>
            </VStack>
            <Box>
                <VStack sx={formSummaryStyle}>
                    <Balance />
                    <Summary />
                </VStack>
            </Box>
            <SaveBar />
        </SimpleGrid>
    )
}