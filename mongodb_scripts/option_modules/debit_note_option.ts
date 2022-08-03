
export const DebitNoteOptions = [{
    "name": "Nota de debito cliente",
    "section": "sale",
    "url": "/admin/debit/note/client/list",
    "print": true,
    "delete": true,
    "edit": true,
    "add": true
},
{
    "name": "Creación de nota de debito cliente",
    "url": "/admin/debit/note/client/create/:_id",
    "print": true,
    "delete": true,
    "edit": true,
    "add": true
}, {
    "name": "Impresión de nota de debito cliente",
    "url": "/admin/debit/note/client/print/:_id",
    "print": true,
    "delete": false,
    "edit": false,
    "add": false
}, {
    "name": "Nota de debito proveedor",
    "section": "purchase",
    "url": "/admin/debit/note/provider/list",
    "print": true,
    "delete": true,
    "edit": true,
    "add": true
},
{
    "name": "Creación de nota de debito proveedor",
    "url": "/admin/debit/note/provider/create/:_id",
    "print": true,
    "delete": true,
    "edit": true,
    "add": true
}, {
    "name": "Impresión de nota de debito proveedor",
    "url": "/admin/debit/note/provider/print/:_id",
    "print": true,
    "delete": false,
    "edit": false,
    "add": false
}]