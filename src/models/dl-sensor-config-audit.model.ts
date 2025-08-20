import mongoose from "mongoose";
import {
  dataLoggerSensorConfigSchema,
  IDLSensorConfig,
} from "./data-logger-sensor-config.model";

const DLSensorConfigAuditModel = mongoose.model<IDLSensorConfig>(
  "dataLoggerSensorConfigAudit",
  dataLoggerSensorConfigSchema,
  "dataLoggerSensorConfigAudit"
);

export { DLSensorConfigAuditModel };
