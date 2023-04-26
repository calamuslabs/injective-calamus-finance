import { useCallback, useMemo } from "react";
import Address from "components/stream/Address";
import PriceSlider from "components/stream/PriceSlider";
import StreamAction from "components/stream/StreamAction";
import { statusConfig } from "state/config";
import { columnConfigObj } from "state/config";
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
import StatisticTag from "components/dashboard/StatisticTag";
import StartEndTimeTooltip from "./StartEndTimeTooltip";

export default function StreamTable({ account, streams, isIncoming }) {
    const tableTextStyle = useStyleConfig('TableText');
    const networkSelectIdStyle = useStyleConfig('NetworkSelectId');
    const recipientColumnContainerStyle = useStyleConfig('RecipientColumnContainer');
    const columnTitleStyle = useStyleConfig('ColumnTitle');
    const dateTimeColumnTextStyle = useStyleConfig('DateTimeColumnText');
    const statusColumnStyle = useStyleConfig('StatusColumn');
    const actionColumnStyle = useStyleConfig('ActionColumn');

    const columHeadings = useMemo(() => {
        let columnHeadings = [];
        Object.entries(columnConfigObj).forEach(([key, item]) => {
            columnHeadings.push(item.label)
        });
        return columnHeadings;
    }, []);

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
                        {streams.map((stream, index) => (<Tr key={index}>
                            <Td key={`sender-address-${index}`}>
                                <Address key={`sender-address-${index}`} address={stream.sender} />
                            </Td>
                            <Td key={`recipient-address-${index}`}><Address key={`recipient-address-${index}`}
                                address={stream.recipient} />
                            </Td>
                            <Td key={`status-${index}`}>
                                <StatisticTag background={statusConfig[stream.status].background}
                                    // @ts-ignore
                                    dotColor={statusConfig[stream.status].color} sx={statusColumnStyle}>
                                    {statusConfig[stream.status].label}
                                </StatisticTag>
                            </Td>
                            <StartEndTimeTooltip startTime={stream.startTime} endTime={stream.stopTime} key={`start-time-${index}`}>
                                <Td key={`start-time-${index}`}>
                                    <Text
                                        sx={dateTimeColumnTextStyle}>{new Date(stream.startTime * 1000).toLocaleDateString()}</Text>
                                    <Text sx={networkSelectIdStyle}>{new Date(stream.startTime * 1000).toLocaleTimeString()}</Text>
                                </Td>
                            </StartEndTimeTooltip>
                            <StartEndTimeTooltip startTime={stream.startTime} endTime={stream.stopTime} key={`start-time-${index}`}>
                                <Td key={`stop-time-${index}`}>
                                    <Text
                                        sx={dateTimeColumnTextStyle}>{new Date(stream.stopTime * 1000).toLocaleDateString()}</Text>
                                    <Text sx={networkSelectIdStyle}>{new Date(stream.stopTime * 1000).toLocaleTimeString()}</Text>
                                </Td>
                            </StartEndTimeTooltip>
                            <Td key={`unlock-${index}`}>
                                <PriceSlider
                                    stream={stream}
                                    releaseAmount={parseFloat(stream.releaseAmount)}
                                    startTime={stream.startTime}
                                    stopTime={stream.stopTime}
                                />
                            </Td>

                            <Td key={`withdraw-${index}`}>
                                <Text sx={tableTextStyle}>{parseFloat(stream.withdrawAmount).toFixed(4)}</Text>
                            </Td>

                            <Td key={`token-${index}`}>
                                <Wrap>
                                    <WrapItem>
                                        <HStack>
                                            <Avatar name={stream.tokenDetail.symbol} src={stream.tokenLogo} size={'sm'} />
                                            <VStack sx={recipientColumnContainerStyle}>
                                                <Text sx={networkSelectIdStyle}>{stream.tokenDetail.symbol}</Text>
                                            </VStack>
                                        </HStack>
                                    </WrapItem>
                                </Wrap>
                            </Td>
                            <Td key={`release_rate-${index}`}><Text sx={tableTextStyle}>{stream.releaseRate}</Text></Td>
                            <Td key={`initial_release-${index}`}><Text
                                sx={tableTextStyle}>{stream.initialRelease}</Text></Td>
                            <Td key={`action-${index}`} sx={actionColumnStyle} zIndex={streams.length + 1 - index}>
                                <StreamAction
                                    account={account}
                                    stream={stream}
                                    isIncoming={isIncoming}
                                />
                            </Td>
                        </Tr>))}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )
}