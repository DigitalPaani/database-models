import mongoose, { Model, Schema, model } from "mongoose";
import { Types } from "mongoose";
import { IEventTags } from "./events-template.model";
interface IEventComponent extends Document {
  _id: Types.ObjectId;
  eventsTemplateId: Types.ObjectId;
  name: string;
  description: string;
  relatedEquipments: Types.ObjectId[];
  relatedSensors: Types.ObjectId[];
  startTag?: {
    sensorTag: string;
    sensorId: Types.ObjectId;
  };
  endTag?: {
    sensorTag: string;
    sensorId: Types.ObjectId;
  };
  eventTag?: {
    sensorTag: string;
    sensorId: Types.ObjectId;
  };
  isEventLogCreated?: boolean;
  triggerId: Types.ObjectId;
  assetId?: Types.ObjectId;
  userGroupId?: Types.ObjectId;
  workspaceId?: Types.ObjectId;
  isDeleted: boolean;
}

const eventComponentSchema = new Schema<IEventComponent>(
  {
    eventsTemplateId: {
      type: Schema.Types.ObjectId,
      ref: "events-templates",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    relatedEquipments: {
      type: [Schema.Types.ObjectId],
      ref: "LayoutEquipments",
      required: true,
    },
    relatedSensors: {
      type: [Schema.Types.ObjectId],
      ref: "sensors",
      required: true,
    },
    startTag: {
      sensorTag: String,
      sensorId: { type: Schema.Types.ObjectId, ref: "sensors" },
    },
    endTag: {
      sensorTag: String,
      sensorId: { type: Schema.Types.ObjectId, ref: "sensors" },
    },
    eventTag: {
      sensorTag: String,
      sensorId: { type: Schema.Types.ObjectId, ref: "sensors" },
    },
    isEventLogCreated: {
      type: Boolean,
      default: false,
    },
    triggerId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    assetId: {
      type: Schema.Types.ObjectId,
      ref: "Plant",
    },
    workspaceId: {
      type: Schema.Types.ObjectId,
      ref: "NewWorkspace",
    },
    userGroupId: {
      type: Schema.Types.ObjectId,
      ref: "UserGroup",
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const EventComponentModel: Model<IEventComponent> =
  mongoose.model<IEventComponent>(
    "event-components",
    eventComponentSchema,
    "event-components"
  );

export { EventComponentModel, IEventComponent };
