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
exports.NewUserModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Define the schema using the TypeScript interface
const userSchema = new mongoose_1.Schema({
    name: String,
    email: { type: String, required: true }, // Ensure email is unique
    password: String,
    defaultPageId: Object,
    number: String,
    userStatus: String,
    twoFactorAuthentication: Boolean,
    language: String,
    profilePic: String,
    skillIds: { type: [mongoose_1.Schema.Types.ObjectId], required: false },
    parentUserId: { type: mongoose_1.Schema.Types.ObjectId, ref: "NewUser" },
    isStaff: { type: Boolean, required: true, default: false },
    isPhoneNumberVerified: { type: Boolean, default: false },
    isEmailAddressVerified: { type: Boolean, default: false },
    blockedNotificationModules: {
        type: [String],
        default: [],
    },
    // defaultHomePage: { type: String, required: true, default: '' },
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
});
// Define the model using the schema and the TypeScript interface
const NewUserModel = mongoose_1.default.model("NewUser", userSchema, "newUsers");
exports.NewUserModel = NewUserModel;
