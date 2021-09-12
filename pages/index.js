import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import util from '../src/utils/model';

import { Links } from '../src/components/Links';
import Slideshow from '../src/components/Slideshow';

export async function getStaticProps () {

    // const res = await util.serviceServer('/json/home/home.json');
    // const { data } = res;

    const res = await fetch('http://localhost:1006/json/home/home.json');
    const data = await res.json();

    if (!data.result) {

        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };

    }

    return {
        props: { pageData: data.data },
    };

};

const Home = ({ pageData }) => {

    // console.log('pageData:', pageData);

    // Context
    // const { globalDispatch } = useContext(GlobalContext);
    // const { pathname } = useRouter();

    // useEffect(() => {

    //     globalDispatch({
    //         type: 'PAGE',
    //         payload: util.pathnameKey(pathname),
    //     });

    // }, [globalDispatch, pathname]);

    const [active, setActive] = useState(0);

    // 左箭頭
    const handleArrowLeft = () => {

        setActive(active - 1 < 0 ? pageData.banner.length - 1 : active - 1);

    };

    // 右箭頭
    const handleArrowRight = () => {

        setActive(active + 1 >= pageData.banner.length ? 0 : active + 1);

    };

    return (

        <Fragment>
            <Slideshow
                active={active}
                data={pageData.banner}
                handleArrowLeft={handleArrowLeft}
                handleArrowRight={handleArrowRight}
            >
                {
                    pageData.banner.map(({ id, title, imgUrl }, idx) => (

                        <Links
                            key={id}
                            url="login"
                            target="_blank"
                            className={(idx === active) ? 'active' : 'hide'}
                        >
                            <span style={{ position: 'absolute' }}>{title}</span>
                            <img src={imgUrl} alt={title} />
                        </Links>

                    ))
                }
            </Slideshow>
        </Fragment>

    );

};

export default Home;
