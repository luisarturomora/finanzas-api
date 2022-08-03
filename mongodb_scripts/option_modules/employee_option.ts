
export const EmployeeOptions = [{
    "name": "Empleados",
    "url": "/admin/employee/list",
    "section": "administration",
    "print": true,
    "delete": true,
    "edit": true,
    "add": true
}, {
    "name": "Creación de empleado",
    "url": "/admin/employee/create/:_id",
    "print": false,
    "delete": false,
    "edit": true,
    "add": true
},{
    "name" : "Comision por productos en empleados",
    "url" : "/admin/employee/commission/:_id",
    "print" : true,
    "delete" : true,
    "edit" : true,
    "add" : true
}]