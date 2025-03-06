import mongoose, { Schema } from "mongoose";

interface IEquipmentQuestion extends Document {
  equipmentType: string;
  question: string;
  type: string | null;
}

const EquipmentQuestionsSchema = new Schema(
  {
    equipmentType: String,
    question: String,
    type: { type: String, default: null },
  },
  { timestamps: true }
);

const EquipmentQuestionsModel = mongoose.model<IEquipmentQuestion>(
  "EquipmentQuestions",
  EquipmentQuestionsSchema,
  "EquipmentQuestions"
);

export { EquipmentQuestionsModel, IEquipmentQuestion };
