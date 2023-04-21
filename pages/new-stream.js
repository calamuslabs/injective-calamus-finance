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
// import General from "components/stream/General";
// import Additional from "components/stream/Additional";
// import Summary from "components/stream/Summary";
// import SaveBar from "components/stream/SaveBar";
import ProgressModal from "components/stream/ProgressModal";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
// import { setToastActive, updateInitialRelease } from "app/stream/slice";
// import Balance from "components/stream/Balance";

export default function NewStream() {
    const router = useRouter();
    const dispatch = useDispatch();
    const formContainerStyle = useStyleConfig("FormContainer");
    const formDataStyle = useStyleConfig("FormData");
    const formMainStyle = useStyleConfig("FormMain");

    const formSummaryStyle = useStyleConfig("FormSummary");
    const formTitleStyle = useStyleConfig("SectionTitle");
    const toast = useToast()

    const { toastActive, toastMessage, toastStatus } = useSelector((state) => state.stream)
    // const toggleToast = useCallback(() => {
    //     dispatch(setToastActive(false))
    // }, [])

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

    return (
        <SimpleGrid sx={formContainerStyle}>
            <VStack  sx={formDataStyle}>
                <VStack>
                    <Text sx={formTitleStyle}>Stream Infomation</Text>      
                    <VStack sx={formMainStyle} gap={2} >
                        <TokenList />
                        {/* <General /> */}
                    </VStack>
                    {/* <Additional /> */}
                </VStack>
            </VStack>
            <Box>
                <VStack sx={formSummaryStyle}>
                    {/* <Balance />
                    <Summary /> */}
                </VStack>
            </Box>
            {/* <SaveBar /> */}
            <ProgressModal router={router}/>
        </SimpleGrid>
    )
}