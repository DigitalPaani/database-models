import type { Model, Types } from "mongoose";
import { QuietWindow } from "../constants/closeTheLoop.constants";
export interface CtlPlantNotificationConfigDoc {
    _id: Types.ObjectId;
    plantId: Types.ObjectId;
    hooterEnabled: boolean;
    hooterDurationSec: number;
    quietHours: QuietWindow;
    /** BE-31: whether people with no window of their own follow the site's. */
    quietHoursEnabled: boolean;
    /** BE-35: languages the site's people may pick, and the one anyone who has not picked hears. */
    languages: string[];
    defaultLanguage: string;
    updatedBy: Types.ObjectId | null;
    createdAt: Date;
    updatedAt: Date;
}
declare const CtlPlantNotificationConfigModel: Model<CtlPlantNotificationConfigDoc>;
export default CtlPlantNotificationConfigModel;
//# sourceMappingURL=ctlPlantNotificationConfig.model.d.ts.map