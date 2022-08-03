"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var enums_1 = require("../../utils/enums");
exports.CurrencySchema = new mongoose_1.Schema({
    name: String,
    plural_name: String,
    code: String,
    symbol: String,
    symbol_native: String,
    rounding: Number,
    decimal_digits: Number,
    value: {
        type: Number,
        required: false
    },
    create_date: Date,
    create_user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.user
    },
    setting: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: enums_1.COLLECTION_NAME_ENUM.setting
    }
}, { toJSON: { virtuals: true } });
exports.CurrencySchema.virtual('rate', {
    ref: enums_1.COLLECTION_NAME_ENUM.convertion_rate,
    localField: '_id',
    foreignField: 'currency_from',
    justOne: true,
    options: { sort: { date: -1 }, limit: 1 }
});
//# sourceMappingURL=currency.schema.js.map