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
                borderRadius: '30px',
            },
        },
    },
};

export default createTheme({
    spacing: 4,
    palette: {
        primary: {
            light: '#BCCCF2',
            main: '#859ACB',
            dark: '#45516E',
            contrastText: 'rgba(0,0,0,.7)',
        },
        secondary: {
            main: '#FFFFFF',
            dark: 'rgba(255,255,255,.6)',
            contrastText: '#000',
        },
        border: {
            light: '#FFF',
            main: '#A2A2A2',
            dark: '#707070',
        },
        bgColor: '#1F2023',
    },
    components: {
        ...paper,
        ...button,
    },
});
