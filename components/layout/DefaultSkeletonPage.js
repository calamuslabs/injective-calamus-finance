import { Skeleton, Stack } from '@chakra-ui/react'
export default function DefaultSkeletonPage() {
    return (
        <Stack>
            <Skeleton height='20px' />
            <Skeleton height='20px' />
            <Skeleton height='20px' />
        </Stack>
    )
}