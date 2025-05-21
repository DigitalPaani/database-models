import mongoose, { Schema, Document, Types } from "mongoose";

interface IEquipmentComponent extends Document {
    bidirectionalId: Types.ObjectId;
    controlValue: string;
    relativeTimeDetails: { unit: string; value: number; timeInMinutes: number };
    createdAt?: Date;
    updatedAt?: Date;
}

const equipmentComponentSchema = new Schema<IEquipmentComponent>(
    {
        bidirectionalId: {
            type: Schema.Types.ObjectId
        },
        controlValue: {
            type: String
        },
        relativeTimeDetails: { unit: String, value: Number, timeInMinutes: Number },
    },
    { strict: false, timestamps: true }
);

const EquipmentComponentModel = mongoose.model<IEquipmentComponent>(
    "equipmentComponents",
    equipmentComponentSchema,
    "equipmentComponents");

export { EquipmentComponentModel, IEquipmentComponent };
