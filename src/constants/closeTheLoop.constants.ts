import { RoleKey } from "./roles.constants";

export const SEVERITIES = ["EMERGENCY", "MAJOR", "MINOR", "CAUTION"] as const;
export type Severity = (typeof SEVERITIES)[number];
export const SEVERITY_RANK = {
  CAUTION: 0,
  MINOR: 1,
  MAJOR: 2,
  EMERGENCY: 3,
} as const satisfies Record<Severity, number>;

export const LADDER_STEPS = [
  "OPENED",
  "NOT_STARTED",
  "OVERDUE",
  "OVERDUE_2X",
  "CHRONIC",
] as const;
export type LadderStep = (typeof LADDER_STEPS)[number];
export const STEP_RANK = {
  OPENED: 0,
  NOT_STARTED: 1,
  OVERDUE: 2,
  OVERDUE_2X: 3,
  CHRONIC: 4,
} as const satisfies Record<LadderStep, number>;

/** WEB_PUSH rides along with IN_APP for people who allowed browser notifications (BE-28). */
export const CHANNELS = [
  "WHATSAPP",
  "SMS",
  "CALL",
  "EMAIL",
  "HOOTER",
  "IN_APP",
  "WEB_PUSH",
] as const;
export type Channel = (typeof CHANNELS)[number];
export const REALTIME_CHANNELS = ["WHATSAPP", "SMS"] as const;
export type RealtimeChannel = (typeof REALTIME_CHANNELS)[number];

/** The languages the engine writes messages in; a site may offer any of them. */
export const LANGUAGES = ["en", "hi"] as const;
export type Language = (typeof LANGUAGES)[number];
/** Which way the reading on an alert is moving, when the trigger says. */
export const READING_TRENDS = ["RISING", "FALLING", "STEADY"] as const;
export type ReadingTrend = (typeof READING_TRENDS)[number];

/** What anyone without a language of their own, and any plant that offers none, is written to in. */
export const DEFAULT_LANGUAGE: Language = "en";

/** Messages addressed to one person: a hand-off, an approval, a help request. */
export const NAMED_KINDS = [
  "HANDED_TO_YOU",
  "TAKEN_OVER",
  "APPROVAL_WAITING",
  "APPROVAL_GRANTED",
  "APPROVAL_REFUSED",
  "REPORT_CLOSED",
  "ROSTER_CHANGED",
  "NEED_HELP",
  "NO_OPERATOR",
] as const;
export type NamedKind = (typeof NAMED_KINDS)[number];

/** Where a Start came from. A browser can claim the first two; the trigger's work-started is the third. */
export const START_SOURCES = ["APP", "LANDING", "INTERNAL"] as const;
export type StartSource = (typeof START_SOURCES)[number];
export const BROWSER_START_SOURCES = [
  "APP",
  "LANDING",
] as const satisfies readonly StartSource[];

/** The platform permission working an Issue needs, at the Issue's plant. */
export const WORK_ISSUE_PERMISSION = "ops.issueSessions.create";

export const ALWAYS_REACHES = [
  "HANDED_TO_YOU",
  "APPROVAL_DECIDED",
  "APPROVALS_WAITING",
  "HELP_REQUESTS",
  "EMERGENCY",
  "EMERGENCY_UNLESS_TURNED_DOWN",
] as const;
export type AlwaysReach = (typeof ALWAYS_REACHES)[number];

export const DELIVERY_MODES = ["NOW", "DIGEST", "OFF"] as const;
export type DeliveryMode = (typeof DELIVERY_MODES)[number];
export const MODE_RANK = {
  OFF: 0,
  DIGEST: 1,
  NOW: 2,
} as const satisfies Record<DeliveryMode, number>;

/** What a morning-email line is about. The digest schema enforces this same list. */
export const DIGEST_ITEM_KINDS = [
  "ISSUE_STEP",
  "CHRONIC",
  "ALERTED",
  "HELD",
  "COVERAGE_DROP",
  "HOOTER_WATCHDOG",
] as const;
export type DigestItemKind = (typeof DIGEST_ITEM_KINDS)[number];

/** Why a person was sent a message. The attempt schema enforces this same list, so the two cannot drift. */
export const ROUTE_REASONS = [
  "LADDER",
  "EMERGENCY",
  "NO_SENIOR_LEAD_FALLBACK",
  "SITE_ADMIN",
  "DENSITY",
  "NAMED",
  "NAMED_LEAD_COPY",
  "ROUTING_GAP",
  "HANDOFF_STALLED",
  "WATCHDOG",
  "COVERAGE_DROP",
] as const;
export type RouteReason = (typeof ROUTE_REASONS)[number];

