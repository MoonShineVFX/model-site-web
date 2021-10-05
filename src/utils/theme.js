import { createTheme } from '@mui/material/styles';

const paper = {
    MuiPaper: {
        styleOverrides: {
            minHeight: '40px',
            borderRadius: '30px',
        },
    },
};

const button = {
    MuiButton: {
        styleOverrides: {
            root: {
                minHeight: '40px',
                fontSize: '0.9em',
                borderRadius: '30px',
            },
        },
    },
};

export default createTheme({
    spacing: 4,
    borderRadius: '30px',
    palette: {
        primary: {
            light: '#6281cc',
            main: '#45516e',
        },
        secondary: {
            main: '#FFF',
            dark: 'rgba(255,255,255,.6)',
            contrastText: '#000',
        },
        border: {
            light: '#FFF',
            main: '#A2A2A2',
            dark: '#707070',
        },
        textColor: '#FFF',
        priceColor: '#859acb',
        bgColor: '#1F2023',
        card: {
            light: '#45516e',
            main: '#2f3137',
        },
    },
    components: {
        ...paper,
        ...button,
    },
});
