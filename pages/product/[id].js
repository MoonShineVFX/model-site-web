import { Fragment, useContext, useEffect } from 'react';
import { Grid } from '@mui/material';
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';

import HeadTag from '../../src/containers/HeadTag';
import FontIcon from '../../src/components/FontIcon';
import SectionTitle from '../../src/components/SectionTitle';

import { NewsItemWrapLayout } from '../../src/components/home/homeLayout';
import {
    TagsLayout,
    DetailHeaderLayout,
    MainContentLayout,
    OtherNewsWrapLayout,
    ShowMoreButtonLayout,
} from '../../src/components/news/newsLayout';

import { GlobalContext } from '../../src/context/global.state';
import util from '../../src/utils/util';

// 社群 icon
const socials = [faFacebook, faInstagram, faLink];

// 時間格式
const dateFormat = (date) => dayjs(date).format('YYYY.MM.DD (dd)');

// 對應標籤文字
const mappingTags = (tags) => tags.reduce((acc, { id, name }) => {

    acc[id] = name;
    return acc;

}, {});

// 其他新聞 next/prev
const Item = ({
    data: { id, title, createTime },
}) => (

    <Grid item xs={12} md={6}>
        <NewsItemWrapLayout
            url={`/news/${id}`}
            className="item"
        >
            <h2 className="title">{title}</h2>
            <div className="date">
                <span>{dateFormat(createTime)}</span>
            </div>
        </NewsItemWrapLayout>
    </Grid>

);

//
const NewsDetail = ({ pageData }) => {

    // console.log('pageData:', pageData);
    const {
        title,
        detail,
        categoryKey,
        categoryName,
        ownTags,
        createTime,
        updateTime,
        otherNews,
        tags,
    } = pageData.data;

    // Context
    const { menu, globalDispatch } = useContext(GlobalContext);

    useEffect(() => {

        globalDispatch({
            type: 'menu',
            payload: {
                ...menu,
                level1: pageData.title,
                level2: categoryName,
                level1Link: `/news?page=1&cate=${categoryKey}`,
            },
        });

    }, []);

    return (

        <Fragment>
            <HeadTag title={`${categoryName}-${title}`} />

            <DetailHeaderLayout>
                <TagsLayout className="detail-tags web-clear-box">
                    {ownTags.map((id) => <span key={id}>{mappingTags(tags)[id]}</span>)}
                </TagsLayout>
                <h1 className="title">{title}</h1>

                <Grid container>
                    <Grid item xs={12} md={6}>
                        {dateFormat(createTime)}
                        {updateTime && <span className="update-time">，更新於 {dateFormat(updateTime)}</span>}
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        md={6}
                        className="info-socials"
                    >
                        {
                            socials.map((icon, idx) => (

                                <span key={idx}>
                                    <FontIcon icon={icon} />
                                </span>

                            ))
                        }
                    </Grid>
                </Grid>
            </DetailHeaderLayout>

            <MainContentLayout>
                <div dangerouslySetInnerHTML={{__html: detail}} />
            </MainContentLayout>

            <OtherNewsWrapLayout>
                <SectionTitle
                    primaryText="其他快訊"
                    secondaryText="More News"
                />

                <Grid container spacing={5}>
                    {otherNews.map((data) => <Item key={data.id} data={data} />)}
                </Grid>
            </OtherNewsWrapLayout>

            <ShowMoreButtonLayout url={`/news?page=1&cate=${categoryKey}`} />
        </Fragment>

    );

};

export default NewsDetail;

export async function getStaticPaths () {

    // const res = await admin.serviceServer({ url: '/news' });
    // const { data } = res;

    const res = await fetch('http://localhost:1001/json/news.json');
    const data = await res.json();
    const paths = data.data.list.map((obj) => ({
        params: { id: String(obj.id) },
    }));

    return { paths, fallback: false };

}

export async function getStaticProps ({ params }) {

    // const res = await admin.serviceServer({
    //     method: 'get',
    //     url: `/news/${params.id}`,
    // });

    // const { data } = res;

    const res = await fetch('http://localhost:1001/json/news/4891321.json');
    const data = await res.json();

    if (!data.result) {

        return {
            notFound: true,
        };

    }

    return {
        props: {
            revalidate: 30,
            pageData: {
                title: '最新消息',
                data: data.data,
            },
        },
    };

}
