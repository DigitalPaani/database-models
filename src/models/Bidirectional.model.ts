import mongoose, { Schema, Document, Types } from "mongoose";

interface IBidirectional extends Document {
  dataLoggerId: Types.ObjectId;
  assetId: Types.ObjectId;
  referenceSensors: {
    controlSensorId: Types.ObjectId;
    tripSensorId: Types.ObjectId;
    hmiSensorId: Types.ObjectId;
    softwareSensorId: Types.ObjectId;
    manualSensorId: Types.ObjectId;
    bypassFormulaSensorId: Types.ObjectId;
  };
  equipmentId: Types.ObjectId;
  bidirectionalSensorId: Types.ObjectId;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const bidirectionalSchema = new Schema<IBidirectional>(
  {
    dataLoggerId: {
      type: Schema.Types.ObjectId,
      ref: "dataLoggers",
      required: true,
    },
    assetId: {
      type: Schema.Types.ObjectId,
      ref: "Plant",
      required: true,
    },
    referenceSensors: {
      controlSensorId: {
        type: Schema.Types.ObjectId,
        ref: "sensors",
      },
      tripSensorId: {
        type: Schema.Types.ObjectId,
        ref: "sensors",
      },
      hmiSensorId: {
        type: Schema.Types.ObjectId,
        ref: "sensors",
      },
      softwareSensorId: {
        type: Schema.Types.ObjectId,
        ref: "sensors",
      },
      manualSensorId: {
        type: Schema.Types.ObjectId,
        ref: "sensors",
      },
      bypassFormulaSensorId: {
        type: Schema.Types.ObjectId,
        ref: "sensors",
      },
    },
    equipmentId: {
      type: Schema.Types.ObjectId,
      ref: "LayoutEquipments",
      required: true,
    },
    bidirectionalSensorId: {
      type: Schema.Types.ObjectId,
      ref: "sensors",
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

const BidirectionalModel = mongoose.model<IBidirectional>(
  "bidirectional",
  bidirectionalSchema,
  "bidirectional"
);

export { BidirectionalModel, IBidirectional };
