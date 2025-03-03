import mongoose, { Schema } from "mongoose";

interface IEquipment extends Document {
  equipmentId: string;
  equipmentName: object;
  xlineHref: string;
}

const EquipmentsSchema = new Schema(
  {
    equipmentId: String,
    equipmentName: String,
    xlineHref:String,
  },
  { timestamps: true }
);

const EquipmentsModel = mongoose.model<IEquipment>(
  "Equipments",
  EquipmentsSchema,
  "Equipments"
);

export { EquipmentsModel, IEquipment };
