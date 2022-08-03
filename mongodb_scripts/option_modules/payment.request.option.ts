
export const PaymentDepositOptions = [{
    "name": "Solicitud de pago",
    "section": "purchase",
    "url": "/admin/payment/request/list",
    "print": true,
    "delete": true,
    "edit": true,
    "add": true
}, {
    "name": "Creación de solicitud de pago",
    "url": "/admin/payment/request/:_id/create",
    "print": false,
    "delete": false,
    "edit": true,
    "add": true
}, {
    "name": "Pago proveedor",
    "url": "/admin/payment/request/print/:_id",
    "print": true,
    "delete": false,
    "edit": false,
    "add": false
}]