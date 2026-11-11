import type { Model, Types } from 'mongoose';
import mongoose from 'mongoose';
import type { Severity } from '../constants/closeTheLoop.constants';
import type { Archetype, CadenceUnit, CriticalityTier, Direction, DueBasis, FormDerivation, FormMatch, FormRuleReads, PerformedBy, Programme, ReadingKind, ReadingName, WorkType } from '../constants/equipment.constants';
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
    factors: {
        severity: Severity;
        factor: number;
    }[];
    alert: LibraryAlert | null;
    schedule: LibrarySchedule | null;
    /** Retunes `schedule.every` by the answer: ceramic or plastic diffusers are cleaned yearly, not half-yearly. */
    everyBy: {
        pattern: string;
        flags: string | null;
        every: Cadence;
    }[];
    /** Adds a parts note from another answer: a retrievable diffuser grid needs no draining. */
    partsBy: {
        question: string;
        pattern: string;
        flags: string | null;
        note: string;
    }[];
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
declare const severityBandSchema: mongoose.Schema<SeverityBand, Model<SeverityBand, any, any, any, mongoose.Document<unknown, any, SeverityBand> & SeverityBand & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, SeverityBand, mongoose.Document<unknown, {}, mongoose.FlatRecord<SeverityBand>> & mongoose.FlatRecord<SeverityBand> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
declare const cadenceSchema: mongoose.Schema<Cadence, Model<Cadence, any, any, any, mongoose.Document<unknown, any, Cadence> & Cadence & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Cadence, mongoose.Document<unknown, {}, mongoose.FlatRecord<Cadence>> & mongoose.FlatRecord<Cadence> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
declare const scheduleSchema: mongoose.Schema<LibrarySchedule, Model<LibrarySchedule, any, any, any, mongoose.Document<unknown, any, LibrarySchedule> & LibrarySchedule & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, LibrarySchedule, mongoose.Document<unknown, {}, mongoose.FlatRecord<LibrarySchedule>> & mongoose.FlatRecord<LibrarySchedule> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
declare const EquipmentLibraryTypeModel: Model<EquipmentLibraryTypeDoc>;
export { severityBandSchema, cadenceSchema, scheduleSchema, EquipmentLibraryTypeModel };
//# sourceMappingURL=equipmentLibraryType.model.d.ts.map