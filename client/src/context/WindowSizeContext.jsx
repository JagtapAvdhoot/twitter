import { useMediaQuery } from '@chakra-ui/react'
import React, { createContext, useContext } from 'react'

export const WindowSizeContext = createContext(null);

const WindowSizeContextProvider = ({ children }) => {
    const [isGreaterThan1100] = useMediaQuery('(min-width: 1100px)')
    return (
        <WindowSizeContext.Provider value={{ isGreaterThan1100 }}>
            {
                children
            }
        </WindowSizeContext.Provider>
    )
}

export default WindowSizeContextProvider

export const userWindowSizeContext = () => {
    return useContext(WindowSizeContext);
}