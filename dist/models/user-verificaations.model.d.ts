import type { Document, Model } from "mongoose";
import { Types } from "mongoose";
interface IUserVerification extends Document {
    userId: Types.ObjectId;
    verificationType: 'EMAIL' | "PHONE_NUMBER";
    isVerified: boolean;
    verifiedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
declare const UserVerification: Model<IUserVerification>;
export { IUserVerification, UserVerification };
//# sourceMappingURL=user-verificaations.model.d.ts.map