import mongoose, { Document } from "mongoose";
import { Types } from "..";
declare const escalationStepSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    _id: false;
}, {
    value: string;
    timeInMinutes: number;
    unit: string;
    userIds: Types.ObjectId[];
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    value: string;
    timeInMinutes: number;
    unit: string;
    userIds: Types.ObjectId[];
}>> & mongoose.FlatRecord<{
    value: string;
    timeInMinutes: number;
    unit: string;
    userIds: Types.ObjectId[];
}> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
interface IEscalationFlow extends Document {
    attendanceManager: Types.ObjectId[];
    rosterManager: Types.ObjectId[];
    operator: Types.ObjectId[];
    userGroup: Types.ObjectId;
    assets: Types.ObjectId[];
    modules: string[];
    escalations: (typeof escalationStepSchema)[];
}
declare const EscalationFlowModel: mongoose.Model<IEscalationFlow, {}, {}, {}, mongoose.Document<unknown, {}, IEscalationFlow> & IEscalationFlow & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export { IEscalationFlow, EscalationFlowModel };
//# sourceMappingURL=EscalationFlow.model.d.ts.map