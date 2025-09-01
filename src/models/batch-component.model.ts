import type { Document, Model } from "mongoose";
import mongoose, { Schema, Types } from "mongoose";
import batchConstants from "../constants/batch.constants";

export interface IStatusCondition {
  status: string;
  eventComponent: Types.ObjectId;
  action: string;
}

interface ITimeCycleRecurrence {
  frequency: string;
  interval: number;
  daysOfWeek: number[];
  dayOfMonth: number[];
  weekOfMonth: number[];
  hours: number[];
  minutes: number[];
}

interface ITimeCycleConfig {
  recurrence: ITimeCycleRecurrence;
  startDate?: number;
  endDate?: number;
}

// Flow Node Position Interface
interface INodePosition {
  x: number;
  y: number;
}

// Flow Node Data Interface
interface INodeData {
  label: string;
  equipmentId: string;
}

// Flow Node Interface
interface IFlowNode {
  id: string;
  type: string;
  position: INodePosition;
  data: INodeData;
  width: number;
  height: number;
  selected: boolean;
  positionAbsolute: INodePosition;
  dragging: boolean;
}

// Flow Edge Style Interface
interface IEdgeStyle {
  stroke: string;
  strokeWidth: number;
  cursor: string;
}

// Flow Edge Marker Interface
interface IEdgeMarker {
  type: string;
  width: number;
  height: number;
  color: string;
}

// Flow Edge Interface
interface IFlowEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle: string;
  targetHandle: string;
  type: string;
  animated: boolean;
  style: IEdgeStyle;
  markerEnd: IEdgeMarker;
}

interface IBatchComponent extends Document {
  assetId: Types.ObjectId;

  name: string;
  equipments: Types.ObjectId[];

  detectionType: string;

  startBatchEventComponentId?: Types.ObjectId;
  startBatchAction: string;
  timeCycle?: ITimeCycleConfig;

  trackingSensors: Types.ObjectId[];

  flow: {
    nodes: IFlowNode[];
    edges: IFlowEdge[];
  };

  chemicalUsage?: {
    chemicalName: string;
    itemId: Types.ObjectId;
  }[];

  waterTreatment?: {
    unit?: string;
    value?: number;
  };

  type: string;
  purpose?: string;

  startTriggerId?: Types.ObjectId;
  endTriggerId?: Types.ObjectId;

  statusConditions: IStatusCondition[];
  isArchived: boolean;

  createdBy?: Types.ObjectId;
  updatedBy?: Types.ObjectId;
}

const BATCH_STATUS_ALLOWED = [
  ...Object.values(batchConstants.BATCH_STATUS_ENUM),
];
const BATCH_DETECTION_ALLOWED = [
  ...Object.values(batchConstants.BATCH_DETECTION_ENUM),
];
const BATCH_TYPE_ALLOWED = [...Object.values(batchConstants.BATCH_TYPE_ENUM)];
const WATER_TREATMENT_UNIT_ALLOWED = [
  ...Object.values(batchConstants.WATER_TREATMENT_UNIT_ENUM),
];
const BATCH_ACTION_ALLOWED = [...Object.values(batchConstants.BATCH_ACTION_ENUM)];

const batchStatusSchema = new Schema<IStatusCondition>({
  status: {
    type: String,
    enum: BATCH_STATUS_ALLOWED,
    required: true,
  },
  eventComponent: {
    type: Schema.Types.ObjectId,
    ref: "event-components",
    required: true,
  },
  action: {
    type: String,
    enum: BATCH_ACTION_ALLOWED,
    required: true,
  },
});

const timeCycleRecurrenceSchema = new Schema<ITimeCycleRecurrence>(
  {
    frequency: { type: String, required: true },
    interval: { type: Number, required: true },
    daysOfWeek: { type: [Number], default: [] },
    dayOfMonth: { type: [Number], default: [] },
    weekOfMonth: { type: [Number], default: [] },
    hours: {
      type: [Number],
      validate: {
        validator: function (values: number[]): boolean {
          return values.every((v) => v >= 0 && v <= 23);
        },
        message: "Hours should be between 0 and 23.",
      },
      default: [],
    },
    minutes: {
      type: [Number],
      validate: {
        validator: function (values: number[]): boolean {
          return values.every((v) => v >= 0 && v <= 59);
        },
        message: "Minutes should be between 0 and 59.",
      },
      default: [],
    },
  },
  { _id: false }
);

