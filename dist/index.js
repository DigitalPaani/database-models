"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormulaAuditsModel = exports.FlocImageModel = exports.FlocSampleModel = exports.TaskLogModel = exports.TaskCommentModel = exports.SensorsModel = exports.AnswerSchemaModel = exports.BatchSchemaModel = exports.QuestionSchemaModel = exports.ObsoleteTaskModel = exports.mongooseDatabaseModels = exports.SensorModel = exports.CompanyModel = exports.commonConstants = exports.NewUserModel = exports.CommunicationComponentsModel = exports.TaskComponentsModel = exports.TriggerComponentModel = exports.Types = exports.WhatsappTemplateModel = exports.EmailLogModel = exports.SmsLogModel = exports.WhatsappLogModel = exports.CallLogModel = exports.TwilioCallModel = exports.TriggerLogsModel = exports.AttachmentModel = exports.TaskModel = exports.WorkflowModel = exports.RosterSchedulesModel = exports.RosterManagementModel = exports.SkillManagementModel = exports.TaskTemplateModel = exports.FormulaEventModel = exports.TriggerModel = exports.PlcModel = exports.SensorSettingsModel = exports.HyperFormulaModel = exports.PlantModel = exports.FormulasModel = exports.ConnectToDatabase = void 0;
const formulaModel_1 = require("./models/formulaModel");
Object.defineProperty(exports, "FormulasModel", { enumerable: true, get: function () { return formulaModel_1.FormulasModel; } });
const hyperFormulaModel_1 = require("./models/hyperFormulaModel");
Object.defineProperty(exports, "HyperFormulaModel", { enumerable: true, get: function () { return hyperFormulaModel_1.HyperFormulaModel; } });
const sensorSettingModel_1 = require("./models/sensorSettingModel");
Object.defineProperty(exports, "SensorSettingsModel", { enumerable: true, get: function () { return sensorSettingModel_1.SensorSettingsModel; } });
const plcModel_1 = require("./models/plcModel");
Object.defineProperty(exports, "PlcModel", { enumerable: true, get: function () { return plcModel_1.PlcModel; } });
const trigger_model_1 = require("./models/trigger.model");
Object.defineProperty(exports, "TriggerModel", { enumerable: true, get: function () { return trigger_model_1.TriggerModel; } });
const formulaEvents_1 = require("./models/formulaEvents");
Object.defineProperty(exports, "FormulaEventModel", { enumerable: true, get: function () { return formulaEvents_1.FormulaEventModel; } });
const taskTemplate_model_1 = require("./models/taskTemplate.model");
Object.defineProperty(exports, "TaskTemplateModel", { enumerable: true, get: function () { return taskTemplate_model_1.TaskTemplateModel; } });
const skills_model_1 = require("./models/skills.model");
Object.defineProperty(exports, "SkillManagementModel", { enumerable: true, get: function () { return skills_model_1.SkillManagementModel; } });
const roster_model_1 = require("./models/roster.model");
Object.defineProperty(exports, "RosterManagementModel", { enumerable: true, get: function () { return roster_model_1.RosterManagementModel; } });
const rosterSchedules_model_1 = require("./models/rosterSchedules.model");
Object.defineProperty(exports, "RosterSchedulesModel", { enumerable: true, get: function () { return rosterSchedules_model_1.RosterSchedulesModel; } });
const workflow_model_1 = require("./models/workflow.model");
Object.defineProperty(exports, "WorkflowModel", { enumerable: true, get: function () { return workflow_model_1.WorkflowModel; } });
const CompanyModel_1 = require("./models/CompanyModel");
Object.defineProperty(exports, "CompanyModel", { enumerable: true, get: function () { return CompanyModel_1.CompanyModel; } });
const SensorList_1 = require("./models/SensorList");
Object.defineProperty(exports, "SensorModel", { enumerable: true, get: function () { return SensorList_1.SensorModel; } });
const QuestionSchema_1 = require("./models/QuestionSchema");
Object.defineProperty(exports, "QuestionSchemaModel", { enumerable: true, get: function () { return QuestionSchema_1.QuestionSchemaModel; } });
const QuestionBatchModel_1 = require("./models/QuestionBatchModel");
Object.defineProperty(exports, "BatchSchemaModel", { enumerable: true, get: function () { return QuestionBatchModel_1.BatchSchemaModel; } });
const sensorModel_1 = __importDefault(require("./models/sensorModel"));
exports.SensorsModel = sensorModel_1.default;
const AnswerSchema_model_1 = require("./models/AnswerSchema.model");
Object.defineProperty(exports, "AnswerSchemaModel", { enumerable: true, get: function () { return AnswerSchema_model_1.AnswerSchemaModel; } });
const mongoConnection_1 = require("./mongoConnection");
Object.defineProperty(exports, "ConnectToDatabase", { enumerable: true, get: function () { return mongoConnection_1.ConnectToDatabase; } });
const tasks_model_1 = require("./models/tasks.model");
Object.defineProperty(exports, "TaskModel", { enumerable: true, get: function () { return tasks_model_1.TaskModel; } });
const attachments_model_1 = require("./models/attachments.model");
Object.defineProperty(exports, "AttachmentModel", { enumerable: true, get: function () { return attachments_model_1.AttachmentModel; } });
const triggerLogs_model_1 = require("./models/triggerLogs.model");
Object.defineProperty(exports, "TriggerLogsModel", { enumerable: true, get: function () { return triggerLogs_model_1.TriggerLogsModel; } });
const plantModel_1 = require("./models/plantModel");
Object.defineProperty(exports, "PlantModel", { enumerable: true, get: function () { return plantModel_1.PlantModel; } });
const twilioCalls_model_1 = require("./models/twilioCalls.model");
Object.defineProperty(exports, "TwilioCallModel", { enumerable: true, get: function () { return twilioCalls_model_1.TwilioCallModel; } });
const callLogs_model_1 = require("./models/callLogs.model");
Object.defineProperty(exports, "CallLogModel", { enumerable: true, get: function () { return callLogs_model_1.CallLogModel; } });
const whatsappMessageLogs_model_1 = require("./models/whatsappMessageLogs.model");
Object.defineProperty(exports, "WhatsappLogModel", { enumerable: true, get: function () { return whatsappMessageLogs_model_1.WhatsappLogModel; } });
const smsLogs_model_1 = require("./models/smsLogs.model");
Object.defineProperty(exports, "SmsLogModel", { enumerable: true, get: function () { return smsLogs_model_1.SmsLogModel; } });
const emailLogs_model_1 = require("./models/emailLogs.model");
Object.defineProperty(exports, "EmailLogModel", { enumerable: true, get: function () { return emailLogs_model_1.EmailLogModel; } });
const whatsappTemplate_model_1 = require("./models/whatsappTemplate.model");
Object.defineProperty(exports, "WhatsappTemplateModel", { enumerable: true, get: function () { return whatsappTemplate_model_1.WhatsappTemplateModel; } });
const triggerComponents_model_1 = require("./models/triggerComponents.model");
Object.defineProperty(exports, "TriggerComponentModel", { enumerable: true, get: function () { return triggerComponents_model_1.TriggerComponentModel; } });
const taskComponents_model_1 = require("./models/taskComponents.model");
Object.defineProperty(exports, "TaskComponentsModel", { enumerable: true, get: function () { return taskComponents_model_1.TaskComponentsModel; } });
const communicationComponents_model_1 = require("./models/communicationComponents.model");
Object.defineProperty(exports, "CommunicationComponentsModel", { enumerable: true, get: function () { return communicationComponents_model_1.CommunicationComponentsModel; } });
const newUserModel_1 = require("./models/newUserModel");
Object.defineProperty(exports, "NewUserModel", { enumerable: true, get: function () { return newUserModel_1.NewUserModel; } });
const obsolete_model_1 = require("./models/obsolete.model");
Object.defineProperty(exports, "ObsoleteTaskModel", { enumerable: true, get: function () { return obsolete_model_1.ObsoleteTaskModel; } });
const task_comments_model_1 = require("./models/task-comments.model");
Object.defineProperty(exports, "TaskCommentModel", { enumerable: true, get: function () { return task_comments_model_1.TaskCommentModel; } });
const task_logs_model_1 = require("./models/task-logs.model");
Object.defineProperty(exports, "TaskLogModel", { enumerable: true, get: function () { return task_logs_model_1.TaskLogModel; } });
const formula_audits_1 = require("./models/formula-audits");
Object.defineProperty(exports, "FormulaAuditsModel", { enumerable: true, get: function () { return formula_audits_1.FormulaAuditsModel; } });
const commonConstants_1 = __importDefault(require("./constants/commonConstants"));
exports.commonConstants = commonConstants_1.default;
const mongoose_1 = __importStar(require("mongoose"));
Object.defineProperty(exports, "Types", { enumerable: true, get: function () { return mongoose_1.Types; } });
const floc_sample_model_1 = require("./models/floc-sample.model");
Object.defineProperty(exports, "FlocSampleModel", { enumerable: true, get: function () { return floc_sample_model_1.FlocSampleModel; } });
const floc_image_model_1 = require("./models/floc-image.model");
Object.defineProperty(exports, "FlocImageModel", { enumerable: true, get: function () { return floc_image_model_1.FlocImageModel; } });
// Assign mongoose to mongooseDatabaseModels
const mongooseDatabaseModels = mongoose_1.default;
exports.mongooseDatabaseModels = mongooseDatabaseModels;
