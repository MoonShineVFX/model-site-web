import { useContext } from 'react';
import { BtnDirectLayout } from '../member/memberSignLayout';
import { BoxWrapLayout } from './accountLayout';
import { GlobalContext } from '../../context/global.state';

const MyAccount = ({ data }) => {

    // Context
    const { deftags } = useContext(GlobalContext);

    return (

        <BoxWrapLayout>
            <div className="row">
                <h4 className="title">{deftags.text_account}</h4>
                {data.email}
            </div>

            <div className="row Model-form-button">
                <BtnDirectLayout
                    type="third"
                    url="/member/change_password"
                    text={deftags.member_change_password}
                />
            </div>
        </BoxWrapLayout>

    );

};

export default MyAccount;
