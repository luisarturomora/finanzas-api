
export const CreditNoteOptions = [{
    "name": "Nota de credito cliente",
    "section": "sale",
    "url": "/admin/credit/note/client/list",
    "print": true,
    "delete": true,
    "edit": true,
    "add": true
},
{
    "name": "Creación de nota de credito cliente",
    "url": "/admin/credit/note/client/create/:_id",
    "print": true,
    "delete": true,
    "edit": true,
    "add": true
}, {
    "name": "Impresión de nota de credito cliente",
    "url": "/admin/credit/note/client/print/:_id",
    "print": true,
    "delete": false,
    "edit": false,
    "add": false
}, {
    "name": "Nota de credito proveedor",
    "section": "purchase",
    "url": "/admin/credit/note/provider/list",
    "print": true,
    "delete": true,
    "edit": true,
    "add": true
},
{
    "name": "Creación de nota de credito proveedor",
    "url": "/admin/credit/note/provider/create/:_id",
    "print": true,
    "delete": true,
    "edit": true,
    "add": true
}, {
    "name": "Impresión de nota de credito proveedor",
    "url": "/admin/credit/note/provider/print/:_id",
    "print": true,
    "delete": false,
    "edit": false,
    "add": false
}]