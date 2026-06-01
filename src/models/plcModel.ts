import mongoose, { Schema, Document, Types } from "mongoose";

interface IPlcData extends Document {
  nickName: string;
  plantId: Types.ObjectId;
  lastUpdateTime?: Date;
  lastMessageSentTime?: Date;
  connectionStatus: "online" | "offline";
  lastPinged?: Date;
  lastContactedTime: number;
  internet: boolean;
}

const plcSchema = new Schema<IPlcData>({
  nickName: {
    type: String,
    required: true,
    trim: true,
  },
  plantId: {
    type: Schema.Types.ObjectId,
    ref: "Plant",
    required: true,
  },
  lastUpdateTime: {
    type: Date,
    required: false,
  },
  lastMessageSentTime: {
    type: Date,
    required: false,
  },
  connectionStatus: {
    type: String,
    enum: ["online", "offline"],
    required: true,
  },
  lastPinged: {
    type: Date,
    required: false,
  },
  lastContactedTime: { type: Number },
  internet: { type: Boolean },
});

const PlcModel = mongoose.model<IPlcData>("plcs", plcSchema, "plcs");

export { PlcModel, IPlcData };
