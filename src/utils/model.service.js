import model from './model';

const Service = {
    // common
    common: (reqData) => model.serviceProxy({
        url: '/common.json',
        method: 'get',
    }, reqData),

    // 商品
    productList: ({ page, type, tag }) => model.serviceProxy({
        method: 'get',
        url: `/product/list.json?page=${page}&type=${type}${tag ? `&tag=${tag}` : ''}`,
    }),

    userList: (reqData) => model.serviceProxy('/user/userList', reqData),
    updateAuthority: (reqData) => model.serviceProxy('/user/updateAuthority', reqData),
};

export default Service;
