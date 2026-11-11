/*
 * The vocabulary of the equipment library and the equipment registry, from the v5 configuration spec
 * (CTLConfig v5, assets/catalogue.js). Two levels only: plant type and equipment type. There are no unit
 * processes, control groups, zones or duty/standby pairs, and nothing here should grow one.
 *
 * Mirrors node-backend's src/components/equipment/constants/equipment.constants.ts, cut to what the models and
 * their validate hooks need. The two must change together: a value only one side knows is a row the other refuses.
 */

/** How the equipment is maintained, not what it does: a clarifier's scraper bridge turns, so it is ROTATING. */
export const ARCHETYPES = ['ROTATING', 'VESSEL', 'FIXED', 'MEMBRANE', 'DOSING', 'VALVE', 'DEVICE'] as const;
export type Archetype = (typeof ARCHETYPES)[number];

/** What failing it costs a sewage or water plant: A critical · B essential · C standard. */
export const CRITICALITY_TIERS = ['A', 'B', 'C'] as const;
export type CriticalityTier = (typeof CRITICALITY_TIERS)[number];

/** The maintenance programme a type expects. A machine whose type expects one and has none is a coverage gap. */
export const PROGRAMMES = [
  'CLEANING',
  'MECHANICAL_PM',
  'INSPECTION',
  'DESLUDGING',
  'REFILL',
  'PUMP_PM',
  'BACKWASH',
  'MEDIA_INSPECTION',
  'CIP',
  'LAMP_REPLACEMENT',
  'CARTRIDGE_REPLACEMENT',
  'CLOTH_REPLACEMENT',
  'TONNER_CHANGE',
] as const;
export type Programme = (typeof PROGRAMMES)[number];

/** ANALYTICAL is a probe that drifts, so it is the kind that gets a calibration schedule. */
export const READING_KINDS = ['STATUS', 'PROCESS', 'ANALYTICAL', 'METER', 'COMPUTED'] as const;
export type ReadingKind = (typeof READING_KINDS)[number];

/**
 * equipment: the sensor measures the machine's own state or what it holds; the library may alert on it.
 * connection: it measures the fluid in a pipe, or a difference between two pipes. It waits for the phase that
 * adds connections and is never alerted on, even when SCADA has drawn a widget for it.
 * Lower-case, unlike the other enums, because the backend plan's DTO and the prototype both spell it so.
 */
export const READING_PLACES = ['equipment', 'connection'] as const;
export type ReadingPlace = (typeof READING_PLACES)[number];

/** Which way is bad. */
export const DIRECTIONS = ['ABOVE', 'BELOW'] as const;
export type Direction = (typeof DIRECTIONS)[number];

export const WORK_TYPES = ['ROUTINE', 'PM', 'CALIBRATION'] as const;
export type WorkType = (typeof WORK_TYPES)[number];

/** EITHER: due on the calendar or on run-hours, whichever comes first. */
export const DUE_BASES = ['CALENDAR', 'METER', 'EITHER'] as const;
export type DueBasis = (typeof DUE_BASES)[number];

export const CADENCE_UNITS = ['DAY', 'WEEK', 'MONTH', 'YEAR'] as const;
export type CadenceUnit = (typeof CADENCE_UNITS)[number];

/** AUTO: the equipment does it itself (auto valves, auto wash); the task is to confirm it ran, not to do it. */
export const PERFORMED_BY = ['IN_HOUSE', 'VENDOR', 'AUTO'] as const;
export type PerformedBy = (typeof PERFORMED_BY)[number];

export const PLANT_TYPES = ['STP', 'ETP', 'WTP'] as const;
export type PlantType = (typeof PLANT_TYPES)[number];

/** What a SCADA form answer is to the library. A form answer never changes a machine's type. */
export const FORM_RULE_READS = ['EXPECTS', 'LIMITS', 'SCHEDULE', 'FLAG', 'DERIVED'] as const;
export type FormRuleReads = (typeof FORM_RULE_READS)[number];

/** FULL_LOAD_AMPS: kW → full-load current of a three-phase 415 V motor (pf 0.85, efficiency 0.9), about 1.82 A per kW. */
export const FORM_DERIVATIONS = ['VOLUME', 'NUMBER', 'FULL_LOAD_AMPS'] as const;
export type FormDerivation = (typeof FORM_DERIVATIONS)[number];

/** ON reads Yes / true / checked / "Remote Control" as on; EQUALS is case-insensitive; MATCHES is a regex. */
export const FORM_MATCHES = ['ANSWERED', 'ON', 'EQUALS', 'MATCHES'] as const;
export type FormMatch = (typeof FORM_MATCHES)[number];

export const LIBRARY_ITEM_KINDS = ['ALERT', 'SCHEDULE', 'CONDITION_JOB'] as const;
export type LibraryItemKind = (typeof LIBRARY_ITEM_KINDS)[number];

/*
 * SCADA palette codes, as node-backend's visualization/constants/shapesConst.ts spells them. That file is frontend
 * palette data with no place in this package, so the handful the registry rule needs are copied as literals.
 */
