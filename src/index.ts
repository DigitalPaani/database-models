import { FormulasModel, IFormula } from "./models/formulaModel";
import { HyperFormulaModel, IHyperFormula } from "./models/hyperFormulaModel";
import {
  SensorSettingsModel,
  ISensorSetting,
} from "./models/sensorSettingModel";
import { PlcModel, IPlcData } from "./models/plcModel";
import { TriggerModel, ITriggerDocument } from "./models/trigger.model";
import { FormulaEventModel, IFormulaEvents } from "./models/formulaEvents";
import { TaskTemplateModel, ITaskTemplate } from "./models/taskTemplate.model";
import { SkillManagementModel, ISkill } from "./models/skills.model";
import { RosterManagementModel, IRoster } from "./models/roster.model";
import {
  RosterSchedulesModel,
  IRosterSchedule,
} from "./models/rosterSchedules.model";
import {
  WorkflowModel,
  IWorkflow,
  IWorkflowActions,
  IActionNode,
} from "./models/workflow.model";
import { CompanyModel } from "./models/CompanyModel";
import { SensorModel, ISensor } from "./models/SensorList";
import { QuestionSchemaModel, IQuestion } from "./models/QuestionSchema";
import { BatchSchemaModel, IBatch } from "./models/QuestionBatchModel";
import { SensorsModel, ISensorsData } from "./models/sensorModel";
import { AnswerSchemaModel, IAnswer } from "./models/AnswerSchema.model";
import { ConnectToDatabase } from "./mongoConnection";
import { TaskModel, ITask, IEscalation } from "./models/tasks.model";
import { AttachmentModel, IAttachment } from "./models/attachments.model";
import { PlantModel, IPlant } from "./models/plantModel";
import { TwilioCallModel, ITwilioCall } from "./models/twilioCalls.model";
import { CallLogModel, ICallLog } from "./models/callLogs.model";
import {
  WhatsappLogModel,
  IWhatsappLog,
} from "./models/whatsappMessageLogs.model";
import { SmsLogModel, ISmsLog } from "./models/smsLogs.model";
import { EmailLogModel, IEmailLog } from "./models/emailLogs.model";
import {
  WhatsappTemplateModel,
  IWhatsappTemplate,
} from "./models/whatsappTemplate.model";
import {
  TriggerComponentModel,
  ITriggerComponent,
} from "./models/triggerComponents.model";
import {Store,IStore} from './models/Store.model'
import {StoreItemsModel} from './models/StoreItem.model'
import {EquipmentQuestionsModel,IEquipmentQuestion} from './models/equipmentQuestions.model'
import {ILayout,LayoutModel} from './models/LayoutSchema.model'
import {ILayoutEquipment,LayoutEquipmentModel} from './models/equipment.model'
import { SidebarLayoutItemsModel,ISidebarLayoutItem } from "./models/SidebarLayoutItems.model";
import {
  TaskComponentsModel,
  ITaskComponent,
  IWorkflowDetails,
  IWorkflowNode,
  IPosition,
  IWorkflowNodeData,
  IWorkflowEdge,
  IComponentAction,
} from "./models/taskComponents.model";

import {
  CommunicationComponentsModel,
  ICommunicationComponent,
} from "./models/communicationComponents.model";

import {
  EscalationFlowModel,
  IEscalationFlow,
} from "./models/EscalationFlow.model";


import { NewUserModel, INewUser } from "./models/newUserModel";
import { LayoutPathModel,IPathSchema } from "./models/graphConnections.model";

import { ObsoleteTaskModel, IObsoleteTask } from "./models/obsolete.model";

import { TaskCommentModel, ITaskComment } from "./models/task-comments.model";
import { TaskLogModel, ITaskLog } from "./models/task-logs.model";

import { FormulaAuditsModel } from "./models/formula-audits";

import commonConstants from "./constants/commonConstants";
import mongoose, { Types } from "mongoose";

import { FlocSampleModel, IFlocSample } from './models/floc-sample.model';
import { FlocImageModel, IFlocImage } from './models/floc-image.model';
import {WorkspaceModel,IWorkspace} from './models/workspaceModel'
import { InsightsTemplateModel, IInsightsTemplate } from "./models/insights-template.model";
import { InsightComponentModel, IInsightComponent } from "./models/insight-components.model";
import { InsightModel, IInsight } from "./models/insights.model";
import { InsightCommentModel, IInsightComment } from "./models/insight-comments.model";

import { DataLoggerModel, IDataLogger } from "./models/data-logger.model";
import { BidirectionalModel, IBidirectional } from "./models/bidirectional.model";
import { BidirectionalLogsModel, IBidirectionalLogs } from "./models/bidirectional-logs.model";
import { EquipmentComponentModel, IEquipmentComponent} from "./models/equipment-components.model";
import { NotificationModel,INotification} from "./models/notification.model";

