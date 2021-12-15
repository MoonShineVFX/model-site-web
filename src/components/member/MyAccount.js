import { styled } from '@mui/system';
import Box from '../Box';
import Links from '../Links';
import {
    OrderRecordLayout,
    PopoverLayout,
} from './accountLayout';

import { GlobalContext } from '../../context/global.state';
import util from '../../utils/util';
import deftag from '../../utils/util.deftag';
import Service from '../../utils/util.service';

const {
    memberSign: {
        text_nickname,
        text_account,
        text_password,
    },
} = deftag;

//
const MyAccount = ({ data }) => {

    console.log('data:', data)

    return (

        <Box>
            <div className="row row-nickname">
                <h6 className="title">{text_nickname}</h6>
                {data.nickname}
            </div>

            <div className="row row-email">
                <h6 className="title">{text_account}</h6>
                {data.email}
            </div>

            <div className="row row-password">
                <h6 className="title">{text_password}</h6>
            </div>
        </Box>

    );

};

export default MyAccount;
