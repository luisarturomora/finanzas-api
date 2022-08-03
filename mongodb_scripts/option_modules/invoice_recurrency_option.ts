
export const InvoiceRecurrencyOptions = [{
    "name": "Factura Recurrente",
    "section": "sale",
    "url": "/admin/invoice/recurrency/list",
    "print": true,
    "delete": true,
    "edit": true,
    "add": true
}, {
    "name": "Creación de factura recurrente",
    "url": "/admin/invoice/recurrency/create/:_id",
    "print": false,
    "delete": false,
    "edit": true,
    "add": true
}, {
    "name" : "Historico de pago de factura recurrente",
    "url" : "/admin/invoice/recurrency/:_id/history",
    "print" : true,
    "delete" : true,
    "edit" : true,
    "add" : true
}]