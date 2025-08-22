import type { Document, Model } from "mongoose";
import { Types } from "mongoose";
interface IOcrLogbookDataInputLog extends Document {
    assetId: Types.ObjectId | null;
    logbookTemplateId: Types.ObjectId | null;
    attachmentId: Types.ObjectId | null;
    dataInputSelectedValues: IDataInputSelectedValue[];
    isArchived: boolean;
}
interface IDataInputSelectedValue extends Document {
    key: string;
    value: string;
}
declare const OcrLogbookDataInputLogModel: Model<IOcrLogbookDataInputLog>;
export { OcrLogbookDataInputLogModel, IOcrLogbookDataInputLog };
//# sourceMappingURL=ocr-data-input-logs.model.d.ts.map