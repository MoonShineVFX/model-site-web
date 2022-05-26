require('dotenv').config();

module.exports = (on, config) => {

    // env
    config.env = config.env || {};
    config.env.api_host = process.env.NEXT_PUBLIC_HOST;
    config.env.locale = 'zh';

    return config;

}
