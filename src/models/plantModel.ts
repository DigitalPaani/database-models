import type { Document, Types } from 'mongoose';
import mongoose, { Schema } from 'mongoose';

interface IPlant extends Partial<Document> {
  plantName: string;
  status: string;
  subTopic: string;
  pubTopic: string;
  abbr: string;
  lat: string;
  long: string;
  schematic?: string;
  sensorfreq: string;
  plantType: string;
  createdOn: Date;
  tur: string;
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
  long: String,
  schematic: String,
  sensorfreq: String,
  plantType: String,
  createdOn: Date,
  tur: String,
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
  userGroup: {
    id: Schema.Types.ObjectId,
    name: String,
    abbr: String,
  },
});
const PlantModel = mongoose.model('Plant', PlantSchema, 'Plants');

export { IPlant ,PlantModel};