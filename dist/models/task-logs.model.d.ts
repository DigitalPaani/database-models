import type { Document, Model } from "mongoose";
import { Types } from "mongoose";
interface ITaskLog extends Document {
    taskId: Types.ObjectId;
    transition: string;
    url: string;
    message: string;
    type: string;
    isArchived: boolean;
    createdBy: Types.ObjectId;
}
declare const TaskLogModel: Model<ITaskLog>;
export { TaskLogModel, ITaskLog };
//# sourceMappingURL=task-logs.model.d.ts.map