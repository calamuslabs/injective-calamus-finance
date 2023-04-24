import { Box, Text, Avatar, Flex, useStyleConfig } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { ethers } from "ethers";
export default function Balance() {
    const { selectedToken } = useSelector((state) => state.stream);
    const titleStyle = useStyleConfig("SectionTitle");
    const balanceBoxStyle = useStyleConfig("BalanceBox");
    const tokenBalanceStyle = useStyleConfig("TokenBalance");
    const balanceNumberStyle = useStyleConfig("BalanceNumber");
    const tokenLogoStyle = useStyleConfig("TokenLogo");
    return (
        <Box sx={balanceBoxStyle}>
            <Text sx={titleStyle}>Balance</Text>
            <Flex sx={tokenBalanceStyle}>
                <Avatar sx={tokenLogoStyle} src={selectedToken?.tokenLogo} name={selectedToken?.tokenAbbr} />
                <Text sx={balanceNumberStyle}>{selectedToken ? parseFloat(ethers.utils.formatUnits(selectedToken.balance, selectedToken.tokenDecimal)).toFixed(4) : 0}</Text>
            </Flex>
        </Box>
    )
}
