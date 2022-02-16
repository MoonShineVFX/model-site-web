import { useForm } from 'react-hook-form';
import { BtnDirectLayout } from '../member/memberSignLayout';
import { BoxWrapLayout } from './accountLayout';
import Buttons from '../Buttons';
import { FormRow } from '../FormWrap';
import deftag from '../../utils/util.deftag';
import Service from '../../utils/util.service';

const {
    memberSign: {
        text_nickname,
        text_account,
    },
    member: {
        btn_save,
        text_change_password,
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
                            text={btn_save}
                        />

                        <BtnDirectLayout
                            type="third"
                            url="/member/change_password"
                            text={text_change_password}
                        />
                    </div>
                </form>
            </div>
        </BoxWrapLayout>

    );

};

export default MyAccount;
