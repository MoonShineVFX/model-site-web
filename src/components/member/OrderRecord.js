import { useMediaQuery, Grid } from '@mui/material';
import { OrderRecordLayout, OrderRecordGridLayout } from '../order/orderLayout';
import Links from '../Links';
import util from '../../utils/util';
import deftag from '../../utils/util.deftag';

const { priceWithCommas, dateFormat, renderWithoutValue } = util;
const {
    common: { text_item_unit },
    orderRecord,
} = deftag;

// 表格欄位樣板
const renderItemCell = ({
    className,
    data: {
        number,
        createAt,
        status,
        quantity,
        price,
        payment,
        paidAt,
        invoice,
    },
}) => (

    <div className={`item-row ${className ? className : ''}`}>
        <span className="item-cell">
            {
                className ? number :
                    <Links
                        url={`/order/${number}`}
                        className="orderNumber"
                        newPage
                    >
                        {number}
                    </Links>
            }
        </span>
        <span className="item-cell cell-160">{createAt}</span>
        <span className="item-cell cell-80">{quantity}</span>
        <span className="item-cell cell-140">{price}</span>
        <span className="item-cell cell-140">{status}</span>
        <span className="item-cell cell-140">{renderWithoutValue(payment)}</span>
        <span className="item-cell cell-160">{paidAt}</span>
        <span className="item-cell cell-140 invoice">{renderWithoutValue(invoice)}</span>
    </div>

);

// 表格欄位資料
const Item = ({
    data: {
        orderNumber,
        createdAt,
        price,
        status,
        totalItems,
        paidBy,
        paidAt,
        invoice,
    },
}) => (

    renderItemCell({
        data: {
            number: orderNumber,
            createAt: dateFormat(createdAt),
            status: orderRecord[`text_status_${status}`],
            quantity: `${totalItems}${text_item_unit}`,
            price: priceWithCommas(price),
            payment: orderRecord[`text_payment_${paidBy}`],
            paidAt: dateFormat(paidAt),
            invoice,
        },
    })

);

// Web
const withTable = (data) => (

    <OrderRecordLayout>
        {
            renderItemCell({
                className: 'row-head',
                data: {
                    number: orderRecord.text_order_number,
                    createAt: orderRecord.text_order_create_at,
                    status: orderRecord.text_order_status,
                    quantity: orderRecord.text_order_quantity,
                    price: orderRecord.text_order_total_price,
                    payment: orderRecord.text_order_payment,
                    paidAt: orderRecord.text_order_paid_at,
                    invoice: orderRecord.text_order_invoice,
                },
            })
        }

        {
            data.map((obj) => (

                <Item
                    key={obj.id}
                    data={obj}
                />

            ))
        }
    </OrderRecordLayout>

);

// mWeb
const withCard = (data) => (

    <OrderRecordGridLayout
        container
        rowSpacing={{
            xs: '20px',
            sm: '40px',
        }}
    >
        {
            data.map(({
                id,
                orderNumber,
                createdAt,
                totalItems,
                price,
                status,
                paidBy,
                paidAt,
                invoice,
            }) => (

                <Grid
                    key={id}
                    item
                    xs={12}
                >
                    <Links
                        url={`/order/${orderNumber}`}
                        className="card-wrap"
                        newPage
                    >
                        <div className="item">
                            <h4 className="title">{orderRecord.text_order_number}</h4>
                            <span className="orderNumber">{orderNumber}</span>
                        </div>
                        <div className="item">
                            <h4 className="title">{orderRecord.text_order_create_at}</h4>
                            {dateFormat(createdAt)}
                        </div>
                        <div className="item">
                            <h4 className="title">{orderRecord.text_order_quantity}</h4>
                            {`${totalItems}${text_item_unit}`}
                        </div>
                        <div className="item">
                            <h4 className="title">{orderRecord.text_order_total_price}</h4>
                            {priceWithCommas(price)}
                        </div>
                        <div className="item">
                            <h4 className="title">{orderRecord.text_order_status}</h4>
                            {orderRecord[`text_status_${status}`]}
                        </div>
                        <div className="item">
                            <h4 className="title">{orderRecord.text_order_payment}</h4>
                            {renderWithoutValue(orderRecord[`text_payment_${paidBy}`])}
                        </div>
                        <div className="item">
                            <h4 className="title">{orderRecord.text_order_paid_at}</h4>
                            {dateFormat(paidAt)}
                        </div>
                        <div className="item">
                            <h4 className="title">{orderRecord.text_order_invoice}</h4>
                            <span className="invoice">{renderWithoutValue(invoice)}</span>
                        </div>
                    </Links>
                </Grid>

            ))
        }
    </OrderRecordGridLayout>

);

//
const OrderRecord = ({ data }) => {

    const matches = useMediaQuery((theme) => theme.breakpoints.up('mobile'));

    return (

        matches ? withTable(data) : withCard(data)

    );

};

export default OrderRecord;
