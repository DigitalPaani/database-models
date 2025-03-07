import mongoose, { Schema } from "mongoose";

interface IEquipmentAnswer extends Document {
  assetId: string;
  equipmentType: string;
  answer: string;
}

// ! We don't need this schema
// Todo: Fix the Schema Name
const EquipmentQuestionsSchema = new Schema(
  {
    assetId: String, // Todo: nodeID
    equipmentType: String, // Todo: nodeType
    // Todo: QuestionID
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
