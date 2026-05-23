import type { Document, Model, Types } from 'mongoose';
interface IInventory extends Document {
    inventoryCategoryName: string;
    categoryItem: string;
    categoryItemId: Types.ObjectId;
    amount: number;
    unit: string;
    day: number;
    action: string;
    remark?: string;
    remarkId?: Types.ObjectId;
    plantId: Types.ObjectId;
    storeId: Types.ObjectId;
}
declare const InventoryModel: Model<IInventory>;
export { InventoryModel, IInventory };
//# sourceMappingURL=inventory.model.d.ts.map