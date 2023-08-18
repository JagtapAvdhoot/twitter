import { extendTheme } from '@chakra-ui/react';

const commonColors = {
    blue: "#1DA1F2",
    green: "#00BA7C",
    red: "#F91880",
    yellow:"rgb(255, 212, 0)",
    pink:"rgb(249, 24, 128)",
    purple:"rgb(120, 86, 255)",
    orange:"rgb(255, 122, 0)",
    default:"#fff",
    dim:"rgb(21, 32, 43)",
    light_out:'#14171A'
};
const dark = {
    colors: {
        main: "#14171A",
        secondary: "#F5F8FA",
        secondaryText: "#71767B",
        border: "rgba(101, 119, 134,0.5)",
        hover: "rgba(101, 119, 134,0.2)",
        ...commonColors
    }
};
const light = {
    colors: {
        secondaryText: "#536471",
        secondary: "#14171A",
        main: "#F5F8FA",
        border: "rgba(170, 184, 194,0.5)",
        hover: "rgba(225, 232, 237,0.5)",
        ...commonColors
    }
};
const dim = {
    colors: {
        main: "rgb(21, 32, 43)",
        secondary: "#F5F8FA",
        secondaryText: "#71767B",
        border: "rgba(101, 119, 134,0.5)",
        hover: "rgba(101, 119, 134,0.2)",
        ...commonColors
    }
};


export const darkTheme = extendTheme(dark);
export const lightTheme = extendTheme(light);
export const dimTheme = extendTheme(dim);