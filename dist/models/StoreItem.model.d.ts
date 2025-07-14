import { Document, Types } from 'mongoose';
import mongoose from 'mongoose';
export interface SensorConfigType {
    _id: Types.ObjectId;
    valueType?: string;
    sensorTag: string;
    sensorType: string;
    sensorTypeAbr: string;
    sensorNickName?: string | null | undefined;
    plantId: Types.ObjectId;
}
interface ExpectedUsageType {
    value?: number;
    unit: string;
    timeMins?: number;
    time?: number;
    timeUnit?: string;
}
export interface StoreItemDetailsType {
    itemId?: Types.ObjectId;
    name: string;
    customItemName?: string;
    min?: number;
    max?: number;
    unit?: string;
    assetIds: Types.ObjectId[];
    expectedValue?: ExpectedUsageType[];
    sensors: SensorConfigType[];
}
interface StoreItemsType {
    storeId: Types.ObjectId;
    storeCategoryName: string;
    storeItemDetails: StoreItemDetailsType[];
    createdAt: Date;
    updatedAt: Date;
}
export interface StoreItemsDocument extends Document, StoreItemsType {
}
declare const StoreItemsModel: mongoose.Model<StoreItemsDocument, {}, {}, {}, Document<unknown, {}, StoreItemsDocument> & StoreItemsDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export { StoreItemsModel };
//# sourceMappingURL=StoreItem.model.d.ts.map