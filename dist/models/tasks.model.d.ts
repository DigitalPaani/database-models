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
    timeInMinutes: number;
    communicationMedium: string;
    userIds: Types.ObjectId[];
}
interface IActionNode extends Document {
    id: string;
    label: string;
    selectedAction: string;
    selectedActionValue: string;
}
interface IComponentActions extends Document {
    nodeId: string;
    actionNodes: IActionNode[];
    actionIds: Types.ObjectId[];
}
interface ITask extends Document {
    triggerId: Types.ObjectId;
    taskTemplateId: Types.ObjectId;
    scope: string;
    userGroupId: Types.ObjectId;
    workspaceId: Types.ObjectId;
    assetId: Types.ObjectId | null;
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
    taskCompletionTime: number;
    equipmentSelected: string;
    skillsSelected: Types.ObjectId[];
    dataEntry: boolean;
    sensorId: Types.ObjectId;
    isArchived: boolean;
    createdBy: Types.ObjectId;
    attachmentId?: Types.ObjectId | null;
    richTextContent: string;
    taskCompleted: boolean;
    escalations: IEscalation[];
    componentActions: IComponentActions[];
}
declare const TaskModel: Model<ITask>;
export { TaskModel, ITask, IEscalation };
//# sourceMappingURL=tasks.model.d.ts.map