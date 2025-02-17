import { FormulasModel, IFormula } from "./models/formulaModel";
import { HyperFormulaModel, IHyperFormula } from "./models/hyperFormulaModel";
import {
  SensorSettingsModel,
  ISensorSetting,
} from "./models/sensorSettingModel";
import { PlcModel, IPlcData } from "./models/plcModel";
import { TriggerModel, ITriggerDocument } from "./models/trigger.model";
import { FormulaEventModel, IFormulaEvents } from "./models/formulaEvents";
import { CompanyModel } from "./models/CompanyModel";
import { QuestionSchemaModel,IQuestion } from "./models/QuestionSchema";
import {BatchSchemaModel,IBatch} from "./models/QuestionBatchModel";
import { SensorModel,ISensor } from "./models/SensorList";
import { AnswerSchemaModel,IAnswer } from "./models/AnswerSchema.model";
import {PlantModel} from "./models/plantModel";
import { ConnectToDatabase } from "./mongoConnection";

// export the interface of the models
export type {
  IFormula,
  IHyperFormula,
  ISensorSetting,
  IPlcData,
  ITriggerDocument,
  IFormulaEvents,
  ISensor,
  IQuestion,
  IBatch,
  IAnswer
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
  CompanyModel,
  SensorModel,
  QuestionSchemaModel,
  BatchSchemaModel,
  AnswerSchemaModel
};
