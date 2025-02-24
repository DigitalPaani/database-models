import type { Document, Model } from 'mongoose';
import { Types } from 'mongoose';
interface ITaskTemplate extends Document {
    name: string;
    description: string;
    trainingVideoId: Types.ObjectId | null;
    scope: string;
    userGroupId: Types.ObjectId;
    priority: string;
    taskType: string;
    workflowId: Types.ObjectId;
    taskCompletion: string;
    taskCompletionState: string;
    assigneeMethod: string;
    complexity: number;
    taskDeadlineTime: IRelativeTime;
    taskExpectedTime: IRelativeTime;
    equipmentSelected: string;
    skillsSelected: Types.ObjectId[];
    dataEntry: boolean;
    sensorTag: string;
    isArchived: boolean;
    createdBy: Types.ObjectId;
    attachmentId?: Types.ObjectId | null;
    richTextContent: string;
}
interface IRelativeTime extends Document {
    value: number;
    unit: string;
}
declare const TaskTemplateModel: Model<ITaskTemplate>;
export { TaskTemplateModel, ITaskTemplate };
//# sourceMappingURL=taskTemplate.model.d.ts.map