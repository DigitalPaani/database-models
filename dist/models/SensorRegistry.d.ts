import mongoose, { Document, Types } from "mongoose";
interface ISensorRegistry extends Document {
    sensorName: string;
    sensorCompanyId: Types.ObjectId;
    sensorModelNumber: string;
    granularity: string[];
    purpose: string[];
    inputType: string[];
    purposeTags: string[];
    purposeTemplates?: IPurposeTemplateTag[];
}
export interface IPurposeTemplateTag {
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
export declare const TemplateTagSchema: mongoose.Schema<IPurposeTemplateTag, mongoose.Model<IPurposeTemplateTag, any, any, any, mongoose.Document<unknown, any, IPurposeTemplateTag> & IPurposeTemplateTag & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IPurposeTemplateTag, mongoose.Document<unknown, {}, mongoose.FlatRecord<IPurposeTemplateTag>> & mongoose.FlatRecord<IPurposeTemplateTag> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
declare const SensorRegistryModel: mongoose.Model<ISensorRegistry, {}, {}, {}, mongoose.Document<unknown, {}, ISensorRegistry> & ISensorRegistry & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export { SensorRegistryModel, ISensorRegistry };
//# sourceMappingURL=SensorRegistry.d.ts.map