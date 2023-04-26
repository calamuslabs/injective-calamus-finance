import {Text, Flex, Spinner, VStack, HStack} from "@chakra-ui/react";
import Image from 'next/image'

export default function Loading() {
    return (
        <Flex>
            <VStack sx={{mx: 'auto', my: '50px'}}>
                <Image alt={'loading'} src={'/threeblock.png'} width={310} height={282}/>
                <HStack>
                    <Spinner label={'Loading'}/>
                    <Text>Loading data...</Text>
                </HStack>
            </VStack>
        </Flex>
    )
}