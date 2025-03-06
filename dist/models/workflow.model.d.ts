import type { Document, Model } from 'mongoose';
import { Types } from 'mongoose';
interface IActionNode {
    id: string;
    label: string;
    selectedAction: string;
    selectedActionValue: string;
}
interface IWorkflowActions {
    nodeId: string;
    nodeLabel: string;
    actionNodes: IActionNode[];
}
interface IWorkflow extends Document {
    name: string;
    description: string;
    scope: string;
    userGroupId: Types.ObjectId | null;
    nodes: object[];
    edges: object[];
    workflowActions: IWorkflowActions[];
    isArchived: boolean;
    createdBy: Types.ObjectId;
}
declare const WorkflowModel: Model<IWorkflow>;
export { WorkflowModel, IWorkflow, IWorkflowActions, IActionNode };
//# sourceMappingURL=workflow.model.d.ts.map