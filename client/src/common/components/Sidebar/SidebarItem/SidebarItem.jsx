import { Box, Icon, Text } from '@chakra-ui/react';
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { userWindowSizeContext } from '../../../../context/WindowSizeContext';

const CommonSidebarItem = ({ sidebarItem }) => {
    const location = useLocation();
	const { isGreaterThan1100 } = userWindowSizeContext();
    return (
        <Box cursor='pointer' title={sidebarItem.name} fill="secondary" display="flex" padding="10px 20px" rounded="full" _hover={{ bg: "hover" }} justifyContent={isGreaterThan1100 ? 'flex-start' : "center"} alignItems='center' gap={2}>
            <sidebarItem.Icon size='25px' strokeWidth="1px" />
            {isGreaterThan1100 && <Text fontSize='19px' fontWeight={sidebarItem?.slug === location.pathname ? "bold" : "normal"}>
                {sidebarItem.name}
            </Text>}
        </Box>
    )
}

const SidebarItem = ({ sidebarItem }) => {

    return (
        <>
            {sidebarItem.link ? (
                <Link to={sidebarItem.slug}>
                    <CommonSidebarItem sidebarItem={sidebarItem} />
                </Link>
            )
                :
                (
                    <Box onClick={sidebarItem.onClickHandler}>
                        <CommonSidebarItem sidebarItem={sidebarItem} />
                    </Box>
                )
            }
        </>
    )
}

export default SidebarItem