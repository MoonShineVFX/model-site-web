import { Fragment, useContext, useState } from 'react';
import { Popover } from '@mui/material';
import {
    OrderRecordLayout,
    PopoverLayout,
} from '../member/accountLayout';
import util from '../../utils/util';
import deftag from '../../utils/util.deftag';
import { GlobalContext } from '../../context/global.state';

const { priceWithCommas, dateFormat } = util;
const {
    common: { text_item_unit },
    orderRecord,
} = deftag;

// 表格欄位樣板
const renderItemCell = ({
    className,
    data: { col1, col2, col3, col4, col5 },
    onClick,
}) => (

    <div className={`item-row ${className ? className : ''}`}>
        <span className="item-cell">{col1}</span>
        <span className="item-cell cell-160">{col2}</span>
        <span className="item-cell cell-160">{col3}</span>
        <span
            className="item-cell cell-name"
            onClick={onClick}
        >
            <span className="web-line-clamp">{col4}</span>
        </span>
        <span className="item-cell cell-160">{col5}</span>
    </div>

);

// 表格欄位資料
const Item = ({
    data: {
        orderNumber,
        date,
        name,
        price,
        status,
        totalItems,
    },
    onClick,
}) => (

    renderItemCell({
        data: {
            col1: orderNumber,
            col2: dateFormat(date),
            col3: orderRecord[`text_status_${status}`],
            col4: `${name} x ${totalItems} ${text_item_unit}`,
            col5: priceWithCommas(price),
        },
        onClick,
    })

);

//
const OrderRecord = ({ data }) => {

    // Context
    const {
        formStorageData,
        formStorageDispatch,
    } = useContext(GlobalContext);

    // State
    const [anchorEl, setAnchorEl] = useState(null);

    // 取得詳細品項
    const handleClickOrderName = ({ currentTarget }, { id, orderNumber }) => {

        setAnchorEl(currentTarget);
        formStorageDispatch({
            type: 'COLLECT',
            payload: { id, orderNumber },
        });

    };

    // 關閉 popover
    const handleClose = () => setAnchorEl(null);

    return (

        <Fragment>
            <OrderRecordLayout>
                {
                    renderItemCell({
                        className: 'row-head',
                        data: {
                            col1: orderRecord.text_order_number,
                            col2: orderRecord.text_order_date,
                            col3: orderRecord.text_order_status,
                            col4: orderRecord.text_order_name,
                            col5: orderRecord.text_order_total_price,
                        },
                    })
                }

                {
                    data.map((obj) => (

                        <Item
                            key={obj.id}
                            data={obj}
                            onClick={(e) => handleClickOrderName(e, obj)}
                        />

                    ))
                }
            </OrderRecordLayout>

            <PopoverLayout
                id={!!anchorEl ? 'simple-popover' : undefined}
                open={!!anchorEl}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
                {formStorageData.id} - {formStorageData.orderNumber}
            </PopoverLayout>
        </Fragment>

    );

};

export default OrderRecord;
