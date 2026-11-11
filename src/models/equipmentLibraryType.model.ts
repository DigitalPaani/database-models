import type { HydratedDocument, Model, Types } from 'mongoose';
import mongoose, { Schema } from 'mongoose';
import { SEVERITIES } from '../constants/closeTheLoop.constants';
import type { Severity } from '../constants/closeTheLoop.constants';
import {
  ARCHETYPES,
  CADENCE_UNITS,
  CRITICALITY_TIERS,
  DIRECTIONS,
  DUE_BASES,
  FORM_DERIVATIONS,
  FORM_MATCHES,
  FORM_RULE_READS,
  PERFORMED_BY,
  PROGRAMMES,
  READING_KINDS,
  READING_NAMES,
  WORK_TYPES,
} from '../constants/equipment.constants';
import type {
  Archetype,
  CadenceUnit,
  CriticalityTier,
  Direction,
  DueBasis,
  FormDerivation,
  FormMatch,
  FormRuleReads,
  PerformedBy,
  Programme,
  ReadingKind,
  ReadingName,
  WorkType,
} from '../constants/equipment.constants';
import { validateLibraryType } from '../validators/equipment/validateLibraryType';

/*
 * The equipment library: one document per equipment node type in the database, one for one, under the database's
 * own name with its typos kept (Softner, Cass Basin, QUADSON EVAPORATOR). `code` is the palette code SCADA draws
 * with — the same string as LayoutEquipments.nodeType — and is how a machine finds its entry.
 *
 * The rule v5 exists for: an alert or a condition job reads a reading ON the equipment. Whatever needs a reading on
 * a pipe is kept in `nextPhase`, in plain sight, and alerts on nothing. The validate hook below holds that line.
 * It runs on save() and validate() only — validateSync(), updateOne() and findOneAndUpdate() all skip it, so anything
 * that writes a type with an update must validate() the candidate first, as node-backend's library service does.
 *
 * The same schema as node-backend's src/components/equipment/models/equipmentLibraryType.model.ts, which owns this
 * collection. Change the two together.
 */

/** A status reading (trip, flood, leak) fires at threshold 1, compared with ==. */
export interface SeverityBand {
  severity: Severity;
  threshold: number;
}

export interface Cadence {
  n: number;
  unit: CadenceUnit;
}

export interface ValidRange {
  min: number;
  max: number;
}

export interface LibraryReading {
  name: ReadingName;
  tag: string;
  unit: string;
  kind: ReadingKind;
  /** Copied from the vocabulary and narrowed per type: a Mini Blower's motor current reads 0–20 A, not 0–60. */
  valid: ValidRange;
  /** Per type too: a Dosing Tank's level is the chemical left in it, so low is the bad way. */
  direction: Direction | null;
}

export interface LibraryAlert {
  /** Stable within the type. A machine's override and its materialised trigger both point here, so never reuse one. */
  key: string;
  name: string;
  reading: ReadingName;
  direction: Direction;
  bands: SeverityBand[];
  /** Part of a machine only where SCADA drew its reading; not a gap where it did not (the flood switch on an open tank). */
  ifDrawn: boolean;
  /** Watches only while this status reading is on: a stopped machine reads 0 A and 0 %. */
  gate: ReadingName | null;
  /** Keys into the flow and cause library, which is not modelled yet. */
  flowKey: string | null;
  causeKey: string | null;
}

export interface LibrarySchedule {
  key: string;
  name: string;
  workType: WorkType;
  basis: DueBasis;
  every: Cadence | null;
  meterHours: number | null;
  /** Estimated labour, for the month's planned hours. */
  hours: number | null;
  parts: string | null;
  performedBy: PerformedBy;
  statutory: boolean;
  /** A Lead verifies the close. */
  verify: boolean;
  flowKey: string | null;
  causeKey: string | null;
}

/** Rises above doWhen to open the job, re-arms below doneWhen. */
export interface LibraryConditionJob {
  key: string;
  name: string;
  reading: ReadingName;
  doWhen: number;
  doneWhen: number;
  flowKey: string | null;
  causeKey: string | null;
}

export interface NextPhaseReading {
  name: ReadingName;
  note: string;
}

