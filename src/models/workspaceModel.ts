import type { Document, Model, Types } from 'mongoose';
import mongoose, { Schema } from 'mongoose';

// Define a TypeScript interface for the Workspace document
interface IWorkspace extends Document {
  name: string;
  description?: string;
  createdBy: Types.ObjectId;
  assetIds?: Types.ObjectId[];
  isArchived: boolean;
}

// Define the schema using the TypeScript interface
const workspaceSchema = new Schema<IWorkspace>(
  {
    name: { type: String, required: true },
    description: { type: String, default: '', required: false },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    assetIds: { type: [Schema.Types.ObjectId], ref: 'Plant', default: [] },
    isArchived: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Create a compound index to ensure unique workspace name within the same admin
workspaceSchema.index({ name: 1, createdBy: 1 }, { unique: true });

// Define the model using the schema and the TypeScript interface
const WorkspaceModel: Model<IWorkspace> = mongoose.model<IWorkspace>(
  'NewWorkspace',
  workspaceSchema,
  'newWorkspaces'
);

export { IWorkspace,WorkspaceModel };