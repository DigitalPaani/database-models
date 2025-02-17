import mongoose, { Schema } from "mongoose";

interface IAnswer {
  _id?: string; // Optional if using MongoDB ObjectId
  questionId: string; // Reference to Question model (ObjectId as string)
  assetId: string; // Reference to Plant model (ObjectId as string)
  answer: string | number | boolean | null; // Supports multiple data types
}

const answerSchema = new Schema(
  {
    questionId: {
      type: Number,
      required: true,
    },
    assetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plant",
      required: true,
    },
    batchId: {
      type: Number,
    },
    answer: mongoose.Schema.Types.Mixed, // Supports text, array, etc.
  },
  { timestamps: true }
);

const AnswerSchemaModel = mongoose.model<IAnswer>(
  "Answers",
  answerSchema,
  "Answers"
);

export { IAnswer, AnswerSchemaModel };
