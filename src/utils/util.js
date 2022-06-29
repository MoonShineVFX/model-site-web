import axios from 'axios';
import router from 'next/router';
import dayjs from 'dayjs';
import Cookies from 'js-cookie';
import deftag from './util.deftag';

const { currency_tw } = deftag;

const util = {
    /**
     * @author Betty
     * @param  {object{} || string} service - 如果是字串，則為 service.url
     *   @param {string} service.url
     *   @param {string} [service.method = 'post']
     *   @param {string} [service.dataType = 'json']
     * @param  {object{}} reqData
     * @param  {object{}} option
     * @returns {promise}
     */
    serviceProxy: (service, reqData = {}, option) => {

        // 檢查物件或字串
        const condi = (typeof service === 'string');

        // method, url 與環境設定
        const showErrorMesg = (message, callback) => {

            alert(message || '出了些狀況');

        };

        // 回傳 promise
        return new Promise((resolve, reject) => {

            const authHeader = {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            };

            axios({
                baseURL: (process.env.NODE_ENV === 'development') ? `https://${process.env.HOST}/api` : '/api',
                url: service,
                method: 'post',
                ...condi && { data: reqData },
                ...service,
                ...option,
                ...(Cookies.get()?.token) && { ...authHeader },
            })
            .then(
                // result: 1
                ({ data }) => {

                    resolve(condi ? data.data : data);

                },
                // result: 0
                ({ response }) => {

                    const {
                        data: { errors },
                    } = response;

                    reject(showErrorMesg(
                        Object.keys(errors).map((key) => `${key}: ${errors[key]}`)
                    ));

                },
            );

        });

    },

    serviceServer: ({ method = 'post', url, headers }) => {

        return axios({
            baseURL: `https://${process.env.HOST}/api`,
            url,
            method,
            ...headers && { headers: { ...headers } }, // 有傳 headers 才送
        });

    },

    /**
     * @author Betty
     * @param  {number} price - 金額
     * @param  {number} fixed - 位數
     * @returns {string}}
     */
    priceWithCommas: (price, fixed) => {

        let priceFormat = '';

        if (price === null) price = '';

        if (fixed !== null && !isNaN(parseFloat(price)))
            price = parseFloat(price.toString().replace(/,/g, '')).toFixed(fixed);

        // 千分位處理
        priceFormat = Math.round(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        return (price < 0) ? `-$${priceFormat.replace(/-/g, '')}` : `${currency_tw}$ ${priceFormat}`;

    },

    /**
     * @author Betty
     * @param {string} value - 字串或元件
     * @return {string}
     */
    renderWithoutValue: (value) => value ? value : '--',

    /**
     * @author Betty
     * @param {object[]} tags - 標籤陣列
     * @return {object} - id 當 key
     */
    mappingTags: (tags) => tags.reduce((acc, { id, name }) => {

        acc[id] = name;
        return acc;

    }, {}),

    /**
     * @author Betty
     * @param {string} date - 時間
     * @return {string} - yyyy.mm.dd (dd)
     */
    dateFormat: (date) => date ? dayjs(date).format('YYYY/MM/DD HH:mm') : '--',

    /**
     * @author Betty
     * @param {number} bytes
     * @return {number} - 小數兩位
     */
    formatBytes: (bytes, decimals = 2) => {

        if (bytes === 0) return '0B';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['B', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}B`;

    },

    /**
     * @author Betty
     * @param {object[]} array
     * @return {object}
     */
    arrangeFormatAndRender: (array) => array.reduce((acc, curr) => {

        let { formatId, formatName, rendererId, rendererName, id } = curr;
        acc[formatId] = acc[formatId] || {};
        acc[formatId].id = id;
        acc[formatId].name = formatName;
        acc[formatId].renders = acc[formatId].renders || [];
        acc[formatId].renders.push({ rendererId, rendererName });
        return acc;

    }, {}),

    /**
     * @author Betty
     * @param {string} url
     * @param {boolean} isRefresh 是否重刷頁面
     */
    redirectTo: (url = '/', isRefresh = true) => {

        router.push(url, router.asPath, { locale: router.locale });
        if (isRefresh) router.reload();

    },

};

export default util;
