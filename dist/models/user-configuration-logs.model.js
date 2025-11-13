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
exports.UserConfigurationModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const userGroupUserRole_model_1 = require("./userGroupUserRole.model");
const newUserModel_1 = require("./newUserModel");
const userGroupWorkspaceAssetUserRole_model_1 = require("./userGroupWorkspaceAssetUserRole.model");
const user_configuration_logs_constants_1 = require("../constants/user-configuration-logs.constants");
const UserConfigurationSchema = new mongoose_1.Schema({
    previousUserDoc: {
        type: newUserModel_1.NewUserModel.schema,
        required: false,
        default: undefined
    },
    currentUserDoc: {
        type: newUserModel_1.NewUserModel.schema,
        required: false,
        default: undefined
    },
    previousUserGroupUserRoleDoc: {
        type: [userGroupUserRole_model_1.UserGroupUserRoleModel.schema],
        required: false,
        default: undefined
    },
    currentUserGroupUserRoleDoc: {
        type: [userGroupUserRole_model_1.UserGroupUserRoleModel.schema],
        required: false,
        default: undefined
    },
    previousUserGroupWorkspaceAssetUserRoleDoc: {
        type: [userGroupWorkspaceAssetUserRole_model_1.UserGroupWorkspaceAssetUserRoleModel.schema],
        required: false,
        default: undefined
    },
    currentUserGroupWorkspaceAssetUserRoleDoc: {
        type: [userGroupWorkspaceAssetUserRole_model_1.UserGroupWorkspaceAssetUserRoleModel.schema],
        required: false,
        default: undefined
    },
    actionTakenBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'NewUser'
    },
    action: {
        type: String,
        enum: Object.values(user_configuration_logs_constants_1.USER_CONFIG_LOGS_ACTION_ENUM),
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
const UserConfigurationModel = mongoose_1.default.model("userConfigurationLogs", UserConfigurationSchema, "user-configuration-logs");
exports.UserConfigurationModel = UserConfigurationModel;
