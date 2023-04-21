import {Box, Button, Flex, HStack, Text, useStyleConfig, VStack} from "@chakra-ui/react";
import Image from 'next/image';
import React, {useCallback} from "react";
import {useRouter} from "next/router";

export default function Onboard() {
    const router = useRouter();
    const newStreamButtonStyle = useStyleConfig('NewStreamButton');
    const newStreamButtonTextStyle = useStyleConfig('NewStreamButtonText');
    const onboardCardStyle = useStyleConfig('OnboardCard');
    const onboardCardTextStyle = useStyleConfig('OnboardCardText');
    const onboardTitleStyle = useStyleConfig('OnboardTitle');
    const onboardTitleLinearStyle = useStyleConfig('OnboardTitleLinear');
    const onboardSubtitleStyle = useStyleConfig('OnboardSubtitle');
    const redirectToNewStream = useCallback(() => {
      router.push('/new-stream');
  }, [])
    return (
        <Flex mt={'92px'} px={220} backgroundImage={'/illustration.png'} backgroundPosition={'right -10% bottom 420%'}
              backgroundRepeat={'repeat-x'} backgroundSize={1200} h={'700px'}>
            <VStack mx={'auto'}>
                <HStack>
                    <Text sx={onboardTitleStyle}>Welcome
                        to </Text>
                    <Text sx={onboardTitleLinearStyle}>Calamus Finance</Text>
                </HStack>
                <Text sx={onboardSubtitleStyle}>Decentralized crypto streaming for your everyday payment</Text>
                <Box mt={'70px !important'}>
                    <HStack>
                        <VStack>
                            <Box sx={onboardCardStyle} onClick={() => {
                                window.open('https://docs.calamus.finance/use-case/recurring-payments')
                            }} id={'exploreUsecasesBtn'}>
                                <Flex>
                                    <Image alt={'explore'} src={'/icons/Search_More.svg'} width={30} height={30}/>
                                    <Text sx={onboardCardTextStyle}>
                                        Explore the usecases
                                    </Text>
                                </Flex>
                            </Box>
                        </VStack>
                        <VStack>
                            <Box sx={onboardCardStyle} onClick={() => {
                                window.open('https://docs.calamus.finance/tutorial/tutorial-video')
                            }} id={'tutorialBtn'}>
                                <Flex>
                                    <Image alt={'about us'} src={'/icons/About.svg'} width={30} height={30}/>
                                    <Text sx={onboardCardTextStyle}>
                                        Step-by-step tutorial</Text>
                                </Flex>
                            </Box>
                        </VStack>
                    </HStack>
                </Box>
                <Button sx={newStreamButtonStyle}
                        leftIcon={<Image alt={'new stream'} src={'/icons/Data_Transfer_Gray.svg'} width={30} height={30}/>}
                        rightIcon={null}
                        variant='solid'
                        onClick={redirectToNewStream}
                        mt={'70px !important'}
                        id={'createStreamBtn'}
                >
                    <Text sx={newStreamButtonTextStyle}>
                        Create Stream
                    </Text>
                </Button>
            </VStack>
        </Flex>
    )
}