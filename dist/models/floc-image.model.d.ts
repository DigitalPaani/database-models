import type { Document, Model } from "mongoose";
import { Types } from "mongoose";
interface IFlocImage extends Document {
    sensorId?: Types.ObjectId;
    sampleId?: string;
    fullImageUrl?: string;
    thumbnailUrl?: string;
    state: string;
    timestamp?: Date;
    regionOfInterestCoordinates?: number[][];
}
declare const FlocImageModel: Model<IFlocImage>;
export { FlocImageModel, IFlocImage };
//# sourceMappingURL=floc-image.model.d.ts.map