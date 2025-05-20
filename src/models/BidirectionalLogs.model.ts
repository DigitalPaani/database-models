import mongoose, { Schema, Document, Types } from "mongoose";

interface IBidirectionalLogs extends Document {
    userId: Types.ObjectId;
    equipmentId: Types.ObjectId;
    assetId: Types.ObjectId;
    action: string;
    startTime: number;
    endTime?: number;
    ipAddress: string;
    events: any;
    success: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

const bidirectionalLogsSchema = new Schema<IBidirectionalLogs>(
    {
        userId: {
            type: Schema.Types.ObjectId,
        },
        equipmentId: {
            type: Schema.Types.ObjectId,
        },
        assetId: {
            type: Schema.Types.ObjectId,
        },
        action: {
            type: String,
        },
        startTime: {
            type: Number,
        },
        endTime: {
            type: Number,
        },
        ipAddress: {
            type: String,
        },
        events: {
            type: [Object],
        },
        success: {
            type: Boolean
        }

    },
    { strict: false, timestamps: true },
);

const BidirectionalLogsModel = mongoose.model<IBidirectionalLogs>(
    "bidirectionalLogs",
    bidirectionalLogsSchema,
    "bidirectionalLogs");

export { BidirectionalLogsModel, IBidirectionalLogs };
