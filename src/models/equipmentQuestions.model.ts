import mongoose, { Document, Schema } from "mongoose";

interface IEquipmentQuestion extends Document {
  nodeType: string;
  question: string;
  type: string | null;
  options: [string];
  questionType: string;
  order: number;
}

const EquipmentQuestionsSchema = new Schema(
  {
    nodeType: String, 
    question: String,
    type: { type: String, default: null },
    options: [String],
    questionType: String,
    order: Number, // Todo: Not Required
  },
  { timestamps: true }
);

const EquipmentQuestionsModel = mongoose.model<IEquipmentQuestion>(
  "EquipmentQuestions",
  EquipmentQuestionsSchema,
  "EquipmentQuestions"
);

export { EquipmentQuestionsModel, IEquipmentQuestion };
