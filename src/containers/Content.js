import { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/global.state';

const Content = ({ children }) => {

    // Context
    const { getGlobalData } = useContext(GlobalContext);

    useEffect(() => {

        getGlobalData();

    }, []);

    return children;

};

export default Content;
