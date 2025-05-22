import mongoose, { Schema, Document, Types } from "mongoose";

interface IBidirectionalLogs extends Document {
    userId: Types.ObjectId;
    bidirectionalId: Types.ObjectId;
    assetId: Types.ObjectId;
    controlValue: string;
    startTime: number;
    endTime?: number;
    ipAddress: string;
    events: {
        triggerId?: Types.ObjectId,
        sensorId?: Types.ObjectId,
        status: boolean
    }[];
    success: boolean;
    isDeleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

const bidirectionalLogsSchema = new Schema<IBidirectionalLogs>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "NewUser"
        },
        bidirectionalId: {
            type: Schema.Types.ObjectId,
            ref: "bidirectional",
        },
        assetId: {
            type: Schema.Types.ObjectId,
            ref: "Plant",
        },
        controlValue: {
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
            triggerId: {
                type: Schema.Types.ObjectId,
                ref: "triggers",
            },
            sensorId: {
                type: Schema.Types.ObjectId,
                ref: "sensors",
            },
            status: Boolean
        },
        success: {
            type: Boolean
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { strict: false, timestamps: true, },
);

const BidirectionalLogsModel = mongoose.model<IBidirectionalLogs>(
    "bidirectionalLogs",
    bidirectionalLogsSchema,
    "bidirectionalLogs"
);

export { BidirectionalLogsModel, IBidirectionalLogs };
