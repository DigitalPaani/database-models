"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunicationComponentsModel = void 0;
const mongoose_1 = require("mongoose");
const triggerConst_1 = require("../constants/triggerConst");
// Define the embedded schema for the message body
const communicationComponentsSchema = new mongoose_1.Schema({
    userIds: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "NewUser" }],
    emailSubject: { type: String }, // Only for EMAIL type
    message: { type: String },
    attachments: [{ name: String, link: String }],
    whatsappContentSid: { type: String }, // Only for WHATSAPP type
    whatsappContentVariables: {
        // Only for WHATSAPP type
        type: mongoose_1.Schema.Types.Mixed,
        default: {},
    },
    type: {
        type: String,
        enum: Object.values(triggerConst_1.COMMUNICATION_COMPONENT_TYPES),
        required: true,
    },
}, { timestamps: true });
const CommunicationComponentsModel = (0, mongoose_1.model)("communicationComponents", communicationComponentsSchema, "communicationComponents");
exports.CommunicationComponentsModel = CommunicationComponentsModel;
