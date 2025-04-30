import mongoose, { Model, Schema } from "mongoose";
import type { Document } from "mongoose";
import { Types } from "mongoose";


interface IInsightComment extends Document {
    insightId: Types.ObjectId;
    senderId: Types.ObjectId;
    comment: string
    isArchived: boolean;
    createdAt?: Date;
    updatedAt?: Date;    
};

const insightCommentSchema = new Schema<IInsightComment>(
  {
    insightId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    senderId: {
        type: Schema.Types.ObjectId,
        ref: "NewUser",
        required: true,
    },
    comment: {
        type: String,
        default: "",
    },
    isArchived: {
        type: Boolean,
        default: false
    }
  },
  {
    timestamps: true,
  }
);

const InsightCommentModel: Model<IInsightComment> = mongoose.model<IInsightComment>(
    "insightComments",
    insightCommentSchema,
    "insightComments"
);


export { InsightCommentModel, IInsightComment };
