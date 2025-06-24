import type { Document, Model, Types } from 'mongoose';
interface IStore extends Document {
    name: string;
    assets: Types.ObjectId[];
    clients: Types.ObjectId[];
    archived: boolean;
    totalItems: number;
    serialNo: number;
    storeAbbr: string;
}
declare const Store: Model<IStore>;
export { Store, IStore };
//# sourceMappingURL=Store.model.d.ts.map