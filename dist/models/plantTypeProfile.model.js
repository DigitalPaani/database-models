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
exports.PlantTypeProfileModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const equipment_constants_1 = require("../constants/equipment.constants");
const validatePlantType_1 = require("../validators/equipment/validatePlantType");
const equipmentLibraryType_model_1 = require("./equipmentLibraryType.model");
const plantTypeProfileSchema = new mongoose_1.Schema({
    code: { type: String, enum: [...equipment_constants_1.PLANT_TYPES], required: true },
    name: { type: String, required: true },
    usualTypeCodes: { type: [String], default: [] },
    rounds: { type: [equipmentLibraryType_model_1.scheduleSchema], default: [] },
    milestones: {
        type: [new mongoose_1.Schema({ key: { type: String, required: true }, name: { type: String, required: true } }, { _id: false })],
        default: [],
    },
    version: { type: Number, required: true, default: 1, min: 1 },
}, { timestamps: true });
plantTypeProfileSchema.pre('validate', function () {
    (0, validatePlantType_1.validatePlantType)(this).forEach((v) => this.invalidate(v.path, v.message));
});
plantTypeProfileSchema.index({ code: 1 }, { unique: true });
const PlantTypeProfileModel = mongoose_1.default.model('PlantTypeProfile', plantTypeProfileSchema, 'plantTypeProfiles');
exports.PlantTypeProfileModel = PlantTypeProfileModel;
