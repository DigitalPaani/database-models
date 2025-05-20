import mongoose, { Schema, Document, Types } from "mongoose";

interface IEquipmentComponent extends Document {
    bidirectionalId: Types.ObjectId;
    action: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const equipmentComponentSchema = new Schema<IEquipmentComponent>(
    {
        bidirectionalId:{
            type: Schema.Types.ObjectId
        },
        action: {
            type: String
        }
    },
    {strict: false, timestamps: true}
);

const EquipmentComponentModel = mongoose.model<IEquipmentComponent>(
    "equipmentComponents",
    equipmentComponentSchema,
    "equipmentComponents");

export { EquipmentComponentModel, IEquipmentComponent };
