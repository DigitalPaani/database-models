"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectToDatabase = ConnectToDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
async function ConnectToDatabase({ mongoUri }) {
    try {
        await mongoose_1.default.connect(mongoUri);
        console.log("Connected to MongoDB with database-models");
    }
    catch (error) {
        console.error("Failed to connect to MongoDB with database-models:", error);
        return;
    }
}
