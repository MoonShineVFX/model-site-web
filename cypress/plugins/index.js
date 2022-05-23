require('dotenv').config();

module.exports = (on, config) => {

    // env
    config.env = config.env || {};
    config.env.host = process.env.NEXT_PUBLIC_HOST;
    config.env.locale = 'zh';

    // baseUrl
    config.baseUrl = `http://localhost:8080`;

    return config;

}