import { FormulaCommonTypes } from './types/formulaTypes'
import { WhatsappIncomingEventModel, IWhatsappIncomingEvent } from "./models/whatsappIncomingEvents.model";
import { WhatsappAiCommunicationModel, IWhatsappAiCommunication } from "./models/whatsapp-ai-communication.model";
import { ManualSensorModel, IManualSensors } from './models/manual-sensors-template.model';
import { DataLoggerSessionModel, IDataLoggerSession } from './models/data-logger-sessions.model';
import { DLSensorConfigModel, IDLSensorConfig } from './models/data-logger-sensor-config.model';
import { DLSensorConfigAuditModel } from './models/dl-sensor-config-audit.model';
import { GeneralCommunicationModel, IGeneralCommunication } from "./models/general-communication.model";

import { IBulkEntryReport, BulkEntryReportModel } from "./models/data-input-bulk-entry-report";
import {IFileUpload,FileManagementUploadModel} from './models/FileUpload.model'
import { IAnomalyRecord, AnomalyRecordModel } from './models/anomaly-records.model'
import { IAnomalyDetails, AnomalyDetailsModel } from './models/anomaly-details.model'

import {UserGroupModel} from './models/userGroupModel'
import {NotificationComponentsModel} from './models/notificationComponents.model'
// Assign mongoose to mongooseDatabaseModels
const mongooseDatabaseModels = mongoose;

// export the interface of the models
export type {
  IFormula,
  IHyperFormula,
  ISensorSetting,
  IPlcData,
  ITriggerDocument,
  IStore,
  IFormulaEvents,
  ITaskTemplate,
  ISkill,
  IRoster,
  IRosterSchedule,
  IWorkflow,
  ITask,
  IAttachment,
  IPlant,
  ITwilioCall,
  ICallLog,
  IWhatsappLog,
  ISmsLog,
  IEmailLog,
  IWhatsappTemplate,
  ITriggerComponent,
  IEscalation,
  IActionNode,
  ITaskComponent,
  IWorkflowDetails,
  IWorkflowNode,
  IPosition,
  IWorkflowActions,
  IWorkflowNodeData,
  IWorkflowEdge,
  IComponentAction,
  ICommunicationComponent,
  INewUser,
  ISensor,
  IObsoleteTask,
  IQuestion,
  IBatch,
  IAnswer,
  IEquipmentQuestion,
  ILayout,
  ILayoutEquipment,
  ISidebarLayoutItem,
  IPathSchema,
  ITaskComment,
  ITaskLog,
  IFlocSample,
  IFlocImage,
  IInsightsTemplate,
  IInsightComponent,
  IInsight,
  IInsightComment,
  FormulaCommonTypes,
  IWhatsappIncomingEvent,
  IWhatsappAiCommunication,
  IManualSensors,
  IDataLogger,
  IBidirectional,
  IBidirectionalLogs,
  IEquipmentComponent,
  IDataLoggerSession,
  IDLSensorConfig,
  INotification,
  IGeneralCommunication,
  IBulkEntryReport,
  IWorkspace,
  IEscalationFlow,
  IFileUpload,
  IAnomalyRecord,
  IAnomalyDetails,
  ISensorsData,
};

// exports the models
export {
  ConnectToDatabase,
  FormulasModel,
  PlantModel,
  HyperFormulaModel,
  SensorSettingsModel,
  PlcModel,
  TriggerModel,
  FormulaEventModel,
  TaskTemplateModel,
  SkillManagementModel,
  RosterManagementModel,
  RosterSchedulesModel,
  WorkflowModel,
  TaskModel,
  AttachmentModel,
  TwilioCallModel,
  CallLogModel,
  WhatsappLogModel,
  Store,
  StoreItemsModel,
  UserGroupModel,
  SmsLogModel,
  EmailLogModel,
  WhatsappTemplateModel,
  Types,
  TriggerComponentModel,
  TaskComponentsModel,
  CommunicationComponentsModel,
  NewUserModel,
  commonConstants,
  CompanyModel,
  SensorModel,
  mongooseDatabaseModels,
  ObsoleteTaskModel,
  QuestionSchemaModel,
  BatchSchemaModel,
  AnswerSchemaModel,
  EquipmentQuestionsModel,
  SensorsModel,
  LayoutModel,
  LayoutEquipmentModel,
  SidebarLayoutItemsModel,
  LayoutPathModel,
  TaskCommentModel,
  TaskLogModel,
  FlocSampleModel,
  FlocImageModel,
  FormulaAuditsModel,
  InsightsTemplateModel,
  InsightComponentModel,
  InsightModel,
  InsightCommentModel,
  WhatsappIncomingEventModel,
  WhatsappAiCommunicationModel,
  ManualSensorModel,
  DataLoggerModel,
  BidirectionalModel,
  BidirectionalLogsModel,
  EquipmentComponentModel,
  DataLoggerSessionModel,
  DLSensorConfigModel,
  DLSensorConfigAuditModel,
  NotificationModel,
  GeneralCommunicationModel,
  BulkEntryReportModel,
  WorkspaceModel,
  NotificationComponentsModel,
  EscalationFlowModel,
  FileManagementUploadModel,
  AnomalyRecordModel,
  AnomalyDetailsModel,
};
