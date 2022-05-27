import {
    Fragment,
    useContext,
    useState,
    useRef,
} from 'react';
import { useForm } from 'react-hook-form';

import { InvoiceFormWrapLayout } from './cartLayout';
import { FormRow } from '../FormWrap';
import Buttons from '../Buttons';
import RadioButton from '../RadioButton';
import { GlobalContext } from '../../context/global.state';

//
const InvoiceForm = ({ langs, items }) => {

    // Radio Button 設定檔
    const radios = {
        invoiceType: {
            paper: langs.cart_invoice_type_paper,
            electronic: langs.cart_invoice_type_electronic,
        },
        receiver: {
            same: langs.cart_invoice_text_same_as,
            refill: langs.cart_invoice_text_re_fill,
        },
        paperInvoiceType: {
            duplicate: langs.cart_invoice_way_duplicate,
            triplicate: langs.cart_invoice_way_triplicate,
        },
    };

    // Context
    const { user } = useContext(GlobalContext);

    // React Hook Form
    const {
        handleSubmit,
        register,
        formState: { errors },
        resetField,
    } = useForm();

    // Ref
    const formRef = useRef(null);

    // State
    const [checked, setChecked] = useState({});
    const [fields, setFields] = useState({});

    // change
    const handleChange = ({ target: { name, value } }) => {

        setChecked({
            ...checked,
            [name]: value,
        });

        // 清空值
        if (value === 'same') {

            resetField('receiverName');
            resetField('receiverAddress');

        }

        // 清空值
        if (value === 'duplicate') {

            resetField('companyName');
            resetField('taxNumber');

        }

    };

    // 送資料
    const handleReqData = (reqData) => {

        reqData = {
            ...reqData,
            cartIds: items.flatMap(({ id }) => id),
            receiverName: (checked.receiver === 'same') ? reqData.realName : reqData.receiverName,
            receiverAddress: (checked.receiver === 'same') ? reqData.address : reqData.receiverAddress,
        };

        // 二聯式不需要送的欄位
        if (reqData.paperInvoiceType === 'duplicate') {

            delete reqData.companyName;
            delete reqData.taxNumber;

        }

        // 此欄位無任何意義
        delete reqData.receiver;

        Service.order(reqData)
            .then((resData) => {

                setFields({ ...resData });
                formRef.current.submit();
                localStorage.removeItem('cartItem'); // 清除暫存購物車

            });

    };

    return (

        <Fragment>
            <InvoiceFormWrapLayout>
                <form onSubmit={handleSubmit(handleReqData)}>
                    <section>
                        <h4 className="title">{langs.cart_member_info_title}</h4>

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
                                placeholder={langs.cart_member_real_name}
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
                                placeholder={langs.cart_member_address}
                                {...register('address', { required: true })}
                            />
                        </FormRow>
                    </section>

                    <section>
                        <h4 className="title">{langs.cart_invoice_title}</h4>

                        <FormRow name="invoiceType">
                            {
                                Object.keys(radios.invoiceType).map((key) => (

                                    <RadioButton
                                        key={key}
                                        name="invoiceType"
                                        value={key}
                                        text={radios.invoiceType[key]}
                                        {...register('invoiceType')}
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
                                            {...register('receiver', {
                                                required: true,
                                                onChange: handleChange,
                                            })}
                                        />

                                    ))
                                }
                            </FormRow>

                            {
                                (checked.receiver === 'refill') &&
                                    <div className="row-receive-info">
                                        <FormRow
                                            name="receiverName"
                                            errors={errors}
                                        >
                                            <input
                                                type="text"
                                                name="receiverName"
                                                placeholder={langs.cart_member_real_name}
                                                {...register('receiverName', { required: true })}
                                            />
                                        </FormRow>

                                        <FormRow
                                            name="receiverAddress"
                                            errors={errors}
                                        >
                                            <input
                                                type="text"
                                                name="receiverAddress"
                                                placeholder={langs.cart_member_address}
                                                {...register('receiverAddress', { required: true })}
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
                                                onChange: handleChange,
                                            })}
                                        />

                                    ))
                                }
                            </FormRow>

                            {
                                (checked.paperInvoiceType === 'triplicate') &&
                                    <div className="row-invoice-way">
                                        <FormRow
                                            name="companyName"
                                            errors={errors}
                                        >
                                            <input
                                                type="text"
                                                name="companyName"
                                                placeholder={langs.cart_invoice_company_name}
                                                {...register('companyName', { required: true })}
                                            />
                                        </FormRow>

                                        <FormRow
                                            name="taxNumber"
                                            errors={errors}
                                        >
                                            <input
                                                type="text"
                                                name="taxNumber"
                                                placeholder={langs.cart_invoice_tax_number}
                                                {...register('taxNumber', { required: true })}
                                            />
                                        </FormRow>
                                    </div>
                            }
                        </div>

                        <p className="warning-text">{langs.cart_text_fill_out_warning}</p>
                    </section>

                    <div className="btn-action">
                        <Buttons
                            type="submit"
                            text={langs.btn_confirm_order}
                        />
                        <p>{langs.cart_text_notice}</p>
                    </div>
                </form>
            </InvoiceFormWrapLayout>

            {
                !!Object.keys(fields).length &&
                    <form
                        name="Newebpay"
                        method="POST"
                        action="https://ccore.newebpay.com/MPG/mpg_gateway"
                        ref={formRef}
                    >
                        {
                            Object.keys(fields).map((key) => (

                                <input
                                    key={key}
                                    type="hidden"
                                    name={key}
                                    value={fields[key]}
                                />

                            ))
                        }
                    </form>
            }
        </Fragment>

    );

};

export default InvoiceForm;
