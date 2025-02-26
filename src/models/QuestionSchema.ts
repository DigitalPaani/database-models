import mongoose, { Schema } from "mongoose";

interface IQuestion extends Document {
  _id?: string; // Optional if using MongoDB ObjectId
  question: string; // Question text
  tag: string; // Unique key for reference
  conditionalQuestionId: [number] | null;
  conditionalAnswer: string[][];
  questionId: number;
  type: "text" | "radio" | "checkbox" | "dropdown" | "date"; // Restrict to valid types
  options?: string[]; // Optional, only for radio, checkbox, dropdown
  required: boolean;
  order: number; // Question order for tracking
  batchId: number;
  dummy: boolean;
  validation: string[];
  analyticalValue: boolean | null;
  name: string;
  defaultValue:string[];
}

const questionSchema = new Schema(
  {
    conditionalQuestionId: { type: [Number], default: null },
    conditionalAnswer: [[String]],
    questionId: Number,
    question: String, // Question text
    tag: String, // Unique key for reference
    type: String, // "text", "radio", "checkbox", "dropdown", "date"
    options: [String], // Only for radio, checkbox, dropdown
    required: Boolean,
    order: Number, // New field to track question order
    batchId: Number,
    dummy: Boolean,
    analyticalValue: { type: Boolean, default: false },
    name: String,
    defaultValue:[String]
  },
  { timestamps: true }
);

questionSchema.index({ order: 1 });

const QuestionSchemaModel = mongoose.model<IQuestion>(
  "SurveyQuestion",
  questionSchema,
  "SurveyQuestions"
);

export { QuestionSchemaModel, IQuestion };
