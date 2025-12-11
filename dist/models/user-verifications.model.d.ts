import type { Document, Model } from "mongoose";
import { Types } from "mongoose";
interface IUserVerification extends Document {
    userId: Types.ObjectId;
    verificationType: 'EMAIL' | "PHONE_NUMBER";
    isVerified: boolean;
    expiresAt: Date | null;
    verifiedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
declare const UserVerificationModel: Model<IUserVerification>;
export { IUserVerification, UserVerificationModel };
//# sourceMappingURL=user-verifications.model.d.ts.map