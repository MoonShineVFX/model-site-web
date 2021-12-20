import { useState } from 'react';
import Links, { ButtonLink } from '../Links';
import { MyProductItemLayout, ItemLayout } from './accountLayout';
import util from '../../utils/util';
import deftag from '../../utils/util.deftag';
import Service from '../../utils/util.service';

const { formatBytes, arrangeRenderOpts } = util;
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
        id, title, imgUrl, fileSize, formats,
    },
    selected,
    download,
    handleSelected,
}) => (

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
            <span className="file-size">{text_file_size} {formatBytes(fileSize)}</span>
        </div>
        <div className="downloadWrap">
            <div className="options" onClick={(e) => e.preventDefault()}>
                <select
                    name="formats"
                    onChange={(e) => handleSelected(e, id)}
                >
                    <option value="">{detail_option_format}</option>
                    {
                        formats.map(({ id, label }) => (

                            <option key={id} value={id}>{label}</option>

                        ))
                    }
                </select>

                <select
                    name="renderers"
                    onChange={(e) => handleSelected(e, id)}
                >
                    <option value="">{detail_option_renderer}</option>
                    {
                        // 有選取第一層才印第二層
                        arrangeRenderOpts(formats)[selected[id]?.formats]?.renderers.map((obj) => (

                            <option key={obj.id} value={obj.id}>{obj.label}</option>

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

//
const MyProduct = ({ data }) => {

    // console.log('data:', data)

    // State
    const [selected, setSelected] = useState({});
    const [download, setDownload] = useState('');

    // 軟體格式 + 算圖引擎
    const handleSelected = ({ target: { name, value } }, id) => {

        // 暫存
        const storage = {
            [id]: {
                ...selected[id],
                [name]: value,
            },
        };

        setSelected({ ...storage });

        if (name === 'renderers') {

            Service.donwloadLink({
                id,
                formats: +storage.formats,
                renderers: +storage.renderers,
            })
            .then(({ url }) => setDownload(url));

        }

    };

    return (

        <MyProductItemLayout>
            {
                data.map((obj) => (

                    <Item
                        key={obj.id}
                        data={obj}
                        selected={selected}
                        download={download}
                        handleSelected={handleSelected}
                    />

                ))
            }
        </MyProductItemLayout>

    );

};

export default MyProduct;
