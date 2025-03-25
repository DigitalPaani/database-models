import type { Document } from "mongoose";
import mongoose, { Types } from "mongoose";
export interface IFlocImage extends Document {
    sensorId?: Types.ObjectId;
    sampleId?: Types.ObjectId;
    fullImageUrl?: string;
    thumbnailUrl?: string;
    state: string;
    timestamp?: Date;
    regionOfInterestCoordinates?: number[][];
}
declare const FlocImageModel: mongoose.Model<IFlocImage, {}, {}, {}, Document<unknown, {}, IFlocImage> & IFlocImage & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export { FlocImageModel };
//# sourceMappingURL=floc-image.model.d.ts.map