import type { Document } from 'mongoose';
import mongoose, { Types } from 'mongoose';
interface IFlocSample extends Document {
    sensorId: Types.ObjectId;
    sampleId: string;
    startTime: Date;
    endTime?: Date | null;
    isDefault: boolean;
    hide: boolean;
    marks: IFlocMark[];
}
interface IFlocMark extends Document {
    mark: string;
    timestamp: Date;
}
declare const FlocSampleModel: mongoose.Model<IFlocSample, {}, {}, {}, Document<unknown, {}, IFlocSample> & IFlocSample & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export { FlocSampleModel, IFlocSample };
//# sourceMappingURL=floc-sample.model.d.ts.map