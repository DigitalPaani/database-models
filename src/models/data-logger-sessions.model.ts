import mongoose, { Schema, Document } from "mongoose";

interface IDataLoggerSession extends Document {
    code: number;
    serialNumber: string;
    isDeleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

const dataLoggerSessionSchema = new Schema<IDataLoggerSession>(
    {
        code: {
            type: Number,
            required: true,
        },
        serialNumber: {
            type: String,
            required: true,
        },
        isDeleted: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    { timestamps: true }
);

const DataLoggerSessionModel = mongoose.model<IDataLoggerSession>(
    "dataLoggerSessions",
    dataLoggerSessionSchema,
    "dataLoggerSessions"
);

export { DataLoggerSessionModel, IDataLoggerSession };
