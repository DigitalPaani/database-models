import type { Document, Model, Types } from 'mongoose';
import mongoose from 'mongoose';
import { Schema } from 'mongoose';

interface IStore extends Document {
  name: string;
  assets: Types.ObjectId[];
  clients: Types.ObjectId[];
  archived: boolean;
  totalItems: number;
  serialNo: number;
  storeAbbr: string;
}

const storeSchema: Schema<IStore> = new Schema<IStore>({
  name: {
    type: String,
    required: true,
  },
  assets: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Plant',
    },
  ],
  clients: [
    {
      type: Schema.Types.ObjectId,
      ref: 'UserGroup',
    },
  ],
  archived: {
    type: Boolean,
    default: false,
  },
  totalItems: {
    type: Number,
    default: 0,
  },
  serialNo: {
    type: Number,
    default: 0,
  },
  storeAbbr: {
    type: String,
    // required: true,
  },
});

// Custom validator to ensure that assets and clients arrays have at least one element
storeSchema.path('assets').validate((value: mongoose.Types.ObjectId[]) => value.length >= 1, 'assets array must have at least one element');

storeSchema.path('clients').validate((value: mongoose.Types.ObjectId[]) => value.length >= 1, 'clients array must have at least one element');

const Store: Model<IStore> = mongoose.model<IStore>('Store', storeSchema, 'Stores');

export {Store,IStore};
