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
var approve_process_schema_1 = require("../../schemas/configuration/approve.process.schema");
var base_model_1 = require("../base.model");
var enums_1 = require("../../utils/enums");
var workflow_process_schema_1 = require("../../schemas/configuration/workflow.process.schema");
var manual_entry_model_1 = require("../administration/manual.entry.model");
var ApproveProcessModel = /** @class */ (function (_super) {
    __extends(ApproveProcessModel, _super);
    function ApproveProcessModel() {
        return _super.call(this, approve_process_schema_1.ApproveProcessSchema, enums_1.COLLECTION_NAME_ENUM.approve_process) || this;
    }
    ApproveProcessModel.prototype.reject = function (proccess) {
        return __awaiter(this, void 0, void 0, function () {
            var workflow_processModel, processes, process_1, manual_approveModel, manual_entry;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        workflow_processModel = new base_model_1.BaseModel(workflow_process_schema_1.WorkflowProcessSchema, enums_1.COLLECTION_NAME_ENUM.workflow_process);
                        return [4 /*yield*/, workflow_processModel.filter({
                                _id: { $ne: proccess.workflow_process._id },
                                workflow: proccess.workflow._id,
                                order: proccess.workflow_process.order - 1
                            }, null, { order: 1 })];
                    case 1:
                        processes = _a.sent();
                        if (!(processes.length > 0)) return [3 /*break*/, 3];
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
                        return [4 /*yield*/, this.save(process_1)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 3:
                        if (!!!proccess.manual_entry) return [3 /*break*/, 6];
                        manual_approveModel = new manual_entry_model_1.ManualEntryModel();
                        return [4 /*yield*/, manual_approveModel.get(proccess.manual_entry._id)];
                    case 4:
                        manual_entry = _a.sent();
                        manual_entry.status = enums_1.MANUAL_ENTRY_STATUS_ENUM.rejected;
                        return [4 /*yield*/, manual_approveModel.update(manual_entry._id, manual_entry)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        proccess.approved = false;
                        proccess.date = new Date();
                        return [4 /*yield*/, this.update(proccess['_id'], proccess)];
                    case 7:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ApproveProcessModel.prototype.approve = function (proccess) {
        return __awaiter(this, void 0, void 0, function () {
            var workflow_processModel, processes, proc, manual_approveModel, manual_entry;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        workflow_processModel = new base_model_1.BaseModel(workflow_process_schema_1.WorkflowProcessSchema, enums_1.COLLECTION_NAME_ENUM.workflow_process);
                        return [4 /*yield*/, workflow_processModel.filter({
                                _id: { $ne: proccess.workflow_process._id },
                                workflow: proccess.workflow._id,
                                order: proccess.workflow_process.order + 1
                            }, null, { order: 1 })];
                    case 1:
                        processes = _a.sent();
                        if (!(processes.length > 0)) return [3 /*break*/, 3];
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
                        return [4 /*yield*/, this.save(proc)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 3:
                        if (!!!proccess.manual_entry) return [3 /*break*/, 6];
                        manual_approveModel = new manual_entry_model_1.ManualEntryModel();
                        return [4 /*yield*/, manual_approveModel.get(proccess.manual_entry._id)];
                    case 4:
                        manual_entry = _a.sent();
                        return [4 /*yield*/, manual_approveModel.generate_entry(manual_entry)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        proccess.approved = true;
                        proccess.date = new Date();
                        return [4 /*yield*/, this.update(proccess['_id'], proccess)];
                    case 7:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return ApproveProcessModel;
}(base_model_1.BaseModel));
exports.ApproveProcessModel = ApproveProcessModel;
//# sourceMappingURL=approve.process.model.js.map