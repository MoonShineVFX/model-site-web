import {
    Fragment,
    useContext,
    useEffect,
    useState,
} from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import {
    List,
    ListItemText,
    ListItemIcon,
} from '@mui/material';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { GlobalContext } from '../../context/global.state';
import useQuery from '../../utils/useQuery';

// dynamic
const FontIcon = dynamic(() => import('../FontIcon'), { ssr: false });
const ListTitleLayout = dynamic(() =>
    import('./productLayout').then((mod) => mod.ListTitleLayout)
);
const ListItemLayout = dynamic(() =>
    import('./productLayout').then((mod) => mod.ListItemLayout)
);

// 整理 URL 標籤格式
const arrangeTags = (string) => {

    let data = string.split(',');
    return data.reduce((acc, curr) => {

        acc[curr] = true;
        return acc;

    }, {});

};

const Category = () => {

    // Router
    const router = useRouter();
    const query = useQuery();

    // Context
    const {
        deftags,
        tags: tagsOpt,
    } = useContext(GlobalContext);

    // State
    const [selectedTag, setSelectedTag] = useState({});

    useEffect(() => {

        // 沒有 tag 也不要丟空值
        if (query.tags) setSelectedTag(arrangeTags(query.tags));

    });

    // 選擇標籤
    const handleSelectedTag = (id) => {

        // 另外用物件暫存選取行為，若丟到 state 會有非同步問題
        let obj = {};
        obj = {
            ...selectedTag,
            [id]: !selectedTag[id],
        };

        let param = (Object.keys(obj).some((id) => obj[id])) ? { ...query, tags: Object.keys(obj).filter((key) => obj[key]).join(',') } : { page: query.page };

        setSelectedTag(obj);
        router.push({
            pathname: router.pathname,
            query: { ...param },
        });

    };

    return  (

        <Fragment>
            <ListTitleLayout>{deftags.product_select_label}</ListTitleLayout>
            <List>
                {
                    tagsOpt.map(({ id, name }) => (

                        <ListItemLayout
                            key={id}
                            selected={selectedTag[id]}
                            onClick={() => handleSelectedTag(id)}
                            component="li"
                        >
                            <ListItemText>{name}</ListItemText>

                            {
                                selectedTag[id] &&
                                    <ListItemIcon className="checked">
                                        <FontIcon icon={faCheck} />
                                    </ListItemIcon>
                            }
                        </ListItemLayout>

                    ))
                }
            </List>
        </Fragment>

    );

};

export default Category;
