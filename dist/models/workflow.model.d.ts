import type { Document, Model } from 'mongoose';
import { Types } from 'mongoose';
export interface IWorkflow extends Document {
    name: string;
    description: string;
    scope: string;
    userGroupId: Types.ObjectId | null;
    nodes: object[];
    edges: object[];
    isArchived: boolean;
    createdBy: Types.ObjectId;
}
declare const WorkflowModel: Model<IWorkflow>;
export { WorkflowModel };
//# sourceMappingURL=workflow.model.d.ts.map