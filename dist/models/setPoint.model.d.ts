import type { Document, Model } from 'mongoose';
interface ISetPoint extends Document {
    name: string;
    description?: string;
    type: string;
    setPointDetails: unknown;
    isArchived: boolean;
}
declare const SetPointModel: Model<ISetPoint>;
export { SetPointModel, ISetPoint };
//# sourceMappingURL=setPoint.model.d.ts.map