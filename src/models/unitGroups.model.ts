import type { Document, Model, Types } from "mongoose";
import mongoose, { Schema } from "mongoose";

interface IUnitProcessGroup extends Document {
  name: string;
  description?:string;
  equipments: Types.ObjectId[];
  assetId: Types.ObjectId;
  setPoints: Types.ObjectId[];
}

const unitProcessGroupSchema = new Schema<IUnitProcessGroup>(
  {
    name: {
      type: String,
      required: true,
    },
    description:{
      type:String,
      required:false
    },
    equipments: [
      {
        type: Schema.Types.ObjectId,
        ref: "LayoutEquipments",
      },
    ],
    assetId: { type: Schema.Types.ObjectId, required: true },
    setPoints: [
      {
        type: Schema.Types.ObjectId,
        ref: "SetPoint",
      },
    ],
  },
  {
    timestamps: true,
  },
);

const UnitProcessGroupModel: Model<IUnitProcessGroup> =
  mongoose.model<IUnitProcessGroup>(
    "UnitProcessGroup",
    unitProcessGroupSchema,
    "unitProcessGroups",
  );

export { UnitProcessGroupModel, IUnitProcessGroup };
