import mongoose, { Model, Schema, model } from "mongoose";
import { Types } from "mongoose";


interface IInsightComponent extends Document {
    _id: Types.ObjectId;
    insightTemplateId: Types.ObjectId;
    triggerId: Types.ObjectId;
    name: string;
    description: string;
    insightClassification: string;
    insightType: string;
    attachmentId: Types.ObjectId | null;
    richTextContent: string;
    userGroupId: Types.ObjectId;
    assetId: Types.ObjectId;
    equipmentIds: Types.ObjectId[];
    priority: Number;
    startInsightSensorId: Types.ObjectId;
    endInsightSensorId: Types.ObjectId;
    countInsightSensorId: Types.ObjectId;
    isDeleted: boolean;
};

const insightComponentSchema = new Schema<IInsightComponent>(
  {
    insightTemplateId: {
      type: Schema.Types.ObjectId,
      ref: "insights-templates",
      required: true,
    },
    triggerId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    insightClassification: {
      type: String,
      required: true,
    },
    insightType: {
      type: String,
      required: true,
    },
    attachmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "attachments",
      default: null,
    },
    richTextContent: {
      type: String,
      default: "",
    },
    userGroupId: {
      type: Schema.Types.ObjectId,
      ref: "UserGroup",
      required: true,
    },
    assetId: {
      type: Schema.Types.ObjectId,
      ref: "Plant",
      required: true,
    },
    equipmentIds: {
      type: [Schema.Types.ObjectId],
      ref: "LayoutEquipments",
      required: true,
    },
    priority: {
      type: Number,
      required: true,
    },
    startInsightSensorId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    endInsightSensorId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    countInsightSensorId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const InsightComponentModel: Model<IInsightComponent> = mongoose.model<IInsightComponent>(
    "insightComponents",
    insightComponentSchema,
    "insightComponents"
);


export { InsightComponentModel, IInsightComponent };