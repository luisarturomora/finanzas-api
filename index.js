"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var body_parser_1 = require("body-parser");
var mongoose = require("mongoose");
var expressJwt = require('express-jwt');
var cors = require('cors');
/**
 * SCHEMAS
 */
var module_schema_1 = require("./schemas/security/module.schema");
var widget_schema_1 = require("./schemas/security/widget.schema");
var event_log_schema_1 = require("./schemas/security/event.log.schema");
/**
 * ROUTES
 */
var base_router_1 = require("./routes/base.router");
var setting_route_1 = require("./routes/administration/setting.route");
var user_route_1 = require("./routes/security/user.route");
var base_controller_1 = require("./controllers/base.controller");
var client_schema_1 = require("./schemas/administration/client.schema");
var client_type_schema_1 = require("./schemas/configuration/client.type.schema");
var employee_schema_1 = require("./schemas/administration/employee.schema");
var payment_method_schema_1 = require("./schemas/configuration/payment.method.schema");
var office_schema_1 = require("./schemas/administration/office.schema");
var purchase_type_schema_1 = require("./schemas/configuration/purchase.type.schema");
var quotation_schema_1 = require("./schemas/administration/quotation.schema");
var purchase_order_schema_1 = require("./schemas/administration/purchase.order.schema");
var provider_schema_1 = require("./schemas/administration/provider.schema");
var provider_type_schema_1 = require("./schemas/configuration/provider.type.schema");
var item_type_schema_1 = require("./schemas/configuration/item.type.schema");
var position_schema_1 = require("./schemas/configuration/position.schema");
var item_commission_schema_1 = require("./schemas/configuration/item.commission.schema");
var ncf_type_schema_1 = require("./schemas/configuration/ncf.type.schema");
var field_schema_1 = require("./schemas/configuration/field.schema");
var debit_note_type_schema_1 = require("./schemas/configuration/debit.note.type.schema");
var credit_note_type_schema_1 = require("./schemas/configuration/credit.note.type.schema");
/**
 * ROUTES
 */
