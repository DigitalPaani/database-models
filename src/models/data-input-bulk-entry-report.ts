import mongoose, { Schema, Document, Types } from "mongoose";

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

const dataInputBulkEntryReportSchema = new Schema<IBulkEntryReport>(
    {
        reportLink: {
            type: String,
            required: true,
            trim: true,
        },
        plantId: {
            type: Schema.Types.ObjectId,
            ref: "Plant",
            required: true,
        },
        summary: {
            total: {
                type: Number,
            },
            success: {
                type: Number,
            },
            failed: {
                type: Number,
            },
        },
    },
    { timestamps: true }
);

const BulkEntryReportModel = mongoose.model<IBulkEntryReport>(
    "dataInputBulkEntryReports",
    dataInputBulkEntryReportSchema,
    "dataInputBulkEntryReports"
);

export { BulkEntryReportModel, IBulkEntryReport };
