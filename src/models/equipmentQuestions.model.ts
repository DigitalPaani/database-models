import mongoose, { Schema } from "mongoose";

interface IEquipmentQuestion extends Document {
  equipmentType: string;
  question: string;
}

const EquipmentQuestionsSchema = new Schema(
  {
    equipmentType: String,
    question: String,
  },
  { timestamps: true }
);

const EquipmentQuestionsModel = mongoose.model<IEquipmentQuestion>(
  "EquipmentQuestions",
  EquipmentQuestionsSchema,
  "EquipmentQuestions"
);

export { EquipmentQuestionsModel, IEquipmentQuestion };
