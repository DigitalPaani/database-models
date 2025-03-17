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
import SensorsModel from "./models/sensorModel";
import { AnswerSchemaModel, IAnswer } from "./models/AnswerSchema.model";
import { ConnectToDatabase } from "./mongoConnection";
import { TaskModel, ITask, IEscalation } from "./models/tasks.model";
import { AttachmentModel, IAttachment } from "./models/attachments.model";
import { TriggerLogsModel, ITriggerLog } from "./models/triggerLogs.model";
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

import { NewUserModel, INewUser } from "./models/newUserModel";

import { ObsoleteTaskModel, IObsoleteTask } from "./models/obsolete.model";

import { TaskUploadMediaModel, ITaskUploadMedia } from "./models/task-upload-media.model";
import { TaskCommentModel, ITaskComment } from "./models/task-comments.model";
import { TaskLogModel, ITaskLog } from "./models/task-logs.model";

import commonConstants from "./constants/commonConstants";
import mongoose, { Types } from "mongoose";

// Assign mongoose to mongooseDatabaseModels
const mongooseDatabaseModels = mongoose;

// export the interface of the models
export type {
  IFormula,
  IHyperFormula,
  ISensorSetting,
  IPlcData,
  ITriggerDocument,
  IFormulaEvents,
  ITaskTemplate,
  ISkill,
  IRoster,
  IRosterSchedule,
  IWorkflow,
  ITask,
  IAttachment,
  ITriggerLog,
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
  ITaskUploadMedia,
  ITaskComment,
  ITaskLog
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
  TriggerLogsModel,
  TwilioCallModel,
  CallLogModel,
  WhatsappLogModel,
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
  SensorsModel,
  TaskUploadMediaModel,
  TaskCommentModel,
  TaskLogModel
};
