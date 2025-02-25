"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunicationComponentsModel = void 0;
const mongoose_1 = require("mongoose");
const triggerConst_1 = require("../constants/triggerConst");
// Define the embedded schema for the message body
const communicationComponentsSchema = new mongoose_1.Schema({
    to: { type: String, required: true },
    emailSubject: { type: String }, // Only for EMAIL type
    message: { type: String },
    emailAttachment: { type: String }, // S3 link for EMAIL
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
    serviceType: {
        type: String,
        enum: Object.values(triggerConst_1.COMMUNICATION_COMPONENT_SERVICE_TYPE),
        required: true,
    },
    code: { type: String, required: true },
}, { _id: false });
const CommunicationComponentsModel = (0, mongoose_1.model)("communicationComponents", communicationComponentsSchema, "communicationComponents");
exports.CommunicationComponentsModel = CommunicationComponentsModel;
