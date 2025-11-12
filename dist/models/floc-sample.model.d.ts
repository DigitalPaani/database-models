import type { Document, Model, Types } from "mongoose";
interface IFlocMark extends Document {
    mark: string;
    timestamp: Date;
}
interface IErrorMark extends Document {
    errorCode: string;
    timestamp: Date;
}
interface IFlocSample extends Document {
    sensorId: Types.ObjectId;
    sampleId: string;
    startTime: Date;
    endTime: Date;
    isDefault: boolean;
    hide: boolean;
    marks: IFlocMark[];
    errorMarks: IErrorMark[];
    isArchived: boolean;
}
declare const FlocSampleModel: Model<IFlocSample>;
export { FlocSampleModel, IFlocSample, IErrorMark };
//# sourceMappingURL=floc-sample.model.d.ts.map