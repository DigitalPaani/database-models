import type { Document, Model, Types } from "mongoose";
interface IFlocSample extends Document {
    sensorId: Types.ObjectId;
    sampleId: string;
    startTime: Date;
    endTime: Date;
    isDefault: boolean;
    hide: boolean;
    marks: IFlocMark[];
    isArchived: boolean;
}
interface IFlocMark extends Document {
    mark: string;
    timestamp: Date;
}
declare const FlocSampleModel: Model<IFlocSample>;
export { FlocSampleModel, IFlocSample };
//# sourceMappingURL=floc-sample.model.d.ts.map