import {Box, HStack, Text, Tooltip, useStyleConfig, VStack} from "@chakra-ui/react";
import {useCallback} from "react";
import Image from "next/image";

export default function StartEndTimeTooltip({startTime, endTime, children}) {
    const dateTimeColumnTextStyle = useStyleConfig('DateTimeColumnText');
    const networkSelectIdStyle = useStyleConfig('NetworkSelectId');
    const tooltipDatetimeTitleStyle = useStyleConfig('TooltipDatetimeTitle');
    const columnTitleStyle = useStyleConfig('ColumnTitle');
    const baselineContainerStyle = useStyleConfig('BaselineContainer');
    const tooltipDatetimeContainerStyle = useStyleConfig('TooltipDatetimeContainer');
    const toolTipContent = useCallback((startTime, endTime) => {
        const numberOfDay = Math.trunc((endTime - startTime) / (24 * 60 * 60));
        const numberOfHour = Math.trunc( ((endTime - startTime) / (60 * 60)) - (numberOfDay * 24));
        const numberOfMinute = Math.trunc(((endTime - startTime) / 60) - (numberOfHour * 60) - (numberOfDay * 24 * 60));

        return <Box>
            <VStack sx={baselineContainerStyle}>
                <Text sx={tooltipDatetimeTitleStyle}> Stream
                    in {numberOfDay > 0 ? <><b>{numberOfDay}</b> days, </> : null} {numberOfHour > 0 ? <>
                        <b>{numberOfHour}</b> hours, </> : null} {numberOfMinute > 0 ? <>
                        <b>{numberOfMinute}</b> minutes</> : null}
                </Text>
                <HStack>
                    <VStack sx={baselineContainerStyle} w={170}>
                        <Text sx={columnTitleStyle}>start time</Text>
                        <Text sx={dateTimeColumnTextStyle}>{new Date(startTime * 1000).toLocaleDateString()}</Text>
                        <Text sx={networkSelectIdStyle}>
                            {new Date(startTime * 1000).toLocaleTimeString()} |
                            GMT{(new Date(startTime * 1000).getTimezoneOffset() / (-60)) > 0 ? `+${(new Date(startTime * 1000).getTimezoneOffset() / (-60))}` : (new Date(startTime * 1000).getTimezoneOffset() / (-60))}
                        </Text>
                    </VStack>
                    <Box w={50}>
                        <Image alt={'next page icon'} src={'/icons/Next_Page_Gray.svg'} layout={'fixed'} width={20} height={20}/>
                    </Box>
                    <VStack sx={baselineContainerStyle} w={170}>
                        <Text sx={columnTitleStyle}>end time</Text>
                        <Text sx={dateTimeColumnTextStyle}>{new Date(endTime * 1000).toLocaleDateString()}</Text>
                        <Text sx={networkSelectIdStyle}>
                            {new Date(endTime * 1000).toLocaleTimeString()} |
                            GMT{(new Date(endTime * 1000).getTimezoneOffset() / (-60)) > 0 ? `+${(new Date(endTime * 1000).getTimezoneOffset() / (-60))}` : (new Date(endTime * 1000).getTimezoneOffset() / (-60))}
                        </Text>
                    </VStack>
                </HStack>
            </VStack>
        </Box>
    }, [])
    return (
        <Tooltip label={toolTipContent(startTime, endTime)} sx={tooltipDatetimeContainerStyle}>
            {children}
        </Tooltip>
    )
}