import Links from '../Links';
import { OrderRecordLayout } from '../order/orderLayout';
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
        <span className="item-cell cell-140">{renderWithoutValue(invoice)}</span>
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

//
const OrderRecord = ({ data }) => (

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

export default OrderRecord;
