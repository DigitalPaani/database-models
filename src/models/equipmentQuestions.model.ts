import mongoose, { Document, Schema } from "mongoose";

interface IEquipmentQuestion extends Document {
  questionId: string;
  nodeType: string;
  question: string;
  type: string | null;
  options: [string];
  compulsory: boolean | null;
  order: number;
}

const EquipmentQuestionsSchema = new Schema(
  {
    questionId: { type: String, required: true },
    nodeType: { type: String, required: true },
    question: { type: String, required: true },
    type: { type: String, default: null },
    options: [String],
    compulsory: { type: Boolean, default: null },
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