/** Why a plant's alerts might reach nobody. The first two are roster facts and block saving the roster;
 *  the last two are the people's own settings, which are allowed and only warn. */
export const COVERAGE_GAPS = [
  "NO_OPERATOR_WITH_VERIFIED_PHONE",
  "NO_LEAD_WITH_VERIFIED_PHONE",
  "NO_OPERATOR_HEARS_MAJOR",
  "NO_LEAD_HEARS_MAJOR",
] as const;
export type CoverageGap = (typeof COVERAGE_GAPS)[number];
export const ROSTER_GAPS: ReadonlySet<CoverageGap> = new Set<CoverageGap>([
  "NO_OPERATOR_WITH_VERIFIED_PHONE",
  "NO_LEAD_WITH_VERIFIED_PHONE",
]);

export const ROLE_GROUPS = [
  "OPERATOR",
  "LEAD",
  "SENIOR_LEAD",
  "REGULAR_NON_OP",
  "SENIOR_NON_OP",
] as const;
export type RoleGroup = (typeof ROLE_GROUPS)[number];
export const ROLE_GROUP_BY_ROLE: Readonly<Record<RoleKey, RoleGroup>> = {
  L1_OPERATOR: "OPERATOR",
  L2: "OPERATOR",
  L3_LEAD: "LEAD",
  L4_SENIOR_LEAD: "SENIOR_LEAD",
  NON_OP: "REGULAR_NON_OP",
  REGULAR_NON_OP: "REGULAR_NON_OP",
  SENIOR_NON_OP: "SENIOR_NON_OP",
};
export const OPERATIONAL_GROUPS: ReadonlySet<RoleGroup> = new Set<RoleGroup>([
  "OPERATOR",
  "LEAD",
  "SENIOR_LEAD",
]);
/** The lines the Site Settings routing table lists people on, in the order it reads them. */
export const ROUTING_BUCKETS = [
  "OPERATOR",
  "LEAD",
  "SENIOR_LEAD",
  "CLIENT",
  "SITE_ADMIN",
] as const;
export type RoutingBucket = (typeof ROUTING_BUCKETS)[number];

export const MINUTE_MS = 60_000;
export const HOUR_MS = 60 * MINUTE_MS;
export const DAY_MS = 24 * HOUR_MS;
/** How far ahead of our clock an open may be and still count as now: clock skew, not a scheduled start. */
export const OPENED_AT_SKEW_MS = 2 * MINUTE_MS;

export interface SeverityClock {
  readonly respondMs: number;
  readonly finishMs: number;
}
export const SEVERITY_CLOCKS: Readonly<Record<Severity, SeverityClock | null>> =
  {
    EMERGENCY: { respondMs: 1 * HOUR_MS, finishMs: 4 * HOUR_MS },
    MAJOR: { respondMs: 8 * HOUR_MS, finishMs: 24 * HOUR_MS },
    MINOR: { respondMs: 24 * HOUR_MS, finishMs: 72 * HOUR_MS },
    CAUTION: null,
  };
export const CHRONIC_AFTER_MS = 7 * DAY_MS;
export const CHRONIC_DEADLINE_MULTIPLIER = 3;
export const OVERDUE_2X_MULTIPLIER = 2;

/**
 * Too many hand-offs: an issue passed from person to person while still nobody
 * has pressed Start. The Leads hear about it on the second hand-off inside four
 * hours, and only while the issue is unstarted — a hand-off after work began is
 * ordinary delegation, not a stall.
 */
export const HANDOFF_WINDOW_MS = 4 * HOUR_MS;
export const HANDOFF_ALARM_AFTER = 2;

export const DEDUP_WINDOW_MS = 5 * MINUTE_MS;
export const IST_OFFSET_MS = 330 * MINUTE_MS;
export const DEFAULT_QUIET_HOURS = {
  startMinute: 22 * 60,
  endMinute: 6 * 60,
} as const;
export const DIGEST_TIME_IST = { hour: 6, minute: 0 } as const;

/** A site's hooter length until its admin picks one. */
export const HOOTER_DEFAULT_DURATION_SEC = 60;
/** The hooter lengths a site may pick, and the presets the screen offers. The validators read the same bounds. */
export const HOOTER_DURATIONS = {
  minSec: 5,
  maxSec: 600,
  presetsSec: [30, 60, 90, 120, 180, 300, 600],
} as const;

