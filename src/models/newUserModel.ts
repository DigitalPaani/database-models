import type { Document, Model, Types } from "mongoose";
import mongoose, { Schema } from "mongoose";
import { USER_STATUS_ENUMS } from "../constants/users.constants";

// Define a TypeScript interface for the User document
interface INewUser extends Document {
  name: string;
  email: string;
  password: string;
  defaultPageId: any;
  number: string;
  userStatus: string;
  twoFactorAuthentication: boolean;
  language: string;
  profilePic: string;
  isStaff: boolean;
  isPhoneNumberVerified: boolean,
  isEmailAddressVerified: boolean,
  parentUserId: Types.ObjectId;
  skillIds: Types.ObjectId[];
  isArchived: boolean;
  blockedNotificationModules:[string];
  invitedBy?: Types.ObjectId;
  inviteAcceptedOn?: Date;
  inviteExpiry?: Date;
  // defaultHomePage: string;
  [key: string]: any;
}

// Define the schema using the TypeScript interface
const userSchema = new Schema<INewUser>(
  {
    name: String,
    email: { type: String, required: true }, // Ensure email is unique
    password: String,
    defaultPageId: Object,
    number: String,
    userStatus: {
      type: String,
      enum: Object.values(USER_STATUS_ENUMS),
      required: true
    },
    twoFactorAuthentication: Boolean,
    language: String,
    profilePic: String,
    skillIds: { type: [Schema.Types.ObjectId], required: false },
    parentUserId: { type: Schema.Types.ObjectId, ref: "NewUser" },
    isStaff: { type: Boolean, required: true, default: false },
    isPhoneNumberVerified: { type: Boolean, default: false },
    isEmailAddressVerified: { type: Boolean, default: false },
    blockedNotificationModules: {
      type: [String],
      default: [],
    },
    invitedBy: { type: Schema.Types.ObjectId, ref: 'NewUser', default: null },
    inviteAcceptedOn: { type: Date, default: null },
    inviteExpiry: { type: Date, default: null },
    // defaultHomePage: { type: String, required: true, default: '' },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Define the model using the schema and the TypeScript interface
const NewUserModel: Model<INewUser> = mongoose.model<INewUser>(
  "NewUser",
  userSchema,
  "newUsers"
);

export { NewUserModel, INewUser };
