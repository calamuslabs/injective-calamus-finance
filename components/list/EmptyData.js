import {Box, Text, useStyleConfig} from "@chakra-ui/react";

export default function EmptyData({data}) {
    const emptyListContainerStyle = useStyleConfig('EmptyListContainer');
    const emptyListTitleStyle = useStyleConfig('EmptyListTitle');
    const emptyListSubTileStyle = useStyleConfig('EmptyListSubTile');
    return (
        <Box sx={emptyListContainerStyle}>
            <Text sx={emptyListTitleStyle}>No {data} available</Text>
            <Text sx={emptyListSubTileStyle}>Please connect your wallet or create/import data to have your data shown here</Text>
        </Box>
    )
}