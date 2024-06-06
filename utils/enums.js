"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var USER_STATUS_ENUM;
(function (USER_STATUS_ENUM) {
    USER_STATUS_ENUM["actived"] = "Activo";
    USER_STATUS_ENUM["inactive"] = "Inactivo";
})(USER_STATUS_ENUM = exports.USER_STATUS_ENUM || (exports.USER_STATUS_ENUM = {}));
var QUOTATION_STATUS_ENUM;
(function (QUOTATION_STATUS_ENUM) {
    QUOTATION_STATUS_ENUM["created"] = "Creada";
    QUOTATION_STATUS_ENUM["canceled"] = "Cancelada";
    QUOTATION_STATUS_ENUM["invoiced"] = "Facturada";
})(QUOTATION_STATUS_ENUM = exports.QUOTATION_STATUS_ENUM || (exports.QUOTATION_STATUS_ENUM = {}));
var PURCHASE_ORDER_STATUS_ENUM;
(function (PURCHASE_ORDER_STATUS_ENUM) {
    PURCHASE_ORDER_STATUS_ENUM["created"] = "Creada";
    PURCHASE_ORDER_STATUS_ENUM["canceled"] = "Cancelada";
    PURCHASE_ORDER_STATUS_ENUM["invoiced"] = "Facturada";
})(PURCHASE_ORDER_STATUS_ENUM = exports.PURCHASE_ORDER_STATUS_ENUM || (exports.PURCHASE_ORDER_STATUS_ENUM = {}));
var MANUAL_ENTRY_STATUS_ENUM;
(function (MANUAL_ENTRY_STATUS_ENUM) {
    MANUAL_ENTRY_STATUS_ENUM["create"] = "En Digitaci\u00F3n";
    MANUAL_ENTRY_STATUS_ENUM["approving"] = "Pendiente Aprobaci\u00F3n";
    MANUAL_ENTRY_STATUS_ENUM["approved"] = "Aprobado";
    MANUAL_ENTRY_STATUS_ENUM["rejected"] = "Rechazado";
})(MANUAL_ENTRY_STATUS_ENUM = exports.MANUAL_ENTRY_STATUS_ENUM || (exports.MANUAL_ENTRY_STATUS_ENUM = {}));
;
var EVENT_LOG_ENUM;
(function (EVENT_LOG_ENUM) {
    EVENT_LOG_ENUM["signIn"] = "Iniciar Sesi\u00F3n";
    EVENT_LOG_ENUM["passwordChange"] = "Cambiar contrase\u00F1a";
    EVENT_LOG_ENUM["filter"] = "Filtrar";
    EVENT_LOG_ENUM["update"] = "Actualizar";
    EVENT_LOG_ENUM["delete"] = "Borrar";
    EVENT_LOG_ENUM["save"] = "Guardar";
    EVENT_LOG_ENUM["details"] = "Detalle";
    EVENT_LOG_ENUM["list"] = "Listado";
    EVENT_LOG_ENUM["cancel"] = "Cancelado";
    EVENT_LOG_ENUM["approved"] = "Aprobado";
    EVENT_LOG_ENUM["rejected"] = "Rechazado";
})(EVENT_LOG_ENUM = exports.EVENT_LOG_ENUM || (exports.EVENT_LOG_ENUM = {}));
var PURCHASE_STATUS_ENUM;
(function (PURCHASE_STATUS_ENUM) {
    PURCHASE_STATUS_ENUM["created"] = "Creada";
    PURCHASE_STATUS_ENUM["canceled"] = "Cancelada";
    PURCHASE_STATUS_ENUM["returned"] = "Devoluci\u00F3n";
    PURCHASE_STATUS_ENUM["payed"] = "Pagada";
})(PURCHASE_STATUS_ENUM = exports.PURCHASE_STATUS_ENUM || (exports.PURCHASE_STATUS_ENUM = {}));
var PACKAGE_STATUS_ENUM;
(function (PACKAGE_STATUS_ENUM) {
    PACKAGE_STATUS_ENUM["created"] = "Creada";
    PACKAGE_STATUS_ENUM["canceled"] = "Cancelada";
    PACKAGE_STATUS_ENUM["returned"] = "Devoluci\u00F3n";
    PACKAGE_STATUS_ENUM["payed"] = "Pagada";
})(PACKAGE_STATUS_ENUM = exports.PACKAGE_STATUS_ENUM || (exports.PACKAGE_STATUS_ENUM = {}));
var INVOICE_STATUS_ENUM;
(function (INVOICE_STATUS_ENUM) {
    INVOICE_STATUS_ENUM["Created"] = "Creada";
    INVOICE_STATUS_ENUM["PartialPayment"] = "Pago Parcial";
    INVOICE_STATUS_ENUM["Canceled"] = "Cancelada";
    INVOICE_STATUS_ENUM["Returned"] = "Devoluci\u00F3n";
    INVOICE_STATUS_ENUM["Payed"] = "Pagada";
})(INVOICE_STATUS_ENUM = exports.INVOICE_STATUS_ENUM || (exports.INVOICE_STATUS_ENUM = {}));
(function (PURCHASE_STATUS_ENUM) {
    PURCHASE_STATUS_ENUM["Created"] = "Creada";
    PURCHASE_STATUS_ENUM["PartialPayment"] = "Pago Parcial";
    PURCHASE_STATUS_ENUM["Canceled"] = "Cancelada";
    PURCHASE_STATUS_ENUM["Returned"] = "Devoluci\u00F3n";
    PURCHASE_STATUS_ENUM["Payed"] = "Pagada";
})(PURCHASE_STATUS_ENUM = exports.PURCHASE_STATUS_ENUM || (exports.PURCHASE_STATUS_ENUM = {}));
var SERVICE_STATUS_ENUM;
(function (SERVICE_STATUS_ENUM) {
    SERVICE_STATUS_ENUM["active"] = "Activo";
    SERVICE_STATUS_ENUM["finished"] = "Finalizado";
})(SERVICE_STATUS_ENUM = exports.SERVICE_STATUS_ENUM || (exports.SERVICE_STATUS_ENUM = {}));
var PAYMENT_TYPE_ENUN;
(function (PAYMENT_TYPE_ENUN) {
    PAYMENT_TYPE_ENUN["credit"] = "Credito";
    PAYMENT_TYPE_ENUN["counted"] = "Contado";
})(PAYMENT_TYPE_ENUN = exports.PAYMENT_TYPE_ENUN || (exports.PAYMENT_TYPE_ENUN = {}));
var PAYMENT_STATUS_ENUN;
(function (PAYMENT_STATUS_ENUN) {
    PAYMENT_STATUS_ENUN["created"] = "Creado";
    PAYMENT_STATUS_ENUN["deposited"] = "Depositado";
    PAYMENT_STATUS_ENUN["returned"] = "Devoluci\u00F3n";
})(PAYMENT_STATUS_ENUN = exports.PAYMENT_STATUS_ENUN || (exports.PAYMENT_STATUS_ENUN = {}));
var PAYMENT_DEPOSIT_STATUS_ENUN;
(function (PAYMENT_DEPOSIT_STATUS_ENUN) {
    PAYMENT_DEPOSIT_STATUS_ENUN["created"] = "Creado";
    PAYMENT_DEPOSIT_STATUS_ENUN["cancelled"] = "Cancelado";
})(PAYMENT_DEPOSIT_STATUS_ENUN = exports.PAYMENT_DEPOSIT_STATUS_ENUN || (exports.PAYMENT_DEPOSIT_STATUS_ENUN = {}));
var STOCK_TYPE_ENUM;
(function (STOCK_TYPE_ENUM) {
    STOCK_TYPE_ENUM["in"] = "in";
    STOCK_TYPE_ENUM["out"] = "out";
})(STOCK_TYPE_ENUM = exports.STOCK_TYPE_ENUM || (exports.STOCK_TYPE_ENUM = {}));
var COLLECTION_NAME_ENUM;
(function (COLLECTION_NAME_ENUM) {
    COLLECTION_NAME_ENUM["item"] = "item";
    COLLECTION_NAME_ENUM["item_type"] = "item_type";
    COLLECTION_NAME_ENUM["stock"] = "stock";
    COLLECTION_NAME_ENUM["user"] = "user";
    COLLECTION_NAME_ENUM["role"] = "role";
    COLLECTION_NAME_ENUM["module"] = "module";
    COLLECTION_NAME_ENUM["widget"] = "widget";
    COLLECTION_NAME_ENUM["package"] = "package";
    COLLECTION_NAME_ENUM["event_log"] = "event_log";
    COLLECTION_NAME_ENUM["client"] = "client";
    COLLECTION_NAME_ENUM["employee"] = "employee";
    COLLECTION_NAME_ENUM["client_type"] = "client_type";
    COLLECTION_NAME_ENUM["payment"] = "payment";
    COLLECTION_NAME_ENUM["payment_deposit"] = "payment_deposit";
    COLLECTION_NAME_ENUM["payment_method"] = "payment_method";
    COLLECTION_NAME_ENUM["payment_request"] = "payment_request";
    COLLECTION_NAME_ENUM["office"] = "office";
    COLLECTION_NAME_ENUM["purchase_type"] = "purchase_type";
    COLLECTION_NAME_ENUM["quotation"] = "quotation";
    COLLECTION_NAME_ENUM["provider"] = "provider";
    COLLECTION_NAME_ENUM["provider_type"] = "provider_type";
    COLLECTION_NAME_ENUM["package_config"] = "package_config";
    COLLECTION_NAME_ENUM["tax"] = "tax";
    COLLECTION_NAME_ENUM["box"] = "box";
    COLLECTION_NAME_ENUM["active_box"] = "active_box";
    COLLECTION_NAME_ENUM["field"] = "field";
    COLLECTION_NAME_ENUM["ncf"] = "ncf";
    COLLECTION_NAME_ENUM["ncf_type"] = "ncf_type";
    COLLECTION_NAME_ENUM["notification"] = "notification";
    COLLECTION_NAME_ENUM["position"] = "position";
    COLLECTION_NAME_ENUM["item_commission"] = "item_commission";
    COLLECTION_NAME_ENUM["invoice_recurrency"] = "invoice_recurrency";
    COLLECTION_NAME_ENUM["invoice"] = "invoice";
    COLLECTION_NAME_ENUM["purchase"] = "purchase";
    COLLECTION_NAME_ENUM["purchase_order"] = "purchase_order";
    COLLECTION_NAME_ENUM["setting"] = "setting";
    COLLECTION_NAME_ENUM["account_type"] = "account_type";
    COLLECTION_NAME_ENUM["account"] = "account";
    COLLECTION_NAME_ENUM["account_statements"] = "account_statements";
    COLLECTION_NAME_ENUM["currency"] = "currency";
    COLLECTION_NAME_ENUM["document_type"] = "document_type";
    COLLECTION_NAME_ENUM["invoice_type"] = "invoice_type";
    COLLECTION_NAME_ENUM["debit_note_type"] = "debit_note_type";
    COLLECTION_NAME_ENUM["credit_note_type"] = "credit_note_type";
    COLLECTION_NAME_ENUM["item_process"] = "item_process";
    COLLECTION_NAME_ENUM["convertion_rate"] = "convertion_rate";
    COLLECTION_NAME_ENUM["acknowledgment"] = "acknowledgment";
    COLLECTION_NAME_ENUM["credit_note"] = "credit_note";
    COLLECTION_NAME_ENUM["debit_note"] = "debit_note";
    COLLECTION_NAME_ENUM["account_entry"] = "account_entry";
    COLLECTION_NAME_ENUM["entry_message"] = "entry_message";
    COLLECTION_NAME_ENUM["workflow"] = "workflow";
    COLLECTION_NAME_ENUM["workflow_process"] = "workflow_process";
    COLLECTION_NAME_ENUM["approve_process"] = "approve_process";
    COLLECTION_NAME_ENUM["manual_entry"] = "manual_entry";
    COLLECTION_NAME_ENUM["manual_entry_old"] = "manual_entry_old";
})(COLLECTION_NAME_ENUM = exports.COLLECTION_NAME_ENUM || (exports.COLLECTION_NAME_ENUM = {}));
var FREQUENCY_TYPE_ENUM;
(function (FREQUENCY_TYPE_ENUM) {
    FREQUENCY_TYPE_ENUM["hour"] = "Hora";
    FREQUENCY_TYPE_ENUM["day"] = "Dia";
    FREQUENCY_TYPE_ENUM["week"] = "Semana";
    FREQUENCY_TYPE_ENUM["month"] = "Mes";
    FREQUENCY_TYPE_ENUM["year"] = "A\u00F1o";
})(FREQUENCY_TYPE_ENUM = exports.FREQUENCY_TYPE_ENUM || (exports.FREQUENCY_TYPE_ENUM = {}));
var NCF_STATUS_ENUM;
(function (NCF_STATUS_ENUM) {
    NCF_STATUS_ENUM["active"] = "Activo";
    NCF_STATUS_ENUM["used"] = "Usado";
})(NCF_STATUS_ENUM = exports.NCF_STATUS_ENUM || (exports.NCF_STATUS_ENUM = {}));
//# sourceMappingURL=enums.js.map