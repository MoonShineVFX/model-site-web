import { useState } from 'react';
import Links, { ButtonLink } from '../Links';
import { MyProductItemLayout, ItemLayout } from './accountLayout';
import util from '../../utils/util';
import deftag from '../../utils/util.deftag';
import Service from '../../utils/util.service';

const { formatBytes, arrangeFormatAndRender } = util;
const {
    product: {
        text_file_size,
        text_download,
        detail_option_format,
        detail_option_renderer,
    },
} = deftag;

// 項目
const Item = ({
    data: {
        id,
        title,
        imgUrl,
        fileSize,
        models,
    },
}) => {

    const options = arrangeFormatAndRender(models);

    // State
    const [format, setFormat] = useState('');
    const [selected, setSelected] = useState({});
    const [download, setDownload] = useState('');

    // 軟體格式 + 算圖引擎
    const handleSelected = ({ target: { name, value } }, id) => {

        // 暫存給畫面用
        const storage = {
            [id]: {
                ...selected[id],
                [name]: +value,
            },
        };

        setSelected({ ...storage });
        if (name === 'formats') {

            setFormat(value);
            storage[id].renderers = 0;

        }

        if (name === 'renderers') {

            Service.donwloadLink({
                id,
                formats: storage[id].formats,
                renderers: storage[id].renderers,
            })
            .then(({ url }) => setDownload(url));

        }

    };

    return (

        <ItemLayout>
            <Links
                url={`/product/${id}`}
                title={title}
                className="item-thumb"
                newPage
            >
                <img
                    src={imgUrl}
                    alt={title}
                    title={title}
                    width="264"
                    height="153"
                />
            </Links>
            <div className="item-content">
                <h3 className="title">{title}</h3>
                <span className="file-size">{text_file_size}: {formatBytes(fileSize)}</span>
            </div>
            <div className="downloadWrap">
                <div className="options" onClick={(e) => e.preventDefault()}>
                    <select
                        name="formats"
                        onChange={(e) => handleSelected(e, id)}
                    >
                        <option value="">{detail_option_format}</option>
                        {
                            Object.keys(options).map((id) => (

                                <option
                                    key={id}
                                    value={id}
                                >
                                    {options[id].name}
                                </option>

                            ))
                        }
                    </select>

                    <select
                        name="renderers"
                        onChange={(e) => handleSelected(e, id)}
                        value={selected[id]?.renderers}
                    >
                        <option value="">{detail_option_renderer}</option>
                        {
                            options[format]?.renders.map(({ rendererId, rendererName }) => (

                                <option key={rendererId} value={rendererId}>{rendererName}</option>

                            ))
                        }
                    </select>
                </div>

                <ButtonLink
                    url={selected[id]?.renderers ? download : ''}
                    text={text_download}
                    className={`btn-download ${selected[id]?.renderers ? '' : 'disabled'}`}
                    newPage
                />
            </div>
        </ItemLayout>

    );

};

//
const MyProduct = ({ data }) => (

    <MyProductItemLayout>
        {
            data.map((obj) => (

                <Item
                    key={obj.id}
                    data={obj}
                />

            ))
        }
    </MyProductItemLayout>

);

export default MyProduct;
