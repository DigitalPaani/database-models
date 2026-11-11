"use strict";
/*
 * The vocabulary of the equipment library and the equipment registry, from the v5 configuration spec
 * (CTLConfig v5, assets/catalogue.js). Two levels only: plant type and equipment type. There are no unit
 * processes, control groups, zones or duty/standby pairs, and nothing here should grow one.
 *
 * Mirrors node-backend's src/components/equipment/constants/equipment.constants.ts, cut to what the models and
 * their validate hooks need. The two must change together: a value only one side knows is a row the other refuses.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isKnownReading = exports.isOnEquipment = exports.READING_NAMES = exports.READINGS = exports.NON_EQUIPMENT_CODES = exports.IGNORED_CODES = exports.WIDGET_CODES = exports.DRAWING_CODES = exports.LIBRARY_ITEM_KINDS = exports.FORM_MATCHES = exports.FORM_DERIVATIONS = exports.FORM_RULE_READS = exports.PLANT_TYPES = exports.PERFORMED_BY = exports.CADENCE_UNITS = exports.DUE_BASES = exports.WORK_TYPES = exports.DIRECTIONS = exports.READING_PLACES = exports.READING_KINDS = exports.PROGRAMMES = exports.CRITICALITY_TIERS = exports.ARCHETYPES = void 0;
/** How the equipment is maintained, not what it does: a clarifier's scraper bridge turns, so it is ROTATING. */
exports.ARCHETYPES = ['ROTATING', 'VESSEL', 'FIXED', 'MEMBRANE', 'DOSING', 'VALVE', 'DEVICE'];
/** What failing it costs a sewage or water plant: A critical · B essential · C standard. */
exports.CRITICALITY_TIERS = ['A', 'B', 'C'];
/** The maintenance programme a type expects. A machine whose type expects one and has none is a coverage gap. */
exports.PROGRAMMES = [
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
];
/** ANALYTICAL is a probe that drifts, so it is the kind that gets a calibration schedule. */
exports.READING_KINDS = ['STATUS', 'PROCESS', 'ANALYTICAL', 'METER', 'COMPUTED'];
/**
 * equipment: the sensor measures the machine's own state or what it holds; the library may alert on it.
 * connection: it measures the fluid in a pipe, or a difference between two pipes. It waits for the phase that
 * adds connections and is never alerted on, even when SCADA has drawn a widget for it.
 * Lower-case, unlike the other enums, because the backend plan's DTO and the prototype both spell it so.
 */
exports.READING_PLACES = ['equipment', 'connection'];
/** Which way is bad. */
exports.DIRECTIONS = ['ABOVE', 'BELOW'];
exports.WORK_TYPES = ['ROUTINE', 'PM', 'CALIBRATION'];
/** EITHER: due on the calendar or on run-hours, whichever comes first. */
exports.DUE_BASES = ['CALENDAR', 'METER', 'EITHER'];
exports.CADENCE_UNITS = ['DAY', 'WEEK', 'MONTH', 'YEAR'];
/** AUTO: the equipment does it itself (auto valves, auto wash); the task is to confirm it ran, not to do it. */
exports.PERFORMED_BY = ['IN_HOUSE', 'VENDOR', 'AUTO'];
exports.PLANT_TYPES = ['STP', 'ETP', 'WTP'];
/** What a SCADA form answer is to the library. A form answer never changes a machine's type. */
exports.FORM_RULE_READS = ['EXPECTS', 'LIMITS', 'SCHEDULE', 'FLAG', 'DERIVED'];
/** FULL_LOAD_AMPS: kW → full-load current of a three-phase 415 V motor (pf 0.85, efficiency 0.9), about 1.82 A per kW. */
exports.FORM_DERIVATIONS = ['VOLUME', 'NUMBER', 'FULL_LOAD_AMPS'];
/** ON reads Yes / true / checked / "Remote Control" as on; EQUALS is case-insensitive; MATCHES is a regex. */
exports.FORM_MATCHES = ['ANSWERED', 'ON', 'EQUALS', 'MATCHES'];
exports.LIBRARY_ITEM_KINDS = ['ALERT', 'SCHEDULE', 'CONDITION_JOB'];
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
exports.DRAWING_CODES = ['PLANT_EQUIPMENT', 'ZONE', 'JOINS', 'BUILDING'];
exports.WIDGET_CODES = [LEVEL_SENSOR_CODE, 'chart.knob', SWITCH_SENSOR_CODE, 'NUMBER_SENSOR', 'TABLE_WIDGET'];
exports.IGNORED_CODES = ['GROUP', 'LABEL_WIDGET', 'ASSET_EQUIPMENT'];
/** Never a registry entry: drawing elements, pipes, widgets and ignored codes. */
exports.NON_EQUIPMENT_CODES = [...exports.DRAWING_CODES, PIPE_CODE, ...exports.WIDGET_CODES, ...exports.IGNORED_CODES];
const E = (tag, unit, kind, [min, max], direction, extra = {}) => ({
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
const C = (tag, unit, kind, [min, max], direction, note, extra = {}) => ({
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
exports.READINGS = {
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
};
exports.READING_NAMES = Object.keys(exports.READINGS);
const isOnEquipment = (name) => exports.READINGS[name].where === 'equipment';
exports.isOnEquipment = isOnEquipment;
/**
 * Whether a client-sent name is in the vocabulary. Own keys only: 'toString' would otherwise resolve to the object's
 * prototype, and every rule that reads a reading's definition would throw.
 */
const isKnownReading = (name) => typeof name === 'string' && Object.prototype.hasOwnProperty.call(exports.READINGS, name);
exports.isKnownReading = isKnownReading;
