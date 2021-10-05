import React, { Fragment, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { styled } from '@mui/system';
import {
    GlobalStyles,
    Grid,
    List,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    Tabs,
    Tab,
} from '@mui/material';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import HeadTag from '../../containers/HeadTag';
import FontIcon from '../../components/FontIcon';

import { GlobalContext } from '../../context/global.state';
import util from '../../utils/model';

const { priceWithCommas } = util;

const styles = {};

const GridLayout = styled(Grid)(({ theme }) => ({
    paddingTop: '60px',
    '.MuiGrid-root': {
        '&.productList': {
            paddingTop: 0,
        },
        '&.tagsList': {
            paddingTop: '118px',
        },
    },
    '.productList': {
        '.MuiButtonBase-root': {
            fontSize: '1em',
            color: theme.palette.textColor,
            opacity: 0.6,
            '&:hover': {
                opacity: 1,
            },
        },
        '.Mui-selected': {
            opacity: 1,
        },
        '.MuiTabs-indicator': {
            backgroundColor: 'transparent',
        },
    },
    '.tab-menu': {
        marginBottom: '70px',
        '.MuiTabs-flexContainer': {
            justifyContent: 'center',
        },
    },
    '.tab-panel': {
        // border: '1px solid'
    },
}))

const ListTitleLayout = styled('h5')(({ theme }) => ({
    fontSize: '0.9em',
    margin: 0,
    '&:after': {
        content: '""',
        display: 'block',
        width: '100%',
        height: '1px',
        backgroundColor: theme.palette.textColor,
        marginTop: '12px',
        marginBottom: '12px',
        opacity: 0.16,
    },
}));

const ListItemLayout = styled(ListItemButton)(({ theme }) => ({
    marginBottom: '10px',
    '&.Mui-selected': {
        backgroundColor: theme.palette.primary.main,
        borderRadius: '3px',
    },
    '&:hover&.Mui-selected': {
        backgroundColor: theme.palette.primary.main,
        opacity: 0.8,
    },
    '.MuiListItemText-root': {
        margin: 0,
    },
    'span': {
        fontSize: '0.9em',
    },
    '.checked': {
        minWidth: 'auto',
        color: theme.palette.textColor,
    },
}));

//
const TabPanel = ({ value, index, children, ...other }) => (

    <div
        role="tabpanel"
        hidden={value !== index}
        {...other}
    >
        {(value === index) && children}
    </div>

);

const ProductBase = ({ pageData }) => {

    // console.log('pageData:', pageData);

    // Style
    const productStyle = <GlobalStyles styles={styles} />;

    // Router
    const router = useRouter();
    console.log('query:', router.query)

    // Context
    const { tag } = useContext(GlobalContext);

    // State
    const [value, setValue] = useState(0);

    //
    const handleSelectedTag = (id) => {

        console.log('id:', id);

    };

    // Change TabMenu
    const handleChangeTabMenu = (e, newValue) => setValue(newValue);

    // Click TabMenu
    const handleClickTabMenu = (key) => {

        console.log('key:', key);
        router.push({
            pathname: '/product/list',
            query: {
                ...router.query,
                type: key,
            },
        })

    };

    return (

        <Fragment>
            {/* {productStyle} */}
            <HeadTag title={pageData.title} />

            <GridLayout
                container
                spacing={7}
                component="section"
                className="page-product"
            >
                <Grid
                    item
                    xs={2}
                    component="aside"
                    className="tagsList"
                >
                    <ListTitleLayout>標籤篩選</ListTitleLayout>

                    <List>
                        {
                            tag.map(({ id, name }, idx) => (

                                <ListItemLayout
                                    key={id}
                                    selected={idx === 0}
                                    onClick={() => handleSelectedTag(id)}
                                    component="li"
                                >
                                    <ListItemText>{name}</ListItemText>

                                    <ListItemIcon className="checked">
                                        <FontIcon icon={faCheck} />
                                    </ListItemIcon>
                                </ListItemLayout>

                            ))
                        }
                    </List>
                </Grid>

                <Grid
                    item
                    xs
                    component="figure"
                    className="productList"
                >
                    <Tabs
                        aria-label="商品分類"
                        className="tab-menu"
                        value={value}
                        onChange={handleChangeTabMenu}
                    >
                        {
                            Object.keys(pageData.data.category).map((key, idx) => (

                                <Tab
                                    key={key}
                                    label={pageData.data.category[key]}
                                    onClick={() => handleClickTabMenu(key)}
                                />

                            ))
                        }
                    </Tabs>

                    <div className="tab-panel">
                        {
                            Object.keys(pageData.data.category).map((key, idx) => (

                                <TabPanel
                                    key={key}
                                    value={value}
                                    index={idx}
                                >
                                    product-{key}
                                </TabPanel>

                            ))
                        }
                    </div>
                </Grid>
            </GridLayout>
        </Fragment>

    );

};

export default ProductBase;
