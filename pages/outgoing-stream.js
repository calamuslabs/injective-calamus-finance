import React, { useCallback, useEffect } from "react";
import StreamsFilter from "src/components/list/StreamsFilter";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { getTronStreams } from "../app/list/tron/getOutgoingStreamsAsyncThunk";
import { loadSmartContract } from "../app/chain/loadSmartContractAsyncThunk";
import { setToastActive } from "../app/stream/streamSlice";
import { resetStreams } from "../app/list/outgoingSlice";;
import { initialOutgoing, setOutgingColumns } from "src/app/chain/chainSlice";
import ColumnSelection from "src/components/list/ColumnSelection";
import StreamTable from "src/components/list/StreamTable";
import {Grid, GridItem, useToast, useStyleConfig, Box, HStack, Icon, Text} from "@chakra-ui/react";
import EmptyData from "../components/list/EmptyData";
import Loading from "../components/layout/Loading";
import {BsInfoCircleFill} from "react-icons/bs";
import {getEVMStreams} from "../app/list/evm/getEVMOutgoingAsyncThunk";

export default function OutgoingStream() {
    const dispatch = useAppDispatch();
    const outgoingStreams = useAppSelector((state) => state.outgoingStreams.filteredStreams);
    const loading = useAppSelector((state) => state.outgoingStreams.loading);
    const chainState = useAppSelector((state) => state.chain);
    const selectedColumns = chainState.outgoing.filter(item => item.active).map(fItem => fItem.value);

    const {toastActive, toastMessage, toastStatus} = useAppSelector((state) => state.stream)
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
                            <Icon as={BsInfoCircleFill} color={'white'}/>
                            <Box w={'100%'}>
                                <Text>{toastMessage}</Text>
                            </Box>
                        </HStack>
                    </Box>),
            })
        }
    }, [toastActive, toastMessage])
    async function fetchData() {
        const { selectedChain } = chainState;
        dispatch(resetStreams())
        await dispatch(loadSmartContract(selectedChain));
        switch (selectedChain) {
            case "tron":
                dispatch(getTronStreams());
                break;
            default:
                dispatch(getEVMStreams());
                break;
        }
    }


    const handleSelectedChange = useCallback((value) => {
        const newColumn = selectedColumns;
        const selectColumnIndex = newColumn.indexOf(value);
        if (selectColumnIndex !== -1) {
            newColumn.splice(selectColumnIndex, 1);
        } else {
            newColumn.push(value);
        }
        dispatch(setOutgingColumns(newColumn))
    }, []);

    useEffect(() => {
        fetchData();
    }, [chainState.currentAccount]);

    const incomingStreamPageContainerStyle = useStyleConfig('IncomingStreamPageContainer');
    return (
        <Grid sx={incomingStreamPageContainerStyle}>
            <GridItem rowSpan={1} colSpan={{ base: 4, md: 3 }}>
                <StreamsFilter isOutgoingStreams={true} />
            </GridItem>
            <GridItem rowSpan={1} colSpan={{ base: 4, md: 1 }}>
                <ColumnSelection selected={selectedColumns} handleChange={handleSelectedChange}
                    choices={initialOutgoing} />
            </GridItem>
            <GridItem rowSpan={1} colSpan={4}>
                {loading ? <Loading /> : (outgoingStreams.length ?
                    <StreamTable
                        currentAccount={chainState.currentAccount}
                        streams={outgoingStreams}
                        selected={selectedColumns}
                        isIncoming={false} /> :
                    <EmptyData data={'outgoing streams'} />)}

            </GridItem>
        </Grid>
    )
}