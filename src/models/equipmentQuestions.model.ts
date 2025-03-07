import mongoose, { Schema } from "mongoose";

interface IEquipmentQuestion extends Document {
  equipmentType: string;
  question: string;
  type: string | null;
  options: [string];
  questionType:string;
  order: number;
}

const EquipmentQuestionsSchema = new Schema(
  {
    equipmentType: String,
    question: String,
    type: { type: String, default: null },
    options: [String],
    questionType:String,
    order: Number,
  },
  { timestamps: true }
);

const EquipmentQuestionsModel = mongoose.model<IEquipmentQuestion>(
  "EquipmentQuestions",
  EquipmentQuestionsSchema,
  "EquipmentQuestions"
);

export { EquipmentQuestionsModel, IEquipmentQuestion };
