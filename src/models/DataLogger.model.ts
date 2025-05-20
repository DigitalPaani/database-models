import mongoose, { Schema, Document, Types } from "mongoose";

interface IDataLogger extends Document {
    name: string;
    description: string;
    assetId: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

const dataLoggerSchema = new Schema<IDataLogger>(
    {
        name: {
            type: String,
        },
        description: {
            type: String,
        },
        assetId: {
            type: Schema.Types.ObjectId,
            required: false,
        },
    },
    { strict: false, timestamps: true },
);

const DataLoggerModel = mongoose.model<IDataLogger>(
    "dataLoggers",
    dataLoggerSchema,
    "dataLoggers");

export { DataLoggerModel, IDataLogger };
