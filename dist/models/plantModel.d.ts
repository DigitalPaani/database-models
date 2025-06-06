import type { Document, Types } from 'mongoose';
import mongoose from 'mongoose';
interface IPlant extends Partial<Document> {
    plantName: string;
    status: string;
    plantImage: string;
    subTopic: string;
    pubTopic: string;
    abbr: string;
    lat: string;
    long: string;
    description: string;
    schematic?: string;
    sensorfreq: string;
    location: {
        lat: string;
        lng: string;
        place: string;
    };
    plantType: string;
    createdOn: Date;
    tur: string;
    workspaceId: Types.ObjectId;
    userGroupId: Types.ObjectId;
    operationType: string;
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
declare const PlantModel: mongoose.Model<IPlant, {}, {}, {}, Document<unknown, {}, IPlant> & IPlant & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export { PlantModel, IPlant };
//# sourceMappingURL=plantModel.d.ts.map