/** Written and kept, never installed: each reads a connection. */
export interface NextPhaseAlert {
  name: string;
  reading: ReadingName;
  note: string;
  direction: Direction;
  bands: SeverityBand[];
  flowKey: string | null;
  causeKey: string | null;
}

export interface NextPhaseWork {
  name: string;
  note: string;
  reading: ReadingName | null;
}

export interface NextPhase {
  readings: NextPhaseReading[];
  alerts: NextPhaseAlert[];
  work: NextPhaseWork[];
}

export interface FormAnswerMatch {
  op: FormMatch;
  value: string | null;
  /** MATCHES only: regex flags, e.g. 'i'. */
  flags: string | null;
}

export interface FormRuleAdjust {
  /** A schedule or condition job of this type, by key. */
  itemKey: string;
  performedBy: PerformedBy | null;
  note: string | null;
  /** Condition job thresholds as factors of the answer: a blower's intake filter job at kW × 1.73 (95 % of full load). */
  doWhenFactor: number | null;
  doneWhenFactor: number | null;
  /** '{v} plates' */
  partsNote: string | null;
}

export interface FormRule {
  /**
   * The question's semanticKey (motorRatingKw, breadth …), matched first, so a reworded SCADA question keeps its
   * rule and one key covers a question asked under different text on different node types. null until keyed.
   */
  questionKey: string | null;
  /** SCADA's question text, verbatim, typos included ('Breath'): the fallback match when there is no key. */
  question: string;
  reads: FormRuleReads;
  when: FormAnswerMatch;
  /** FLAG / EXPECTS: the fact kept on the machine (vfd, remote, overflow, pumpType, valveType). */
  field: string | null;
  derive: FormDerivation | null;
  /** Where the derived number is kept in the machine's `derived`. */
  key: string | null;
  /** FULL_LOAD_AMPS also keeps the kW answer, so the machine can say "22 kW · 40 A full load". */
  rawKey: string | null;
  /** VOLUME: the dimension questions read besides Shape, by question key (or text until the keys are backfilled). */
  uses: string[];
  /** EXPECTS: the reading the type now expects. LIMITS: the reading whose bands the answer sets. */
  reading: ReadingName | null;
  direction: Direction | null;
  /** LIMITS: band threshold = factor × the derived base. */
  factors: { severity: Severity; factor: number }[];
  alert: LibraryAlert | null;
  schedule: LibrarySchedule | null;
  /** Retunes `schedule.every` by the answer: ceramic or plastic diffusers are cleaned yearly, not half-yearly. */
  everyBy: { pattern: string; flags: string | null; every: Cadence }[];
  /** Adds a parts note from another answer: a retrievable diffuser grid needs no draining. */
  partsBy: { question: string; pattern: string; flags: string | null; note: string }[];
  adjust: FormRuleAdjust | null;
  why: string | null;
  /** The short line the Library page shows. */
  says: string;
}

