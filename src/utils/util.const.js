import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const utilConst = {
    // 密碼 show/hide 設定
    paswdConfig: {
        false: {
            type: 'password',
            icon: faEyeSlash,
        },
        true: {
            type: 'text',
            icon: faEye,
        }
    },

    // 語系
    langs: [
        'zh',
        'en',
        // 'cn',
        // 'jp',
    ],
};

export default utilConst;
