import mongoose, { Model, Schema, model } from "mongoose";
import { Types } from "mongoose";

import { ISensor } from "./sensorModel";

import { DYNAMIC_NAME_TYPE_ENUMS } from "../constants/insights.constants";

interface IDynamicValue extends Document {
  type: string;
  key: string;
  value: string;
};


interface IInsightComponent extends Document {
    _id: Types.ObjectId;
    insightTemplateId: Types.ObjectId;
    dynamicNameValues: IDynamicValue[],
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
    startInsightSensorId: Types.ObjectId | ISensor;
    rcaEnabled: boolean;
    rcaContent: string;
    isTimeSensitive: boolean;
    userIdsForTimeSensitive: Types.ObjectId[];
    isDeleted: boolean;
};

const dynamicNameValueSchema = new mongoose.Schema<IDynamicValue>({
  type: {
    type: String,
    enum: DYNAMIC_NAME_TYPE_ENUMS,
    required: true, // e.g., "EQUIPMENT"
  },
  key: {
    type: String,
    required: true, // e.g., "EQUIPMENT1"
  },
  value: {
    type: String,
    required: true,
  },
}, {
  _id: false
});

const insightComponentSchema = new Schema<IInsightComponent>(
  {
    insightTemplateId: {
      type: Schema.Types.ObjectId,
      ref: "insights-templates",
      required: true,
    },
    dynamicNameValues: {
      type: [dynamicNameValueSchema],
      default: []
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
      ref: "sensors",
      required: true,
    },
    rcaEnabled: {
      type: Boolean,
      default: false,
    },
    rcaContent: {
      type: String,
      default: "",
    },
    isTimeSensitive: {
      type: Boolean,
      default: false,
    },
    userIdsForTimeSensitive: {
      type: [Schema.Types.ObjectId],
      ref: "NewUser",
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