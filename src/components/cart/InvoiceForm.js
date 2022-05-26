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

    const paperInvoiceType = register('paperInvoiceType', { required: true });

    // State
    const [checked, setChecked] = useState({});

    // change
    const handleChange = (e) => {

        const { target: { name, value } } = e;

        console.log('name:', name);
        console.log('value:', value);

        setChecked({
            ...checked,
            [name]: value,
        });

    };

    // 送資料
    const handleReqData = (reqData) => {

        reqData = {
            ...reqData,
            // receiverName: (checked.receiver === 'same') ? reqData.realName : reqData.receiverName,
            // receiverAddress: (checked.receiver === 'same') ? reqData.address : reqData.receiverAddress,
        };

        delete reqData.receiver;

        console.log('reqData:', reqData);
        // Service.forgotPassword(reqData)
        //     .then(() => setSuccess(true));

    };

    // console.log('watch:', watch());

    return (

        <InvoiceFormWrapLayout>
            <form onSubmit={handleSubmit(handleReqData)}>
                <section>
                    <h4 className="title">{deftag.cart_member_info_title}</h4>

                    <div className="row">
                        <h4 className="row-title">{langs.text_account}</h4>
                        {user.email}
                    </div>

                    <FormRow
                        name="realName"
                        errors={errors}
                    >
                        <input
                            type="text"
                            name="realName"
                            defaultValue={'aaa'}
                            placeholder={deftag.cart_member_real_name}
                            {...register('realName', { required: true })}
                        />
                    </FormRow>

                    <FormRow
                        name="address"
                        errors={errors}
                    >
                        <input
                            type="text"
                            name="address"
                            defaultValue={'aaabbb'}
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
                                    {...register('invoiceType')}
                                    name="invoiceType"
                                    value={key}
                                    text={radios.invoiceType[key]}
                                    onChange={handleChange}
                                    {...(key === 'paper') && { checked: true }}
                                    {...(key === 'electronic') && { disabled: true }}
                                />

                            ))
                        }
                    </FormRow>

                    <div className="form-row">
                        <FormRow
                            className="form-row-radio"
                            name="receiver"
                            errors={errors}
                        >
                            {
                                Object.keys(radios.receiver).map((key) => (

                                    <RadioButton
                                        key={key}
                                        name="receiver"
                                        value={key}
                                        text={radios.receiver[key]}
                                        {...register('receiver', { required: true })}
                                        onChange={handleChange}
                                    />

                                ))
                            }
                        </FormRow>

                        {
                            (checked.receiver === 'refill') &&
                                <div className="row-receive-info">
                                    <FormRow name="receiverName">
                                        <input
                                            type="text"
                                            name="receiverName"
                                            placeholder={deftag.cart_member_real_name}
                                            {...register('receiverName')}
                                        />
                                    </FormRow>

                                    <FormRow name="receiverAddress">
                                        <input
                                            type="text"
                                            name="receiverAddress"
                                            placeholder={deftag.cart_member_address}
                                            {...register('receiverAddress')}
                                        />
                                    </FormRow>
                                </div>
                        }
                    </div>

                    <div className="form-row">
                        <FormRow
                            className="form-row-radio"
                            name="paperInvoiceType"
                            errors={errors}
                        >
                            {
                                Object.keys(radios.paperInvoiceType).map((key) => (

                                    <RadioButton
                                        key={key}
                                        name="paperInvoiceType"
                                        value={key}
                                        text={radios.paperInvoiceType[key]}
                                        {...register('paperInvoiceType', {
                                            required: true,
                                            onChange: (e) => console.log(e)
                                            // onChange: handleChange,
                                        })}
                                    />

                                ))
                            }
                        </FormRow>

                        {
                            (checked.paperInvoiceType === 'triplicate') &&
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
