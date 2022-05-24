import { Fragment, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

import { InvoiceFormWrapLayout, RadioButtonLayout } from './cartLayout';
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

    // State
    const [checked, setChecked] = useState({});

    // change
    const handleChange = ({ target: { name, value } }) => {

        setChecked({
            ...checked,
            [name]: value,
        });

    };

    // 送資料
    const handleReqData = (reqData) => {

        reqData = {
            ...reqData,
            receiveName: (checked.receive === 'same') ? reqData.realName : reqData.receiveName,
            receiveAddress: (checked.receive === 'same') ? reqData.address : reqData.receiveAddress,
        };

        delete reqData.receive;
        delete reqData.invoiceWay;

        console.log('reqData:', reqData);
        // Service.forgotPassword(reqData)
        //     .then(() => setSuccess(true));

    };

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

                    <FormRow name="invoiceType">
                        {
                            Object.keys(radios.invoiceType).map((key) => (

                                <RadioButton
                                    key={key}
                                    name="invoiceType"
                                    value={key}
                                    text={radios.invoiceType[key]}
                                    register={register('invoiceType')}
                                    onChange={handleChange}
                                    {...(key === 'paper') && { checked: true }}
                                    {...(key === 'electronic') && { disabled: true }}
                                />

                            ))
                        }
                    </FormRow>

                    <div className="form-row">
                        <FormRow name="receive">
                            {
                                Object.keys(radios.receive).map((key) => (

                                    <RadioButton
                                        key={key}
                                        name="receive"
                                        value={key}
                                        text={radios.receive[key]}
                                        register={register('receive')}
                                        onChange={handleChange}
                                    />

                                ))
                            }
                        </FormRow>

                        {
                            (checked.receive === 'refill') &&
                                <div className="row-receive-info">
                                    <FormRow name="receiveName">
                                        <input
                                            type="text"
                                            name="receiveName"
                                            placeholder={deftag.cart_member_real_name}
                                            {...register('receiveName')}
                                        />
                                    </FormRow>

                                    <FormRow name="receiveAddress">
                                        <input
                                            type="text"
                                            name="receiveAddress"
                                            placeholder={deftag.cart_member_address}
                                            {...register('receiveAddress')}
                                        />
                                    </FormRow>
                                </div>
                        }
                    </div>

                    <div className="form-row">
                        <FormRow name="invoiceWay">
                            {
                                Object.keys(radios.invoiceWay).map((key) => (

                                    <RadioButton
                                        key={key}
                                        name="invoiceWay"
                                        value={key}
                                        text={radios.invoiceWay[key]}
                                        register={register('invoiceWay')}
                                        onChange={handleChange}
                                    />

                                ))
                            }
                        </FormRow>

                        {
                            (checked.invoiceWay === 'three') &&
                                <div className="row-invoice-way">
                                    <FormRow name="companyName">
                                        <input
                                            type="text"
                                            name="companyName"
                                            placeholder={deftag.cart_invoice_company_name}
                                            {...register('companyName')}
                                        />
                                    </FormRow>

                                    <FormRow name="taxNumber">
                                        <input
                                            type="text"
                                            name="taxNumber"
                                            placeholder={deftag.cart_invoice_tax_number}
                                            {...register('taxNumber')}
                                        />
                                    </FormRow>
                                </div>
                        }
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
