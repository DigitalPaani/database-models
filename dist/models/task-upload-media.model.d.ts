import type { Document, Model } from "mongoose";
import { Types } from "mongoose";
interface ITaskUploadMedia extends Document {
    taskId: Types.ObjectId;
    url: String;
    isArchived: Boolean;
    createdBy: Types.ObjectId;
}
declare const TaskUploadMediaModel: Model<ITaskUploadMedia>;
export { TaskUploadMediaModel, ITaskUploadMedia };
//# sourceMappingURL=task-upload-media.model.d.ts.map