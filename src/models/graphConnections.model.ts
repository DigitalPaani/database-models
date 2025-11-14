import mongoose, { Schema, Types } from "mongoose";

interface IPathSchema extends Document {
  graphId: Types.ObjectId; // Reference to the Layout
  from: string; // Starting Equipment ID (SEN)
  to: string; // Ending Equipment ID (SEN)
  path: string[]; // Ordered list of equipment IDs
  index: number;
  createdAt: Date;
  updatedAt: Date;
}

const PathSchema = new Schema<IPathSchema>(
  {
    graphId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Layouts",
      required: true,
    },
    from: { type: String, required: true }, // Starting Equipment ID (SEN)
    to: { type: String, required: true }, // Ending Equipment ID (SEN)
    path: [{ type: String, required: true }], // Ordered list of Equipment IDs
    index: { type: Number, required: true },
  },
  { timestamps: true }
);
const LayoutPathModel = mongoose.model<IPathSchema>(
  "LayoutPaths",
  PathSchema,
  "LayoutPaths"
);
export { LayoutPathModel, IPathSchema };
