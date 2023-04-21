import {
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Center,
    Image,
    Text,
    useStyleConfig,
    VStack,
    Flex,
    CircularProgress,
    Divider
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from "react";

export default function ProgressModal({ router }) {
    const [pendingTransaction, setPendingTransaction] = useState(false);
    const handleClose = useCallback(() => {
        setPendingTransaction(false);
    }, [])
    const stackStyle = useStyleConfig("PendingModalStack");
    const imageStyle = useStyleConfig("PendingModalImage");
    const titleStyle = useStyleConfig("PendingModalTitle");
    const subTitleStyle = useStyleConfig("PendingModalSubTitle");
    const textStyle = useStyleConfig("PendingModalText");
    const iconStyle = useStyleConfig("PendingModalIcon");
    const flexStyle = useStyleConfig("PendingModalFlex");

    useEffect(() => {
        let checkStatusInterval = setInterval(function () {
            // @ts-ignore
            setPendingTransaction(window.pendingTransaction);
            // @ts-ignore
            if (window.pendingTransaction !== undefined && window.pendingTransaction === false && window.shouldRedirect !== undefined) {
                // @ts-ignore
                window.pendingTransaction = undefined;
                // @ts-ignore
                if (window.shouldRedirect) {
                    clearInterval(checkStatusInterval);
                    router.push("/outgoing-stream");
                }
            }
        }, 1000)
    }, [])

    return (
        <Modal
            isOpen={pendingTransaction}
            onClose={handleClose}
            isCentered
        >
            <ModalOverlay />
            <ModalContent>
                <ModalBody>
                    <Center><Image sx={imageStyle} src={"/threeblock.png"} /></Center>
                    <Center><Text sx={titleStyle}>Creating Stream</Text></Center>
                    <VStack sx={stackStyle}>
                        <Flex sx={flexStyle}>
                            <Box>
                            <Image sx={iconStyle} src={`/icons/Checked_Radio_Gradient.svg`} />
                            </Box>
                            <VStack sx={stackStyle}>
                                <Text sx={subTitleStyle}>
                                    Send stream data to chain
                                </Text>
                                <Text sx={textStyle}>
                                    Stream data is sent and will be stored on chain
                                </Text>
                            </VStack>
                        </Flex>
                        <Divider />
                        <Flex sx={flexStyle}>
                            <Box sx={iconStyle}>
                                <CircularProgress size='24px' isIndeterminate color='#0074FD' />
                            </Box>
                            <VStack sx={stackStyle}>
                                <Text sx={subTitleStyle}>
                                    Transaction confirmation
                                </Text>
                                <Text sx={textStyle}>
                                    Please wait until all transaction are confirmed
                                </Text>
                            </VStack>
                        </Flex>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}