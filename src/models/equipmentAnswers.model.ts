import mongoose, { Document, Schema } from "mongoose";

interface IEquipmentAnswer extends Document {
  assetId: string;
  nodeType: string;
  nodeId: string;
  questionId: string;
  answer: string;
}

// ! We don't need this schema
// Todo: Fix the Schema Name
const EquipmentAnswerSchema = new Schema(
  {
    assetId: String, // Todo: nodeID
    nodeType: String, // Todo: nodeType
    nodeId: String,
    questionId: String,
    answer: Schema.Types.Mixed,
  },
  { timestamps: true }
);

const EquipmentAnswersModel = mongoose.model<IEquipmentAnswer>(
  "EquipmentAnswers",
  EquipmentAnswerSchema,
  "EquipmentAnswers"
);

export { EquipmentAnswersModel, IEquipmentAnswer };