const PIPE_CODE = 'Pipe';
const LEVEL_SENSOR_CODE = 'LEVEL_SENSOR';
const SWITCH_SENSOR_CODE = 'SWITCH_SENSOR';

/*
 * What each drawn code is to the library. Drawing elements are counted and inherit nothing; widgets are readings on
 * the machine they are linked to; ignored codes are dropped. GROUP is ignored: its LayoutEquipments doc mirrors an
 * EquipmentGroups control group, and v5 has none. A code in none of these lists is a machine.
 */
export const DRAWING_CODES: readonly string[] = ['PLANT_EQUIPMENT', 'ZONE', 'JOINS', 'BUILDING'];
export const WIDGET_CODES: readonly string[] = [LEVEL_SENSOR_CODE, 'chart.knob', SWITCH_SENSOR_CODE, 'NUMBER_SENSOR', 'TABLE_WIDGET'];
export const IGNORED_CODES: readonly string[] = ['GROUP', 'LABEL_WIDGET', 'ASSET_EQUIPMENT'];

/** Never a registry entry: drawing elements, pipes, widgets and ignored codes. */
export const NON_EQUIPMENT_CODES: readonly string[] = [...DRAWING_CODES, PIPE_CODE, ...WIDGET_CODES, ...IGNORED_CODES];

export interface ReadingDef {
  where: ReadingPlace;
  /** The spec's short tag, e.g. AMP. Real drawings carry none; the platform names a sensor by its purpose instead. */
  tag: string;
  unit: string;
  kind: ReadingKind;
  /** The range a working sensor reports. Outside it the value is a sensor fault, not an alert. */
  valid: { readonly min: number; readonly max: number };
  /** null for a meter: run-hours and throughput only ever climb. */
  direction: Direction | null;
  /**
   * Measured in the water a vessel holds. On a machine that holds no water, the same widget reads the water around
   * it, so it waits for connections like a pipe reading does.
   */
  inWater: boolean;
  /** Sensor purposes (sensors.sensorTypeAbr without the trailing _) that mean this reading. */
  purposeAbbrs: readonly string[];
  /** Widget kinds that mean this reading when the widget has no sensor of its own. */
  widgetKinds: readonly string[];
  /** connection only: where it is read. */
  note: string | null;
  /** computed only. */
  expr: string | null;
}

interface ReadingExtra {
  inWater?: boolean;
  purposeAbbrs?: readonly string[];
  widgetKinds?: readonly string[];
  expr?: string;
}

const E = (
  tag: string,
  unit: string,
  kind: ReadingKind,
  [min, max]: [number, number],
  direction: Direction | null,
  extra: ReadingExtra = {}
): ReadingDef => ({
  where: 'equipment',
  tag,
  unit,
  kind,
  valid: { min, max },
  direction,
  inWater: extra.inWater ?? false,
  purposeAbbrs: extra.purposeAbbrs ?? [],
  widgetKinds: extra.widgetKinds ?? [],
  note: null,
  expr: null,
});
const C = (
  tag: string,
  unit: string,
  kind: ReadingKind,
  [min, max]: [number, number],
  direction: Direction | null,
  note: string,
  extra: ReadingExtra = {}
): ReadingDef => ({
  where: 'connection',
  tag,
  unit,
  kind,
  valid: { min, max },
  direction,
  inWater: false,
  purposeAbbrs: extra.purposeAbbrs ?? [],
  widgetKinds: [],
  note,
  expr: extra.expr ?? null,
});

const WATER = { inWater: true };

