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
    isNotified: boolean;
}
interface IActionNode extends Document {
    id: string;
    label: string;
    selectedAction: string;
    selectedActionValue: string;
    actionIds: Types.ObjectId[];
}
interface IComponentActions extends Document {
    nodeId: string;
    actionNodes: IActionNode[];
}
interface ITask extends Document {
    triggerId: Types.ObjectId;
    taskTemplateId: Types.ObjectId;
    userGroupId: Types.ObjectId;
    workspaceId: Types.ObjectId;
    assetId: Types.ObjectId | null;
    assignee: Types.ObjectId;
    workflowDetails: IWorkflowDetails;
    name: string;
    description: string;
    trainingVideoId?: Types.ObjectId | null;
    priority: number;
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
    sensorId: Types.ObjectId | null;
    isArchived: boolean;
    createdBy: Types.ObjectId;
    attachmentId?: Types.ObjectId | null;
    richTextContent: string;
    taskCompleted: boolean;
    escalations: IEscalation[];
    isObsolete: boolean;
    taskComponentId: Types.ObjectId;
    componentActions: IComponentActions[];
}
declare const TaskModel: Model<ITask>;
export { TaskModel, ITask, IEscalation };
//# sourceMappingURL=tasks.model.d.ts.map