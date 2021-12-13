import React, {
    Fragment,
    useContext,
    useEffect,
    useState,
} from 'react';

import { Tabs, Tab } from '@mui/material';
import HeadTag from '../../src/containers/HeadTag';
import { TitleLayout } from '../../src/components/member/cartLayout';
import { TabWrapLayout, TabPanelLayout } from '../../src/components/member/accountLayout';

import OrderRecord from '../../src/components/member/OrderRecord';

import { GlobalContext } from '../../src/context/global.state';
import deftag from '../../src/utils/util.deftag';

const {
    member: {
        text_member_center,
        text_my_product,
        text_order_record,
        text_account_setting,
    },
} = deftag;

//
const TabPanel = ({ value, indexKey, children, ...other }) => (

    <div
        role="tabpanel"
        hidden={value !== indexKey}
        {...other}
    >
        {(value === indexKey) && children}
    </div>

);

//
const Account = ({ pageData }) => {

    // console.log('pageData:', pageData)

    // 所有 type
    const types = {
        product: {
            title: text_my_product,
            component: '我的模型庫',
        },
        order: {
            title: text_order_record,
            component: <OrderRecord data={pageData.orderRecord} />,
        },
        setting: {
            title: text_account_setting,
            component: '會員資料',
        },
    };

    // Context
    const { globalDispatch } = useContext(GlobalContext);

    // State
    const [type, setType] = useState('order');

    useEffect(() => {

        globalDispatch({ type: 'target_box', payload: '' });

    }, []);

    // Change TabMenu
    const handleChangeTabMenu = (e, newValue) => setType(newValue);

    return (

        <Fragment>
            <HeadTag title={`${text_member_center}-${types[type].title}`} />
            <TitleLayout>{text_member_center}</TitleLayout>

            <TabWrapLayout>
                <Tabs
                    className="tab-menu"
                    value={type}
                    onChange={handleChangeTabMenu}
                >
                    {
                        Object.keys(types).map((key) => (

                            <Tab
                                key={key}
                                value={key}
                                label={types[key].title}
                            />

                        ))
                    }
                </Tabs>

                <h1 className="second-title">{types[type].title}</h1>

                <TabPanelLayout className="tab-panel">
                    {
                        Object.keys(types).map((key) => (

                            <TabPanel
                                key={key}
                                value={key}
                                indexKey={type}
                            >
                                {types[type].component}
                            </TabPanel>

                        ))
                    }
                </TabPanelLayout>
            </TabWrapLayout>
        </Fragment>

    );

};

export default Account;

export async function getServerSideProps () {

    // const res = await util.serviceServer('/json/home/home.json');
    // const { data } = res;

    const res = await fetch('http://localhost:1006/json/member/account.json');
    const data = await res.json();

    if (!data.result) {

        return {
            notFound: true,
        };

    }

    return {
        props: {
            pageData: data.data,
        },
    };

};
