import type { Document, Model } from "mongoose";
import { Types } from "mongoose";
export interface IStatusCondition {
    status: string;
    eventComponent: Types.ObjectId;
    action: string;
}
interface ITimeCycleRecurrence {
    frequency: string;
    interval: number;
    daysOfWeek: number[];
    dayOfMonth: number[];
    weekOfMonth: number[];
    hours: number[];
    minutes: number[];
}
interface ITimeCycleConfig {
    recurrence: ITimeCycleRecurrence;
    startDate?: number;
    endDate?: number;
}
interface INodePosition {
    x: number;
    y: number;
}
interface INodeData {
    label: string;
    equipmentId: string;
}
interface IFlowNode {
    id: string;
    type: string;
    position: INodePosition;
    data: INodeData;
    width: number;
    height: number;
    selected: boolean;
    positionAbsolute: INodePosition;
    dragging: boolean;
}
interface IEdgeStyle {
    stroke: string;
    strokeWidth: number;
    cursor: string;
}
interface IEdgeMarker {
    type: string;
    width: number;
    height: number;
    color: string;
}
interface IFlowEdge {
    id: string;
    source: string;
    target: string;
    sourceHandle: string;
    targetHandle: string;
    type: string;
    animated: boolean;
    style: IEdgeStyle;
    markerEnd: IEdgeMarker;
}
interface IBatchComponent extends Document {
    assetId: Types.ObjectId;
    name: string;
    equipments: Types.ObjectId[];
    detectionType: string;
    startBatchEventComponentId?: Types.ObjectId;
    startBatchAction: string;
    timeCycle?: ITimeCycleConfig;
    trackingSensors: Types.ObjectId[];
    flow: {
        nodes: IFlowNode[];
        edges: IFlowEdge[];
    };
    chemicalUsage?: {
        chemicalName: string;
        itemId: Types.ObjectId;
    }[];
    waterTreatment?: {
        unit?: string;
        value?: number;
    };
    type: string;
    purpose?: string;
    startTriggerId?: Types.ObjectId;
    endTriggerId?: Types.ObjectId;
    statusConditions: IStatusCondition[];
    isArchived: boolean;
    createdBy?: Types.ObjectId;
    updatedBy?: Types.ObjectId;
}
declare const BatchComponentModel: Model<IBatchComponent>;
export { BatchComponentModel, IBatchComponent };
//# sourceMappingURL=batch-component.model.d.ts.map