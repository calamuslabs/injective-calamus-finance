import {useCallback} from "react";
import {useStyleConfig, VStack, HStack, Text, Tooltip, useToast, Box, Icon} from "@chakra-ui/react";
import {BsInfoCircleFill} from 'react-icons/bs';
import {MdOutlineContentCopy} from 'react-icons/md';

export default function Address({key, address}) {
    const toast = useToast();
    const recipientNameColumnStyle = useStyleConfig('RecipientNameColumn');
    const networkSelectIdStyle = useStyleConfig('NetworkSelectId');
    const recipientColumnContainerStyle = useStyleConfig('RecipientColumnContainer');
    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(address);
        toast({
            render: () => (
                <Box sx={{
                    color: 'white',
                    px: 6,
                    py: 3,
                    bg: 'green.600',
                    fontWeight: 600,
                    textAlign: 'center',
                    borderRadius: '10px',
                    w: '200px',
                    m: 'auto'
                }}>
                    <HStack>
                        <Icon as={BsInfoCircleFill} color={'white'}/>
                        <Text>Address copied</Text>
                    </HStack>
                </Box>),
            status: 'success',
            duration: 2000,
            isClosable: true
        })
    }, [])
    return (
        <VStack sx={recipientColumnContainerStyle} onClick={handleCopy}>
            <Tooltip label={'Click to copy'}>
                <HStack>
                    <Text sx={recipientNameColumnStyle}>
                        {address.slice(0, 6) + "..." + address.slice(address.length - 4, address.length)}
                    </Text>
                    <Icon as={MdOutlineContentCopy} />
                </HStack>
            </Tooltip>
        </VStack>
    )
}