"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseOrderOptions = [{
        "name": "Orden de compra",
        "section": "purchase",
        "url": "/admin/purchase/order/list",
        "print": true,
        "delete": true,
        "edit": true,
        "add": true
    },
    {
        "name": "Creación de orden de compra",
        "url": "/admin/purchase/order/create/:_id",
        "print": true,
        "delete": true,
        "edit": true,
        "add": true
    }, {
        "name": "Facturar orden de compra",
        "url": "/admin/purchase/:_id/order/:order_id",
        "print": true,
        "delete": true,
        "edit": true,
        "add": true
    },
    {
        "name": "Impresión de orden de compra",
        "url": "/admin/purchase/order/print/:_id",
        "print": true,
        "delete": false,
        "edit": false,
        "add": false
    }];
//# sourceMappingURL=purchase.order.option.js.map