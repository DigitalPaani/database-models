import mongoose from "mongoose";
import { IDLSensorConfig } from "./data-logger-sensor-config.model";
declare const DLSensorConfigAuditModel: mongoose.Model<IDLSensorConfig, {}, {}, {}, mongoose.Document<unknown, {}, IDLSensorConfig> & IDLSensorConfig & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>;
export { DLSensorConfigAuditModel };
//# sourceMappingURL=dl-sensor-config-audit.model.d.ts.map