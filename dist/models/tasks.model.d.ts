import type { Document, Model } from 'mongoose';
import { Types } from 'mongoose';
interface IWorkflowDetails extends Document {
    workflowId: Types.ObjectId;
    name: string;
    description: string;
    nodes: object[];
    edges: object[];
    transitionStatus: string;
}
interface IEscalation extends Document {
    time: number;
    unit: string;
    communicationMedium: string;
    userIds: Types.ObjectId[];
}
interface ITask extends Document {
    taskTemplateId: Types.ObjectId;
    scope: string;
    userGroupId: Types.ObjectId;
    workspaceId: Types.ObjectId;
    assetId: Types.ObjectId;
    assignee: Types.ObjectId;
    workflowDetails: IWorkflowDetails;
    name: string;
    description: string;
    trainingVideoId?: Types.ObjectId | null;
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
    attachmentId?: Types.ObjectId | null;
    richTextContent: string;
    escalations: IEscalation[];
}
declare const TaskModel: Model<ITask>;
export { TaskModel, ITask };
//# sourceMappingURL=tasks.model.d.ts.map