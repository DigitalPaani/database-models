import mongoose, { Schema, Document } from "mongoose";

interface IMigrateSensorIds extends Document {
  latestId: string;
  oldIds: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const migrateSensorIdsSchema = new Schema<IMigrateSensorIds>(
  {
    latestId: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    oldIds: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

const MigrateSensorIdsModel = mongoose.model<IMigrateSensorIds>(
  "migrateSensorIds",
  migrateSensorIdsSchema,
  "migrateSensorIds"
);

export { MigrateSensorIdsModel, IMigrateSensorIds };
