"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyModel = void 0;
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const contactSchema = new mongoose_1.Schema({
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    emailId: { type: String, required: true },
    designation: { type: String, required: true },
    comments: { type: String, required: false },
});
const companySchema = new mongoose_1.Schema({
    companyName: { type: String, required: true },
    companyDescription: { type: String, required: false },
    address: { type: String, required: true },
    tags: {
        type: [String],
        enum: ["sensor", "electrical panel"], // Restrict values
        required: false,
    },
    contacts: { type: [contactSchema], required: true }, // Array of contacts
}, { timestamps: true });
const CompanyModel = mongoose.model("Company", companySchema);
exports.CompanyModel = CompanyModel;
