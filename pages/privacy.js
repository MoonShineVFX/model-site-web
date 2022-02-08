import React, { Fragment, useContext, useEffect } from 'react';
import HeadTag from '../src/containers/HeadTag';
import { TitleLayout, SectionLayout } from '../src/components/member/cartLayout';
import { GlobalContext } from '../src/context/global.state';
import util from '../src/utils/util';
import deftag from '../src/utils/util.deftag';

const {
    privacy: { page_title },
} = deftag;

//
const Privacy = ({ pageData }) => {

    // Context
    const { globalDispatch } = useContext(GlobalContext);

    useEffect(() => {

        globalDispatch({ type: 'target_box', payload: '' });

    }, []);

    return (

        <Fragment>
            <HeadTag title={page_title} />
            <TitleLayout>{page_title}</TitleLayout>

            <SectionLayout>
                <div dangerouslySetInnerHTML={{ __html: pageData.detail }} />
            </SectionLayout>
        </Fragment>

    );

};

export default Privacy;

export async function getServerSideProps () {

    const resData = await util.serviceServer({ url: '/privacy' });
    const { data } = resData;

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
