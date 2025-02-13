import mongoose, { Schema } from "mongoose";

interface Answer {
  _id?: string; // Optional if using MongoDB ObjectId
  questionId: string; // Reference to Question model (ObjectId as string)
  assetId: string; // Reference to Plant model (ObjectId as string)
  answer: string | number | boolean | null; // Supports multiple data types
}

const answerSchema = new Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  assetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plant",
    required: true,
  },
  answer: mongoose.Schema.Types.Mixed, // Supports text, array, etc.
});

const AnswerSchemaModel = mongoose.model<Answer>("Answers", answerSchema, "Answers");

export { Answer, AnswerSchemaModel };
