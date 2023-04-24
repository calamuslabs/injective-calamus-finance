import { Box, Text, Flex, Divider, useStyleConfig, VStack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useCallback, useMemo } from 'react';
import { ethers } from "ethers";

export default function Summary() {
    let { formData, selectedToken } = useSelector((state) => state.stream);

    const summaryBoxStyle = useStyleConfig('SummaryBox');
    const mediumTextStyle = useStyleConfig('MediumText');
    const summaryTitleStyle = useStyleConfig('SummaryTitle');
    const summaryFlexStyle = useStyleConfig('SummaryFlex');

    return (
        <Box >
            <Text sx={summaryTitleStyle}>OVERVIEW</Text>
            <VStack sx={summaryBoxStyle}>
                <Text>Stream starts on</Text>
                <Text sx={mediumTextStyle}>{new Date(parseInt(formData.start_time)).toLocaleDateString()} at {new Date(parseInt(formData.start_time)).toLocaleTimeString()}</Text>
                <Text>Ends on</Text>
                <Text sx={mediumTextStyle}>{new Date(parseInt(formData.stop_time)).toLocaleDateString()} at {new Date(parseInt(formData.stop_time)).toLocaleTimeString()}</Text>
                <Flex>Initial release&nbsp;<Text sx={mediumTextStyle}>{formData.vesting_release} %</Text></Flex>
                <Divider />
                <Flex sx={summaryFlexStyle}>
                    <Text>Recipient will receive</Text>
                    <Text sx={mediumTextStyle}>{formData.release_amount} {selectedToken?.tokenAbbr}</Text>
                </Flex>
                <Divider />
            </VStack>
        </Box>
    )
}