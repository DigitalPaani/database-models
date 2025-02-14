import mongoose, { Schema, Types } from "mongoose";

interface IBatch {
  batchId: number; // Reference to Question model (ObjectId as string)
  batchName: string; // Reference to Plant model (ObjectId as string)
  batchOrder: number; // Supports multiple data types
}

const batchSchema = new Schema({
  batchId: {
    type: Number,
    required: true,
  },
  batchName: {
    type: String,
    required: true,
  },
  batchOrder: {
    type: Number,
    required: true,
  },
});

const BatchSchemaModel = mongoose.model<IBatch>(
  "QuestionsBatch",
  batchSchema,
  "QuestionsBatch"
);

export { IBatch, BatchSchemaModel };
