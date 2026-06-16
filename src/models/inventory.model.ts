import type { Document, Model, Types } from 'mongoose';
import mongoose, { Schema } from 'mongoose';

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

const inventorySchema = new Schema<IInventory>(
  {
    inventoryCategoryName: {
      type: String,
      required: true,
    },
    categoryItem: {
      type: String,
      required: true,
    },
    categoryItemId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    day: {
      type: Number,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    remark: {
      type: String,
      required: false,
    },
    remarkId: {
      type: Schema.Types.ObjectId,
      required: false,
    },
    plantId: {
      type: Schema.Types.ObjectId,
      ref: 'Plant',
      required: true,
    },
    storeId: {
      type: Schema.Types.ObjectId,
      ref: 'Store',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const InventoryModel: Model<IInventory> = mongoose.model<IInventory>(
  'Inventory',
  inventorySchema,
  'inventories'
);

export { InventoryModel, IInventory };
