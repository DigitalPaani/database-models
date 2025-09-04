import mongoose, { Schema, Document, Types } from "mongoose";

interface IAnomalyData extends Document {
  triggerId: Types.ObjectId;
  formulaId: Types.ObjectId;

  createdAt?: Date;
  updatedAt?: Date;
}

const anomalyDataSchema = new Schema<IAnomalyData>(
  {
    triggerId: {
      type: Schema.Types.ObjectId,
      ref: "triggers",
    },
    formulaId: {
      type: Schema.Types.ObjectId,
      ref: "formulas",
    },
  },
  { timestamps: true }
);

anomalyDataSchema.index(
  { createdAt: 1 },
  {
    expireAfterSeconds: 120,
    partialFilterExpression: { formulaId: { $exists: true } },
  }
);

const AnomalyDataModel = mongoose.model<IAnomalyData>(
  "anomalyData",
  anomalyDataSchema,
  "anomalyData"
);

export { IAnomalyData, AnomalyDataModel };
