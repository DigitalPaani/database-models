import mongoose, { Schema } from "mongoose";

interface IQuestion extends Document {
  _id?: string; // Optional if using MongoDB ObjectId
  question: string; // Question text
  key: string; // Unique key for reference
  type: "text" | "radio" | "checkbox" | "dropdown" | "date"; // Restrict to valid types
  options?: string[]; // Optional, only for radio, checkbox, dropdown
  required: boolean;
  order: number; // Question order for tracking
  batchId: number;
  plantType: string;
}

const questionSchema = new Schema({
  question: String, // Question text
  key: String, // Unique key for reference
  type: String, // "text", "radio", "checkbox", "dropdown", "date"
  options: [String], // Only for radio, checkbox, dropdown
  required: Boolean,
  order: Number, // New field to track question order
  batchId: Number,
  plantType: String,
});

questionSchema.index({ order: 1 });

const QuestionSchemaModel = mongoose.model<IQuestion>(
  "QuestionSchema",
  questionSchema,
  "QuestionSchemas"
);

export { QuestionSchemaModel, IQuestion };
