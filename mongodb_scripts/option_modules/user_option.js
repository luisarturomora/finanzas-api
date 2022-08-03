"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserOptions = [{
        "name": "Usuarios",
        "url": "/admin/user",
        "section": "security",
        "print": true,
        "delete": true,
        "edit": true,
        "add": true
    },
    {
        "name": "Creación de usuario",
        "url": "/admin/user/create/:_id",
        "print": true,
        "delete": true,
        "edit": true,
        "add": true
    },
    {
        "name": "Listado de perfiles de un usuario",
        "url": "/admin/user/:_id/role",
        "print": true,
        "delete": true,
        "edit": true,
        "add": true
    },
    {
        "name": "Cambiar contraseña de usuario",
        "url": "/admin/user/password/change",
        "print": true,
        "delete": true,
        "edit": true,
        "add": true
    },
    {
        "name": "Perfil de usuario",
        "url": "/admin/user/profile",
        "print": true,
        "delete": true,
        "edit": true,
        "add": true
    },
    {
        "name": "Sucursales de usuario",
        "url": "/admin/user/:_id/offices",
        "print": false,
        "delete": true,
        "edit": true,
        "add": true
    }];
//# sourceMappingURL=user_option.js.map