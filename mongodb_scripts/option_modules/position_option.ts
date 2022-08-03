
export const PositionOptions = [{
    "name": "Posiciones",
    "section": "settings",
    "url": "/admin/position/list",
    "print": true,
    "delete": true,
    "edit": true,
    "add": true
}, {
    "name": "Creación de posición",
    "url": "/admin/position/create/:_id",
    "print": false,
    "delete": false,
    "edit": true,
    "add": true
}, {
    "name": "Campos de posición",
    "url": "/admin/position/:_id/fields",
    "print": false,
    "delete": true,
    "edit": true,
    "add": true
},{
    "name" : "Comision por productos en posicion",
    "url" : "/admin/position/commission/:_id",
    "print" : true,
    "delete" : true,
    "edit" : true,
    "add" : true
}]