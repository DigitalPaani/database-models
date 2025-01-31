import type { Document, Model } from 'mongoose';
import { Types } from 'mongoose';
export interface ITaskTemplate extends Document {
    name: string;
    description: string;
    trainingVideoId: Types.ObjectId | null;
    priority: string;
    taskType: string;
    workflowId: Types.ObjectId;
    taskCompletion: string;
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
    attachmentId: Types.ObjectId;
}
declare const TaskTemplateModel: Model<ITaskTemplate>;
export { TaskTemplateModel };
//# sourceMappingURL=taskTemplate.model.d.ts.map