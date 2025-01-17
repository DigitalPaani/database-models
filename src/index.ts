import { FormulasModel, IFormula } from "./models/formulaModel";
import { HyperFormulaModel, IHyperFormula } from "./models/hyperFormulaModel";
import { NewCacheModel, INewCache } from "./models/newCacheModel";
import {
  SensorSettingsModel,
  ISensorSetting,
} from "./models/sensorSettingModel";
import { PlcModel, IPlcData } from "./models/plcModel";

import { ConnectToDatabase } from "./mongoConnection";

// export the interface of the models
export type { IFormula, IHyperFormula, INewCache, ISensorSetting, IPlcData };

// exports the models
export {
  ConnectToDatabase,
  FormulasModel,
  HyperFormulaModel,
  NewCacheModel,
  SensorSettingsModel,
  PlcModel,
};
