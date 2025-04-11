import mongoose, { Document, Schema } from "mongoose";
const Mixed = Schema.Types.Mixed;

interface IEquipmentQuestion extends Document {
  questionId: string;
  nodeType: string;
  question: string;
  type: string | null;
  apiPath: string|null;
  options: (string | { label: string; value: string })[]; // updated here
  compulsory: boolean | null;
  order: number;
}

const EquipmentQuestionsSchema = new Schema(
  {
    questionId: { type: String, required: true },
    nodeType: { type: String, required: true },
    question: { type: String, required: true },
    apiPath: {type:String,required:false},
    type: { type: String, default: null },
    options: [{ type: Mixed }], // allow string or object
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
