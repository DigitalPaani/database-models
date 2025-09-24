import type { Document, Model } from "mongoose";
import { Types } from "mongoose";
interface IOcrLogbookDataInputLog extends Document {
    logbookAssetConfigurationId: Types.ObjectId;
    assetId: Types.ObjectId;
    logbookTemplateId: Types.ObjectId;
    attachmentId: Types.ObjectId;
    logbookTimestamp: number;
    dataInputSelectedValues: IDataInputSelectedValue[];
    isArchived: boolean;
}
interface IDataInputSelectedValue extends Document {
    sensorId: string;
    value: string;
}
declare const OcrLogbookDataInputLogModel: Model<IOcrLogbookDataInputLog>;
export { OcrLogbookDataInputLogModel, IOcrLogbookDataInputLog };
//# sourceMappingURL=ocr-data-input-logs.model.d.ts.map