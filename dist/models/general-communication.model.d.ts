import type { Document, Model, Types } from "mongoose";
interface IGeneralCommunication extends Document {
    userId: Types.ObjectId;
    message: string;
    communicationType: string;
}
declare const GeneralCommunicationModel: Model<IGeneralCommunication>;
export { GeneralCommunicationModel, IGeneralCommunication };
//# sourceMappingURL=general-communication.model.d.ts.map