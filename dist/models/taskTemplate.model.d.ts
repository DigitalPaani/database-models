import type { Document, Model } from 'mongoose';
import { Types } from 'mongoose';
interface ITaskTemplate extends Document {
    name: string;
    description: string;
    trainingVideoId: Types.ObjectId | null;
    scope: string;
    userGroupId: Types.ObjectId | null;
    priority: string;
    taskType: string;
    workflowId: Types.ObjectId;
    taskCompletion: string;
    taskCompletionState: string;
    assigneeMethod: string;
    complexity: number;
    taskDeadlineTime: number;
    taskExpectedTime: number;
    equipmentSelected: string;
    skillsSelected: Types.ObjectId[];
    dataEntry: boolean;
    sensorTag: string;
    isArchived: boolean;
    createdBy: Types.ObjectId;
    attachmentId?: Types.ObjectId | null;
    richTextContent: string;
}
declare const TaskTemplateModel: Model<ITaskTemplate>;
export { TaskTemplateModel, ITaskTemplate };
//# sourceMappingURL=taskTemplate.model.d.ts.map