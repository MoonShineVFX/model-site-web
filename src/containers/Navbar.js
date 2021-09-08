import { useContext } from 'react';
import Link from 'next/link';
import { styled } from '@mui/system';
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';

import {
    ShoppingBasket as ShoppingBasketIcon,
    History as HistoryIcon,
    Store as StoreIcon,
    PersonAdd as PersonAddIcon,
} from '@mui/icons-material';

import { GlobalContext } from '../context/global.state';

// Navbar
const navbarItems = [
    {
        key: 'index',
        icon: <ShoppingBasketIcon />,
        text: '我的訂單',
        isAdmin: false,
    },
    {
        key: 'orders',
        icon: <HistoryIcon />,
        text: '歷史訂單',
        isAdmin: false,
    },
    {
        key: 'stores',
        icon: <StoreIcon />,
        text: '店家資訊',
        isAdmin: true,
    },
    {
        key: 'users',
        icon: <PersonAddIcon />,
        text: '變更使用者權限',
        isAdmin: true,
    },
];

const ListWrap = styled(List)(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '4px',
    flex: '0 0 260px',
    marginRight: '20px',
    padding: '12px 0',
}));

const ListItemBase = styled(ListItem)(({ theme }) => ({
    padding: 0,
    // '&:not(:last-child)': {
    //     marginBottom: '10px',
    // },
    '&.isActive': {
        position: 'relative',
        backgroundColor: theme.palette.action.selected,
    },
    '&.isActive:before': {
        content: '""',
        width: '5px',
        height: '100%',
        backgroundColor: theme.palette.primary.light,
        position: 'absolute',
    },
    '& .MuiListItemIcon-root': {
        minWidth: '40px',
    },
    '& a': {
        width: '100%',
        color: theme.palette.text.primary,
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(1, 3),
    }
}));

//
const Navbar = () => {

    // Context
    const { page } = useContext(GlobalContext);

    return (

        <ListWrap>
            {
                navbarItems.map(({ key, text, icon, isAdmin }) => (

                    <ListItemBase
                        key={key}
                        button
                        className={(key === page) ? 'isActive' : ''}
                    >
                        <Link href={`/${key}`}>
                            <a href={`/${key}`}>
                                <ListItemIcon>{icon}</ListItemIcon>
                                <ListItemText primary={text} />
                            </a>
                        </Link>
                    </ListItemBase>

                ))
            }
        </ListWrap>

    );

};

export default Navbar;
