import { assigneeMethodEnums, skillLevels } from "./taskManagementConst";
import {
  COMMUNICATION_COMPONENT_SERVICE_TYPE,
  COMMUNICATION_COMPONENT_TYPES,
  TRIGGER_COMPONENT_TYPES,
} from "./triggerConst";

const EVENT_TYPES = {
  formula: "formula",
  trigger: "trigger",
};

const OBSOLETE_CONDITIONS = {
  observation: "observation",
  resolution: "resolution",
};

export default {
  skillLevels,
  EVENT_TYPES,
  TRIGGER_COMPONENT_TYPES,
  COMMUNICATION_COMPONENT_TYPES,
  COMMUNICATION_COMPONENT_SERVICE_TYPE,
  assigneeMethodEnums,
  OBSOLETE_CONDITIONS,
};
