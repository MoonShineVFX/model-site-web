import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { BtnDirectLayout } from '../member/memberSignLayout';
import { BoxWrapLayout } from './accountLayout';
import Buttons from '../Buttons';
import { FormRow } from '../FormWrap';
import Service from '../../utils/util.service';
import { GlobalContext } from '../../context/global.state';

const MyAccount = ({ data }) => {

    // Context
    const { deftags } = useContext(GlobalContext);

    // React Hook Form
    const { handleSubmit, register } = useForm();

    // 送資料
    const handleReqData = (reqData) => {

        Service.updateMyAccount(reqData)
            .then(() => alert('更新成功'));

    };

    return (

        <BoxWrapLayout>
            <div className="row">
                <h4 className="title">{deftags.text_account}</h4>
                {data.email}
            </div>

            <div className="row">
                <h4 className="title">{deftags.text_nickname}</h4>

                <form onSubmit={handleSubmit(handleReqData)}>
                    <FormRow name="nickname">
                        <input
                            type="text"
                            name="nickname"
                            placeholder={deftags.text_nickname}
                            defaultValue={data.nickname}
                            {...register('nickname')}
                        />
                    </FormRow>

                    <div className="form-row Model-form-button">
                        <Buttons
                            type="submit"
                            text={deftags.btn_saved}
                        />

                        <BtnDirectLayout
                            type="third"
                            url="/member/change_password"
                            text={deftags.member_change_password}
                        />
                    </div>
                </form>
            </div>
        </BoxWrapLayout>

    );

};

export default MyAccount;
