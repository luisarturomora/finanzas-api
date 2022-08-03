"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuotationOptions = [{
        "name": "Cotización",
        "section": "sale",
        "url": "/admin/quotation/list",
        "print": true,
        "delete": true,
        "edit": true,
        "add": true
    },
    {
        "name": "Creación de cotización",
        "url": "/admin/quotation/create/:_id",
        "print": true,
        "delete": true,
        "edit": true,
        "add": true
    }, {
        "name": "Facturar cotización",
        "url": "/admin/invoice/:_id/quotation/:quotation_id",
        "print": true,
        "delete": true,
        "edit": true,
        "add": true
    },
    {
        "name": "Impresión de punto de venta",
        "url": "/admin/quotation/print/:_id",
        "print": true,
        "delete": false,
        "edit": false,
        "add": false
    }];
//# sourceMappingURL=quotation_option.js.map