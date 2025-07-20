import mongoose, { Schema } from "mongoose";

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

const uploadSchema = new Schema(
  {
    plantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plant",
      required: true,
    },
    uploaderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NewUser",
      required: true,
    },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    fileName: { type: String, required: true },
    description: String,
    s3Key: { type: String, required: true },
    fileType: String,
    fileSize: Number,
    etag: String,
    uploadedAt: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const FileManagementUploadModel = mongoose.model<IFileUpload>(
  "FileManagementUploadDetails",
  uploadSchema,
  "FileManagementUploadDetails"
);

export { IFileUpload, FileManagementUploadModel };
