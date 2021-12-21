import { Fragment, useContext, useState } from 'react';
import Links from '../Links';
import {
    OrderRecordLayout,
    PopoverLayout,
} from '../member/accountLayout';

import { GlobalContext } from '../../context/global.state';
import util from '../../utils/util';
import deftag from '../../utils/util.deftag';
import Service from '../../utils/util.service';

const { priceWithCommas, dateFormat } = util;
const {
    common: { text_item_unit },
    orderRecord,
} = deftag;

// 表格欄位樣板
const renderItemCell = ({
    className,
    data: {
        number,
        date,
        status,
        quantity,
        price,
        payment,
        invoice,
    },
    onClick,
}) => (

    <div className={`item-row ${className ? className : ''}`}>
        <span
            className="item-cell cell-orderNumber"
            onClick={onClick}
        >
            {number}
        </span>
        <span className="item-cell cell-140">{date}</span>
        <span className="item-cell cell-80">{quantity}</span>
        <span className="item-cell cell-140">{price}</span>
        <span className="item-cell cell-140">{status}</span>
        <span className="item-cell cell-140">{payment}</span>
        <span className="item-cell cell-140">{invoice}</span>
    </div>

);

// 表格欄位資料
const Item = ({
    data: {
        orderNumber,
        date,
        price,
        status,
        totalItems,
        payment,
        invoice,
    },
    onClick,
}) => (

    renderItemCell({
        data: {
            number: orderNumber,
            date: dateFormat(date),
            status: orderRecord[`text_status_${status}`],
            quantity: `${totalItems}${text_item_unit}`,
            price: priceWithCommas(price),
            payment: orderRecord[`text_payment_${payment}`],
            invoice,
        },
        onClick,
    })

);

//
const OrderRecord = ({ data }) => {

    // Context
    const {
        globalDispatch,
    } = useContext(GlobalContext);

    // State
    const [items, setItems] = useState([]);

    // 取得詳細品項
    const handleItems = ({ currentTarget }, { id, orderNumber }) => {

        Service.orderItems({ id })
            .then(({ list }) => {

                globalDispatch({ type: 'target_popup', payload: currentTarget });
                setItems(list);

            });

    };

    return (

        <Fragment>
            <OrderRecordLayout>
                {
                    renderItemCell({
                        className: 'row-head',
                        data: {
                            number: orderRecord.text_order_number,
                            date: orderRecord.text_order_date,
                            status: orderRecord.text_order_status,
                            quantity: orderRecord.text_order_quantity,
                            price: orderRecord.text_order_total_price,
                            payment: orderRecord.text_order_payment,
                            invoice: orderRecord.text_order_invoice,
                        },
                    })
                }

                {
                    data.map((obj) => (

                        <Item
                            key={obj.id}
                            data={obj}
                            onClick={(e) => handleItems(e, obj)}
                        />

                    ))
                }
            </OrderRecordLayout>

            <PopoverLayout>
                {
                    items.map(({ id, title, price }) => (

                        <Links
                            key={id}
                            url={`/product/${id}`}
                            title={title}
                            className="item"
                        >
                            <span className="title">{title}</span>
                            <span className="price">{priceWithCommas(price)}</span>
                        </Links>

                    ))
                }
            </PopoverLayout>
        </Fragment>

    );

};

export default OrderRecord;

/**
 * flex table
 * https://designlink.work/flex-table/
 */