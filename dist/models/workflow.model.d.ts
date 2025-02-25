import type { Document, Model } from 'mongoose';
import { Types } from 'mongoose';
interface IWorkflow extends Document {
    name: string;
    description: string;
    scope: string;
    userGroupId: Types.ObjectId | null;
    nodes: object[];
    edges: object[];
    actionNodes: object[];
    isArchived: boolean;
    createdBy: Types.ObjectId;
}
interface IActionNode {
    nodeId: string;
    actionNode: object;
}
declare const WorkflowModel: Model<IWorkflow>;
export { WorkflowModel, IWorkflow, IActionNode };
//# sourceMappingURL=workflow.model.d.ts.map