import { Fragment, useContext } from 'react';
import { styled } from '@mui/system';
import { useForm } from 'react-hook-form';

import { InvoiceFormWrapLayout, RadioButtonLayout } from './cartLayout';
import Box from '../Box';
import FormWrap, { FormRow, FormSuccessMesg } from '../FormWrap';
import Buttons from '../Buttons';
import RadioButton from '../RadioButton';
import { radios } from './radioButtonConfig';

import { GlobalContext } from '../../context/global.state';
import util from '../../utils/util';
import deftag from '../../utils/util.deftag';

const { priceWithCommas } = util;

//
const InvoiceForm = ({ langs }) => {

    // Context
    const { user } = useContext(GlobalContext);

    // React Hook Form
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    // 送資料
    const handleReqData = (reqData) => {

        console.log('reqData:', reqData);
        // Service.forgotPassword(reqData)
        //     .then(() => setSuccess(true));

    };

    console.log(radios);

    return (

        <InvoiceFormWrapLayout>
            <form onSubmit={handleSubmit(handleReqData)}>
                <section>
                    <h4 className="title">{deftag.cart_member_info_title}</h4>

                    <FormRow
                        name="realName"
                        errors={errors}
                    >
                        <input
                            type="text"
                            name="realName"
                            placeholder={deftag.cart_member_real_name}
                            {...register('realName', { required: true })}
                        />
                    </FormRow>

                    <FormRow
                        name="email"
                        errors={errors}
                    >
                        <input
                            type="text"
                            name="email"
                            placeholder={langs.text_account}
                            {...register('email', { required: true })}
                        />
                    </FormRow>

                    <FormRow
                        name="address"
                        errors={errors}
                    >
                        <input
                            type="text"
                            name="address"
                            placeholder={deftag.cart_member_address}
                            {...register('address', { required: true })}
                        />
                    </FormRow>
                </section>

                <section>
                    <h4 className="title">{deftag.cart_invoice_title}</h4>

                    <FormRow
                        name="invoiceType"
                        errors={errors}
                    >
                        {
                            // Object.keys(radios.invoiceType).map((key) => (

                            //     <RadioButton
                            //         key={key}
                            //         name="invoiceType"
                            //         value={key}
                            //         text={radios.invoiceType[key]}
                            //         register={register('invoiceType')}
                            //         {...(key === 'electronic') && { disabled: true }}
                            //     />

                            // ))
                        }
                        {/* <RadioButton
                            name="invoiceType"
                            defaultChecked={true}
                            value="paper"
                            text={deftag.cart_invoice_type_paper}
                            register={register('invoiceType')}
                        />
                        <RadioButton
                            name="invoiceType"
                            value="electronic"
                            text={deftag.cart_invoice_type_electronic}
                            register={register('invoiceType')}
                            disabled
                        /> */}
                    </FormRow>

                    <div className="form-row">
                        <RadioButton
                            name="receive"
                            text={deftag.cart_invoice_text_same_as}
                            register={register('receive')}
                        />
                        <RadioButton
                            name="receive"
                            text={deftag.cart_invoice_text_re_fill}
                            register={register('receive')}
                        />

                        <div className={`row-receive-info`}>
                            <FormRow
                                name="receiveName"
                                errors={errors}
                            >
                                <input
                                    type="text"
                                    name="receiveName"
                                    placeholder={deftag.cart_member_real_name}
                                    {...register('receiveName')}
                                />
                            </FormRow>

                            <FormRow
                                name="receiveAddress"
                                errors={errors}
                            >
                                <input
                                    type="text"
                                    name="receiveAddress"
                                    placeholder={deftag.cart_member_address}
                                    {...register('receiveAddress')}
                                />
                            </FormRow>
                        </div>
                    </div>

                    <div className="form-row">
                        <RadioButton
                            name="invoiceWay"
                            text={deftag.cart_invoice_way_two}
                            register={register('invoiceWay')}
                        />
                        <RadioButton
                            name="invoiceWay"
                            text={deftag.cart_invoice_way_three}
                            register={register('invoiceWay')}
                        />

                        <div className={`row-invoice-way`}>
                            <FormRow
                                name="companyName"
                                errors={errors}
                            >
                                <input
                                    type="text"
                                    name="companyName"
                                    placeholder={deftag.cart_invoice_company_name}
                                    {...register('companyName')}
                                />
                            </FormRow>

                            <FormRow
                                name="taxNumber"
                                errors={errors}
                            >
                                <input
                                    type="text"
                                    name="taxNumber"
                                    placeholder={deftag.cart_invoice_tax_number}
                                    {...register('taxNumber')}
                                />
                            </FormRow>
                        </div>
                    </div>

                    <p className="warning-text">{deftag.cart_text_fill_out_warning}</p>
                </section>

                <div className="btn-action">
                    <Buttons
                        type="submit"
                        text={langs.btn_confirm_order}
                        // onClick={handleClickOrder}
                    />
                    <p>{langs.cart_text_notice}</p>
                </div>
            </form>
        </InvoiceFormWrapLayout>

    );

};

export default InvoiceForm;
