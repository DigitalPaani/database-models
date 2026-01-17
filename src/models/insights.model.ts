import type { Document, Model } from "mongoose";
import mongoose, { Schema, Types } from "mongoose";

import type { IPlant } from "./plantModel";
import type { ILayoutEquipment } from "./equipment.model";
import type { IAttachment } from "./attachments.model";

import {
  TYPES_OF_INSIGHT_CLASSIFICATIONS,
  TYPES_OF_INSIGHTS,
  EQUIPMENT_TYPES,
} from "../constants/insights.constants";

interface IInsight extends Document {
  name: string;
  description: string;
  aiDescription: string;
  equipmentIds: Types.ObjectId[] | ILayoutEquipment[];
  insightClassification: string;
  insightType: string;
  attachmentId: Types.ObjectId | null | IAttachment;
  richTextContent: string;
  openTime: number;
  closeTime: number;
  priority: number;
  isOpen: boolean;
  assetId: Types.ObjectId | IPlant;
  insightComponentId: Types.ObjectId | null;
  rcaEnabled: boolean;
  rcaContent: string;
  isArchived: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const insightsSchema = new Schema<IInsight>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    aiDescription: {
      type: String,
      default: "",
    },
    equipmentIds: {
      type: [Types.ObjectId],
      ref: "LayoutEquipments",
      enums: EQUIPMENT_TYPES,
    },
    insightClassification: {
      type: String,
      enums: TYPES_OF_INSIGHT_CLASSIFICATIONS,
    },
    insightType: {
      type: String,
      enums: TYPES_OF_INSIGHTS,
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
    openTime: {
        type: Number,
        required: true,
    },
    closeTime: {
        type: Number,
        required: false,
    },
    isOpen: {
      type: Boolean,
      required: true,
    },
    priority: {
      type: Number,
      required: true,
    },
    assetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plant",
      required: false
    },
    insightComponentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    rcaEnabled: {
      type: Boolean,
      default: false,
    },
    rcaContent: {
      type: String,
      default: "",
    },
    isArchived: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
    minimize: false,
  }
);


insightsSchema.index({
  isArchived: 1,
});

insightsSchema.index({
  isArchived: 1,
  assetId: 1,
  isOpen: -1,
  priority: 1,
  insightClassification: 1,
  insightType: 1,
  createdAt: -1,
});


const InsightModel: Model<IInsight> =
  mongoose.model<IInsight>(
    "insights",
    insightsSchema,
    "insights"
  );

export { InsightModel, IInsight };
