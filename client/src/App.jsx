import { BrowserRouter } from "react-router-dom";

import EntryApp from "./common/components/EntryApp/EntryApp";
import ThemeContextProvider from "./context/ThemeContext";
import { Container } from "@chakra-ui/react";
import WindowSizeContextProvider from "./context/WindowSizeContext";

// TODO: use chakra ui in sidebar files

function App() {
    return (
        <>
            <ThemeContextProvider>
                <WindowSizeContextProvider>
                    <BrowserRouter>
                        <EntryApp />
                    </BrowserRouter>
                </WindowSizeContextProvider>
            </ThemeContextProvider>
        </>
    );
}

export default App;
