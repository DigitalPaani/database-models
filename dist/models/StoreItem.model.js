"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreItemsModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const ExpectedUsage = new mongoose_2.Schema({
    value: {
        type: Number,
        default: 0,
        required: false,
    },
    unit: {
        type: String,
        required: false,
    },
    timeMins: {
        type: Number,
        default: 1,
        required: false,
    },
    time: {
        type: Number,
        default: 1,
        required: false,
    },
    timeUnit: {
        type: String,
        default: 'minute',
        required: false,
    },
});
const StoreItemDetails = new mongoose_2.Schema({
    itemId: {
        type: mongoose_2.Schema.Types.ObjectId,
        required: false,
    },
    name: {
        type: String,
        required: true,
    },
    customItemName: { type: String, required: false },
    min: {
        type: Number,
        required: false,
    },
    max: {
        type: Number,
        required: false,
    },
    unit: {
        type: String,
        default: '',
        required: false,
    },
    assetIds: [
        {
            type: mongoose_2.Schema.Types.ObjectId,
            ref: 'Plant',
        },
    ],
    expectedValue: {
        type: [ExpectedUsage],
        required: false,
    },
    sensors: {
        type: [{ type: mongoose_2.Schema.Types.ObjectId, ref: 'sensors' }],
        required: true,
    },
});
const StoreItemsSchema = new mongoose_2.Schema({
    storeId: { type: mongoose_2.Schema.Types.ObjectId, required: true },
    storeCategoryName: {
        type: String,
        required: true,
    },
    storeItemDetails: {
        type: [StoreItemDetails],
        required: true,
        _id: false,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    updatedAt: {
        type: Date,
        required: true,
    },
});
const assetIdsPath = StoreItemDetails.path('assetIds');
if ((assetIdsPath === null || assetIdsPath === void 0 ? void 0 : assetIdsPath.instance) === 'Array') {
    assetIdsPath.validate((value) => value.length >= 1, 'assetIds array must have at least one element');
}
const StoreItemsModel = mongoose_1.default.model('StoreItems', StoreItemsSchema, 'StoreItems');
exports.StoreItemsModel = StoreItemsModel;
