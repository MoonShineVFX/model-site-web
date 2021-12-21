import { useContext, useEffect } from 'react';
import Cookie from 'js-cookie';
import { GlobalContext } from '../context/global.state';

const Content = ({ children }) => {

    // Context
    const { getGlobalData } = useContext(GlobalContext);

    useEffect(() => {

        if (!Cookie.get('token')) return;
        getGlobalData();

    }, []);

    return children;

};

export default Content;
