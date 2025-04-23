import type { Document, Model } from "mongoose";
import mongoose, { Schema, Types } from "mongoose";

import {
  TYPES_OF_INSIGHT_CLASSIFICATIONS,
  TYPES_OF_INSIGHTS,
  EQUIPMENT_TYPES,
} from "../constants/insights.constants";

interface IInsight extends Document {
  name: string;
  description: string;
  equipmentTypes: string[];
  insightClassification: string;
  insightType: string;
  attachmentId: Types.ObjectId | null;
  richTextContent: string;
  openTime: number;
  closeTime: number;
  isArchived: boolean;
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
    equipmentTypes: {
      type: [String],
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
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

const InsightModel: Model<IInsight> =
  mongoose.model<IInsight>(
    "insights",
    insightsSchema,
    "insights"
  );

export { InsightModel, IInsight };
