import mongoose, { Document, Types } from "mongoose";
interface ISensor extends Document {
    sensorName: string;
    sensorCompanyId: Types.ObjectId;
    sensorModelNumber: string;
    granularity: string[];
    purpose: string[];
    inputType: string[];
    tags: string[];
    templateTags?: ITemplateTag[];
}
export interface ITemplateTag {
    tag: string;
    threshold: {
        validMin?: number;
        validMax?: number;
        cautionMin?: number;
        cautionMax?: number;
        safeMin?: number;
        safeMax?: number;
        showCautionZone?: boolean;
    };
    isThresholdConfigured?: boolean;
}
export declare const TemplateTagSchema: mongoose.Schema<ITemplateTag, mongoose.Model<ITemplateTag, any, any, any, mongoose.Document<unknown, any, ITemplateTag> & ITemplateTag & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, ITemplateTag, mongoose.Document<unknown, {}, mongoose.FlatRecord<ITemplateTag>> & mongoose.FlatRecord<ITemplateTag> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
declare const SensorModel: mongoose.Model<ISensor, {}, {}, {}, mongoose.Document<unknown, {}, ISensor> & ISensor & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export { SensorModel, ISensor };
//# sourceMappingURL=SensorList.d.ts.map