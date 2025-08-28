import type { Document, Model } from "mongoose";
import mongoose, { Schema, Types } from "mongoose";
import batchConstants from "../constants/batch.constants";

interface IBatchLog extends Document {
  // Core batch identification
  batchConfigId: Types.ObjectId;
  
  // Dynamic timing and lifecycle
  startTime: number; // Unix timestamp
  endTime?: number;  // Unix timestamp
  duration?: number; // Duration in seconds
  
  // Dynamic status tracking
  status: string;
  previousStatus?: string;
  
  // Dynamic detection and triggering
  detectionType: string;
  triggeredBy: string;
  triggeredEventId?: Types.ObjectId;
  triggeredTimeCycle?: {
    frequency: string;
    interval: number;
    startDate: number; // Unix timestamp
  };
  
  // Dynamic error tracking
  hasErrors: boolean;
  errorCount?: number;
  lastErrorTime?: number; // Unix timestamp
  
  // Dynamic concurrent batch handling
  concurrentBatchIds: string[]; // Array of concurrent batch IDs
  
  // Dynamic analytics and insights references
  insightIds: Types.ObjectId[]; // Array of generated insight IDs
  taskIds: Types.ObjectId[];    // Array of generated task IDs
  
  // Metadata
  plantId: Types.ObjectId;
  assetId: Types.ObjectId;
  createdBy?: Types.ObjectId;
  isArchived: boolean;
}

// Accept both enum KEYS and VALUES
const BATCH_STATUS_ALLOWED = [
  ...Object.keys(batchConstants.BATCH_STATUS_ENUM),
  ...Object.values(batchConstants.BATCH_STATUS_ENUM),
];

const BATCH_DETECTION_ALLOWED = [
  ...Object.keys(batchConstants.BATCH_DETECTION_ENUM),
  ...Object.values(batchConstants.BATCH_DETECTION_ENUM),
];

const BATCH_TRIGGERED_BY_ALLOWED = [
  ...Object.keys(batchConstants.BATCH_TRIGGERED_BY_ENUM),
  ...Object.values(batchConstants.BATCH_TRIGGERED_BY_ENUM),
];

const batchLogSchema = new Schema<IBatchLog>(
  {
    batchConfigId: {
      type: Schema.Types.ObjectId,
      ref: "batch-configs",
      required: true,
    },
    
    startTime: {
      type: Number, // Unix timestamp
      required: false,
    },
    
    endTime: {
      type: Number, // Unix timestamp
    },
    
    duration: {
      type: Number, // Duration in seconds
    },
    
    status: {
      type: String,
      enum: BATCH_STATUS_ALLOWED,
      required: false,
    },
    
    previousStatus: {
      type: String,
      enum: BATCH_STATUS_ALLOWED,
    },
    
    detectionType: {
      type: String,
      enum: BATCH_DETECTION_ALLOWED,
      required: false,
    },
    
    triggeredBy: {
      type: String,
      enum: BATCH_TRIGGERED_BY_ALLOWED,
      required: false,
    },
    
    triggeredEventId: {
      type: Schema.Types.ObjectId,
      ref: "event-components",
    },
    
    triggeredTimeCycle: {
      frequency: { type: String },
      interval: { type: Number },
      startDate: { type: Number }, // Unix timestamp
    },
    
    hasErrors: {
      type: Boolean,
      default: false,
    },
    
    errorCount: {
      type: Number,
      default: 0,
    },
    
    lastErrorTime: {
      type: Number, // Unix timestamp
    },
    
    concurrentBatchIds: {
      type: [String],
      default: [],
    },
    
    insightIds: {
      type: [Schema.Types.ObjectId],
      ref: "insights",
      default: [],
    },
    
    taskIds: {
      type: [Schema.Types.ObjectId],
      ref: "tasks",
      default: [],
    },
    
    plantId: {
      type: Schema.Types.ObjectId,
      ref: "Plant",
      required: false,
    },
    
    assetId: {
      type: Schema.Types.ObjectId,
      ref: "Plant",
      required: false,
    },
    
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for efficient querying
batchLogSchema.index({ batchConfigId: 1, startTime: -1 });
batchLogSchema.index({ plantId: 1, status: 1 });
batchLogSchema.index({ startTime: -1 });
batchLogSchema.index({ assetId: 1, startTime: -1 });

const BatchLogModel: Model<IBatchLog> = mongoose.model<IBatchLog>(
  "batch-logs",
  batchLogSchema,
  "batch-logs"
);

export { BatchLogModel, IBatchLog }; 