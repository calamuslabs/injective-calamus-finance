import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    SimpleGrid,
    Flex,
    InputGroup,
    InputLeftElement,
    InputRightAddon,
    VStack,
    HStack,
    Text,
    Image,
    Select,
    useStyleConfig
} from '@chakra-ui/react'
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { updateState, updateError, setCanSubmit } from "state/stream/slice";
import { validateReleaseFrequency, validateStartTime, validateStopTime, validateRecipientAmount, validateAddress } from "helper/validate";
import { autoCorrectRecipientAmount } from "helper/autoCorrectRecipientAmount";
import moment from 'moment';

export default function General() {
    const formData = useSelector((state) => state.stream.formData)
    const chainState = useSelector((state) => state.chain)
    const selectedToken = useSelector((state) => state.stream.selectedToken)
    const {
        recipient_address: recipientAddressErr,
        recipient_amount: recipientAmountErr,
        vesting_release: vestingReleaseErr,
        start_time: startTimeErr,
        stop_time: stopTimeErr,
        email: emailErr
    } = useSelector((state) => state.stream.formError)
    const [isFirstValidate, setIsFirstValidate] = useState(true);
    const dispatch = useDispatch();
    const formIconStyle = useStyleConfig("FormIcon");
    const formFlexStyle = useStyleConfig("FormFlex");
    const nowString = useMemo(() => {
        const isoString = new Date(moment().utcOffset() * 60000).toISOString();
        return isoString.substring(0, isoString.indexOf("T") + 9);
    }, [])

    const startTimeString = useMemo(() => {
        const isoString = new Date(parseInt(formData.start_time) + moment().utcOffset() * 60000).toISOString();
        return isoString.substring(0, isoString.indexOf("T") + 9);
    }, [formData.start_time])

    const stopTimeString = useMemo(() => {
        const isoString = new Date(parseInt(formData.stop_time) + moment().utcOffset() * 60000).toISOString();
        return isoString.substring(0, isoString.indexOf("T") + 9);
    }, [formData.stop_time])

    const handleChangeWalletAddress = useCallback((e) => {
        let errorMsg = validateAddress(e.target.value, chainState.account);
        dispatch(updateError({ key: "recipient_address", value: errorMsg }));
        dispatch(updateState({
            key: "recipient",
            value: e.target.value
        }))
    }, [chainState.account])

    const handleChangeReleaseAmount = useCallback((e) => {
        let correctValue = autoCorrectRecipientAmount(e.target.value, selectedToken);
        let errorMsg = validateRecipientAmount(parseFloat(correctValue));
        if (isFirstValidate) {
            setIsFirstValidate(false);
        }
        dispatch(updateError({ key: "recipient_amount", value: errorMsg }));
        dispatch(updateState({
            key: "release_amount",
            value: correctValue
        }))
    }, [selectedToken])

    const handleChangeVestingRelease = useCallback((e) => {
        let floorValue = 0;
        if (e.target.value) {
            floorValue = Math.floor(parseFloat(e.target.value) * 100) / 100;
        }
        floorValue = floorValue <= 100 ? floorValue : 100;
        floorValue = floorValue >= 0 ? floorValue : 0;
        dispatch(updateState({ key: "vesting_release", value: floorValue.toString() }))
    }, [])

    const handleChangeStartTime = useCallback((e) => {
        dispatch(updateState({ key: "start_time", value: new Date(e.target.value).getTime().toString() }))
    }, [])

    const handleChangeStopTime = useCallback((e) => {
        dispatch(updateState({ key: "stop_time", value: new Date(e.target.value).getTime().toString() }))
    }, []);

    useEffect(() => {
        let startTimeMsg = validateStartTime(formData.start_time);
        dispatch(updateError({ key: "start_time", value: startTimeMsg }));
        let stopTimeMsg = validateStopTime(formData.start_time, formData.stop_time);
        dispatch(updateError({ key: "stop_time", value: stopTimeMsg }));
    }, [formData.start_time, formData.stop_time]);

    useEffect(() => {
        if (!isFirstValidate) {
            if (recipientAddressErr || recipientAmountErr || vestingReleaseErr || startTimeErr || stopTimeErr || emailErr) {
                dispatch(setCanSubmit(false))
            } else {
                dispatch(setCanSubmit(true))
            }
        }
    }, [formData, recipientAddressErr, recipientAmountErr, vestingReleaseErr, startTimeErr, stopTimeErr, emailErr])

    return (
        <VStack sx={formFlexStyle}>
            <FormControl isRequired isInvalid={recipientAddressErr !== ""}>
                <FormLabel>Recipient wallet address</FormLabel>
                <InputGroup>
                    <InputLeftElement><Image sx={formIconStyle} src={`/icons/Wallet_Blue.svg`} /></InputLeftElement>
                    <Input placeholder='Please double check the address' onChange={handleChangeWalletAddress} value={formData.recipient.wallet_address} />
                </InputGroup>
                <FormErrorMessage>{recipientAddressErr}</FormErrorMessage>
            </FormControl>
            <Flex sx={formFlexStyle}>
                <FormControl isRequired isInvalid={recipientAmountErr !== ""}>
                    <FormLabel>Recipient amount</FormLabel>
                    <InputGroup>
                        <InputLeftElement><Image sx={formIconStyle} src={`/icons/Stack_of_Coins.svg`} /></InputLeftElement>
                        <Input placeholder='Amount' type='number' value={formData.release_amount} onChange={handleChangeReleaseAmount} />
                        <InputRightAddon>{selectedToken?.tokenAbbr}</InputRightAddon>
                    </InputGroup>
                    <FormErrorMessage>{recipientAmountErr}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={vestingReleaseErr !== ""}>
                    <FormLabel>Vesting release</FormLabel>
                    <InputGroup>
                        <InputLeftElement><Image sx={formIconStyle} src={`/icons/Streaming.svg`} /></InputLeftElement>
                        <Input type='number' value={formData.vesting_release} onChange={handleChangeVestingRelease} max={100} />
                        <InputRightAddon>%</InputRightAddon>
                    </InputGroup>
                    <FormErrorMessage>{vestingReleaseErr}</FormErrorMessage>
                </FormControl>
            </Flex>
            <Flex sx={formFlexStyle}>
                <FormControl isRequired isInvalid={startTimeErr !== ""}>
                    <FormLabel>Start time</FormLabel>
                    <InputGroup>
                        <InputLeftElement><Image src={`/icons/Schedule.svg`} sx={formIconStyle} /></InputLeftElement>
                        <Input value={startTimeString} min={nowString} onChange={handleChangeStartTime} type='datetime-local' />
                    </InputGroup>
                    <FormErrorMessage>{startTimeErr}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={stopTimeErr !== ""}>
                    <FormLabel>Stop time</FormLabel>
                    <InputGroup>
                        <InputLeftElement><Image src={`/icons/Next_Page.svg`} sx={formIconStyle} /></InputLeftElement>
                        <Input value={stopTimeString} min={startTimeString} onChange={handleChangeStopTime} type='datetime-local' />
                    </InputGroup>
                    <FormErrorMessage>{stopTimeErr}</FormErrorMessage>
                </FormControl>
            </Flex>
        </VStack>
    )
}