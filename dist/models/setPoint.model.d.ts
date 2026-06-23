import type { Document, Model } from 'mongoose';
import { Types } from '..';
interface ISetPoint extends Document {
    name: string;
    description?: string;
    type: string;
    setPointDetails: unknown;
    isArchived: boolean;
    sensorIds: Types.ObjectId;
}
declare const SetPointModel: Model<ISetPoint>;
export { SetPointModel, ISetPoint };
//# sourceMappingURL=setPoint.model.d.ts.map