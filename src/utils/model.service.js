import util from './model';

const Service = {
    // common
    common: (reqData) => util.serviceProxy({
        url: '/common.json',
        method: 'get',
    }, reqData),

    storeList: (reqData) => util.serviceProxy('/store/storeList', reqData),
    userList: (reqData) => util.serviceProxy('/user/userList', reqData),
    updateAuthority: (reqData) => util.serviceProxy('/user/updateAuthority', reqData),
};

export default Service;
