import mongoose, { Schema, Document, Types } from "mongoose";

interface IEquipmentComponent extends Document {
    bidirectionalId: Types.ObjectId;
    controlValue: string;
    relativeTimeDetails: { unit: string; value: number; timeInMinutes: number };
    isDeleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

const equipmentComponentSchema = new Schema<IEquipmentComponent>(
    {
        bidirectionalId: {
            type: Schema.Types.ObjectId,
            ref: "bidirectional",
        },
        controlValue: {
            type: String
        },
        relativeTimeDetails: { unit: String, value: Number, timeInMinutes: Number },
        isDeleted: {
            type: Boolean,
            default: false
        },
    },
    { strict: false, timestamps: true }
);

const EquipmentComponentModel = mongoose.model<IEquipmentComponent>(
    "equipmentComponents",
    equipmentComponentSchema,
    "equipmentComponents");

export { EquipmentComponentModel, IEquipmentComponent };
