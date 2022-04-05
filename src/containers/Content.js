import { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/global.state';

const Content = ({ langs, children }) => {

    // Context
    const { getGlobalData, globalDispatch } = useContext(GlobalContext);

    useEffect(() => {

        getGlobalData();
        globalDispatch({ type: 'lang_list', payload: langs });

    }, []);

    return children;

};

export default Content;
