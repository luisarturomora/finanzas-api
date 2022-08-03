
export const AccountOptions = [{
    "name" : "Cuentas",
    "url" : "/admin/account",
    "section": "accounting",
    "print" : true,
    "delete" : true,
    "edit" : true,
    "add" : true
}, {
    "name" : "Creación de cuenta",
    "url" : "/admin/account/create/:_id",
    "print" : true,
    "delete" : true,
    "edit" : true,
    "add" : true
},
{
    "name" : "Campos de una cuenta",
    "url" : "/admin/account/type/:_id/fields",
    "print" : true,
    "delete" : true,
    "edit" : true,
    "add" : true
},
{
    "name" : "Tipos de Cuentas",
    "url" : "/admin/account/type",
    "section": "accounting",
    "print" : true,
    "delete" : true,
    "edit" : true,
    "add" : true
},
{
    "name" : "Creación de tipo de cuenta",
    "url" : "/admin/account/type/create/:_id",
    "print" : true,
    "delete" : true,
    "edit" : true,
    "add" : true
},
{
    "name" : "Detalle de cuenta",
    "url" : "/admin/account/:_id/details",
    "print" : true,
    "delete" : true,
    "edit" : false,
    "add" : false
}]