export interface EquipmentLibraryTypeDoc {
  _id: Types.ObjectId;
  code: string;
  name: string;
  archetype: Archetype;
  /**
   * Holds the water it is read in, so a pH or level probe on it is on the equipment even when the type does not list
   * that reading. Every VESSEL, and the clarifier, screen chamber, agitator, grit chamber, DAF and MBR. Without it a
   * Clarifier (ROTATING, for its scraper) would have its pH probe sent to the next phase and its alerts would vanish.
   */
  holdsWater: boolean;
  tier: CriticalityTier;
  expects: Programme[];
  /** Tag prefix for machines of this type when the drawing carries none. */
  tagPrefix: string;
  readings: LibraryReading[];
  /** A widget tag this type reads as another reading: a Cooling Tower's TEMP is the water leaving it. */
  tagMap: Map<string, ReadingName>;
  alerts: LibraryAlert[];
  schedules: LibrarySchedule[];
  conditionJobs: LibraryConditionJob[];
  formRules: FormRule[];
  nextPhase: NextPhase;
  /** Runs timed cycles (UF backwash). */
  cycles: boolean;
  /** The "to confirm" line: content the library reasoned out and the owner has not confirmed. null when confirmed. */
  confirm: string | null;
  /** Bumped on every edit. A machine records the version it inherited, so a stale one can be found and re-inherited. */
  version: number;
  /** Set by the seed only. Seeded content is the prototype's reasoned guess until someone edits or confirms it. */
  seededFrom: 'prototype-v5' | null;
  isArchived: boolean;
  createdBy: Types.ObjectId | null;
  updatedBy: Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

const readingEnum = { type: String, enum: READING_NAMES };
// Mongoose's enum validator refuses null unless null is one of the values.
const optionalReading = { type: String, enum: [...READING_NAMES, null], default: null };

const severityBandSchema = new Schema<SeverityBand>(
  {
    severity: { type: String, enum: [...SEVERITIES], required: true },
    threshold: { type: Number, required: true },
  },
  { _id: false }
);

const cadenceSchema = new Schema<Cadence>(
  {
    n: { type: Number, required: true, min: 1 },
    unit: { type: String, enum: [...CADENCE_UNITS], required: true },
  },
  { _id: false }
);

const validRangeSchema = new Schema<ValidRange>(
  {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
  },
  { _id: false }
);

const libraryReadingSchema = new Schema<LibraryReading>(
  {
    name: { ...readingEnum, required: true },
    tag: { type: String, required: true },
    unit: { type: String, default: '' },
    kind: { type: String, enum: [...READING_KINDS], required: true },
    valid: { type: validRangeSchema, required: true },
    direction: { type: String, enum: [...DIRECTIONS, null], default: null },
  },
  { _id: false }
);

const alertSchema = new Schema<LibraryAlert>(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    reading: { ...readingEnum, required: true },
    direction: { type: String, enum: [...DIRECTIONS], required: true },
    bands: { type: [severityBandSchema], default: [] },
    ifDrawn: { type: Boolean, default: false },
    gate: optionalReading,
    flowKey: { type: String, default: null },
    causeKey: { type: String, default: null },
  },
  { _id: false }
);

const scheduleSchema = new Schema<LibrarySchedule>(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    workType: { type: String, enum: [...WORK_TYPES], required: true },
    basis: { type: String, enum: [...DUE_BASES], required: true, default: 'CALENDAR' },
    every: { type: cadenceSchema, default: null },
    meterHours: { type: Number, default: null, min: 1 },
    hours: { type: Number, default: null, min: 0 },
    parts: { type: String, default: null },
    performedBy: { type: String, enum: [...PERFORMED_BY], default: 'IN_HOUSE' },
    statutory: { type: Boolean, default: false },
    verify: { type: Boolean, default: false },
    flowKey: { type: String, default: null },
    causeKey: { type: String, default: null },
  },
  { _id: false }
);

const conditionJobSchema = new Schema<LibraryConditionJob>(
  {
    key: { type: String, required: true },
    name: { type: String, required: true },
    reading: { ...readingEnum, required: true },
    doWhen: { type: Number, required: true },
    doneWhen: { type: Number, required: true },
    flowKey: { type: String, default: null },
    causeKey: { type: String, default: null },
  },
  { _id: false }
);

const nextPhaseSchema = new Schema<NextPhase>(
  {
    readings: {
      type: [new Schema<NextPhaseReading>({ name: { ...readingEnum, required: true }, note: { type: String, default: '' } }, { _id: false })],
      default: [],
    },
    alerts: {
      type: [
        new Schema<NextPhaseAlert>(
          {
            name: { type: String, required: true },
            reading: { ...readingEnum, required: true },
            note: { type: String, default: '' },
            direction: { type: String, enum: [...DIRECTIONS], required: true },
            // Some are written before their limits are known ("Discharge pressure low" waits on Maximum Head).
            bands: { type: [severityBandSchema], default: [] },
            flowKey: { type: String, default: null },
            causeKey: { type: String, default: null },
          },
          { _id: false }
        ),
      ],
      default: [],
    },
    work: {
      type: [
        new Schema<NextPhaseWork>(
          { name: { type: String, required: true }, note: { type: String, default: '' }, reading: optionalReading },
          { _id: false }
        ),
      ],
      default: [],
    },
  },
  { _id: false }
);

