import mongoose, { Schema } from "mongoose";

interface ILayoutSet {
  from: string; // Starting Equipment ID (SEN)
  to: string; // Ending Equipment ID (SEN)
  path: string[]; // Ordered list of equipment IDs
}

interface IPathSchema extends Document {
  graphId: string; // Reference to the Layout
  layoutSets: ILayoutSet[]; // Array of SEN-to-SEN paths
}

const PathSchema = new Schema(
  {
    graphId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Layouts",
      required: true,
    },
    layoutSets: [
      {
        from: { type: String, required: true }, // Starting Equipment ID (SEN)
        to: { type: String, required: true }, // Ending Equipment ID (SEN)
        path: [{ type: String, required: true }], // Ordered list of Equipment IDs
      },
    ],
  },
  { timestamps: true }
);
const LayoutPathModel = mongoose.model<IPathSchema>(
  "LayoutPaths",
  PathSchema,
  "LayoutPaths"
);
export { LayoutPathModel, IPathSchema };
