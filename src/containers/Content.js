import { useContext } from 'react';
import { GlobalContext } from '../context/global.state';;

const Content = ({ children }) => {

    // Context
    const {
        page,
    } = useContext(GlobalContext);

    return children;

};

export default Content;
