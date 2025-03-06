import mongoose, { Schema } from "mongoose";

interface IEquipmentAnswer extends Document {
  assetId: string;
  equipmentType: string;
  answer: string;
}

const EquipmentQuestionsSchema = new Schema(
  {
    assetId: String,
    equipmentType: String,
    answer: Schema.Types.Mixed,
  },
  { timestamps: true }
);

const EquipmentAnswersModel = mongoose.model<IEquipmentAnswer>(
  "EquipmentAnswers",
  EquipmentQuestionsSchema,
  "EquipmentAnswers"
);

export { EquipmentAnswersModel, IEquipmentAnswer };
