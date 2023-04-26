import React, { useRef, useState, useCallback } from "react";
import { filterOutgoingStream } from "state/outgoing/slice";
import { filterIncomingStream } from "state/incoming/slice";
import { InputGroup, InputLeftElement, Input, InputRightAddon } from "@chakra-ui/input";
import {
    Grid,
    GridItem,
    Select,
    useStyleConfig
} from "@chakra-ui/react";
import Image from 'next/image'
import { listStatusOptions } from 'state/config';
import { useDispatch } from "react-redux";

export default function StreamsFilter({ isOutgoingStreams }) {
    const dispatch = useDispatch();
    const formData = useRef({
        network: "0",
        status: "-1",
        from: null, //moment().format("YYYY-MM-DD"),
        to: null, //moment().add(1, "days" ).format("YYYY-MM-DD"),
        textSearchType: "0",
        textSearchValue: ""
    })

    const [status, setStatus] = useState(formData.current.status);
    const [textSearchValue, setTextSearchValue] = useState(formData.current.textSearchValue);

    const handleStatusChange = useCallback((value) => {
        setStatus(value.target.value);
        formData.current.status = value.target.value;
        handleFilter();
    }, [status])

    const handleTextSearchValueChange = useCallback((e) => {
        const value = e.target.value;
        setTextSearchValue(value);
        formData.current.textSearchValue = value;
        handleFilter();
    }, [textSearchValue])

    const [from, setFrom] = useState(
        formData.current.from
    );

    const [to, setTo] = useState(
        formData.current.to
    );

    const handleChangeFrom = useCallback((e) => {
        const value = e.target.value;
        setFrom(value);
        formData.current.from = value ? value : null;
        handleFilter();
    }, [from])

    const handleChangeTo = useCallback((e) => {
        const value = e.target.value;
        setTo(value);
        formData.current.to = value ? value : null;
        handleFilter();
    }, [to])

    const handleFilter = useCallback(() => {
        if (isOutgoingStreams) {
            dispatch(filterOutgoingStream(formData.current));
        } else {
            dispatch(filterIncomingStream(formData.current));
        }
    }, [])
    const filterItemContainerStyle = useStyleConfig('FilterItemContainer');
    const rangeDatetimePickerRightElementStyle = useStyleConfig('RangeDatetimePickerRightElement');
    const rangeDatetimePickerLeftElementStyle = useStyleConfig('RangeDatetimePickerLeftElement');
    const rangeDatetimePickerRightIconStyle = useStyleConfig('RangeDatetimePickerRightIcon');
    const rangeDatetimePickerRightContainerStyle = useStyleConfig('RangeDatetimePickerRightContainer');
    const streamFilterContainerStyle = useStyleConfig('StreamFilterContainer');

    return (
        <Grid sx={streamFilterContainerStyle}>
            <GridItem rowSpan={1} colSpan={{ base: 3, md: 1 }} sx={filterItemContainerStyle}>
                <InputGroup>
                    <InputLeftElement children={<Image alt={'search icon'} src={'/icons/Search.svg'} width={30} height={30} />} />
                    <Input placeholder='Search' onChange={handleTextSearchValueChange} />
                </InputGroup>
            </GridItem>
            <GridItem rowSpan={1} colSpan={{ base: 3, md: 1 }} sx={filterItemContainerStyle}>
                <Select onChange={handleStatusChange} value={status}>
                    {listStatusOptions.map((item, index) => (
                        <option value={item.value} key={index}>{item.label}</option>
                    ))}
                </Select>
            </GridItem>
            <GridItem rowSpan={1} colSpan={{ base: 3, md: 1 }} sx={filterItemContainerStyle}>
                <InputGroup size='md'>
                    <InputLeftElement pointerEvents='none'>
                        <Image alt={'schedule icon'} src={'/icons/Schedule.svg'} width={'30'} height={'30'} />
                    </InputLeftElement>
                    <Input type={'datetime-local'} sx={rangeDatetimePickerLeftElementStyle}
                        onChange={handleChangeFrom} />
                    <InputRightAddon sx={rangeDatetimePickerRightContainerStyle}>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none' sx={rangeDatetimePickerRightIconStyle}>
                                <Image alt={'next page icon'} src={'/icons/Next_Page.svg'} width={'30'} height={'30'} />
                            </InputLeftElement>
                            <Input variant={'unstyled'} type={'datetime-local'}
                                sx={rangeDatetimePickerRightElementStyle} onChange={handleChangeTo} />
                        </InputGroup>
                    </InputRightAddon>
                </InputGroup>
            </GridItem>
        </Grid>
    )
}