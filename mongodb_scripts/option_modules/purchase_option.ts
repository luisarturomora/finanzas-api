
export const PurchaseOptions = [
    {
        "name" : "Compras",
        "section": "purchase",
        "url" : "/admin/purchase/list",
        "print" : true,
        "delete" : true,
        "edit" : true,
        "add" : true
    },
    {
        "name" : "Creación de Compra",
        "url" : "/admin/purchase/create/:_id",
        "print" : true,
        "delete" : true,
        "edit" : true,
        "add" : true
    },{
        "name" : "Listado de pagos de una compra",
        "url" : "/admin/purchase/:_id/payments",
        "print" : true,
        "delete" : false,
        "edit" : false,
        "add" : true
    },{
        "name" : "Impresión de Compra",
        "url" : "/admin/purchase/print/:_id",
        "print" : true,
        "delete" : false,
        "edit" : false,
        "add" : false
    }
]