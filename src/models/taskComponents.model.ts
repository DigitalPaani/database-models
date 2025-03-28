import { Model, model, Schema, Types } from "mongoose";

interface ITaskComponent extends Document {
  _id: Types.ObjectId;
  taskTemplateId: string; // ObjectID as string
  taskData: { taskTemplateId: Types.ObjectId; name: string };
  assetId: string; // ObjectID as string
  userGroupId?: Types.ObjectId;
  name: string;
  description: string;
  trainingVideoId: string;
  attachmentId: string; // ObjectID as string
  priority: string; // Adjust as needed
  taskType: string; // Adjust as needed
  workflowId: string; // ObjectID as string
  workflowDetails: IWorkflowDetails;
  taskCompletion: string; // Adjust as needed
  assigneeMethod: string; // Adjust as needed
  assignee: Types.ObjectId;
  complexity: number;
  taskDeadlineTime: number; // Assuming relative minutes
  taskDeadlineUnit: string; // Adjust as needed
  taskExpectedTime: number; // Assuming relative minutes
  taskExpectedUnit: string; // Adjust as needed
  skillsSelected: string[]; // Array of ObjectID strings
  dataEntry: boolean;
  sensorTag: string;
  richTextContent: string;
  escalations: IEscalation[];
  componentActions: IComponentAction[];
  parentId?: Types.ObjectId;
  isSubtask: boolean;
  triggerId: Types.ObjectId;

  // frontend requirements
  TaskFormDataId: string;
  parentIndex: number;
  parentAutocompleteId: string;
  workflowActions: any;

  isDeleted: boolean;
}

interface IWorkflowDetails {
  name: string;
  description: string;
  nodes: IWorkflowNode[];
  edges: IWorkflowEdge[];
}

interface IWorkflowNode {
  id: string;
  type: string;
  position: IPosition;
  data: IWorkflowNodeData;
  width: number;
  height: number;
  selected: boolean;
  positionAbsolute: IPosition;
  dragging: boolean;
}

interface IPosition {
  x: number;
  y: number;
}

interface IWorkflowNodeData {
  type: string;
  label: string;
  actionType?: string; // Optional: only for nodes with an actionType
}

interface IWorkflowEdge {
  source: string;
  sourceHandle: string;
  target: string;
  targetHandle: string;
  id: string;
  type: string;
  animated: boolean;
  data: {
    label: string;
  };
  markerEnd: {
    type: string;
    width: number;
    height: number;
    color: string;
  };
  selected: boolean;
}

interface IEscalation {
  value: string;
  unit: string;
  timeInMinutes: string;
  communicationMedium: string;
  userIds: string[];
}

interface IActionNode {
  id: string;
  label: string;
  selectedAction: string;
  selectedActionValue: string;
  actionIds: Types.ObjectId[];
  parentAutocompleteId: string;
  nodeId: string;
  actionTemplate: object;
}

interface IComponentAction {
  nodeId: string; // ObjectID as string
  nodeLabel: string;
  actionNodes: IActionNode[];
}

// Schema for each node inside workflowDetails.nodes
const WorkflowNodeSchema = new Schema(
  {
    id: { type: String, required: true },
    type: { type: String, required: true },
    position: {
      x: { type: Number },
      y: { type: Number },
    },
    data: {
      type: { type: String },
      label: { type: String },
      selectedAction: { type: String },
      selectedActionValue: { type: String },
    },
    width: { type: Number },
    height: { type: Number },
    selected: { type: Boolean },
    positionAbsolute: {
      x: { type: Number },
      y: { type: Number },
    },
    dragging: { type: Boolean },
  },
  { _id: false }
);

