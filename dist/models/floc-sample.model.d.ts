import type { Document, Model } from 'mongoose';
import { Types } from 'mongoose';
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
declare const FlocSampleModel: Model<IFlocSample>;
export { FlocSampleModel, IFlocSample };
//# sourceMappingURL=floc-sample.model.d.ts.map