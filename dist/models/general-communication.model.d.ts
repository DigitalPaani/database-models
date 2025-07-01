import type { Document, Model, Types } from "mongoose";
import { INewUser } from "./newUserModel";
interface ISender {
    type: "USER" | "DOCTOR_PAANI";
    subTypeDetails?: "USER" | "BIDIRECTIONAL" | "INSIGHTS" | "INGESTION";
    userId?: Types.ObjectId | INewUser;
}
interface IReceiver {
    userId: Types.ObjectId | INewUser;
}
interface IContent {
    message: string;
    channel: "WHATSAPP" | "SMS" | "CALL" | "EMAIL" | "REPORT" | "NOTIFICATION";
}
interface IGeneralCommunication extends Document {
    sender: ISender;
    receiver: IReceiver;
    content: IContent;
    deliveryStatus?: "STATUS_NOT_AVAILABLE" | "PENDING" | "SENT" | "DELIVERED" | "FAILED";
    isMultipleConversations?: boolean;
    multipleConversationPartner: string;
    isArchived?: boolean;
    isRead?: boolean;
    status?: "ACTIVE" | "INACTIVE";
    errorDetails?: string;
    tags?: string[];
    meta?: Record<string, any>;
    createdAt?: Date;
    updatedAt?: Date;
}
declare const GeneralCommunicationModel: Model<IGeneralCommunication>;
export { GeneralCommunicationModel, IGeneralCommunication };
//# sourceMappingURL=general-communication.model.d.ts.map