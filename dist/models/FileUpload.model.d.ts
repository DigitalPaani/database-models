import mongoose from "mongoose";
interface IFileUpload extends Document {
    _id?: string;
    plantId: string;
    uploaderId: string;
    fileName: string;
    description?: string;
    category: string;
    subCategory: string;
    s3Key: string;
    fileType: string;
    fileSize: number;
    etag?: string;
    uploadedAt: string;
    isDeleted?: boolean;
}
declare const FileManagementUploadModel: mongoose.Model<IFileUpload, {}, {}, {}, mongoose.Document<unknown, {}, IFileUpload> & IFileUpload & Required<{
    _id: string;
}> & {
    __v: number;
}, any>;
export { IFileUpload, FileManagementUploadModel };
//# sourceMappingURL=FileUpload.model.d.ts.map