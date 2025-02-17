import mongoose, { Schema } from "mongoose";

interface IQuestion extends Document {
  _id?: string; // Optional if using MongoDB ObjectId
  question: string; // Question text
  tag: string; // Unique key for reference
  conditionalQuestionId:number;
  conditionalAnswer:[string];
  type: "text" | "radio" | "checkbox" | "dropdown" | "date"; // Restrict to valid types
  options?: string[]; // Optional, only for radio, checkbox, dropdown
  required: boolean;
  order: number; // Question order for tracking
  batchId: number;
  plantType: string;
}

const questionSchema = new Schema({
  conditionalQuestionId:Number,
  conditionalAnswer: [String],
  question: String, // Question text
  tag: String, // Unique key for reference
  type: String, // "text", "radio", "checkbox", "dropdown", "date"
  options: [String], // Only for radio, checkbox, dropdown
  required: Boolean,
  order: Number, // New field to track question order
  batchId: Number,
  plantType: String,
}
,{ timestamps: true }

);

questionSchema.index({ order: 1 });

const QuestionSchemaModel = mongoose.model<IQuestion>(
  "QuestionSchema",
  questionSchema,
  "QuestionSchemas"
);

export { QuestionSchemaModel, IQuestion };
