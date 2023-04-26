import {Icon, Tag, TagLabel, TagLeftIcon, useStyleConfig} from "@chakra-ui/react";

export default function StatisticTag({background, dotColor, count, children, ...rest}) {
    const statisticTagContainerStyle = useStyleConfig('StatisticTagContainer');
    const statisticTagTextStyle = useStyleConfig('StatisticTagText');
    return (
        <Tag sx={statisticTagContainerStyle} bg={background} {...rest}>
            <TagLeftIcon boxSize='12px'>
                <Icon viewBox='0 0 200 200' color={dotColor}>
                    <path
                        fill='currentColor'
                        d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
                    />
                </Icon>
            </TagLeftIcon>
            <TagLabel sx={statisticTagTextStyle}>{count} {children}</TagLabel>
        </Tag>
    )
}