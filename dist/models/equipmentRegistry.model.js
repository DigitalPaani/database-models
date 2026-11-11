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
exports.EquipmentRegistryModel = exports.STORED_SOURCES = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const equipment_constants_1 = require("../constants/equipment.constants");
const validateRegistryEntry_1 = require("../validators/equipment/validateRegistryEntry");
const equipmentLibraryType_model_1 = require("./equipmentLibraryType.model");
/*
 * The equipment registry: one document per machine, a SCADA node that is equipment, at a plant. It holds who the
 * machine is, which library type it is, what SCADA said about it at the last apply, and its deltas against the
 * library. It does not copy the library's alerts, schedules or limits: only `overrides` stay the plant's own.
 *
 * Detection is one rule: typeCode = storedCode ?? drawnCode. Nothing is guessed from a label, and a form answer
 * never changes a type.
 *
 * Name clash to watch: LayoutEquipments.equipmentType is a coarse bucket (TANK, PUMP, VALVE …) from
 * TypeOfEquipment(). The type stored on a drawing cell is also called equipmentType there, but it is a palette code
 * ('OS_TANK' on a cell drawn as OS_TANK_DF), and it lives only in Layouts.layout.cells[]. `storedCode` is the second
 * one, never the first.
 *
 * The same schema as node-backend's src/components/equipment/models/equipmentRegistry.model.ts, which owns this
 * collection. Change the two together.
 */
/**
 * explicit: the cell stores a type that is not its shape's default, so someone chose it.
 * shape-default: the cell stores the default its frontend shape class writes (every Diffuser Tank stores OS_TANK).
 *   storedCode keeps it when the apply honours shape defaults, and is null when it does not, so typeCode falls back
 *   to the drawn code. Kept either way, so a preview can say which rule decided the type.
 */
exports.STORED_SOURCES = ['explicit', 'shape-default'];
const tierOverrideSchema = new mongoose_1.Schema({
    tier: { type: String, enum: [...equipment_constants_1.CRITICALITY_TIERS], required: true },
    reason: { type: String, required: true, trim: true },
    by: { type: mongoose_1.Schema.Types.ObjectId, ref: 'NewUser', required: true },
    at: { type: Date, required: true },
}, { _id: false });
const overrideSchema = new mongoose_1.Schema({
    kind: { type: String, enum: [...equipment_constants_1.LIBRARY_ITEM_KINDS], required: true },
    key: { type: String, required: true },
    off: { type: Boolean, default: false },
    direction: { type: String, enum: [...equipment_constants_1.DIRECTIONS, null], default: null },
    // Absent, not empty, when the override leaves the bands alone: [] would read as "no bands".
    bands: { type: [equipmentLibraryType_model_1.severityBandSchema], default: undefined },
    basis: { type: String, enum: [...equipment_constants_1.DUE_BASES, null], default: null },
    every: { type: equipmentLibraryType_model_1.cadenceSchema, default: null },
    meterHours: { type: Number, default: null, min: 1 },
    performedBy: { type: String, enum: [...equipment_constants_1.PERFORMED_BY, null], default: null },
    doWhen: { type: Number, default: null },
    doneWhen: { type: Number, default: null },
    reason: { type: String, required: true, trim: true },
    by: { type: mongoose_1.Schema.Types.ObjectId, ref: 'NewUser', required: true },
    at: { type: Date, required: true },
}, { _id: false });
const maintenanceSchema = new mongoose_1.Schema({
    reason: { type: String, required: true, trim: true },
    plannedHours: { type: Number, required: true, min: 0 },
    note: { type: String, default: '' },
    since: { type: Date, required: true },
    by: { type: mongoose_1.Schema.Types.ObjectId, ref: 'NewUser', required: true },
    suppressedAlertKeys: { type: [String], default: [] },
}, { _id: false });
const equipmentRegistrySchema = new mongoose_1.Schema({
    plantId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Plant', required: true },
    // No ref, to match node-backend's copy, where LayoutEquipments lives on another mongoose. Here it can be
    // populated by passing the model: populate({ path: 'layoutEquipmentId', model: LayoutEquipmentModel }).
    layoutEquipmentId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    layoutCellId: { type: String, default: null },
    name: { type: String, default: '' },
    tag: { type: String, required: true, trim: true },
    drawnCode: { type: String, required: true },
    storedCode: { type: String, default: null },
    storedSource: { type: String, enum: [...exports.STORED_SOURCES, null], default: null },
    recordNodeType: { type: String, default: null },
    typeCode: { type: String, required: true },
    libraryTypeId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'EquipmentLibraryType', default: null },
    libraryVersion: { type: Number, default: null },
    tierOverride: { type: tierOverrideSchema, default: null },
    derived: { type: Map, of: Number, default: {} },
    flags: { type: Map, of: mongoose_1.Schema.Types.Mixed, default: {} },
    overrides: { type: [overrideSchema], default: [] },
    maintenance: { type: maintenanceSchema, default: null },
    lastSyncedAt: { type: Date, default: null },
    isArchived: { type: Boolean, default: false },
}, 
// Two admins on one machine's card: the second save sees the first's __v moved and fails, rather than writing its
// stale overrides array over the first's. The apply's bulkWrite leaves __v alone and never touches those fields.
{ timestamps: true, optimisticConcurrency: true });
equipmentRegistrySchema.pre('validate', function () {
    this.typeCode = (0, validateRegistryEntry_1.typeCodeOf)(this);
    (0, validateRegistryEntry_1.validateRegistryEntry)(this).forEach((v) => this.invalidate(v.path, v.message));
});
equipmentRegistrySchema.index({ layoutEquipmentId: 1 }, { unique: true });
equipmentRegistrySchema.index({ plantId: 1, tag: 1 }, { unique: true, partialFilterExpression: { isArchived: false } });
// "Where the library lands": every machine of a type, across the estate.
equipmentRegistrySchema.index({ typeCode: 1, plantId: 1 });
// Machines behind their library type's version.
equipmentRegistrySchema.index({ libraryTypeId: 1, libraryVersion: 1 });
const EquipmentRegistryModel = mongoose_1.default.model('EquipmentRegistry', equipmentRegistrySchema, 'equipmentRegistry');
exports.EquipmentRegistryModel = EquipmentRegistryModel;
