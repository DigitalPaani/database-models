import type { Document, Model } from "mongoose";
import { Types } from "mongoose";
interface ITaskWorkLog extends Document {
    taskId: Types.ObjectId;
    message: String;
    isArchived: Boolean;
    createdBy: Types.ObjectId;
}
declare const TaskWorkLogModel: Model<ITaskWorkLog>;
export { TaskWorkLogModel, ITaskWorkLog };
//# sourceMappingURL=task-work-logs.model.d.ts.map