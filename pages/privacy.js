import React, { Fragment, useContext, useEffect } from 'react';
import { TitleLayout, SectionLayout } from '../src/components/member/cartLayout';
import HeadTag from '../src/containers/HeadTag';
import { GlobalContext } from '../src/context/global.state';
import util from '../src/utils/util';
import useDeftags from '../src/utils/useDeftags';

const Privacy = ({ pageData }) => {

    // Context
    const { globalDispatch } = useContext(GlobalContext);

    // Hook
    const [deftag] = useDeftags();

    useEffect(() => {

        globalDispatch({ type: 'sidenav', payload: false });
        globalDispatch({ type: 'target_box', payload: '' });

    }, []);

    return (

        <Fragment>
            <HeadTag title={deftag?.privacy_title} />
            <TitleLayout>{deftag?.privacy_title}</TitleLayout>

            <SectionLayout>
                <div dangerouslySetInnerHTML={{ __html: pageData.detail }} />
            </SectionLayout>
        </Fragment>

    );

};

export default Privacy;

export async function getServerSideProps ({ locale }) {

    const resData = await util.serviceServer({ url: `/privacy?lang=${locale}` });
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
