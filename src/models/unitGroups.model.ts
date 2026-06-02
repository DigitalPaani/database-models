import type { Document, Model, Types } from 'mongoose';
import mongoose, { Schema } from 'mongoose';

interface IUnitProcessGroup extends Document {
  name: string;
  equipments: Types.ObjectId[];
  setPoints: Types.ObjectId[];
}

const unitProcessGroupSchema = new Schema<IUnitProcessGroup>(
  {
    name: {
      type: String,
      required: true,
    },
    equipments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Equipment',
      },
    ],
    setPoints: [
      {
        type: Schema.Types.ObjectId,
        ref: 'SetPoint',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const UnitProcessGroupModel: Model<IUnitProcessGroup> = mongoose.model<IUnitProcessGroup>(
  'UnitProcessGroup',
  unitProcessGroupSchema,
  'unitProcessGroups'
);

export { UnitProcessGroupModel, IUnitProcessGroup };
