"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var manual_entry_schema_1 = require("../../schemas/administration/manual.entry.schema");
var base_model_1 = require("../base.model");
var enums_1 = require("../../utils/enums");
var account_entry_schema_1 = require("../../schemas/administration/account.entry.schema");
var workflow_process_schema_1 = require("../../schemas/configuration/workflow.process.schema");
var approve_process_model_1 = require("../configuration/approve.process.model");
var mail_model_1 = require("../security/mail.model");
var account_schema_1 = require("../../schemas/configuration/account.schema");
var user_model_1 = require("../security/user.model");
var ManualEntryModel = /** @class */ (function (_super) {
    __extends(ManualEntryModel, _super);
    function ManualEntryModel() {
        return _super.call(this, manual_entry_schema_1.ManualEntrySchema, enums_1.COLLECTION_NAME_ENUM.manual_entry, {
            code: 'ME'
        }) || this;
    }
    ManualEntryModel.prototype.save = function (manual_entry) {
        return __awaiter(this, void 0, void 0, function () {
            var me;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.save.call(this, manual_entry)];
                    case 1:
                        me = _a.sent();
                        if (!!manual_entry.workflow) return [3 /*break*/, 2];
                        this.generate_entry(Object.assign({}, me));
                        return [3 /*break*/, 4];
                    case 2:
                        if (!!manual_entry.inout_account) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.start_process(me)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        manual_entry._id = me._id;
                        return [2 /*return*/, manual_entry];
                }
            });
        });
    };
    ManualEntryModel.prototype.update = function (_id, manual_entry) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.update.call(this, _id, manual_entry)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.document_name + " actualizado correctamente."];
                }
            });
        });
    };
    ManualEntryModel.prototype.reject = function (manual_entry) {
        return __awaiter(this, void 0, void 0, function () {
            var workflow_processModel, approve_processModel, approve_proccess, e_1, proccess, processes, process_1, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        workflow_processModel = new base_model_1.BaseModel(workflow_process_schema_1.WorkflowProcessSchema, enums_1.COLLECTION_NAME_ENUM.workflow_process), approve_processModel = new approve_process_model_1.ApproveProcessModel();
                        return [4 /*yield*/, approve_processModel.filter({
                                manual_entry: manual_entry._id,
                                approved: { $exists: false }
                            }, {
                                workflow_process: {
                                    _id: 1,
                                    order: 1
                                },
                                workflow: {
                                    _id: 1
                                }
                            })];
                    case 1:
                        approve_proccess = _a.sent();
                        if (!(approve_proccess.length <= 0)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.model.updateOne({ _id: manual_entry._id }, {
                                $set: { status: enums_1.MANUAL_ENTRY_STATUS_ENUM.rejected }
                            }, {})];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.send_mail(manual_entry.create_user._id, "Rechazo " + manual_entry.code + " " + manual_entry.office.name, "\n                <p> Su entrada numero " + manual_entry.code + " ha sido rechazada por el\n                administrador, desde el sistema Portal Web Contable.</p>\n                <p>Favor revisar los motivos para su correcci\u00F3n.</p>")];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        console.log('Error sending mail.');
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/, manual_entry];
                    case 7:
                        proccess = approve_proccess[0];
                        return [4 /*yield*/, workflow_processModel.filter({
                                _id: { $ne: proccess.workflow_process._id },
                                workflow: proccess.workflow._id,
                                order: proccess.workflow_process.order - 1
                            }, null, { order: 1 })];
                    case 8:
                        processes = _a.sent();
                        if (!(processes.length > 0)) return [3 /*break*/, 10];
                        process_1 = {
                            workflow: proccess.workflow,
                            number: processes[0].order,
                            manual_entry: proccess.manual_entry,
                            workflow_process: processes[0],
                            user: processes[0].user,
                            setting: processes[0].setting,
                            create_date: new Date(),
                            create_user: proccess.user
                        };
                        return [4 /*yield*/, approve_processModel.save(process_1)];
                    case 9:
                        _a.sent();
                        return [3 /*break*/, 12];
                    case 10:
                        manual_entry.status = enums_1.MANUAL_ENTRY_STATUS_ENUM.rejected;
                        return [4 /*yield*/, this.update(manual_entry._id, manual_entry)];
                    case 11:
                        _a.sent();
                        _a.label = 12;
                    case 12:
                        _a.trys.push([12, 14, , 15]);
                        return [4 /*yield*/, this.send_mail(manual_entry.create_user._id, "Rechazo " + manual_entry.code + " " + manual_entry.office.name, "\n            <p> Su entrada numero " + manual_entry.code + " ha sido rechazada por el\n            administrador, desde el sistema Portal Web Contable.</p>\n            <p>Favor revisar los motivos para su correcci\u00F3n.</p>")];
                    case 13:
                        _a.sent();
                        return [3 /*break*/, 15];
                    case 14:
                        e_2 = _a.sent();
                        console.log('Error sending mail.');
                        return [3 /*break*/, 15];
                    case 15:
                        proccess.approved = false;
                        proccess.date = new Date();
                        return [4 /*yield*/, approve_processModel.update(proccess['_id'], proccess)];
                    case 16:
                        _a.sent();
                        return [2 /*return*/, manual_entry];
                }
            });
        });
    };
    ManualEntryModel.prototype.approve = function (manual_entry) {
        return __awaiter(this, void 0, void 0, function () {
            var workflow_processModel, approve_processModel, approve_proccess, e_3, proccess, processes, proc, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        workflow_processModel = new base_model_1.BaseModel(workflow_process_schema_1.WorkflowProcessSchema, enums_1.COLLECTION_NAME_ENUM.workflow_process), approve_processModel = new approve_process_model_1.ApproveProcessModel();
                        return [4 /*yield*/, approve_processModel.filter({
                                manual_entry: manual_entry._id,
                                approved: { $exists: false }
                            }, {
                                workflow_process: {
                                    _id: 1,
                                    order: 1
                                },
                                workflow: {
                                    _id: 1
                                }
                            })];
                    case 1:
                        approve_proccess = _a.sent();
                        if (!(approve_proccess.length <= 0)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.generate_entry(manual_entry)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.send_mail(manual_entry.create_user._id, "Aprobaci\u00F3n " + manual_entry.code + " " + manual_entry.office.name, "\n                <p> Su entrada numero " + manual_entry.code + " ha sido aprobada por el\n                    administrador, desde el sistema Portal Web Contable.</p>")];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        e_3 = _a.sent();
                        console.log('Error sending mail.');
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                    case 7:
                        proccess = approve_proccess[0];
                        return [4 /*yield*/, workflow_processModel.filter({
                                _id: { $ne: proccess.workflow_process._id },
                                workflow: proccess.workflow._id,
                                order: proccess.workflow_process.order + 1
                            }, null, { order: 1 })];
                    case 8:
                        processes = _a.sent();
                        if (!(processes.length > 0)) return [3 /*break*/, 10];
                        proc = {
                            workflow: proccess.workflow,
                            number: processes[0].order,
                            manual_entry: proccess.manual_entry,
                            workflow_process: processes[0],
                            user: processes[0].user,
                            setting: processes[0].setting,
                            create_date: new Date(),
                            create_user: proccess.user
                        };
                        return [4 /*yield*/, approve_processModel.save(proc)];
                    case 9:
                        _a.sent();
                        return [3 /*break*/, 15];
                    case 10: return [4 /*yield*/, this.generate_entry(manual_entry)];
                    case 11:
                        _a.sent();
                        _a.label = 12;
                    case 12:
                        _a.trys.push([12, 14, , 15]);
                        return [4 /*yield*/, this.send_mail(manual_entry.create_user._id, "Aprobaci\u00F3n " + manual_entry.code + " " + manual_entry.office.name, "\n                <p> Su entrada numero " + manual_entry.code + " ha sido aprobada por el\n                    administrador, desde el sistema Portal Web Contable.</p>")];
                    case 13:
                        _a.sent();
                        return [3 /*break*/, 15];
                    case 14:
                        e_4 = _a.sent();
                        console.log('Error sending mail.');
                        return [3 /*break*/, 15];
                    case 15:
                        proccess.approved = true;
                        proccess.date = new Date();
                        return [4 /*yield*/, approve_processModel.update(proccess['_id'], proccess)];
                    case 16:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManualEntryModel.prototype.start_process = function (manual_entry) {
        return __awaiter(this, void 0, void 0, function () {
            var workflow_processModel, approve_processModel, workflow_process, process_2, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        workflow_processModel = new base_model_1.BaseModel(workflow_process_schema_1.WorkflowProcessSchema, enums_1.COLLECTION_NAME_ENUM.workflow_process), approve_processModel = new approve_process_model_1.ApproveProcessModel();
                        return [4 /*yield*/, workflow_processModel.filter({
                                workflow: manual_entry.workflow._id
                            }, {}, {
                                order: 1
                            }, 0, 1)];
                    case 1:
                        workflow_process = _a.sent();
                        if (!(workflow_process.length > 0)) return [3 /*break*/, 7];
                        process_2 = {
                            workflow: manual_entry.workflow,
                            number: 1,
                            manual_entry: manual_entry,
                            workflow_process: workflow_process[0],
                            user: workflow_process[0].user,
                            setting: manual_entry.setting,
                            create_date: new Date(),
                            create_user: manual_entry.create_user
                        };
                        return [4 /*yield*/, approve_processModel.save(process_2)];
                    case 2:
                        _a.sent();
                        manual_entry.status = workflow_process[0].name;
                        return [4 /*yield*/, this.update(manual_entry._id, manual_entry)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, this.send_mail(process_2.user._id, "Pendiente Validaci\u00F3n " + manual_entry.code + " " + manual_entry.office.name, "\n                <p> Usted ha recibido una solicitud de validaci\u00F3n de la entrada\n                    numero " + manual_entry.code + ", desde el sistema Portal Web Contable.</p>\n                <p>\n                    Esta solicitud ha sido enviada por parte del usuario " + manual_entry.create_user.name + " " + manual_entry.create_user.last_name + ", de la sucursal " + manual_entry.office.name + ".\n                </p>")];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        e_5 = _a.sent();
                        console.log('Error sending mail.');
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ManualEntryModel.prototype.generate_entry = function (manual_entry) {
        return __awaiter(this, void 0, void 0, function () {
            var accountEntryModel, account_entries, entries, accountModel, i, entry, account, balance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        accountEntryModel = new base_model_1.BaseModel(account_entry_schema_1.AccountEntrySchema, enums_1.COLLECTION_NAME_ENUM.account_entry), account_entries = manual_entry.entries.map(function (entry) {
                            delete entry._id;
                            entry.create_date = manual_entry.create_date;
                            entry.create_user = manual_entry.create_user;
                            entry.setting = manual_entry.setting;
                            entry.manual_entry = manual_entry;
                            return entry;
                        });
                        return [4 /*yield*/, accountEntryModel.saveMeny(account_entries)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, accountEntryModel.filter({
                                manual_entry: manual_entry._id
                            })];
                    case 2:
                        entries = _a.sent();
                        accountModel = new base_model_1.BaseModel(account_schema_1.AccountSchema, enums_1.COLLECTION_NAME_ENUM.account);
                        i = 0;
                        _a.label = 3;
                    case 3:
                        if (!(i < entries.length)) return [3 /*break*/, 7];
                        entry = entries[i];
                        return [4 /*yield*/, accountModel.get(entry.account._id)];
                    case 4:
                        account = _a.sent(), balance = account.balance || 0;
                        if (entry.origin == account.type.origin) {
                            balance += entry.amount;
                        }
                        else {
                            balance -= entry.amount;
                        }
                        return [4 /*yield*/, accountModel.model.updateOne({ _id: entry.account._id }, { $set: { balance: balance } })];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        i++;
                        return [3 /*break*/, 3];
                    case 7:
                        manual_entry.entries = entries;
                        manual_entry.status = enums_1.MANUAL_ENTRY_STATUS_ENUM.approved;
                        return [4 /*yield*/, _super.prototype.update.call(this, manual_entry._id, manual_entry)];
                    case 8:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManualEntryModel.prototype.send_mail = function (user_id, subject, body) {
        return __awaiter(this, void 0, void 0, function () {
            var userModel, to_user, mailModel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [2 /*return*/]; //Email desabled
                    case 1:
                        to_user = _a.sent();
                        mailModel = new mail_model_1.MailModel();
                        return [4 /*yield*/, mailModel.send(null, [to_user.email], subject, body)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return ManualEntryModel;
}(base_model_1.BaseModel));
exports.ManualEntryModel = ManualEntryModel;
//# sourceMappingURL=manual.entry.model.js.map