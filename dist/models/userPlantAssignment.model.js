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
exports.UserPlantAssignmentModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Kept in sync with node-backend src/constants/roleTemplates.ts (ROLE_KEYS).
const ROLE_KEYS = [
    'L1_OPERATOR',
    'L2',
    'L3_LEAD',
    'L4_SENIOR_LEAD',
    'NON_OP',
    'REGULAR_NON_OP',
    'SENIOR_NON_OP',
];
const userPlantAssignmentSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'NewUser', required: true },
    plantId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Plant', required: true },
    // @deprecated One role per person now lives on NewUser.roleKey. This row is
    // membership: it says the user works at this plant, nothing about what they
    // may do there. Kept (optional, unread) so historical rows still load.
    roleKey: { type: String, enum: [...ROLE_KEYS, null], required: false, default: null },
    assignedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'NewUser', required: true },
    migratedFrom: { type: mongoose_1.Schema.Types.ObjectId, default: null },
    isArchived: { type: Boolean, default: false },
}, { timestamps: true });
// One role per (user, plant) — "no stacking" (§5), read plant-locally.
userPlantAssignmentSchema.index({ userId: 1, plantId: 1 }, { unique: true, partialFilterExpression: { isArchived: false } });
// Hot path: build a user's whole plant→role map in one query.
userPlantAssignmentSchema.index({ userId: 1, isArchived: 1 });
// "Who are the L4s at this plant?" — needed to warn when a plant has none,
// which would jam auto-issue force-closes (co-sign is plant-local).
userPlantAssignmentSchema.index({ plantId: 1, roleKey: 1, isArchived: 1 });
const UserPlantAssignmentModel = mongoose_1.default.model('UserPlantAssignment', userPlantAssignmentSchema, 'userPlantAssignments');
exports.UserPlantAssignmentModel = UserPlantAssignmentModel;
