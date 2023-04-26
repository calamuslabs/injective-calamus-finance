import React, { useCallback, useEffect } from "react";
import StreamsFilter from "components/list/StreamsFilter";
import { setToastActive } from "state/stream/slice";
import { resetStreams } from "state/outgoing/slice";;
import StreamTable from "components/list/StreamTable";
import { Grid, GridItem, useToast, useStyleConfig, Box, HStack, Icon, Text } from "@chakra-ui/react";
import EmptyData from "components/list/EmptyData";
import Loading from "components/layout/Loading";
import { BsInfoCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { getStreams } from "state/outgoing/thunk/getStreams";

export default function OutgoingStream() {
    const dispatch = useDispatch();
    const outgoingStreams = useSelector((state) => state.outgoing.filteredStreams);
    const loading = useSelector((state) => state.outgoing.loading);
    const chainState = useSelector((state) => state.chain);

    const { toastActive, toastMessage, toastStatus } = useSelector((state) => state.stream)
    const toast = useToast();
    const toggleToast = useCallback(() => {
        dispatch(setToastActive(false))
    }, [])

    useEffect(() => {
        if (toastActive) {
            toast({
                // title: toastMessage,
                status: toastStatus,
                duration: 2000,
                isClosable: true,
                onCloseComplete: toggleToast,
                render: () => (
                    <Box sx={{
                        color: 'white',
                        px: 6,
                        py: 3,
                        bg: toastStatus === 'success' ? 'green.600' : 'red.500',
                        fontWeight: 600,
                        textAlign: 'center',
                        borderRadius: '10px',
                        w: 'fit-content',
                        m: 'auto',
                        minW: '200px'
                    }}>
                        <HStack>
                            <Icon as={BsInfoCircleFill} color={'white'} />
                            <Box w={'100%'}>
                                <Text>{toastMessage}</Text>
                            </Box>
                        </HStack>
                    </Box>),
            })
        }
    }, [toastActive, toastMessage])
    async function fetchData() {
        dispatch(resetStreams())
        dispatch(getStreams());
    }

    useEffect(() => {
        fetchData();
    }, [chainState.account]);

    const incomingStreamPageContainerStyle = useStyleConfig('IncomingStreamPageContainer');
    return (
        <Grid sx={incomingStreamPageContainerStyle}>
            <GridItem rowSpan={1} colSpan={{ base: 4, md: 3 }}>
                <StreamsFilter isOutgoingStreams={true} />
            </GridItem>
            <GridItem rowSpan={1} colSpan={4}>
                {loading ? <Loading /> : (outgoingStreams.length ?
                    <StreamTable
                        account={chainState.account}
                        streams={outgoingStreams}
                        isIncoming={false} /> :
                    <EmptyData data={'outgoing streams'} />)}
            </GridItem>
        </Grid>
    )
}