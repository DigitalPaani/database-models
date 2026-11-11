/** How the equipment is maintained, not what it does: a clarifier's scraper bridge turns, so it is ROTATING. */
export declare const ARCHETYPES: readonly ["ROTATING", "VESSEL", "FIXED", "MEMBRANE", "DOSING", "VALVE", "DEVICE"];
export type Archetype = (typeof ARCHETYPES)[number];
/** What failing it costs a sewage or water plant: A critical · B essential · C standard. */
export declare const CRITICALITY_TIERS: readonly ["A", "B", "C"];
export type CriticalityTier = (typeof CRITICALITY_TIERS)[number];
/** The maintenance programme a type expects. A machine whose type expects one and has none is a coverage gap. */
export declare const PROGRAMMES: readonly ["CLEANING", "MECHANICAL_PM", "INSPECTION", "DESLUDGING", "REFILL", "PUMP_PM", "BACKWASH", "MEDIA_INSPECTION", "CIP", "LAMP_REPLACEMENT", "CARTRIDGE_REPLACEMENT", "CLOTH_REPLACEMENT", "TONNER_CHANGE"];
export type Programme = (typeof PROGRAMMES)[number];
/** ANALYTICAL is a probe that drifts, so it is the kind that gets a calibration schedule. */
export declare const READING_KINDS: readonly ["STATUS", "PROCESS", "ANALYTICAL", "METER", "COMPUTED"];
export type ReadingKind = (typeof READING_KINDS)[number];
/**
 * equipment: the sensor measures the machine's own state or what it holds; the library may alert on it.
 * connection: it measures the fluid in a pipe, or a difference between two pipes. It waits for the phase that
 * adds connections and is never alerted on, even when SCADA has drawn a widget for it.
 * Lower-case, unlike the other enums, because the backend plan's DTO and the prototype both spell it so.
 */
export declare const READING_PLACES: readonly ["equipment", "connection"];
export type ReadingPlace = (typeof READING_PLACES)[number];
/** Which way is bad. */
export declare const DIRECTIONS: readonly ["ABOVE", "BELOW"];
export type Direction = (typeof DIRECTIONS)[number];
export declare const WORK_TYPES: readonly ["ROUTINE", "PM", "CALIBRATION"];
export type WorkType = (typeof WORK_TYPES)[number];
/** EITHER: due on the calendar or on run-hours, whichever comes first. */
export declare const DUE_BASES: readonly ["CALENDAR", "METER", "EITHER"];
export type DueBasis = (typeof DUE_BASES)[number];
export declare const CADENCE_UNITS: readonly ["DAY", "WEEK", "MONTH", "YEAR"];
export type CadenceUnit = (typeof CADENCE_UNITS)[number];
/** AUTO: the equipment does it itself (auto valves, auto wash); the task is to confirm it ran, not to do it. */
export declare const PERFORMED_BY: readonly ["IN_HOUSE", "VENDOR", "AUTO"];
export type PerformedBy = (typeof PERFORMED_BY)[number];
export declare const PLANT_TYPES: readonly ["STP", "ETP", "WTP"];
export type PlantType = (typeof PLANT_TYPES)[number];
/** What a SCADA form answer is to the library. A form answer never changes a machine's type. */
export declare const FORM_RULE_READS: readonly ["EXPECTS", "LIMITS", "SCHEDULE", "FLAG", "DERIVED"];
export type FormRuleReads = (typeof FORM_RULE_READS)[number];
/** FULL_LOAD_AMPS: kW → full-load current of a three-phase 415 V motor (pf 0.85, efficiency 0.9), about 1.82 A per kW. */
export declare const FORM_DERIVATIONS: readonly ["VOLUME", "NUMBER", "FULL_LOAD_AMPS"];
export type FormDerivation = (typeof FORM_DERIVATIONS)[number];
/** ON reads Yes / true / checked / "Remote Control" as on; EQUALS is case-insensitive; MATCHES is a regex. */
export declare const FORM_MATCHES: readonly ["ANSWERED", "ON", "EQUALS", "MATCHES"];
export type FormMatch = (typeof FORM_MATCHES)[number];
export declare const LIBRARY_ITEM_KINDS: readonly ["ALERT", "SCHEDULE", "CONDITION_JOB"];
export type LibraryItemKind = (typeof LIBRARY_ITEM_KINDS)[number];
export declare const DRAWING_CODES: readonly string[];
export declare const WIDGET_CODES: readonly string[];
export declare const IGNORED_CODES: readonly string[];
/** Never a registry entry: drawing elements, pipes, widgets and ignored codes. */
export declare const NON_EQUIPMENT_CODES: readonly string[];
export interface ReadingDef {
    where: ReadingPlace;
    /** The spec's short tag, e.g. AMP. Real drawings carry none; the platform names a sensor by its purpose instead. */
    tag: string;
    unit: string;
    kind: ReadingKind;
    /** The range a working sensor reports. Outside it the value is a sensor fault, not an alert. */
    valid: {
        readonly min: number;
        readonly max: number;
    };
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
/** Every reading the library knows: 23 on the equipment, 16 on a connection. Names are the spec's, verbatim. */
export declare const READINGS: {
    'Run status': ReadingDef;
    'Trip contact': ReadingDef;
    'Auto / manual': ReadingDef;
    'Motor current': ReadingDef;
    Speed: ReadingDef;
    'Run hours': ReadingDef;
    Vibration: ReadingDef;
    'Bearing temperature': ReadingDef;
    'Winding temperature': ReadingDef;
    'Valve position': ReadingDef;
    'Lamp fault': ReadingDef;
    'UV intensity': ReadingDef;
    Level: ReadingDef;
    'Sump flood switch': ReadingDef;
    'Dissolved oxygen': ReadingDef;
    MLSS: ReadingDef;
    pH: ReadingDef;
    ORP: ReadingDef;
    Temperature: ReadingDef;
    'Sludge blanket': ReadingDef;
    'Chemical tank level': ReadingDef;
    'Tonner net weight': ReadingDef;
    'Chlorine leak': ReadingDef;
    'Line pressure': ReadingDef;
    'Discharge pressure': ReadingDef;
    'Suction pressure': ReadingDef;
    'Inlet pressure': ReadingDef;
    Flow: ReadingDef;
    Throughput: ReadingDef;
    'Differential pressure': ReadingDef;
    'Trans-membrane pressure': ReadingDef;
    Permeability: ReadingDef;
    Recovery: ReadingDef;
    'Outlet turbidity': ReadingDef;
    'Residual chlorine': ReadingDef;
    'Outlet hardness': ReadingDef;
    'Permeate conductivity': ReadingDef;
    'Level differential': ReadingDef;
    'Cooling water temperature': ReadingDef;
};
export type ReadingName = keyof typeof READINGS;
export declare const READING_NAMES: ReadingName[];
export declare const isOnEquipment: (name: ReadingName) => boolean;
/**
 * Whether a client-sent name is in the vocabulary. Own keys only: 'toString' would otherwise resolve to the object's
 * prototype, and every rule that reads a reading's definition would throw.
 */
export declare const isKnownReading: (name: unknown) => name is ReadingName;
//# sourceMappingURL=equipment.constants.d.ts.map