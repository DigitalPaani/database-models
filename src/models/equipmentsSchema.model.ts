import mongoose, { Schema } from "mongoose";

interface IEquipment extends Document {
  equipmentId: string;
  equipmentName: object;
}

const EquipmentsSchema = new Schema(
  {
    equipmentId: String,
    equipmentName: String,
  },
  { timestamps: true }
);

const EquipmentsModel = mongoose.model<IEquipment>(
  "Equipments",
  EquipmentsSchema,
  "Equipments"
);

export { EquipmentsModel, IEquipment };
