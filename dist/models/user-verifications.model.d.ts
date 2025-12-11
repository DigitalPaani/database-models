import type { Document, Model } from "mongoose";
import { Types } from "mongoose";
declare enum VerificationTypeEnum {
    EMAIL_ADDRESS = "EMAIL_ADDRESS",
    PHONE_NUMBER = "PHONE_NUMBER"
}
interface IUserVerification extends Document {
    userId: Types.ObjectId;
    verificationType: VerificationTypeEnum;
    encryptedOtp: string;
    isVerified: boolean;
    expiresAt: Date | null;
    verifiedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
declare const UserVerificationModel: Model<IUserVerification>;
export { IUserVerification, UserVerificationModel, VerificationTypeEnum };
//# sourceMappingURL=user-verifications.model.d.ts.map