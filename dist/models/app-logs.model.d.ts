import type { Document, Model, Types } from "mongoose";
interface IAppLogs extends Document {
    module: string;
    previous?: Record<string, any>;
    current?: Record<string, any>;
    actionTakenBy: Types.ObjectId;
    action: string;
    version: number;
}
declare const AppLogsModel: Model<IAppLogs>;
export { AppLogsModel, IAppLogs };
//# sourceMappingURL=app-logs.model.d.ts.map