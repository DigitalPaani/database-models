import type { Model, Types } from "mongoose";
import mongoose, { Schema } from "mongoose";
import { DAY_MS } from "../constants/closeTheLoop.constants";

export interface CtlWorkerHeartbeatDoc {
  _id: Types.ObjectId;
  workerId: string;
  role: string;
  host: string;
  pid: number;
  beatAt: Date;
}

const HEARTBEAT_RETENTION_SECONDS = DAY_MS / 1000;

const ctlWorkerHeartbeatSchema = new Schema<CtlWorkerHeartbeatDoc>(
  {
    workerId: { type: String, required: true },
    role: { type: String, required: true },
    host: { type: String, required: true, default: "" },
    pid: { type: Number, required: true, default: 0 },
    beatAt: { type: Date, required: true },
  },
  { timestamps: false },
);

ctlWorkerHeartbeatSchema.index({ workerId: 1 }, { unique: true });
ctlWorkerHeartbeatSchema.index(
  { beatAt: 1 },
  { expireAfterSeconds: HEARTBEAT_RETENTION_SECONDS },
);

const CtlWorkerHeartbeatModel: Model<CtlWorkerHeartbeatDoc> =
  mongoose.model<CtlWorkerHeartbeatDoc>(
    "CtlWorkerHeartbeat",
    ctlWorkerHeartbeatSchema,
    "ctlWorkerHeartbeats",
  );

export default CtlWorkerHeartbeatModel;
