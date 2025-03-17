import type { Document, Model } from "mongoose";
import { Types } from "mongoose";
interface ITaskComment extends Document {
    taskId: Types.ObjectId;
    message: String;
    isArchived: Boolean;
    createdBy: Types.ObjectId;
}
declare const TaskCommentModel: Model<ITaskComment>;
export { TaskCommentModel, ITaskComment };
//# sourceMappingURL=task-comments.model.d.ts.map