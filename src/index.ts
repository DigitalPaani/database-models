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
import { WorkflowModel, IWorkflow } from "./models/workflow.model";
import { ConnectToDatabase } from "./mongoConnection";
import { TaskModel, ITask } from "./models/tasks.model";
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
<<<<<<< Updated upstream
import { WhatsappTemplateModel, IWhatsappTemplate } from "./models/whatsappTemplate.model";
=======
import {
  TriggerComponentModel,
  ITriggerComponent,
} from "./models/triggerComponents.model";
>>>>>>> Stashed changes

import commonConstants from "./constants/commonConstants";
import { Types } from "mongoose";

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
<<<<<<< Updated upstream
  IWhatsappTemplate
=======
  ITriggerComponent,
>>>>>>> Stashed changes
};

// exports the models
export {
  ConnectToDatabase,
  FormulasModel,
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
  PlantModel,
  TwilioCallModel,
  CallLogModel,
  WhatsappLogModel,
  SmsLogModel,
  EmailLogModel,
  WhatsappTemplateModel,
  Types,
  TriggerComponentModel,
  commonConstants,
};
