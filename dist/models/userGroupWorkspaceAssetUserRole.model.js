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
exports.UserGroupWorkspaceAssetUserRoleModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const userGroupWorkspaceAssetUserRoleSchema = new mongoose_1.Schema({
    userGroupId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "UserGroup",
        required: true,
    },
    assetId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Plant", required: true },
    workspaceId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "NewWorkspace",
        required: true,
    },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "NewUser", required: true },
    roleId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Role", required: true },
}, { timestamps: true });
userGroupWorkspaceAssetUserRoleSchema.index({ userGroupId: 1, assetId: 1, workspaceId: 1, userId: 1, roleId: 1 }, { unique: true });
const UserGroupWorkspaceAssetUserRoleModel = mongoose_1.default.model("UserGroupWorkspaceAssetUserRole", userGroupWorkspaceAssetUserRoleSchema, "userGroup-workspace-asset-user-role");
exports.UserGroupWorkspaceAssetUserRoleModel = UserGroupWorkspaceAssetUserRoleModel;
