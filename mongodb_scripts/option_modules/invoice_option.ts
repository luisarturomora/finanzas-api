
export const InvoiceOptions = [{
    "name": "Facturación",
    "section": "sale",
    "url": "/admin/invoice/list",
    "print": true,
    "delete": true,
    "edit": true,
    "add": true
},
{
    "name": "Creación de factura",
    "url": "/admin/invoice/create/:_id",
    "print": true,
    "delete": true,
    "edit": true,
    "add": true
},
{
    "name": "Impresión de punto de venta",
    "url": "/admin/invoice/print/:_id/point",
    "print": true,
    "delete": false,
    "edit": false,
    "add": false
},
{
    "name": "Impresión de fatura",
    "url": "/admin/invoice/print/:_id",
    "print": true,
    "delete": false,
    "edit": false,
    "add": false
},
{
    "name": "Listado de pagos de una factura",
    "url": "/admin/invoice/:_id/payments",
    "print": true,
    "delete": false,
    "edit": false,
    "add": false
}]