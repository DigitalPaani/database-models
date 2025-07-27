import mongoose, { Schema, Document } from 'mongoose';

export interface ITest extends Document {
  name: string;
  value: number;
  createdAt: Date;
}

const TestSchema = new Schema<ITest>(
  {
    name: { type: String, required: true },
    value: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: 'tests' }
);

export const TestModel = mongoose.model<ITest>('Test', TestSchema);
