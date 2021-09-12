import React, { Fragment, useContext, useEffect, useState } from 'react';
import { styled } from '@mui/system';

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

const SlideshowWrap = styled('div')(({ theme }) => ({
    '.inner': {
        maxHeight: '420px',
        display: 'flex',
        '> *': {
            flex: 1,
        },
    },
}));

const SlideshowInfo = styled('div')(({ theme }) => ({
    backgroundColor: '#2F3137',
    padding: '40px',
    position: 'relative',
    'h1': {
        fontSize: '2.1em',
        margin: '0 0 8px',
    },
    '.price': {
        fontSize: '1.4em',
        color: theme.palette.primary.main,
    },
    '.status': {
        fontSize: '1.4em',
        border: `1px solid ${theme.palette.border.light}`,
        borderRadius: theme.borderRadius,
        padding: '12px 80px',
        position: 'absolute',
        bottom: '60px',
    },
}));

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

    // State
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
                    pageData.banner.map(({
                        id,
                        title,
                        price,
                        imgUrl,
                        status,
                    }, idx) => (

                        <SlideshowWrap
                            key={id}
                            className={(idx === active) ? 'active' : 'hide'}
                        >
                            <div className="inner">
                                <Links
                                    url="login"
                                    target="_blank"
                                >
                                    <img src={imgUrl} alt={title} />
                                </Links>

                                <SlideshowInfo>
                                    <h1>{title}</h1>
                                    <div className="price">NT$ {price} 元</div>
                                    <span className="Model-x-align status">{status}</span>
                                </SlideshowInfo>
                            </div>
                        </SlideshowWrap>

                    ))
                }
            </Slideshow>
        </Fragment>

    );

};

export default Home;
