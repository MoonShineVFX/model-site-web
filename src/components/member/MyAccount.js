import { useEffect } from 'react';
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
    const {
        handleSubmit,
        register,
        setValue,
    } = useForm();

    useEffect(() => {

        if (data) setValue('nickname', data.nickname);

    }, [data, setValue]);

    // 送資料
    const handleReqData = (reqData) => {

        console.log('reqData:', reqData)

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
