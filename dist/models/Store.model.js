"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const storeSchema = new mongoose_2.Schema({
    name: {
        type: String,
        required: true,
    },
    assets: [
        {
            type: mongoose_2.Schema.Types.ObjectId,
            ref: 'Plant',
        },
    ],
    clients: [
        {
            type: mongoose_2.Schema.Types.ObjectId,
            ref: 'UserGroup',
        },
    ],
    archived: {
        type: Boolean,
        default: false,
    },
    totalItems: {
        type: Number,
        default: 0,
    },
    serialNo: {
        type: Number,
        default: 0,
    },
    storeAbbr: {
        type: String,
        // required: true,
    },
});
// Custom validator to ensure that assets and clients arrays have at least one element
storeSchema.path('assets').validate((value) => value.length >= 1, 'assets array must have at least one element');
storeSchema.path('clients').validate((value) => value.length >= 1, 'clients array must have at least one element');
const Store = mongoose_1.default.model('Store', storeSchema, 'Stores');
exports.Store = Store;
