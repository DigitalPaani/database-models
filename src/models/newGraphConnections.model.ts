import mongoose, { Schema, Types } from "mongoose";

interface INewPathSchema extends Document {
  graphId: Types.ObjectId; // Reference to the Layout
  from: string; // Starting Equipment ID (SEN)
  to: string; // Ending Equipment ID (SEN)
  path: string[]; // Ordered list of equipment IDs
  index: number;
  createdAt: Date;
  updatedAt: Date;
}

const NewPathSchema = new Schema<INewPathSchema>(
  {
    graphId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Layouts",
      required: true,
      index: true,
    },
    from: { type: String, index: true }, // Starting Equipment ID (SEN)
    to: { type: String, index: true }, // Ending Equipment ID (SEN)
    path: [{ type: Schema.Types.Mixed, required: true }], // Ordered list of Equipment IDs
    index: { type: Number, required: true },
  },
  { timestamps: true }
);

NewPathSchema.index({ path: 1 });

const NewLayoutPathModel = mongoose.model<INewPathSchema>(
  "NewLayoutPaths",
  NewPathSchema,
  "NewLayoutPaths"
);
export { NewLayoutPathModel, INewPathSchema };
