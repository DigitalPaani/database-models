import { Model } from "mongoose";
interface ITaskComponent {
    taskTemplateId: string;
    assetId: string;
    name: string;
    description: string;
    trainingVideoId: string;
    attachmentId: string;
    priority: string;
    taskType: string;
    workflowId: string;
    workflowDetails: IWorkflowDetails;
    taskCompletion: string;
    assigneeMethod: string;
    complexity: number;
    taskDeadlineTime: number;
    taskExpectedTime: number;
    equipmentSelected?: string;
    skillsSelected: string[];
    dataEntry: boolean;
    sensorTag: string;
    richTextContent: string;
    escalations: IEscalation[];
    componentActions: IComponentAction[];
}
interface IWorkflowDetails {
    name: string;
    description: string;
    nodes: IWorkflowNode[];
    edges: IWorkflowEdge[];
}
interface IWorkflowNode {
    id: string;
    type: string;
    position: IPosition;
    data: IWorkflowNodeData;
    width: number;
    height: number;
    selected: boolean;
    positionAbsolute: IPosition;
    dragging: boolean;
}
interface IPosition {
    x: number;
    y: number;
}
interface IWorkflowNodeData {
    type: string;
    label: string;
    actionType?: string;
}
interface IWorkflowEdge {
    source: string;
    sourceHandle: string;
    target: string;
    targetHandle: string;
    id: string;
    type: string;
    animated: boolean;
    data: {
        label: string;
    };
    markerEnd: {
        type: string;
        width: number;
        height: number;
        color: string;
    };
    selected: boolean;
}
interface IEscalation {
    timeInMinutes: string;
    communicationMedium: string;
    userIds: string[];
}
interface IComponentAction {
    nodeId: string;
    selectedAction: string;
    selectedActionValue: string;
}
declare const TaskComponentsModel: Model<ITaskComponent>;
export { TaskComponentsModel, ITaskComponent, IWorkflowDetails, IWorkflowNode, IPosition, IWorkflowNodeData, IWorkflowEdge, IEscalation, IComponentAction, };
//# sourceMappingURL=taskComponents.model.d.ts.map