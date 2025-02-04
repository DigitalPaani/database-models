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
import { RosterEventsModel, IRosterEvent } from "./models/roster-events.model";
import { WorkflowModel, IWorkflow } from "./models/workflow.model";
import { ConnectToDatabase } from "./mongoConnection";
import { TaskModel, ITask } from "./models/tasks.model";
import { AttachmentModel, IAttachment } from "./models/attachments.model";
import { TriggerLogsModel, ITriggerLog } from "./models/triggerLogs.model";

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
  IRosterEvent,
  IWorkflow,
  ITask,
  IAttachment,
  ITriggerLog,
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
  RosterEventsModel,
  WorkflowModel,
  TaskModel,
  AttachmentModel,
  TriggerLogsModel,
};
