import { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/global.state';
import useLocalStorage from '../utils/useLocalStorage';
import Service from '../utils/util.service';

const Content = ({ children }) => {

    const [langList, setLangList] = useLocalStorage('langList');

    // Context
    const { deftags, getGlobalData, globalDispatch } = useContext(GlobalContext);

    useEffect(() => {

        getGlobalData();

        // state 僅第一次有效，因此從 localStorage 取
        if (!Object.keys(deftags).length) {

            globalDispatch({
                type: 'lang_list',
                payload: langList,
            });

        }

        if (!!langList) return;
        Service.deftagList()
            .then((resData) => {

                globalDispatch({
                    type: 'lang_list',
                    payload: resData,
                });

                setLangList(resData);

            });

    }, []);

    return children;

};

export default Content;
