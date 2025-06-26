import mongoose, { Document, Types } from "mongoose";
interface IBulkEntryReport extends Document {
    reportLink: string;
    plantId: Types.ObjectId;
    summary: {
        total?: number;
        success?: number;
        failed?: number;
    };
    createdAt?: Date;
}
declare const BulkEntryReportModel: mongoose.Model<IBulkEntryReport, {}, {}, {}, mongoose.Document<unknown, {}, IBulkEntryReport> & IBulkEntryReport & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export { BulkEntryReportModel, IBulkEntryReport };
//# sourceMappingURL=data-input-bulk-entry-report.d.ts.map