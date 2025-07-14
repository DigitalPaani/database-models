import type { Document, Model, Types } from "mongoose";
import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';

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
  parentUserId: Types.ObjectId;
  skillIds: Types.ObjectId[];
  isArchived: boolean;
  defaultPage: string | null;
  blockedNotificationModules: [string];
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
    userStatus: String,
    twoFactorAuthentication: Boolean,
    language: String,
    profilePic: String,
    skillIds: { type: [Schema.Types.ObjectId], required: false },
    parentUserId: { type: Schema.Types.ObjectId, ref: "NewUser" },
    isStaff: { type: Boolean, required: true, default: false },
    isArchived: { type: Boolean, default: false },
    defaultPage: { type: String, default: null },
    blockedNotificationModules: {
      type: [String],
      default: [],
    },
    // defaultHomePage: { type: String, required: true, default: '' },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

userSchema.pre('save', async function (next) {
  try {

    // Check for unique email only if the user is not archived
    if (!this.isArchived && this.isNew) {
      // $ will only match the exact email string, but in a case-insensitive way.
      const user = await NewUserModel.findOne({ email: { $regex: new RegExp('^' + this.email + '$', 'i') },isArchived: false }).lean();
      if (user) {
        throw new Error('Email already exists');
      }
    }

    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }

    next(); // Proceed to save the user
  } catch (error) {
    console.error(`Error: ${JSON.stringify(error)}`)
    throw error; // Pass any errors to the next middleware
  }
});



// Define the model using the schema and the TypeScript interface
const NewUserModel: Model<INewUser> = mongoose.model<INewUser>(
  "NewUser",
  userSchema,
  "newUsers"
);

export { NewUserModel, INewUser };
