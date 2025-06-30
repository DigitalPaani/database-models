import type { Document, Model, Types } from "mongoose";
interface IGeneralCommunication extends Document {
    userId: Types.ObjectId;
    messageContent: string;
    senderType: string;
    channel: string;
    status: string;
    isArchived: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
declare const GeneralCommunicationModel: Model<IGeneralCommunication>;
export { GeneralCommunicationModel, IGeneralCommunication };
//# sourceMappingURL=general-communication.model.d.ts.map