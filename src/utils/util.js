import axios from 'axios';
import dayjs from 'dayjs';

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

        // method, url 與環境設定
        const CONFIG = () => {

                let url = '';
                let method = 'get';
                // let method = 'post';

                if (typeof service === 'string') url = service;
                else {

                    url = service.url;
                    method = service.method;

                }

                return {
                    // url: `/api${url}`,
                    url: `/json${url}`,
                    method,
                };

            },
            showErrorMesg = (message, callback) => {

                console.log(message || '出了些狀況，請找研發');

            };

        // 回傳 promise
        return new Promise((resolve, reject) => {

            axios[CONFIG().method](CONFIG().url, reqData, { withCredentials: true, ...option })
                .then(
                    // result: 1
                    ({ data }) => {

                        // localhost 才有此情境
                        // if (!data.result && (process.env.NODE_ENV !== 'production')) {

                        //     reject(showErrorMesg('請先登入'));

                        // }

                        resolve(data.data);

                    },
                    // result: 0
                    ({ response }) => {

                        const {
                            // status,
                            data: { message },
                        } = response;

                        reject(showErrorMesg(message));

                        // reject(showErrorMesg(message, () => {

                        //     window.location = `/error`;

                        // }));

                    },
                )

        });

    },

    serviceServer: (url, reqData = {}) => {

        return axios.post(`http://localhost:1006/${url}`, reqData);

    },

    pathnameKey: (path) => path.split('/')[1] || 'index',

    /**
     * @author Betty
     * @param  {number} price - 金額
     * @param  {number} fixed - 位數
     * @returns {string}}
     */
    priceWithCommas: (price, fixed) => {

        let priceFormat = '';

        if (price == null) price = '';

        if (fixed != null && !isNaN(parseFloat(price)))
            price = parseFloat(price.toString().replace(/,/g, '')).toFixed(fixed);

        // 千分位處理
        priceFormat = Math.round(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        return (price < 0) ? `-$${priceFormat.replace(/-/g, '')}` : `NT$ ${priceFormat} 元`;

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
    dateFormat: (date) => dayjs(date).format('YYYY/MM/DD'),

    /**
     * @author Betty
     * @param {number} bytes
     * @return {number} - 小數兩位
     */
    formatBytes: (bytes, decimals = 2) => {

        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))}${sizes[i]}`;

    },

};

export default util;
