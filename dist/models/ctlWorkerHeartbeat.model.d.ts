import type { Model, Types } from "mongoose";
export interface CtlWorkerHeartbeatDoc {
    _id: Types.ObjectId;
    workerId: string;
    role: string;
    host: string;
    pid: number;
    beatAt: Date;
}
declare const CtlWorkerHeartbeatModel: Model<CtlWorkerHeartbeatDoc>;
export default CtlWorkerHeartbeatModel;
//# sourceMappingURL=ctlWorkerHeartbeat.model.d.ts.map