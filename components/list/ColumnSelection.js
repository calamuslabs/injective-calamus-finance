import React from "react";
import {Checkbox, Flex, Menu, MenuButton, MenuItem, MenuList, Button, useStyleConfig} from "@chakra-ui/react";
import Image from "next/image";

export default function ColumnSelection({selected, choices, handleChange}) {
    const changeViewButtonStyle = useStyleConfig('ChangeViewButton');

    return (
        <Flex flexDirection={'row-reverse'}>
            <Menu closeOnSelect={false}>
                <MenuButton
                    as={Button}
                    leftIcon={<Image alt={'template'} src={`/icons/Template.svg`} width={'30'} height={'30'}/>}
                    variant='outline'
                    isLoading={false}
                    sx={changeViewButtonStyle}
                >
                    View option
                </MenuButton>
                <MenuList zIndex={100}>
                    {choices.map((item, index) => (
                        <MenuItem key={index} onClick={item.disabled ? null : () => handleChange(item.value)}>
                            <Checkbox isChecked={selected.indexOf(item.value) !== -1} disabled={item.disabled}
                                      onChange={() => handleChange(item.value)}>{item.label}</Checkbox>
                        </MenuItem>
                    ))}

                </MenuList>
            </Menu>
        </Flex>
    )
}