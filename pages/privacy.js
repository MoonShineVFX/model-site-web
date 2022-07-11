import { Fragment, useContext, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Head from '../src/containers/Head';
import { GlobalContext } from '../src/context/global.state';
import util from '../src/utils/util';

// dynamic
const TitleLayout = dynamic(() =>
    import('../src/components/cart/cartLayout').then((mod) => mod.TitleLayout)
);
const SectionLayout = dynamic(() =>
    import('../src/components/cart/cartLayout').then((mod) => mod.SectionLayout)
);

const Privacy = ({ langs, pageData }) => {

    // Context
    const { globalDispatch } = useContext(GlobalContext);

    useEffect(() => {

        globalDispatch({ type: 'sidenav', payload: false });
        globalDispatch({ type: 'target_box', payload: '' });

    }, []);

    return (

        <Fragment>
            <Head
                title={langs.privacy_title}
                description={langs.og_description}
            />
            <TitleLayout>{langs.privacy_title}</TitleLayout>

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

}
