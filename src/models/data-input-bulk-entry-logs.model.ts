import mongoose, { Schema, Types } from "mongoose";


interface IDataInputSchema {
    calculatedAt: number,
    sensorId: string
    sensorTag: string,
    value: string,
    assetId: string,
    errorExists: boolean
    errorMessage: string
};

interface IDataInputBulkEntryLogs {
    userId: string,
    dataInput: IDataInputSchema,
    fileLink: string,
    fileType: string,
    success: boolean
};


const dataInputSchema = new Schema<IDataInputSchema>({
    calculatedAt: {
        type: Number,
        required: false
    },
    sensorId: {
        type: String,
        required: false
    },
    sensorTag: {
        type: String,
        required: false
    },
    value: {
        type: String,
        required: false
    },
    assetId: {
        type: String,
        required: false
    },
    errorExists: {
        type: Boolean,
        required: false
    },
    errorMessage: {
        type: String,
        required: false
    }
});

const DataInputBulkEntryLogSchema = new Schema<IDataInputBulkEntryLogs>({
    userId: {
        type: String,
        required: false
    },
    dataInput: {
        type: dataInputSchema,
        required: false
    },
    fileLink: {
        type: String,
        required: false
    },
    fileType: {
        type: String,
        required: false
    },
    success: {
        type: Boolean,
        required: false
    }
}, { timestamps: true });


const DataInputBulkEntryLogsModel = mongoose.model<IDataInputBulkEntryLogs>(
    "data-input-bulk-entry-logs",
    DataInputBulkEntryLogSchema,
    "data-input-bulk-entry-logs"
)

export {
    DataInputBulkEntryLogsModel,
    IDataInputBulkEntryLogs
}