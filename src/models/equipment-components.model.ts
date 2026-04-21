import mongoose, { Schema, Document, Types } from "mongoose";

interface IEquipmentComponent extends Document {
  bidirectionalLogId: Types.ObjectId;
  scheduledBidirectionalLogId?: Types.ObjectId;
  triggerId: Types.ObjectId;
  controlValue: string;
  softwareBypassValue?: string;
  triggerTime: number;
  isTriggered: boolean;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const equipmentComponentSchema = new Schema<IEquipmentComponent>(
  {
    bidirectionalLogId: {
      type: Schema.Types.ObjectId,
      ref: "bidirectionalLogs",
      required: true,
    },
    scheduledBidirectionalLogId: {
      type: Schema.Types.ObjectId,
      ref: "bidirectionalLogs",
      required: false,
    },
    triggerId: {
      type: Schema.Types.ObjectId,
      ref: "triggers",
      required: true,
    },
    controlValue: {
      type: String,
      required: true,
    },
    softwareBypassValue: {
      type: String,
      trim: true,
    },
    triggerTime: {
      type: Number,
      required: true,
    },
    isTriggered: {
      type: Boolean,
      default: false,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

const EquipmentComponentModel = mongoose.model<IEquipmentComponent>(
  "equipmentComponents",
  equipmentComponentSchema,
  "equipmentComponents"
);

export { EquipmentComponentModel, IEquipmentComponent };