// Schema for each edge inside workflowDetails.edges
const WorkflowEdgeSchema = new Schema(
  {
    id: { type: String, required: true },
    source: { type: String, required: true },
    sourceHandle: { type: String },
    target: { type: String, required: true },
    targetHandle: { type: String },
    type: { type: String },
    animated: { type: Boolean },
    data: {
      label: { type: String },
    },
    markerEnd: {
      type: { type: String },
      width: { type: Number },
      height: { type: Number },
      color: { type: String },
    },
    selected: { type: Boolean },
  },
  { _id: false }
);

// Schema for workflowDetails
const WorkflowDetailsSchema = new Schema(
  {
    name: { type: String },
    description: { type: String },
    nodes: [WorkflowNodeSchema],
    edges: [WorkflowEdgeSchema],
    workflowActions: [Schema.Types.Mixed],
  },
  { _id: false }
);

const ActionNodeSchema = new Schema(
  {
    id: { type: String },
    label: { type: String },
    selectedAction: { type: String },
    selectedActionValue: { type: String },
    actionIds: { type: [Schema.Types.ObjectId] },
    parentAutocompleteId: { type: String },
    nodeId: { type: String },
    actionTemplate: { type: Object },
  },
  { _id: false }
);

// Schema for each entry in componentActions
const ComponentActionSchema = new Schema(
  {
    nodeId: { type: String },
    nodeLabel: { type: String },
    actionNodes: [ActionNodeSchema],
  },
  { _id: false }
);

// Schema for each escalation entry
const EscalationSchema = new Schema(
  {
    value: { type: String },
    unit: { type: String },
    timeInMinutes: { type: String },
    communicationMedium: { type: String },
    userIds: [{ type: Schema.Types.ObjectId, ref: "NewUser" }],
  },
  { _id: false }
);

// Main Task Schema
const TaskComponentSchema = new Schema(
  {
    taskTemplateId: {
      type: Schema.Types.ObjectId,
      ref: "task-templates",
      required: true,
    },
    taskData: { taskTemplateId: Schema.Types.ObjectId, name: String },
    assetId: { type: Schema.Types.ObjectId, ref: "Plant" },
    userGroupId: { type: Schema.Types.ObjectId, ref: "UserGroup" },
    name: { type: String, required: true },
    description: { type: String },
    trainingVideoId: { type: String, default: "" },
    attachmentId: { type: Schema.Types.ObjectId, ref: "attachments" },
    priority: { type: String },
    taskType: { type: String },
    workflowId: { type: Schema.Types.ObjectId, ref: "workflows" },
    workflowDetails: WorkflowDetailsSchema,
    taskCompletion: { type: String },
    taskCompletionState: { type: String },
    assigneeMethod: { type: String },
    assignee: { type: Schema.Types.ObjectId, ref: "NewUser" },
    complexity: { type: Number },
    taskDeadlineTime: { type: Number },
    taskDeadlineUnit: { type: String },
    taskExpectedTime: { type: Number },
    taskExpectedUnit: { type: String },
    skillsSelected: [{ type: Schema.Types.ObjectId, ref: "skill-managements" }],
    dataEntry: { type: Boolean },
    sensorTag: { type: String },
    richTextContent: { type: String },
    escalations: [EscalationSchema],
    componentActions: [ComponentActionSchema],
    parentId: { type: Schema.Types.ObjectId },
    isSubtask: { type: Boolean, default: false },
    triggerId: { type: Schema.Types.ObjectId, required: true },

    // frontend requirements
    TaskFormDataId: { type: String },
    parentIndex: { type: Number },
    parentAutocompleteId: { type: String },
    workflowActions: { type: [Schema.Types.Mixed] },

    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, strict: false }
);

const TaskComponentsModel: Model<ITaskComponent> = model<ITaskComponent>(
  "taskComponents",
  TaskComponentSchema,
  "taskComponents"
);

export {
  TaskComponentsModel,
  ITaskComponent,
  IWorkflowDetails,
  IWorkflowNode,
  IPosition,
  IWorkflowNodeData,
  IWorkflowEdge,
  IEscalation,
  IComponentAction,
};
