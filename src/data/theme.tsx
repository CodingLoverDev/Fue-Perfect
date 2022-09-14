import { theme as chakraTheme } from '@chakra-ui/react';

const theme = {
    ...chakraTheme,
    colors: {
        ...chakraTheme.colors,
        brand: {
            50: '#e3f6fc',
            100: '#b7e8f7',
            200: '#8ad9f3',
            300: '#62caee',
            400: '#47bfec',
            500: '#36b3ea',
            600: '#2fa5dc',
            700: '#2792c9',
            800: '#2481b5',
            900: '#1a6193'
        }
    },
    config: {
        initialColorMode: 'dark',
        useSystemColorMode: true
    }
};

export default theme;