/** How long one send may wait on the providers. An Emergency goes out on the tightest clock. */
export const PROVIDER_BUDGET_MS = {
  EMERGENCY: 5_000,
  STANDARD: 15_000,
} as const;
export type SendBudget = keyof typeof PROVIDER_BUDGET_MS;
export const HOOTER_ACK_TIMEOUT_MS = 5_000;
export const OPERATIONAL_EMERGENCY_CHANNELS: readonly Channel[] = [
  "WHATSAPP",
  "SMS",
  "CALL",
  "IN_APP",
];
export const VIEWER_EMERGENCY_CHANNELS: readonly Channel[] = [
  "WHATSAPP",
  "SMS",
  "IN_APP",
];
export const IN_APP_ONLY: readonly Channel[] = ["IN_APP"];

export const SITE_ADMIN_GRANTS = ["PEOPLE", "FULL_SITE"] as const;
/**
 * Every admin grant. Each one opens a plant's Site Settings: Technical through the
 * routing key, People through the notifications key, Full-Site and Global through
 * both (constants/sitePermissions.ts). So all of them hear when a plant's defaults change.
 */
export const ADMIN_GRANTS = [
  "PEOPLE",
  "TECHNICAL",
  "FULL_SITE",
  "GLOBAL",
] as const;
export const VENDOR_COMPANY = "VENDOR";

export const TIMER_LEASE_MS = 60_000;
export const WORKER_STALE_AFTER_MS = 3 * MINUTE_MS;
export const SHUTDOWN_GRACE_MS = 12_000;
export const SEND_LEASE_MS = 60_000;

/**
 * The live stream. A comment every 25 s keeps load balancers and nginx from
 * closing a quiet connection (both default to 60 s idle). The limits keep one
 * process from being held open by a person with many tabs, by one landing link
 * forwarded round a group, or by more connections than it can serve.
 */
export const STREAM_HEARTBEAT_MS = 25_000;
export const STREAM_RETRY_MS = 5_000;
export const STREAM_MAX_AGE_MS = 30 * 60_000;
export const STREAM_MAX_AGE_JITTER_MS = 5 * 60_000;
export const STREAM_LIMITS = {
  perUser: 5,
  perIssue: 20,
  perProcess: 2_000,
} as const;
/** How long a publish or subscribe waits on Redis before it gives up. */
export const SIGNAL_BUS_TIMEOUT_MS = 2_000;
export const SCHEDULER = {
  batchSize: 100,
  minSleepMs: 250,
  maxSleepMs: 30_000,
  jitterMs: 500,
  auditEveryMs: 60_000,
  workerConcurrency: 8,
  maxTimerAttempts: 10,
} as const;
export const RELAY = {
  batchSize: 50,
  publishConcurrency: 8,
  idleSleepMs: 1_000,
  backoffBaseMs: 1_000,
  backoffMaxMs: 5 * MINUTE_MS,
  maxAttempts: 20,
} as const;
export const DISPATCH = {
  maxAttempts: 5,
  backoffBaseMs: 30_000,
  backoffMaxMs: 30 * MINUTE_MS,
  sendConcurrency: 8,
  sweepBatchSize: 200,
} as const;
export const DIGEST_SINGLETON_KEY = "digest:06:00";
export const SWEEP_SINGLETON_KEY = "sweep:main";
export const SWEEP_INTERVAL_MS = 60_000;
export const DIGEST_QUERY_LIMIT = 5_000;
export const USER_LOOKUP_CHUNK = 500;
export const FEED_PAGE_LIMIT = 100;
/** How far back the Site Settings failed-messages line looks. */
export const FAILURE_WINDOW_MS = 7 * DAY_MS;
/** Browsers one person may keep allowed; the oldest makes way. */
export const MAX_PUSH_DEVICES = 10;
/** Names the Emergency alarm lists as being rung right now. */
export const MAX_CALLING_NAMES = 5;
/** A WhatsApp or SMS link opens for 24 hours after the alert went out (PM §9.2). */
export const LANDING_LINK_TTL_MS = 24 * HOUR_MS;
/** The notification service's code for everything the engine sends. */
export const NOTIFICATION_CODE = "CTL";

export interface QuietWindow {
  readonly startMinute: number;
  readonly endMinute: number;
}

export type TimedStep = LadderStep;

export type SeverityModes = Readonly<Record<Severity, DeliveryMode>>;