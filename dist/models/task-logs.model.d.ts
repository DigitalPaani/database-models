import type { Document, Model } from "mongoose";
import { Types } from "mongoose";
interface ITransitionDetails extends Document {
    id: string;
    value: string;
}
interface ITaskLog extends Document {
    taskId: Types.ObjectId;
    transitionFrom: ITransitionDetails;
    transitionTo: ITransitionDetails;
    url: string;
    filename: string;
    mimetype: string;
    message: string;
    type: string;
    isArchived: boolean;
    createdBy: Types.ObjectId;
}
declare const TaskLogModel: Model<ITaskLog>;
export { TaskLogModel, ITaskLog };
//# sourceMappingURL=task-logs.model.d.ts.map