/** Every reading the library knows: 23 on the equipment, 16 on a connection. Names are the spec's, verbatim. */
export const READINGS = {
  'Run status': E('RUN', '', 'STATUS', [0, 1], 'ABOVE', { purposeAbbrs: ['ONOFF'], widgetKinds: [SWITCH_SENSOR_CODE] }),
  'Trip contact': E('TRIP', '', 'STATUS', [0, 1], 'ABOVE', { purposeAbbrs: ['TRP'] }),
  'Auto / manual': E('AM', '', 'STATUS', [0, 1], 'ABOVE', { purposeAbbrs: ['MAN'] }),
  'Motor current': E('AMP', 'A', 'PROCESS', [0, 60], 'ABOVE', { purposeAbbrs: ['AMP', 'AMPV'] }),
  Speed: E('SPD', '%', 'PROCESS', [0, 100], 'BELOW'),
  'Run hours': E('HRS', 'h', 'METER', [0, 999999], null),
  Vibration: E('VIB', 'mm/s', 'PROCESS', [0, 20], 'ABOVE'),
  'Bearing temperature': E('BTEMP', '°C', 'PROCESS', [0, 120], 'ABOVE'),
  'Winding temperature': E('WTEMP', '°C', 'PROCESS', [0, 180], 'ABOVE'),
  'Valve position': E('POS', '', 'STATUS', [0, 1], 'ABOVE'),
  'Lamp fault': E('LAMP', '', 'STATUS', [0, 1], 'ABOVE'),
  'UV intensity': E('UVI', '%', 'PROCESS', [0, 100], 'BELOW'),
  Level: E('LVL', '%', 'PROCESS', [0, 100], 'ABOVE', { ...WATER, purposeAbbrs: ['LV', 'LT'], widgetKinds: [LEVEL_SENSOR_CODE] }),
  'Sump flood switch': E('FLOOD', '', 'STATUS', [0, 1], 'ABOVE'),
  'Dissolved oxygen': E('DO', 'mg/L', 'ANALYTICAL', [0, 6], 'BELOW', { ...WATER, purposeAbbrs: ['DO'] }),
  MLSS: E('MLSS', 'mg/L', 'ANALYTICAL', [0, 12000], 'ABOVE', WATER),
  pH: E('PH', 'pH', 'ANALYTICAL', [1, 14], 'ABOVE', { ...WATER, purposeAbbrs: ['PH'] }),
  ORP: E('ORP', 'mV', 'ANALYTICAL', [-500, 500], 'BELOW', { ...WATER, purposeAbbrs: ['ORP'] }),
  Temperature: E('TEMP', '°C', 'PROCESS', [0, 60], 'ABOVE', WATER),
  'Sludge blanket': E('BLK', 'm', 'ANALYTICAL', [0, 4], 'ABOVE', WATER),
  'Chemical tank level': E('TLVL', '%', 'PROCESS', [0, 100], 'BELOW'),
  // Net: the scale is tared to the chlorine left, so a full tonner reads about 900 kg.
  'Tonner net weight': E('WT', 'kg', 'PROCESS', [0, 1000], 'BELOW'),
  'Chlorine leak': E('LEAK', '', 'STATUS', [0, 1], 'ABOVE'),

  // Matched so that a drawn pressure or flow transmitter reads as next phase rather than unknown; none is alerted on.
  'Line pressure': C('PRESS', 'bar', 'PROCESS', [0, 12], 'ABOVE', 'on the discharge line or header', { purposeAbbrs: ['PT'] }),
  'Discharge pressure': C('DPRESS', 'bar', 'PROCESS', [0, 25], 'BELOW', 'on the discharge line', { purposeAbbrs: ['PTO'] }),
  'Suction pressure': C('SPRESS', 'bar', 'PROCESS', [-1, 6], 'BELOW', 'on the suction line'),
  'Inlet pressure': C('PIN', 'bar', 'PROCESS', [0, 20], 'ABOVE', 'on the feed line', { purposeAbbrs: ['PTI'] }),
  Flow: C('FLOW', 'm³/h', 'PROCESS', [0, 1000], 'BELOW', 'in the pipe, from a flow meter', { purposeAbbrs: ['FMF'] }),
  Throughput: C('THR', 'm³', 'METER', [0, 999999], null, 'totalled by a flow meter on the outlet line'),
  'Differential pressure': C('DP', 'bar', 'PROCESS', [0, 3], 'ABOVE', "across the filter's inlet and outlet"),
  'Trans-membrane pressure': C('TMP', 'bar', 'PROCESS', [0, 1], 'ABOVE', 'across the membrane, feed side to permeate side'),
  Permeability: C('PERM', 'LMH/bar', 'PROCESS', [0, 400], 'BELOW', 'from the permeate flow and the pressure, both on the lines'),
  Recovery: C('REC', '%', 'COMPUTED', [0, 100], 'BELOW', 'permeate flow over feed flow, both on the lines', {
    expr: 'PERM_FLOW / FEED_FLOW × 100',
  }),
  'Outlet turbidity': C('TURB', 'NTU', 'ANALYTICAL', [0, 100], 'ABOVE', 'in the outlet water', { purposeAbbrs: ['TUR'] }),
  'Residual chlorine': C('FRC', 'mg/L', 'ANALYTICAL', [0, 10], 'BELOW', 'in the outlet water, downstream of the dose', {
    purposeAbbrs: ['CA'],
  }),
  'Outlet hardness': C('HARD', 'ppm', 'ANALYTICAL', [0, 1000], 'ABOVE', 'in the outlet water'),
  'Permeate conductivity': C('COND', 'µS/cm', 'ANALYTICAL', [0, 5000], 'ABOVE', 'in the permeate line', { purposeAbbrs: ['CM'] }),
  'Level differential': C('DH', 'mm', 'PROCESS', [0, 500], 'ABOVE', 'upstream against downstream of the screen'),
  'Cooling water temperature': C('CWT', '°C', 'PROCESS', [0, 80], 'ABOVE', 'in the water leaving the tower'),
} satisfies Record<string, ReadingDef>;
export type ReadingName = keyof typeof READINGS;
export const READING_NAMES = Object.keys(READINGS) as ReadingName[];

export const isOnEquipment = (name: ReadingName): boolean => READINGS[name].where === 'equipment';

/**
 * Whether a client-sent name is in the vocabulary. Own keys only: 'toString' would otherwise resolve to the object's
 * prototype, and every rule that reads a reading's definition would throw.
 */
export const isKnownReading = (name: unknown): name is ReadingName =>
  typeof name === 'string' && Object.prototype.hasOwnProperty.call(READINGS, name);
