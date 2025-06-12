import type { Document, Model, Types } from 'mongoose';
interface IWorkspace extends Document {
    name: string;
    description?: string;
    createdBy: Types.ObjectId;
    assetIds?: Types.ObjectId[];
    isArchived: boolean;
}
declare const WorkspaceModel: Model<IWorkspace>;
export { IWorkspace };
export default WorkspaceModel;
//# sourceMappingURL=workspaceModel.d.ts.map