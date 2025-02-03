import mongoose, { Document, Schema } from "mongoose";

interface Contact {
  fullName: string;
  phoneNumber: string;
  emailId: string;
  designation: string;
  comments?: string;
}

interface Company extends Document {
  companyName: string;
  companyDescription?: string;
  companyAddress: string;
  tags?: string[];
  contactDetails: Contact[];
  createdAt?: Date;
  updatedAt?: Date;
}

const contactSchema = new Schema<Contact>({
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  emailId: { type: String, required: true },
  designation: { type: String, required: true },
  comments: { type: String, required: false },
});

const companySchema = new Schema<Company>(
  {
    companyName: { type: String, required: true },
    companyDescription: { type: String, required: false },
    companyAddress: { type: String, required: true },
    tags: {
      type: [String],
      enum: ["sensor", "electrical panel"], // Restrict values
      required: false,
    },
    contactDetails: { type: [contactSchema], required: true }, // Array of contacts
  },
  { timestamps: true }
);

const CompanyModel = mongoose.model("company", companySchema,'companies');

export { CompanyModel };
