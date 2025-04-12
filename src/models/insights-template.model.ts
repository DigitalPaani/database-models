import type { Document, Model } from "mongoose";
import mongoose, { Schema, Types } from "mongoose";

import {
  TYPES_OF_INSIGHTS,
  EQUIPMENT_TYPE,
} from "../constants/insights.constants";

interface IInsightsTemplate extends Document {
  name: string;
  description: string;
  equipmentTypes: string[];
  insightType: string;
  attachmentId: string;
  richTextContent: string;
  isArchived: boolean;
}

const insightsTemplateSchema = new Schema<IInsightsTemplate>(
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
      enums: EQUIPMENT_TYPE,
    },
    insightType: {
      type: String,
      enums: TYPES_OF_INSIGHTS,
    },
    attachmentId: {
      type: String,
      default: null,
    },
    richTextContent: {
      type: String,
      default: "",
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

const InsightsTemplateModel: Model<IInsightsTemplate> =
  mongoose.model<IInsightsTemplate>(
    "insights-templates",
    insightsTemplateSchema,
    "insights-templates"
  );

export { InsightsTemplateModel, IInsightsTemplate };
