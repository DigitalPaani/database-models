"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlantModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const PlantSchema = new mongoose_1.Schema({
    plantName: String,
    status: String,
    lat: String,
    workspaceId: mongoose_1.Schema.Types.ObjectId,
    userGroupId: mongoose_1.Schema.Types.ObjectId,
    long: String,
    description: String,
    schematic: String,
    sensorfreq: String,
    plantType: String,
    createdOn: Date,
    tur: String,
    location: {
        lat: String,
        lng: String,
        place: String
    },
    autoEmailing: {
        dailyReportPageId: mongoose_1.Schema.Types.ObjectId,
        weeklyReportPageId: mongoose_1.Schema.Types.ObjectId,
        monthlyReportPageId: mongoose_1.Schema.Types.ObjectId,
    },
    embeddedLinks: [
        {
            name: String,
            link: String,
        },
    ],
    subTopic: String,
    pubTopic: String,
    abbr: String,
    userGroup: {
        id: mongoose_1.Schema.Types.ObjectId,
        name: String,
        abbr: String,
    },
});
const PlantModel = mongoose_1.default.model('Plant', PlantSchema, 'Plants');
exports.PlantModel = PlantModel;