const formRuleSchema = new Schema<FormRule>(
  {
    questionKey: { type: String, default: null },
    question: { type: String, required: true },
    reads: { type: String, enum: [...FORM_RULE_READS], required: true },
    when: {
      type: new Schema<FormAnswerMatch>(
        {
          op: { type: String, enum: [...FORM_MATCHES], required: true, default: 'ANSWERED' },
          value: { type: String, default: null },
          flags: { type: String, default: null },
        },
        { _id: false }
      ),
      default: (): Partial<FormAnswerMatch> => ({ op: 'ANSWERED' }),
    },
    field: { type: String, default: null },
    derive: { type: String, enum: [...FORM_DERIVATIONS, null], default: null },
    key: { type: String, default: null },
    rawKey: { type: String, default: null },
    uses: { type: [String], default: [] },
    reading: optionalReading,
    direction: { type: String, enum: [...DIRECTIONS, null], default: null },
    factors: {
      type: [
        new Schema(
          { severity: { type: String, enum: [...SEVERITIES], required: true }, factor: { type: Number, required: true, min: 0 } },
          { _id: false }
        ),
      ],
      default: [],
    },
    alert: { type: alertSchema, default: null },
    schedule: { type: scheduleSchema, default: null },
    everyBy: {
      type: [
        new Schema(
          { pattern: { type: String, required: true }, flags: { type: String, default: null }, every: { type: cadenceSchema, required: true } },
          { _id: false }
        ),
      ],
      default: [],
    },
    partsBy: {
      type: [
        new Schema(
          {
            question: { type: String, required: true },
            pattern: { type: String, required: true },
            flags: { type: String, default: null },
            note: { type: String, required: true },
          },
          { _id: false }
        ),
      ],
      default: [],
    },
    adjust: {
      type: new Schema<FormRuleAdjust>(
        {
          itemKey: { type: String, required: true },
          performedBy: { type: String, enum: [...PERFORMED_BY, null], default: null },
          note: { type: String, default: null },
          doWhenFactor: { type: Number, default: null },
          doneWhenFactor: { type: Number, default: null },
          partsNote: { type: String, default: null },
        },
        { _id: false }
      ),
      default: null,
    },
    why: { type: String, default: null },
    says: { type: String, required: true },
  },
  { _id: false }
);

const equipmentLibraryTypeSchema = new Schema<EquipmentLibraryTypeDoc>(
  {
    code: { type: String, required: true, trim: true },
    name: { type: String, required: true },
    archetype: { type: String, enum: [...ARCHETYPES], required: true },
    holdsWater: { type: Boolean, default: false },
    tier: { type: String, enum: [...CRITICALITY_TIERS], required: true },
    expects: { type: [{ type: String, enum: [...PROGRAMMES] }], default: [] },
    tagPrefix: { type: String, required: true },
    readings: { type: [libraryReadingSchema], default: [] },
    tagMap: { type: Map, of: { type: String, enum: READING_NAMES }, default: {} },
    alerts: { type: [alertSchema], default: [] },
    schedules: { type: [scheduleSchema], default: [] },
    conditionJobs: { type: [conditionJobSchema], default: [] },
    formRules: { type: [formRuleSchema], default: [] },
    nextPhase: { type: nextPhaseSchema, default: (): Partial<NextPhase> => ({}) },
    cycles: { type: Boolean, default: false },
    confirm: { type: String, default: null },
    version: { type: Number, required: true, default: 1, min: 1 },
    seededFrom: { type: String, enum: ['prototype-v5', null], default: null },
    isArchived: { type: Boolean, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: 'NewUser', default: null },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'NewUser', default: null },
  },
  { timestamps: true }
);

equipmentLibraryTypeSchema.pre('validate', function (this: HydratedDocument<EquipmentLibraryTypeDoc>) {
  validateLibraryType(this)
    .filter((v) => v.code === 'RULE')
    .forEach((v) => this.invalidate(v.path, v.message));
});

equipmentLibraryTypeSchema.index({ code: 1 }, { unique: true });

const EquipmentLibraryTypeModel: Model<EquipmentLibraryTypeDoc> = mongoose.model<EquipmentLibraryTypeDoc>(
  'EquipmentLibraryType',
  equipmentLibraryTypeSchema,
  'equipmentLibraryTypes'
);

export { severityBandSchema, cadenceSchema, scheduleSchema, EquipmentLibraryTypeModel };
