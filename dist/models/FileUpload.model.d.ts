import mongoose, { Types } from "mongoose";
interface IFileUpload extends Document {
    plantId: Types.ObjectId;
    uploaderId: Types.ObjectId;
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
declare const FileManagementUploadModel: mongoose.Model<IFileUpload, {}, {}, {}, mongoose.Document<unknown, {}, IFileUpload> & IFileUpload & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>;
export { IFileUpload, FileManagementUploadModel };
//# sourceMappingURL=FileUpload.model.d.ts.map