import { FormulasModel, IFormula } from "./models/formulaModel";
import { HyperFormulaModel, IHyperFormula } from "./models/hyperFormula";
import { NewCacheModel, INewCache } from "./models/newCacheModel";
import {
  SensorSettingsModel,
  ISensorSetting,
} from "./models/sensorSettingModel";
import { ConnectToDatabase } from "./mongoConnection";

// export the interface of the models
export type { IFormula, IHyperFormula, INewCache, ISensorSetting };

// exports the models
export {
  ConnectToDatabase,
  FormulasModel,
  HyperFormulaModel,
  NewCacheModel,
  SensorSettingsModel,
};
