import { styled } from '@mui/system';
import Box from '../Box';
import Links from '../Links';
import {
    OrderRecordLayout,
} from '../member/accountLayout';
import util from '../../utils/util';
import deftag from '../../utils/util.deftag';

const { priceWithCommas } = util;

const {
    member: {
        text_member_center,
        text_logout,
    },
} = deftag;

const Item = ({
    data: {
        id,
        orderNumber,
        title,
        price,
        status,
    },
}) => (

    <div className="item">
        {orderNumber}
    </div>

);

//
const OrderRecord = ({ data }) => {

    return (

        <OrderRecordLayout>
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

};

export default OrderRecord;
