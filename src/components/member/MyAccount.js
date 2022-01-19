import { useForm } from 'react-hook-form';
import Buttons from '../Buttons';
import { FormRow } from '../FormWrap';
import { BtnDirectLayout } from '../member/memberSignLayout';
import { BoxWrapLayout } from './accountLayout';
import deftag from '../../utils/util.deftag';
import Service from '../../utils/util.service';

const {
    common: { btn_update_submit },
    memberSign: {
        text_nickname,
        text_account,
        text_reset_password,
    },
} = deftag;

//
const MyAccount = ({ data }) => {

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
                <h4 className="title">{text_account}</h4>
                {data.email}
            </div>

            <div className="row">
                <h4 className="title">{text_nickname}</h4>

                <form onSubmit={handleSubmit(handleReqData)}>
                    <FormRow name="nickname">
                        <input
                            type="text"
                            name="nickname"
                            placeholder={text_nickname}
                            defaultValue={data.nickname}
                            {...register('nickname')}
                        />
                    </FormRow>

                    <div className="form-row Model-form-button">
                        <Buttons
                            type="submit"
                            text={btn_update_submit}
                        />

                        <BtnDirectLayout
                            type="third"
                            url="/reset_password"
                            text={text_reset_password}
                        />
                    </div>
                </form>
            </div>
        </BoxWrapLayout>

    );

};

export default MyAccount;
