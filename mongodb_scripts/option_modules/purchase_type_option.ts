
export const PurchaseTypeOptions = [{
    "name": "Tipo de Compra",
    "section": "purchase",
    "url": "/admin/purchase/type/list",
    "print": true,
    "delete": true,
    "edit": true,
    "add": true
}, {
    "name": "Creación de tipo de compra",
    "url": "/admin/purchase/type/create/:_id",
    "print": false,
    "delete": false,
    "edit": true,
    "add": true
}, {
    "name": "Campos de tipo de compra",
    "url": "/admin/purchase/type/:_id/fields",
    "print": false,
    "delete": true,
    "edit": true,
    "add": true
}]