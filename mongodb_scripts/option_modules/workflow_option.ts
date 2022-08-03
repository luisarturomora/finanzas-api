
export const WorkflowOptions = [{
    "name": "Flujo de trabajo",
    "section": "settings",
    "url": "/admin/workflow/list",
    "print": true,
    "delete": true,
    "edit": true,
    "add": true
}, {
    "name": "Creación de flujo de trabajo",
    "url": "/admin/workflow/create/:_id",
    "print": false,
    "delete": false,
    "edit": true,
    "add": true
}, {
    "name": "Campos de flujo de trabajo",
    "url": "/admin/workflow/:_id/fields",
    "print": false,
    "delete": true,
    "edit": true,
    "add": true
}, {
    "name": "Procesos de flujo de trabajo",
    "url": "/admin/workflow/:_id/process",
    "print": false,
    "delete": true,
    "edit": true,
    "add": true
}, {
    "name": "Proceso",
    "url": "/admin/workflow/:_id/process/:process_id",
    "print": false,
    "delete": false,
    "edit": true,
    "add": true
}]