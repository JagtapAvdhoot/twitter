import { Box, Flex, HStack, Image, Text } from '@chakra-ui/react'
import React from 'react'
import globalStore from '../../../../store/globalStore'
import convertDesc from '../../../../util/descConverter';

const Tweet = ({ tweet }) => {
    const accent = globalStore(state => state.accent);

    const regexOne = /(?:^|\s)([#@][a-zA-Z0-9_]+)/g;

    return (
        <>
            <HStack alignItems='start' p='2' my='3' border='1px' borderColor='border' rounded="xl" maxWidth='450px'>
                <Flex flex='1' pt='2' justifyContent='center' alignItems='start'>
                    <Image src={tweet.user.avatar} maxWidth="40px" height="40px" rounded='full' objectFit='cover' />
                </Flex>
                <Flex flexDirection='column' flex="8">
                    <HStack alignItems='center'>
                        <Text fontSize='md' fontWeight='semibold'>{tweet.user.fullName}</Text>
                        <Text color='secondaryText' fontSize='sm'>@{tweet.user.username}</Text>
                        <Text color='secondaryText'>.</Text>
                        <Text color="secondaryText" fontSize='sm'>{tweet.createdAt}</Text>
                    </HStack>
                    <Box
                        __css={{
                            '.ioisdf': {
                                color: accent
                            }
                        }}
                        fontSize='sm'
                        dangerouslySetInnerHTML={{ __html: convertDesc(tweet.desc) }} />
                    {/* <Box> div for image and videos </Box> */}
                </Flex>
            </HStack>
        </>
    )
}

export default Tweet