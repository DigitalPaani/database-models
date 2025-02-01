import mongoose, { Document } from "mongoose";
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
    address: string;
    tags?: string[];
    contacts: Contact[];
    createdAt?: Date;
    updatedAt?: Date;
}
declare const CompanyModel: mongoose.Model<Company, {}, {}, {}, mongoose.Document<unknown, {}, Company> & Company & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export { CompanyModel };
//# sourceMappingURL=CompanyModel.d.ts.map