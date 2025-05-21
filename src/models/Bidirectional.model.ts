import mongoose, { Schema, Document, Types } from "mongoose";

interface IBidirectional extends Document {
    dataLoggerId: Types.ObjectId;
    assetId: Types.ObjectId;
    referenceSensors: any;
    equipmentId: Types.ObjectId;
    bidirectionalSensorId: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

const bidirectionalSchema = new Schema<IBidirectional>(
    {
        dataLoggerId: {
            type: Schema.Types.ObjectId,
        },
        assetId: {
            type: Schema.Types.ObjectId,
        },
        referenceSensors: {
            type: Object,
        },
        equipmentId: {
            type: Schema.Types.ObjectId,
        },
        bidirectionalSensorId: {
            type: Schema.Types.ObjectId,
        },

    },
    { strict: false, timestamps: true },
);

const BidirectionalModel = mongoose.model<IBidirectional>(
    "bidirectional",
    bidirectionalSchema,
    "bidirectional");

export { BidirectionalModel, IBidirectional };
