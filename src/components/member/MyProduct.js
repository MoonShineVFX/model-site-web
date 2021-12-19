import { useContext, useState } from 'react';

import Item from '../Item';
import Buttons from '../Buttons';
import { MyProductItemLayout } from './accountLayout';

import { GlobalContext } from '../../context/global.state';
import util from '../../utils/util';
import deftag from '../../utils/util.deftag';
import Service from '../../utils/util.service';

const {
    product: {
        text_download,
        detail_option_format,
        detail_option_renderer,
    },
} = deftag;

//
const MyProduct = ({ data }) => {

    console.log('data:', data)

    // 下拉選單
    const handleChangeOpt = (e, type = 'format') => {

        e.stopPropagation();
        console.log('e:', e.target);
        console.log('type:', type);

    };

    // 下載按鈕
    const handleDownload = (e) => {

        e.preventDefault();
        console.log('download btn');

    };

    return (

        <MyProductItemLayout>
            {
                data.map((obj) => (

                    <Item
                        key={obj.id}
                        type="product"
                        url={`/product/${obj.id}`}
                        width="264"
                        height="153"
                        data={obj}
                        newPage
                    >
                        <div className="downloadWrap">
                            <div className="options">
                                <select
                                    name="formats"
                                    onChange={handleChangeOpt}
                                >
                                    <option value="">{detail_option_format}</option>
                                    {obj.formats.map(({ id, label, renderers }) => (

                                        <option key={id} value={id}>{label}</option>

                                    ))}
                                </select>

                                <select
                                    name="renderers"
                                    onChange={(e) => handleChangeOpt(e, 'render')}
                                >
                                    <option value="">{detail_option_renderer}</option>
                                </select>
                            </div>

                            <Buttons
                                // disabled
                                text={text_download}
                                onClick={handleDownload}
                            />
                        </div>
                    </Item>

                ))
            }
        </MyProductItemLayout>

    );

};

export default MyProduct;
