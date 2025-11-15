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
exports.UserConfigurationLogModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const logs_constants_1 = require("../constants/logs.constants");
const newUserSchema = new mongoose_1.Schema({}, { _id: false });
const newUserModel = mongoose_1.default.model("NewUser", newUserSchema);
const userGroupUserRoleSchema = new mongoose_1.Schema({}, { _id: false });
const userGroupUserRoleModel = mongoose_1.default.model("UserGroupUserRole", userGroupUserRoleSchema);
const userGroupWorkspaceAssetUserRoleSchema = new mongoose_1.Schema({}, { _id: false });
const userGroupWorkspaceAssetUserRoleModel = mongoose_1.default.model("UserGroupWorkspaceAssetUserRole", userGroupWorkspaceAssetUserRoleSchema);
const UserConfigurationSchema = new mongoose_1.Schema({
    previousUserDoc: {
        type: newUserModel,
        required: false,
        default: undefined,
    },
    currentUserDoc: {
        type: newUserModel,
        required: false,
        default: undefined,
    },
    previousUserGroupUserRoleDoc: {
        type: [userGroupUserRoleModel],
        required: false,
        default: undefined,
    },
    currentUserGroupUserRoleDoc: {
        type: [userGroupUserRoleModel],
        required: false,
        default: undefined,
    },
    previousUserGroupWorkspaceAssetUserRoleDoc: {
        type: [userGroupWorkspaceAssetUserRoleModel],
        required: false,
        default: undefined,
    },
    currentUserGroupWorkspaceAssetUserRoleDoc: {
        type: [userGroupWorkspaceAssetUserRoleModel],
        required: false,
        default: undefined,
    },
    actionTakenBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'NewUser'
    },
    action: {
        type: String,
        enum: Object.values(logs_constants_1.LOGS_ACTION_ENUM),
    },
    updatedFields: {
        type: {
            newUserUpdatedFields: [String],
            userGroupUserRoleUpdatedFields: [String],
            userGroupWorkspaceAssetUserRoleUpdatedFields: [String]
        },
        required: false
    }
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
});
const UserConfigurationLogModel = mongoose_1.default.model("userConfigurationLogs", UserConfigurationSchema, "user-configuration-logs");
exports.UserConfigurationLogModel = UserConfigurationLogModel;
