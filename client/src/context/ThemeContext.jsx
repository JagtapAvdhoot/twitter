import React, { createContext, useContext, useState } from 'react'
import { Box, ChakraProvider, Container } from '@chakra-ui/react';

import { darkTheme, dimTheme, lightTheme } from '../theme/theme';
import globalStore, { globalStoreSelector } from '../store/globalStore';

export const ThemeContext = createContext(null);

const ThemeContextProvider = ({ children }) => {
    const [theme, changeTheme, accent, changeAccent, fontSize, changeFontSize] = globalStore(state => [state.theme, state.changeTheme, state.accent, state.changeAccent, state.fontSize, state.changeFontSize]);

    console.log('ThemeContext.jsx:12', theme);

    return (
        // <ThemeContext.Provider value={{
        //     theme,
        //     changeTheme, accent, changeAccent, fontSize, changeFontSize
        // }}>
            <ChakraProvider theme={theme === 'light' ? lightTheme : theme === 'dark' ? darkTheme : dimTheme}>
                <Container bg="main" color="secondary" maxWidth='full' width="-webkit-fill-available" height="-webkit-fill-available">
                    <Container maxW='7xl' fontSize={fontSize} colorScheme={accent}>
                        {
                            children
                        }
                    </Container>
                </Container>
            </ChakraProvider>
        // </ThemeContext.Provider>
    )
}

export default ThemeContextProvider;

export const useThemeContext = () => {
    return useContext(ThemeContext);
}