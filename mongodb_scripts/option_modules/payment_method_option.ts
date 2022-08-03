
export const PaymentMethodOptions = [{
    "name": "Forma de pago",
    "section": "settings",
    "url": "/admin/payment/method/list",
    "print": true,
    "delete": true,
    "edit": true,
    "add": true
}, {
    "name": "Creación de forma de pago",
    "url": "/admin/payment/method/create/:_id",
    "print": false,
    "delete": false,
    "edit": true,
    "add": true
}, {
    "name": "Campos de forma de pago",
    "url": "/admin/payment/method/:_id/fields",
    "print": false,
    "delete": true,
    "edit": true,
    "add": true
}, {
    "name": "Billetes de forma de pago",
    "url": "/admin/payment/method/:_id/tickets",
    "print": false,
    "delete": true,
    "edit": true,
    "add": true
}]