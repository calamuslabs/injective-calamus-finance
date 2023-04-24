import React, {useRef, useState, useCallback} from "react";
import {useAppDispatch} from "../../app/hooks";
import {filterOutgoingStream} from "../../app/list/outgoingSlice";
import {filterIncomingStream} from "../../app/list/incomingSlice";
import {InputGroup, InputLeftElement, Input, InputRightAddon} from "@chakra-ui/input";
import {
    Box,
    Button,
    Checkbox,
    Flex, Grid, GridItem,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Select,
    Text,
    useStyleConfig
} from "@chakra-ui/react";
import Image from 'next/image'
import listStatusOptions from 'src/data/StreamStatusOption';
import {chainInfos} from "../../app/config";

export default function StreamsFilter({isOutgoingStreams}) {
    const dispatch = useAppDispatch();
    const formData = useRef({
        network: "0",
        status: "-1",
        from: null, //moment().format("YYYY-MM-DD"),
        to: null, //moment().add(1, "days" ).format("YYYY-MM-DD"),
        textSearchType: "0",
        textSearchValue: ""
    })

    const [network, setNetwork] = useState(formData.current.network);
    const [status, setStatus] = useState(formData.current.status);
    const [textSearchType, setTextSearchType] = useState(formData.current.textSearchType);
    const [textSearchValue, setTextSearchValue] = useState(formData.current.textSearchValue);

    const handleNetworkChange = useCallback((value) => {
        setNetwork(value);
        formData.current.network = value;
    }, [network])

    const handleStatusChange = useCallback((value) => {
        setStatus(value.target.value);
        formData.current.status = value.target.value;
        handleFilter();
    }, [status])

    const handleTextSearchTypeChange = useCallback((value) => {
        setTextSearchType(value);
        formData.current.textSearchType = value;
    }, [textSearchType])

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
    const filterBarContainerStyle = useStyleConfig('FilterBarContainer');
    const filterItemContainerStyle = useStyleConfig('FilterItemContainer');
    const rangeDatetimePickerRightElementStyle = useStyleConfig('RangeDatetimePickerRightElement');
    const rangeDatetimePickerLeftElementStyle = useStyleConfig('RangeDatetimePickerLeftElement');
    const rangeDatetimePickerRightIconStyle = useStyleConfig('RangeDatetimePickerRightIcon');
    const rangeDatetimePickerRightContainerStyle = useStyleConfig('RangeDatetimePickerRightContainer');
    const streamFilterContainerStyle = useStyleConfig('StreamFilterContainer');

    return (
        <Grid sx={streamFilterContainerStyle}>
            <GridItem rowSpan={1} colSpan={{base: 3, md: 1}} sx={filterItemContainerStyle}>
                <InputGroup>
                    <InputLeftElement children={<Image alt={'search icon'} src={'/icons/Search.svg'} width={30} height={30}/>}/>
                    <Input placeholder='search by email, contact title' onChange={handleTextSearchValueChange}/>
                </InputGroup>
            </GridItem>
            <GridItem rowSpan={1} colSpan={{base: 3, md: 1}} sx={filterItemContainerStyle}>
                <Select onChange={handleStatusChange} value={status}>
                    {listStatusOptions.map((item, index) => (
                        <option value={item.value} key={index}>{item.label}</option>
                    ))}
                </Select>
            </GridItem>
            <GridItem rowSpan={1} colSpan={{base: 3, md: 1}} sx={filterItemContainerStyle}>
                <InputGroup size='md'>
                    <InputLeftElement pointerEvents='none'>
                        <Image alt={'schedule icon'} src={'/icons/Schedule.svg'} width={'30'} height={'30'}/>
                    </InputLeftElement>
                    <Input type={'datetime-local'} sx={rangeDatetimePickerLeftElementStyle}
                           onChange={handleChangeFrom}/>
                    <InputRightAddon sx={rangeDatetimePickerRightContainerStyle}>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none' sx={rangeDatetimePickerRightIconStyle}>
                                <Image alt={'next page icon'} src={'/icons/Next_Page.svg'} width={'30'} height={'30'}/>
                            </InputLeftElement>
                            <Input variant={'unstyled'} type={'datetime-local'}
                                   sx={rangeDatetimePickerRightElementStyle} onChange={handleChangeTo}/>
                        </InputGroup>
                    </InputRightAddon>
                </InputGroup>
            </GridItem>
        </Grid>

        // <Layout.Section fullWidth>
        //     <div>
        //         <FormLayout>
        //             <FormLayout.Group condensed>
        //                 {/*<Select label={"Network"}*/}
        //                 {/*        options={[*/}
        //                 {/*            {label: "All", value: "0"},*/}
        //                 {/*            {label: "Tron", value: "tron"},*/}
        //                 {/*            {label: "Polygon", value: "polygon"},*/}
        //                 {/*            {label: "Evmos", value: "evmos"},*/}
        //                 {/*            {label: "Bnb", value: "bnb"}*/}
        //                 {/*        ]}*/}
        //                 {/*        value={network}*/}
        //                 {/*        onChange={(value) => handleNetworkChange(value)}*/}
        //                 {/*/>*/}
        //                 <Select label={"Status"}
        //                     options={[
        //                         { label: "All", value: "-1" },
        //                         { label: "Not started", value: "1" },
        //                         { label: "Processing", value: "4" },
        //                         { label: "Completed", value: "3" },
        //                         { label: "Cancelled", value: "2" },
        //                     ]}
        //                     value={status}
        //                     onChange={(value) => handleStatusChange(value)}
        //                 />
        //                 <TextField label={"From"}
        //                     type={"date"}
        //                     value={from}
        //                     max={to}
        //                     onChange={(value) => handleChangeFrom(value)}
        //                     autoComplete={"false"}
        //                 />
        //                 <TextField label={"To"}
        //                     type={"date"}
        //                     value={to}
        //                     min={from}
        //                     onChange={(value) => handleChangeTo(value)}
        //                     autoComplete={"false"}
        //                 />
        //                 <div className="calamus-search">
        //                     <TextField label={"Search"}
        //                         autoComplete={"false"}
        //                         connectedLeft={
        //                             <Select label={""}
        //                                 labelHidden={true}
        //                                 options={[
        //                                     { label: "Email", value: "0" },
        //                                     { label: "Contract Title", value: "1" }
        //                                 ]}
        //                                 value={textSearchType}
        //                                 onChange={(value) => handleTextSearchTypeChange(value)} />
        //                         }
        //                         value={textSearchValue}
        //                         onChange={(value) => handleTextSearchValueChange(value)}
        //                         connectedRight={
        //                             <Button onClick={() => handleFilter()}>Search</Button>
        //                         }
        //                     />
        //                 </div>
        //             </FormLayout.Group>
        //         </FormLayout>
        //     </div>
        // </Layout.Section>
    )
}