import mongoose, { Model, Schema, model } from "mongoose";
import { Types } from "mongoose";


interface IInsightComponent extends Document {
    insightTemplateId: Types.ObjectId,
    userGroupId: Types.ObjectId,
    assetId: Types.ObjectId,
    equipmentIds: Types.ObjectId[],
    priority: string,
    isDeleted: boolean
};

const insightComponentSchema = new Schema<IInsightComponent>(
  {
    insightTemplateId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    userGroupId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    assetId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    equipmentIds: {
      type: [Schema.Types.ObjectId],
      required: true,
    },
    priority: {
      type: String,
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