const timeCycleSchema = new Schema<ITimeCycleConfig>({
  recurrence: { type: timeCycleRecurrenceSchema, required: true },
  startDate: { type: Number, required: true },
  endDate: { type: Number, required: true },
});

const waterTreatmentSchema = new Schema({
  unit: { type: String, enum: WATER_TREATMENT_UNIT_ALLOWED },
  value: { type: Number },
});

// Flow Node Position Schema
const nodePositionSchema = new Schema<INodePosition>({
  x: { type: Number, required: true },
  y: { type: Number, required: true },
}, { _id: false });

// Flow Node Data Schema
const nodeDataSchema = new Schema<INodeData>({
  label: { type: String, required: true },
  equipmentId: { type: String, required: true },
}, { _id: false });

// Flow Node Schema
const flowNodeSchema = new Schema<IFlowNode>({
  id: { type: String, required: true },
  type: { type: String, required: true },
  position: { type: nodePositionSchema, required: true },
  data: { type: nodeDataSchema, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  selected: { type: Boolean, default: false },
  positionAbsolute: { type: nodePositionSchema, required: true },
  dragging: { type: Boolean, default: false },
}, { _id: false });

// Flow Edge Style Schema
const edgeStyleSchema = new Schema<IEdgeStyle>({
  stroke: { type: String, required: true },
  strokeWidth: { type: Number, required: true },
  cursor: { type: String, required: true },
}, { _id: false });

// Flow Edge Marker Schema
const edgeMarkerSchema = new Schema<IEdgeMarker>({
  type: { type: String, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  color: { type: String, required: true },
}, { _id: false });

// Flow Edge Schema
const flowEdgeSchema = new Schema<IFlowEdge>({
  id: { type: String, required: true },
  source: { type: String, required: true },
  target: { type: String, required: true },
  sourceHandle: { type: String, required: true },
  targetHandle: { type: String, required: true },
  type: { type: String, required: true },
  animated: { type: Boolean, default: false },
  style: { type: edgeStyleSchema, required: true },
  markerEnd: { type: edgeMarkerSchema, required: true },
}, { _id: false });

const batchComponentSchema = new Schema<IBatchComponent>(
  {
    assetId: { type: Schema.Types.ObjectId, ref: "Plant", required: true },

    name: { type: String, required: true },

    equipments: {
      type: [Schema.Types.ObjectId],
      ref: "LayoutEquipments",
      required: true,
    },
    detectionType: {
      type: String,
      enum: BATCH_DETECTION_ALLOWED,
      required: true,
    },
    startBatchAction: {
      type: String,
      enum: BATCH_ACTION_ALLOWED,
      // default: BATCH_ACTION_ALLOWED.END
    },
    startBatchEventComponentId: {
      type: Schema.Types.ObjectId,
      ref: "event-components",
      required: false,
    },
    timeCycle: {
      type: timeCycleSchema,
      required: false,
    },

    trackingSensors: [{ type: Schema.Types.ObjectId, ref: "sensors" }],

    flow: {
      nodes: { type: [flowNodeSchema], default: [] },
      edges: { type: [flowEdgeSchema], default: [] },
    },
    chemicalUsage: {
      type: [
        {
          itemId: {
            type: Schema.Types.ObjectId,
            ref: "StoreItems",
            required: true,
          },
          name: { type: String, required: true },
        },
      ],
      required: false,
    },

    waterTreatment: { type: waterTreatmentSchema },

    type: {
      type: String,
      enum: BATCH_TYPE_ALLOWED,
      default: "Regular",
    },

    purpose: { type: String, default: "" },

    startTriggerId: { type: Types.ObjectId, ref: "triggers", required: false },

    endTriggerId: { type: Types.ObjectId, ref: "triggers", required: false },

    statusConditions: {
      type: [batchStatusSchema],
    },

    isArchived: { type: Boolean, default: false },
    createdBy: { type: Types.ObjectId, ref: "User" },
    updatedBy: { type: Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const BatchComponentModel: Model<IBatchComponent> = mongoose.model<IBatchComponent>(
  "batch-components",
  batchComponentSchema,
  "batch-components"
);

export { BatchComponentModel, IBatchComponent };
