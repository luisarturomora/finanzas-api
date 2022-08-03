
export const ManualEntryOptions = [{
    "name" : "Entrada de Diario",
    "section": "accounting",
    "url" : "/admin/manual/entry/list",
    "print" : true,
    "delete" : true,
    "edit" : true,
    "add" : true
},{
    "name" : "Creación de entrada de diario",
    "url" : "/admin/manual/entry/create/:_id",
    "print" : true,
    "delete" : true,
    "edit" : true,
    "add" : true
},{
    "name" : "Aprobación de entradas manuales",
    "url" : "/admin/manual/entry/:_id/approve/:process_id",
    "print" : true,
    "delete" : true,
    "edit" : true,
    "add" : true
}]