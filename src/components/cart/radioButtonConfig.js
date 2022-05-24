import deftag from '../../utils/util.deftag';

export const radios = {
    invoiceType: {
        paper: deftag.cart_invoice_type_paper,
        electronic: deftag.cart_invoice_type_electronic,
    },
    receive: {
        same: deftag.cart_invoice_text_same_as,
        refill: deftag.cart_invoice_text_re_fill,
    },
    invoiceWay: {
        two: deftag.cart_invoice_way_two,
        three: deftag.cart_invoice_way_three,
    },
};
