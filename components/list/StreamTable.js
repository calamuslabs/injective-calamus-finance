import { useCallback, useMemo } from "react";
import Address from "src/components/stream/Address";
import PriceSlider from "src/components/stream/PriceSlider";
import StreamAction from "src/components/stream/StreamAction";
import { config } from "src/app/config";
import { statusConfig, StreamToRow } from "src/app/list/types";
import { columnConfigObj } from "src/app/chain/chainSlice";
import {
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Text,
    useStyleConfig,
    Avatar,
    Wrap,
    WrapItem, VStack, HStack,
} from "@chakra-ui/react";
import StatisticTag from "../dashboard/StatisticTag";
import StartEndTimeTooltip from "./StartEndTimeTooltip";

export default function StreamTable({ currentAccount, streams, selected, isIncoming }) {
    const tableTextStyle = useStyleConfig('TableText');
    const tableLinkTextStyle = useStyleConfig('TableLinkText');
    const networkSelectIdStyle = useStyleConfig('NetworkSelectId');
    const recipientColumnContainerStyle = useStyleConfig('RecipientColumnContainer');
    const columnTitleStyle = useStyleConfig('ColumnTitle');
    const dateTimeColumnTextStyle = useStyleConfig('DateTimeColumnText');
    const statusColumnStyle = useStyleConfig('StatusColumn');
    const actionColumnStyle = useStyleConfig('ActionColumn');
    const mapStreamProperty = useCallback((key, stream, index) => {
        switch (key) {
            case "title":
                return stream.contractTitle ? <Td key={`title-${index}`}><Text
                    sx={tableTextStyle}>{stream.contractTitle.length > 60 ? stream.contractTitle.slice(0, 60) + "..." : stream.contractTitle}</Text></Td> :
                    <Td key={`title-${index}`}>N/A</Td>;
            case "transaction":
                return stream.trxHash ?
                    <Td key={`transaction-${index}`}>
                        <a target="_blank" href={config[stream.chain].blockchainExplorer + "tx/" + stream.trxHash}>
                            <Text
                                sx={tableLinkTextStyle}>{stream.trxHash.slice(0, 5) + "..." + stream.trxHash.slice(stream.trxHash.length - 5, stream.trxHash.length)}</Text>
                        </a></Td> : <Td>N/A</Td>;
            case "sender":
                return  <Td key={`sender-address-${index}`}>
                    <Address key={`sender-address-${index}`} email={""} address={stream.sender} />
                </Td>;
            case "recipient":
                return <Td key={`recipient-address-${index}`}><Address key={`recipient-address-${index}`}
                    email={stream.emailAddress}
                    address={stream.recipient} /></Td>;
            case "token":
                return <Td key={`token-${index}`}>
                    <Wrap>
                        <WrapItem>
                            <HStack>
                                <Avatar name={stream.tokenAbbr} src={stream.tokenLogo} size={'sm'} />
                                <VStack sx={recipientColumnContainerStyle}>
                                    <Text sx={networkSelectIdStyle}>{stream.tokenAbbr}</Text>
                                </VStack>
                            </HStack>
                        </WrapItem>

                    </Wrap>
                </Td>;
            case "status":
                return <Td key={`status-${index}`}>
                    <StatisticTag background={statusConfig[stream.status].background}
                        // @ts-ignore
                        dotColor={statusConfig[stream.status].color} sx={statusColumnStyle}>
                        {statusConfig[stream.status].label}
                    </StatisticTag>
                </Td>;
            case "start_time":
                return <StartEndTimeTooltip startTime={stream.startTime} endTime={stream.stopTime} key={`start-time-${index}`}>
                    <Td key={`start-time-${index}`}>
                        <Text
                            sx={dateTimeColumnTextStyle}>{new Date(stream.startTime * 1000).toLocaleDateString()}</Text>
                        <Text sx={networkSelectIdStyle}>{new Date(stream.startTime * 1000).toLocaleTimeString()}</Text>
                    </Td>
                </StartEndTimeTooltip>
            case "stop_time":
                return <StartEndTimeTooltip startTime={stream.startTime} endTime={stream.stopTime} key={`end-time-${index}`}>
                    <Td key={`end-time-${index}`}>

                                <Text
                                    sx={dateTimeColumnTextStyle}>{new Date(stream.stopTime * 1000).toLocaleDateString()}</Text>
                                <Text
                                    sx={networkSelectIdStyle}>{new Date(stream.stopTime * 1000).toLocaleTimeString()}</Text>

                    </Td>
                </StartEndTimeTooltip>
            case "withdraw":
                return <Td key={`withdraw-${index}`}>
                    <Text sx={tableTextStyle}>{parseFloat(stream.withdrawAmount).toFixed(4)}</Text>
                </Td>;
            case "unlock":
                return <Td key={`unlock-${index}`}>
                    <PriceSlider
                        stream={stream}
                        releaseAmount={parseFloat(stream.releaseAmount)}
                        startTime={stream.startTime}
                        stopTime={stream.stopTime}
                    />
                </Td>
            case "release_rate":
                return <Td key={`release_rate-${index}`}><Text sx={tableTextStyle}>{stream.releaseRate}</Text></Td>;
            case "initial_release":
                return <Td key={`initial_release-${index}`}><Text
                    sx={tableTextStyle}>{stream.initialRelease}</Text></Td>;
            case "action":
                return <Td key={`action-${index}`} sx={actionColumnStyle} zIndex={streams.length + 1 - index}>
                    <StreamAction
                        currentAccount={currentAccount}
                        stream={stream}
                        isIncoming={isIncoming}
                    /></Td>;
            default:
                return null;
        }
    }, [selected]);

    const rows = useMemo(() => {
        let result = [];
        streams.forEach((stream: StreamToRow, index: number) => {
            let oneRow = [];
            selected.forEach((item: string) => oneRow.push(mapStreamProperty(item, stream, index)));
            result.push(oneRow);
        });
        return result;
    }, [streams, selected])

    const columTypes = useMemo(() => {
        let columnTypes = [];
        selected.forEach((item: string | number) => {
            columnTypes.push(columnConfigObj[item].type)
        });
        return columnTypes;
    }, [selected]);

    const columHeadings = useMemo(() => {
        let columnHeadings = [];
        selected.forEach((item: string | number) => {
            columnHeadings.push(columnConfigObj[item].label)
        });
        return columnHeadings;
    }, [selected]);

    return (
        <>
            <TableContainer>
                <Table size='md'>
                    <Thead>
                        <Tr>
                            {columHeadings.map((item, index) => {
                                if (item === 'Actions') {
                                    return <Th key={index} sx={actionColumnStyle} />
                                } else {
                                    return <Th key={index}><Text sx={columnTitleStyle}>{item}</Text></Th>
                                }
                            })}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {rows.map((item, index) => (<Tr key={index}>{item}</Tr>))}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )
}