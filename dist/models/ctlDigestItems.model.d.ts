import type { Model, Types } from "mongoose";
import { DigestItemKind, LadderStep, Severity } from "../constants/closeTheLoop.constants";
export type { DigestItemKind };
export interface CtlDigestItemDoc {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    plantId: Types.ObjectId;
    issueId: Types.ObjectId | null;
    generation: number;
    step: LadderStep;
    severity: Severity;
    kind: DigestItemKind;
    dedupKey: string;
    digestDateKey: string;
    title: string;
    sentAt: Date | null;
    createdAt: Date;
}
declare const CtlDigestItemModel: Model<CtlDigestItemDoc>;
export default CtlDigestItemModel;
//# sourceMappingURL=ctlDigestItems.model.d.ts.map