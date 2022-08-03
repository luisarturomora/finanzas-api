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
var base_model_1 = require("../base.model");
var enums_1 = require("../../utils/enums");
var utils_1 = require("../../utils/utils");
var mongoose_1 = require("mongoose");
var account_entry_model_1 = require("./account.entry.model");
var payment_deposit_schema_1 = require("../../schemas/administration/payment.deposit.schema");
var payment_model_1 = require("./payment.model");
var PaymentDepositModel = /** @class */ (function (_super) {
    __extends(PaymentDepositModel, _super);
    function PaymentDepositModel() {
        return _super.call(this, payment_deposit_schema_1.PaymentDepositSchema, enums_1.COLLECTION_NAME_ENUM.payment_deposit) || this;
    }
    PaymentDepositModel.prototype.save = function (_deposit) {
        return __awaiter(this, void 0, void 0, function () {
            var session, code, accountEntryModel, paymentModel, deposit, i, payment, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongoose_1.startSession()];
                    case 1:
                        session = _a.sent();
                        return [4 /*yield*/, session.startTransaction()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 12, , 13]);
                        return [4 /*yield*/, utils_1.Utils.generate_code('PD', _deposit.setting, this)];
                    case 4:
                        code = _a.sent(), accountEntryModel = new account_entry_model_1.AccountEntryModel(), paymentModel = new payment_model_1.PaymentModel();
                        _deposit.code = code;
                        _deposit.status = enums_1.PAYMENT_DEPOSIT_STATUS_ENUN.created;
                        return [4 /*yield*/, _super.prototype.save.call(this, _deposit)];
                    case 5:
                        deposit = _a.sent();
                        return [4 /*yield*/, accountEntryModel.payment_deposit_entry(deposit)];
                    case 6:
                        _a.sent();
                        i = 0;
                        _a.label = 7;
                    case 7:
                        if (!(i < _deposit.payments.length)) return [3 /*break*/, 11];
                        payment = _deposit.payments[i];
                        return [4 /*yield*/, paymentModel.model.update({
                                _id: payment._id
                            }, {
                                $set: {
                                    status: enums_1.PAYMENT_STATUS_ENUN.deposited
                                }
                            })];
                    case 8:
                        _a.sent();
                        payment.create_user = payment.create_user;
                        payment.note = payment.note;
                        payment.setting = payment.setting;
                        payment.create_date = payment.create_date;
                        return [4 /*yield*/, accountEntryModel.payment_entry(payment, false)];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10:
                        i++;
                        return [3 /*break*/, 7];
                    case 11:
                        session.commitTransaction();
                        return [2 /*return*/, deposit];
                    case 12:
                        error_1 = _a.sent();
                        session.abortTransaction();
                        console.log(error_1);
                        throw new Error(error_1);
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    return PaymentDepositModel;
}(base_model_1.BaseModel));
exports.PaymentDepositModel = PaymentDepositModel;
//# sourceMappingURL=payment.deposit.model.js.map