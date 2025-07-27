import { Document, Types } from 'mongoose';
import mongoose from 'mongoose';
import { Schema } from 'mongoose';

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

export interface StoreItemsDocument extends Document, StoreItemsType {}


const ExpectedUsage = new Schema<ExpectedUsageType & Document>({
  value: {
    type: Number,
    default: 0,
    required: false,
  },
  unit: {
    type: String,
    required: false,
  },
  timeMins: {
    type: Number,
    default: 1,
    required: false,
  },
  time: {
    type: Number,
    default: 1,
    required: false,
  },
  timeUnit: {
    type: String,
    default: 'minute',
    required: false,
  },
});

const StoreItemDetails = new Schema<StoreItemDetailsType & Document>({
  itemId: {
    type: Schema.Types.ObjectId,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  customItemName: { type: String, required: false },
  min: {
    type: Number,
    required: false,
  },
  max: {
    type: Number,
    required: false,
  },
  unit: {
    type: String,
    default: '',
    required: false,
  },
  assetIds: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Plant',
    },
  ],
  expectedValue: {
    type: [ExpectedUsage],
    required: false,
  },
  sensors: {
    type: [{ type: Schema.Types.ObjectId, ref: 'sensors' }],
    required: true,
  },
});

const StoreItemsSchema = new Schema<StoreItemsType & Document>({
  storeId: { type: Schema.Types.ObjectId, required: true },

  storeCategoryName: {
    type: String,
    required: true,
  },
  storeItemDetails: {
    type: [StoreItemDetails],
    required: true,
    _id: false,
  },

  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});

const assetIdsPath = StoreItemDetails.path('assetIds');
if (assetIdsPath?.instance === 'Array') {
  assetIdsPath.validate(
    (value: mongoose.Types.ObjectId[]) => value.length >= 1,
    'assetIds array must have at least one element'
  );
}

const TestItemsModel = mongoose.model<StoreItemsDocument>(
  'StoreItems',
  StoreItemsSchema,
  'StoreItems'
);
export {TestItemsModel};
