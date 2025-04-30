import { Model } from "mongoose";
import type { Document } from "mongoose";
import { Types } from "mongoose";
import type { INewUser } from "./newUserModel";
interface IInsightComment extends Document {
    insightId: Types.ObjectId;
    senderId: Types.ObjectId | INewUser;
    comment: string;
    isArchived: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
declare const InsightCommentModel: Model<IInsightComment>;
export { InsightCommentModel, IInsightComment };
//# sourceMappingURL=insight-comments.model.d.ts.map