var invoice_recurrency_route_1 = require("./routes/administration/invoice.recurrency.route");
var invoice_route_1 = require("./routes/administration/invoice.route");
var acknowledgment_route_1 = require("./routes/administration/acknowledgment.route");
var purchase_route_1 = require("./routes/administration/purchase.route");
var stock_route_1 = require("./routes/inventory/stock.route");
var manual_entry_route_1 = require("./routes/administration/manual.entry.route");
var tax_schema_1 = require("./schemas/configuration/tax.schema");
var box_schema_1 = require("./schemas/configuration/box.schema");
var account_schema_1 = require("./schemas/configuration/account.schema");
var account_statements_1 = require("./schemas/configuration/account.statements");
var active_box_schema_1 = require("./schemas/administration/active.box.schema");
var account_type_schema_1 = require("./schemas/administration/account.type.schema");
var ncf_controller_1 = require("./controllers/administration/ncf.controller");
var payment_controller_1 = require("./controllers/administration/payment.controller");
var payment_deposit_controller_1 = require("./controllers/administration/payment.deposit.controller");
var credit_note_controller_1 = require("./controllers/administration/credit.note.controller");
var debit_note_controller_1 = require("./controllers/administration/debit.note.controller");
var account_entry_controller_1 = require("./controllers/administration/account.entry.controller");
var role_schema_1 = require("./schemas/security/role.schema");
var enums_1 = require("./utils/enums");
var package_config_schema_1 = require("./schemas/configuration/package.config.schema");
var currency_schema_1 = require("./schemas/administration/currency.schema");
var item_schema_1 = require("./schemas/administration/item.schema");
var document_type_schema_1 = require("./schemas/configuration/document.type.schema");
var invoice_type_schema_1 = require("./schemas/configuration/invoice.type.schema");
var item_process_schema_1 = require("./schemas/configuration/item.process.schema");
var payment_request_schema_1 = require("./schemas/administration/payment.request.schema");
var convertion_rate_schema_1 = require("./schemas/administration/convertion.rate.schema");
var path_1 = require("path");
var utils_1 = require("./utils/utils");
var account_entry_schema_1 = require("./schemas/administration/account.entry.schema");
var workflow_schema_1 = require("./schemas/configuration/workflow.schema");
var workflow_process_schema_1 = require("./schemas/configuration/workflow.process.schema");
var approve_process_route_1 = require("./routes/configuration/approve.process.route");
var AppServer = /** @class */ (function () {
    function AppServer() {
        var path = process.cwd(), config = utils_1.Config();
        this.dbConfig = config['dbConfig'];
        this.sessionConfig = config['sessionConfig'];
        this.port = config['port'];
        this.max_file_size = config['max_file_size'] || '2mb';
        this.app = express();
        this.app.use(express.static(path_1.join(path, '/files')));
        this.config();
        this.services();
    }
    AppServer.prototype.config = function () {
        this.app.use(function (req, res, next) {
            next();
        });
        this.app.use(cors({
            origin: '*'
        }));
        this.app.use('/api/v1', expressJwt({ secret: this.sessionConfig.secret }));
        this.app.use(body_parser_1.json({ limit: this.max_file_size }));
        this.app.use(body_parser_1.urlencoded({ limit: this.max_file_size, extended: true }));
        var user = this.dbConfig['user'], pwd = this.dbConfig['password'], host = this.dbConfig['host'], db = this.dbConfig['dbName'], port = this.dbConfig['port'], ssl = !!this.dbConfig['ssl'], url = "mongodb://" + host + ":" + port + "/" + db;
        if (ssl) {
            try {
                mongoose.connect("mongodb://" + user + ":" + pwd + "@" + host + ":" + port + "/" + db + "?ssl=true&authSource=admin&replicaSet=Cluster0-shard-0");
            }
            catch (e) {
                console.log(e);
            }
        }
        else if (user && pwd) {
            mongoose.connect(url, {
                db: {
                    native_parser: true
                },
                user: user,
                pass: pwd,
                useNewUrlParser: true
            });
        }
        else {
            mongoose.connect(url, { useNewUrlParser: true });
        }
    };
    AppServer.prototype.services = function () {
        new setting_route_1.SettingRoute(this.app);
        new user_route_1.UserRoute(this.app);
        new base_router_1.BaseRoute(this.app, new base_controller_1.BaseController(null, enums_1.COLLECTION_NAME_ENUM.event_log, event_log_schema_1.EventLogSchema));
        new base_router_1.BaseRoute(this.app, new base_controller_1.BaseController(null, enums_1.COLLECTION_NAME_ENUM.module, module_schema_1.ModuleSchema));
        new base_router_1.BaseRoute(this.app, new base_controller_1.BaseController(null, enums_1.COLLECTION_NAME_ENUM.widget, widget_schema_1.WidgetSchema));
        new base_router_1.BaseRoute(this.app, new base_controller_1.BaseController(null, enums_1.COLLECTION_NAME_ENUM.role, role_schema_1.RoleSchema));
        new invoice_recurrency_route_1.InvoiceRecurrencyRoute(this.app);
        new invoice_route_1.InvoiceRoute(this.app);
        new purchase_route_1.PurchaseRoute(this.app);
        new acknowledgment_route_1.AcknowledgmentRoute(this.app);
        new stock_route_1.StockRoute(this.app);
        new manual_entry_route_1.ManualEntryRoute(this.app);
        new approve_process_route_1.ApproveProcessRoute(this.app);
        new base_router_1.BaseRoute(this.app, new base_controller_1.BaseController(null, enums_1.COLLECTION_NAME_ENUM.client, client_schema_1.ClientSchema));
        new base_router_1.BaseRoute(this.app, new base_controller_1.BaseController(null, enums_1.COLLECTION_NAME_ENUM.employee, employee_schema_1.EmployeeSchema));
        new base_router_1.BaseRoute(this.app, new base_controller_1.BaseController(null, enums_1.COLLECTION_NAME_ENUM.client_type, client_type_schema_1.ClientTypeSchema));
        new base_router_1.BaseRoute(this.app, new base_controller_1.BaseController(null, enums_1.COLLECTION_NAME_ENUM.payment_method, payment_method_schema_1.PaymentMethodSchema));
        new base_router_1.BaseRoute(this.app, new base_controller_1.BaseController(null, enums_1.COLLECTION_NAME_ENUM.payment_request, payment_request_schema_1.PaymentRequestSchema, {
            code: 'SP'
        }));
        new base_router_1.BaseRoute(this.app, new base_controller_1.BaseController(null, enums_1.COLLECTION_NAME_ENUM.office, office_schema_1.OfficeSchema));
        new base_router_1.BaseRoute(this.app, new base_controller_1.BaseController(null, enums_1.COLLECTION_NAME_ENUM.purchase_type, purchase_type_schema_1.PurchaseTypeSchema));
        new base_router_1.BaseRoute(this.app, new base_controller_1.BaseController(null, enums_1.COLLECTION_NAME_ENUM.quotation, quotation_schema_1.QuotationSchema, {
            code: 'C'
        }));
        new base_router_1.BaseRoute(this.app, new base_controller_1.BaseController(null, enums_1.COLLECTION_NAME_ENUM.purchase_order, purchase_order_schema_1.PurchaseOrderSchema, {
            code: 'OC'
        }));
        new base_router_1.BaseRoute(this.app, new base_controller_1.BaseController(null, enums_1.COLLECTION_NAME_ENUM.provider, provider_schema_1.ProviderSchema));
        new base_router_1.BaseRoute(this.app, new base_controller_1.BaseController(null, enums_1.COLLECTION_NAME_ENUM.provider_type, provider_type_schema_1.ProviderTypeSchema));
        new base_router_1.BaseRoute(this.app, new base_controller_1.BaseController(null, enums_1.COLLECTION_NAME_ENUM.package_config, package_config_schema_1.PackageConfigSchema));
        new base_router_1.BaseRoute(this.app, new base_controller_1.BaseController(null, enums_1.COLLECTION_NAME_ENUM.tax, tax_schema_1.TaxSchema));
        new base_router_1.BaseRoute(this.app, new base_controller_1.BaseController(null, enums_1.COLLECTION_NAME_ENUM.box, box_schema_1.BoxSchema));
        new base_router_1.BaseRoute(this.app, new base_controller_1.BaseController(null, enums_1.COLLECTION_NAME_ENUM.active_box, active_box_schema_1.ActiveBoxSchema));
        new base_router_1.BaseRoute(this.app, new base_controller_1.BaseController(null, enums_1.COLLECTION_NAME_ENUM.field, field_schema_1.FieldSchema));
        new base_router_1.BaseRoute(this.app, new base_controller_1.BaseController(null, enums_1.COLLECTION_NAME_ENUM.item_type, item_type_schema_1.ItemTypeSchema));
        new base_router_1.BaseRoute(this.app, new base_controller_1.BaseController(null, enums_1.COLLECTION_NAME_ENUM.item, item_schema_1.ItemSchema));
        new base_router_1.BaseRoute(this.app, new base_controller_1.BaseController(null, enums_1.COLLECTION_NAME_ENUM.ncf_type, ncf_type_schema_1.NcfTypeSchema));
        new base_router_1.BaseRoute(this.app, new base_controller_1.BaseController(null, enums_1.COLLECTION_NAME_ENUM.position, position_schema_1.PositionSchema));
        new base_router_1.BaseRoute(this.app, new base_controller_1.BaseController(null, enums_1.COLLECTION_NAME_ENUM.item_commission, item_commission_schema_1.ItemCommissionSchema));
        new base_router_1.BaseRoute(this.app, new base_controller_1.BaseController(null, enums_1.COLLECTION_NAME_ENUM.account_type, account_type_schema_1.AccountTypeSchema));
        new base_router_1.BaseRoute(this.app, new base_controller_1.BaseController(null, enums_1.COLLECTION_NAME_ENUM.account_entry, account_entry_schema_1.AccountEntrySchema));
        new base_router_1.BaseRoute(this.app, new base_controller_1.BaseController(null, enums_1.COLLECTION_NAME_ENUM.account, account_schema_1.AccountSchema));
        new base_router_1.BaseRoute(this.app, new base_controller_1.BaseController(null, enums_1.COLLECTION_NAME_ENUM.account_statements, account_statements_1.AccountStatementSchema));
        new base_router_1.BaseRoute(this.app, new base_controller_1.BaseController(null, enums_1.COLLECTION_NAME_ENUM.currency, currency_schema_1.CurrencySchema));
        new base_router_1.BaseRoute(this.app, new base_controller_1.BaseController(null, enums_1.COLLECTION_NAME_ENUM.document_type, document_type_schema_1.DocumentTypeSchema));
        new base_router_1.BaseRoute(this.app, new base_controller_1.BaseController(null, enums_1.COLLECTION_NAME_ENUM.invoice_type, invoice_type_schema_1.InvoiceTypeSchema));
        new base_router_1.BaseRoute(this.app, new base_controller_1.BaseController(null, enums_1.COLLECTION_NAME_ENUM.item_process, item_process_schema_1.ItemProcessSchema));
        new base_router_1.BaseRoute(this.app, new base_controller_1.BaseController(null, enums_1.COLLECTION_NAME_ENUM.convertion_rate, convertion_rate_schema_1.ConvertionRateSchema));
        new base_router_1.BaseRoute(this.app, new base_controller_1.BaseController(null, enums_1.COLLECTION_NAME_ENUM.debit_note_type, debit_note_type_schema_1.DebitNoteTypeSchema));
        new base_router_1.BaseRoute(this.app, new base_controller_1.BaseController(null, enums_1.COLLECTION_NAME_ENUM.credit_note_type, credit_note_type_schema_1.CreditNoteTypeSchema));
        new base_router_1.BaseRoute(this.app, new base_controller_1.BaseController(null, enums_1.COLLECTION_NAME_ENUM.workflow, workflow_schema_1.WorkflowSchema, {
            code: 'WF'
        }));
        new base_router_1.BaseRoute(this.app, new base_controller_1.BaseController(null, enums_1.COLLECTION_NAME_ENUM.workflow_process, workflow_process_schema_1.WorkflowProcessSchema, {
            code: 'WP'
        }));
        new base_router_1.BaseRoute(this.app, new credit_note_controller_1.CrebitNoteController());
        new base_router_1.BaseRoute(this.app, new debit_note_controller_1.DebitNoteController());
        new base_router_1.BaseRoute(this.app, new ncf_controller_1.NcfController());
        new base_router_1.BaseRoute(this.app, new payment_controller_1.PaymentController());
        new base_router_1.BaseRoute(this.app, new payment_deposit_controller_1.PaymentDepositController());
        new base_router_1.BaseRoute(this.app, new account_entry_controller_1.AccountEntryController());
        this.app.use(function (err, req, res, next) {
            if (err.name === 'UnauthorizedError') {
                res.status(401).send('Su sessión ha expirado, favor inicio sessión.');
            }
            next();
        });
    };
    AppServer.prototype.run = function () {
        var _this = this;
        var server = this.app.listen(this.port, function () {
            console.log("Server running in port: " + _this.port);
        });
        return server;
    };
    AppServer.bootstrap = function () {
        return new AppServer().run();
    };
    return AppServer;
}());
exports.app = AppServer.bootstrap();
//# sourceMappingURL=index.js.map