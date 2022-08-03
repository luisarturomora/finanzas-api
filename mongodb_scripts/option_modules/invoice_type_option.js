"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceTypeOptions = [{
        "name": "Tipo de Factura",
        "section": "settings",
        "url": "/admin/invoice/type/list",
        "print": true,
        "delete": true,
        "edit": true,
        "add": true
    }, {
        "name": "Creación de tipo de factura",
        "url": "/admin/invoice/type/create/:_id",
        "print": false,
        "delete": false,
        "edit": true,
        "add": true
    }, {
        "name": "Campos de tipo de factura",
        "url": "/admin/invoice/type/:_id/fields",
        "print": false,
        "delete": true,
        "edit": true,
        "add": true
    }];
//# sourceMappingURL=invoice_type_option.js.map