"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentOptions = [{
        "name": "Pago cliente",
        "section": "sale",
        "url": "/admin/payment/client/list",
        "print": true,
        "delete": true,
        "edit": true,
        "add": true
    },
    {
        "name": "Creación de pago cliente",
        "url": "/admin/payment/client/:_id/create",
        "print": true,
        "delete": true,
        "edit": true,
        "add": true
    }, {
        "name": "Pago proveedor",
        "section": "purchase",
        "url": "/admin/payment/provider/list",
        "print": true,
        "delete": true,
        "edit": true,
        "add": true
    },
    {
        "name": "Creación de pago proveedor",
        "url": "/admin/payment/provider/:_id/create",
        "print": true,
        "delete": true,
        "edit": true,
        "add": true
    },
    {
        "name": "Pago cliente",
        "url": "/admin/payment/client/print/:_id",
        "print": true,
        "delete": false,
        "edit": false,
        "add": false
    },
    {
        "name": "Pago proveedor",
        "url": "/admin/payment/provider/print/:_id",
        "print": true,
        "delete": false,
        "edit": false,
        "add": false
    },
    {
        "name": "Creación de pago proveedor",
        "url": "/admin/payment/provider/:_id/create/:purchase_id",
        "print": true,
        "delete": true,
        "edit": true,
        "add": true
    },
    {
        "name": "Creación de pago cliente",
        "url": "/admin/payment/client/:_id/create/:invoice_id",
        "print": true,
        "delete": true,
        "edit": true,
        "add": true
    }];
//# sourceMappingURL=payment.option.js.map