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
exports.EquipmentLibraryTypeModel = exports.scheduleSchema = exports.cadenceSchema = exports.severityBandSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const closeTheLoop_constants_1 = require("../constants/closeTheLoop.constants");
const equipment_constants_1 = require("../constants/equipment.constants");
const validateLibraryType_1 = require("../validators/equipment/validateLibraryType");
const readingEnum = { type: String, enum: equipment_constants_1.READING_NAMES };
// Mongoose's enum validator refuses null unless null is one of the values.
const optionalReading = { type: String, enum: [...equipment_constants_1.READING_NAMES, null], default: null };
const severityBandSchema = new mongoose_1.Schema({
    severity: { type: String, enum: [...closeTheLoop_constants_1.SEVERITIES], required: true },
    threshold: { type: Number, required: true },
}, { _id: false });
exports.severityBandSchema = severityBandSchema;
const cadenceSchema = new mongoose_1.Schema({
    n: { type: Number, required: true, min: 1 },
    unit: { type: String, enum: [...equipment_constants_1.CADENCE_UNITS], required: true },
}, { _id: false });
exports.cadenceSchema = cadenceSchema;
const validRangeSchema = new mongoose_1.Schema({
    min: { type: Number, required: true },
    max: { type: Number, required: true },
}, { _id: false });
const libraryReadingSchema = new mongoose_1.Schema({
    name: { ...readingEnum, required: true },
    tag: { type: String, required: true },
    unit: { type: String, default: '' },
    kind: { type: String, enum: [...equipment_constants_1.READING_KINDS], required: true },
    valid: { type: validRangeSchema, required: true },
    direction: { type: String, enum: [...equipment_constants_1.DIRECTIONS, null], default: null },
}, { _id: false });
const alertSchema = new mongoose_1.Schema({
    key: { type: String, required: true },
    name: { type: String, required: true },
    reading: { ...readingEnum, required: true },
    direction: { type: String, enum: [...equipment_constants_1.DIRECTIONS], required: true },
    bands: { type: [severityBandSchema], default: [] },
    ifDrawn: { type: Boolean, default: false },
    gate: optionalReading,
    flowKey: { type: String, default: null },
    causeKey: { type: String, default: null },
}, { _id: false });
const scheduleSchema = new mongoose_1.Schema({
    key: { type: String, required: true },
    name: { type: String, required: true },
    workType: { type: String, enum: [...equipment_constants_1.WORK_TYPES], required: true },
    basis: { type: String, enum: [...equipment_constants_1.DUE_BASES], required: true, default: 'CALENDAR' },
    every: { type: cadenceSchema, default: null },
    meterHours: { type: Number, default: null, min: 1 },
    hours: { type: Number, default: null, min: 0 },
    parts: { type: String, default: null },
    performedBy: { type: String, enum: [...equipment_constants_1.PERFORMED_BY], default: 'IN_HOUSE' },
    statutory: { type: Boolean, default: false },
    verify: { type: Boolean, default: false },
    flowKey: { type: String, default: null },
    causeKey: { type: String, default: null },
}, { _id: false });
exports.scheduleSchema = scheduleSchema;
const conditionJobSchema = new mongoose_1.Schema({
    key: { type: String, required: true },
    name: { type: String, required: true },
    reading: { ...readingEnum, required: true },
    doWhen: { type: Number, required: true },
    doneWhen: { type: Number, required: true },
    flowKey: { type: String, default: null },
    causeKey: { type: String, default: null },
}, { _id: false });
const nextPhaseSchema = new mongoose_1.Schema({
    readings: {
        type: [new mongoose_1.Schema({ name: { ...readingEnum, required: true }, note: { type: String, default: '' } }, { _id: false })],
        default: [],
    },
    alerts: {
        type: [
            new mongoose_1.Schema({
                name: { type: String, required: true },
                reading: { ...readingEnum, required: true },
                note: { type: String, default: '' },
                direction: { type: String, enum: [...equipment_constants_1.DIRECTIONS], required: true },
                // Some are written before their limits are known ("Discharge pressure low" waits on Maximum Head).
                bands: { type: [severityBandSchema], default: [] },
                flowKey: { type: String, default: null },
                causeKey: { type: String, default: null },
            }, { _id: false }),
        ],
        default: [],
    },
    work: {
        type: [
            new mongoose_1.Schema({ name: { type: String, required: true }, note: { type: String, default: '' }, reading: optionalReading }, { _id: false }),
        ],
        default: [],
    },
}, { _id: false });
const formRuleSchema = new mongoose_1.Schema({
    questionKey: { type: String, default: null },
    question: { type: String, required: true },
    reads: { type: String, enum: [...equipment_constants_1.FORM_RULE_READS], required: true },
    when: {
        type: new mongoose_1.Schema({
            op: { type: String, enum: [...equipment_constants_1.FORM_MATCHES], required: true, default: 'ANSWERED' },
            value: { type: String, default: null },
            flags: { type: String, default: null },
        }, { _id: false }),
        default: () => ({ op: 'ANSWERED' }),
    },
    field: { type: String, default: null },
    derive: { type: String, enum: [...equipment_constants_1.FORM_DERIVATIONS, null], default: null },
    key: { type: String, default: null },
    rawKey: { type: String, default: null },
    uses: { type: [String], default: [] },
    reading: optionalReading,
    direction: { type: String, enum: [...equipment_constants_1.DIRECTIONS, null], default: null },
    factors: {
        type: [
            new mongoose_1.Schema({ severity: { type: String, enum: [...closeTheLoop_constants_1.SEVERITIES], required: true }, factor: { type: Number, required: true, min: 0 } }, { _id: false }),
        ],
        default: [],
    },
    alert: { type: alertSchema, default: null },
    schedule: { type: scheduleSchema, default: null },
    everyBy: {
        type: [
            new mongoose_1.Schema({ pattern: { type: String, required: true }, flags: { type: String, default: null }, every: { type: cadenceSchema, required: true } }, { _id: false }),
        ],
        default: [],
    },
    partsBy: {
        type: [
            new mongoose_1.Schema({
                question: { type: String, required: true },
                pattern: { type: String, required: true },
                flags: { type: String, default: null },
                note: { type: String, required: true },
            }, { _id: false }),
        ],
        default: [],
    },
    adjust: {
        type: new mongoose_1.Schema({
            itemKey: { type: String, required: true },
            performedBy: { type: String, enum: [...equipment_constants_1.PERFORMED_BY, null], default: null },
            note: { type: String, default: null },
            doWhenFactor: { type: Number, default: null },
            doneWhenFactor: { type: Number, default: null },
            partsNote: { type: String, default: null },
        }, { _id: false }),
        default: null,
    },
    why: { type: String, default: null },
    says: { type: String, required: true },
}, { _id: false });
const equipmentLibraryTypeSchema = new mongoose_1.Schema({
    code: { type: String, required: true, trim: true },
    name: { type: String, required: true },
    archetype: { type: String, enum: [...equipment_constants_1.ARCHETYPES], required: true },
    holdsWater: { type: Boolean, default: false },
    tier: { type: String, enum: [...equipment_constants_1.CRITICALITY_TIERS], required: true },
    expects: { type: [{ type: String, enum: [...equipment_constants_1.PROGRAMMES] }], default: [] },
    tagPrefix: { type: String, required: true },
    readings: { type: [libraryReadingSchema], default: [] },
    tagMap: { type: Map, of: { type: String, enum: equipment_constants_1.READING_NAMES }, default: {} },
    alerts: { type: [alertSchema], default: [] },
    schedules: { type: [scheduleSchema], default: [] },
    conditionJobs: { type: [conditionJobSchema], default: [] },
    formRules: { type: [formRuleSchema], default: [] },
    nextPhase: { type: nextPhaseSchema, default: () => ({}) },
    cycles: { type: Boolean, default: false },
    confirm: { type: String, default: null },
    version: { type: Number, required: true, default: 1, min: 1 },
    seededFrom: { type: String, enum: ['prototype-v5', null], default: null },
    isArchived: { type: Boolean, default: false },
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'NewUser', default: null },
    updatedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'NewUser', default: null },
}, { timestamps: true });
equipmentLibraryTypeSchema.pre('validate', function () {
    (0, validateLibraryType_1.validateLibraryType)(this)
        .filter((v) => v.code === 'RULE')
        .forEach((v) => this.invalidate(v.path, v.message));
});
equipmentLibraryTypeSchema.index({ code: 1 }, { unique: true });
const EquipmentLibraryTypeModel = mongoose_1.default.model('EquipmentLibraryType', equipmentLibraryTypeSchema, 'equipmentLibraryTypes');
exports.EquipmentLibraryTypeModel = EquipmentLibraryTypeModel;
