import type { Document, Types } from 'mongoose';
import mongoose, { Schema } from 'mongoose';

interface IPlant extends Partial<Document> {
  plantName: string;
  status: string;
  plantImage:string;
  subTopic: string;
  pubTopic: string;
  abbr: string;
  lat: string;
  long: string;
  description:string;
  schematic?: string;
  sensorfreq: string;
  location:{
    lat:string,
    lng:string,
    place:string
  }
  plantType: string;
  createdOn: Date;
  tur: string;
  workspaceId:Types.ObjectId,
  userGroupId:Types.ObjectId,
  operationType:string;
  autoEmailing?: {
    dailyReportPageId: Types.ObjectId;
    weeklyReportPageId: Types.ObjectId;
    monthlyReportPageId: Types.ObjectId;
  };
  embeddedLinks: {
    name: string;
    link: string;
  }[];
  userGroup?: {
    id: string;
    name: string;
    abbr: string;
  };
}

const PlantSchema = new Schema<IPlant>({
  plantName: String,
  status: String,
  lat: String,
  plantImage:{
    type:String,
    required:true
  },
  workspaceId:{
    type:Schema.Types.ObjectId,
    ref:"NewWorkspace",
    required:true
  },
  userGroupId:{
    type:Schema.Types.ObjectId,
    ref:"UserGroup",
    required:true
  },
  long: String,
  description:String,
  schematic: String,
  sensorfreq: String,
  plantType: String,
  createdOn: Date,
  tur: String,
  location:{
    lat:String,
    lng:String,
    place:String
  },
  autoEmailing: {
    dailyReportPageId: Schema.Types.ObjectId,
    weeklyReportPageId: Schema.Types.ObjectId,
    monthlyReportPageId: Schema.Types.ObjectId,
  },
  embeddedLinks: [
    {
      name: String,
      link: String,
    },
  ],
  subTopic: String,
  pubTopic: String,
  abbr: String,
  operationType:String,
  userGroup: {
    id: Schema.Types.ObjectId,
    name: String,
    abbr: String,
  },
});
const PlantModel = mongoose.model<IPlant>('Plant', PlantSchema, 'Plants');
export { PlantModel, IPlant };
