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
                fontSize: '1em',
                borderRadius: '30px',
            },
        },
    },
};

export default createTheme({
    lineClamp: (line = 2) => line,
    spacing: 4,
    borderRadius: '30px',
    palette: {
        primary: {
            light: '#efc266',
            main: '#e39800',
            contrastText: '#2f3031',
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
        bgColor: '#1F2023',
        card: {
            light: '#454547',
            main: '#2f3031',
        },
    },
    components: {
        ...paper,
        ...button,
    },
});
