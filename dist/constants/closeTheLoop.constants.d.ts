import { RoleKey } from "./roles.constants";
export declare const SEVERITIES: readonly ["EMERGENCY", "MAJOR", "MINOR", "CAUTION"];
export type Severity = (typeof SEVERITIES)[number];
export declare const SEVERITY_RANK: {
    readonly CAUTION: 0;
    readonly MINOR: 1;
    readonly MAJOR: 2;
    readonly EMERGENCY: 3;
};
export declare const LADDER_STEPS: readonly ["OPENED", "NOT_STARTED", "OVERDUE", "OVERDUE_2X", "CHRONIC"];
export type LadderStep = (typeof LADDER_STEPS)[number];
export declare const STEP_RANK: {
    readonly OPENED: 0;
    readonly NOT_STARTED: 1;
    readonly OVERDUE: 2;
    readonly OVERDUE_2X: 3;
    readonly CHRONIC: 4;
};
/** WEB_PUSH rides along with IN_APP for people who allowed browser notifications (BE-28). */
export declare const CHANNELS: readonly ["WHATSAPP", "SMS", "CALL", "EMAIL", "HOOTER", "IN_APP", "WEB_PUSH"];
export type Channel = (typeof CHANNELS)[number];
export declare const REALTIME_CHANNELS: readonly ["WHATSAPP", "SMS"];
export type RealtimeChannel = (typeof REALTIME_CHANNELS)[number];
/** The languages the engine writes messages in; a site may offer any of them. */
export declare const LANGUAGES: readonly ["en", "hi"];
export type Language = (typeof LANGUAGES)[number];
/** Which way the reading on an alert is moving, when the trigger says. */
export declare const READING_TRENDS: readonly ["RISING", "FALLING", "STEADY"];
export type ReadingTrend = (typeof READING_TRENDS)[number];
/** What anyone without a language of their own, and any plant that offers none, is written to in. */
export declare const DEFAULT_LANGUAGE: Language;
/** Messages addressed to one person: a hand-off, an approval, a help request. */
export declare const NAMED_KINDS: readonly ["HANDED_TO_YOU", "TAKEN_OVER", "APPROVAL_WAITING", "APPROVAL_GRANTED", "APPROVAL_REFUSED", "REPORT_CLOSED", "ROSTER_CHANGED", "NEED_HELP", "NO_OPERATOR"];
export type NamedKind = (typeof NAMED_KINDS)[number];
/** Where a Start came from. A browser can claim the first two; the trigger's work-started is the third. */
export declare const START_SOURCES: readonly ["APP", "LANDING", "INTERNAL"];
export type StartSource = (typeof START_SOURCES)[number];
export declare const BROWSER_START_SOURCES: readonly ["APP", "LANDING"];
/** The platform permission working an Issue needs, at the Issue's plant. */
export declare const WORK_ISSUE_PERMISSION = "ops.issueSessions.create";
export declare const ALWAYS_REACHES: readonly ["HANDED_TO_YOU", "APPROVAL_DECIDED", "APPROVALS_WAITING", "HELP_REQUESTS", "EMERGENCY", "EMERGENCY_UNLESS_TURNED_DOWN"];
export type AlwaysReach = (typeof ALWAYS_REACHES)[number];
export declare const DELIVERY_MODES: readonly ["NOW", "DIGEST", "OFF"];
export type DeliveryMode = (typeof DELIVERY_MODES)[number];
export declare const MODE_RANK: {
    readonly OFF: 0;
    readonly DIGEST: 1;
    readonly NOW: 2;
};
/** What a morning-email line is about. The digest schema enforces this same list. */
export declare const DIGEST_ITEM_KINDS: readonly ["ISSUE_STEP", "CHRONIC", "ALERTED", "HELD", "COVERAGE_DROP", "HOOTER_WATCHDOG"];
export type DigestItemKind = (typeof DIGEST_ITEM_KINDS)[number];
/** Why a person was sent a message. The attempt schema enforces this same list, so the two cannot drift. */
export declare const ROUTE_REASONS: readonly ["LADDER", "EMERGENCY", "NO_SENIOR_LEAD_FALLBACK", "SITE_ADMIN", "DENSITY", "NAMED", "NAMED_LEAD_COPY", "ROUTING_GAP", "HANDOFF_STALLED", "WATCHDOG", "COVERAGE_DROP"];
export type RouteReason = (typeof ROUTE_REASONS)[number];
/** Why a plant's alerts might reach nobody. The first two are roster facts and block saving the roster;
 *  the last two are the people's own settings, which are allowed and only warn. */
export declare const COVERAGE_GAPS: readonly ["NO_OPERATOR_WITH_VERIFIED_PHONE", "NO_LEAD_WITH_VERIFIED_PHONE", "NO_OPERATOR_HEARS_MAJOR", "NO_LEAD_HEARS_MAJOR"];
export type CoverageGap = (typeof COVERAGE_GAPS)[number];
export declare const ROSTER_GAPS: ReadonlySet<CoverageGap>;
export declare const ROLE_GROUPS: readonly ["OPERATOR", "LEAD", "SENIOR_LEAD", "REGULAR_NON_OP", "SENIOR_NON_OP"];
export type RoleGroup = (typeof ROLE_GROUPS)[number];
export declare const ROLE_GROUP_BY_ROLE: Readonly<Record<RoleKey, RoleGroup>>;
export declare const OPERATIONAL_GROUPS: ReadonlySet<RoleGroup>;
/** The lines the Site Settings routing table lists people on, in the order it reads them. */
export declare const ROUTING_BUCKETS: readonly ["OPERATOR", "LEAD", "SENIOR_LEAD", "CLIENT", "SITE_ADMIN"];
export type RoutingBucket = (typeof ROUTING_BUCKETS)[number];
export declare const MINUTE_MS = 60000;
export declare const HOUR_MS: number;
export declare const DAY_MS: number;
/** How far ahead of our clock an open may be and still count as now: clock skew, not a scheduled start. */
export declare const OPENED_AT_SKEW_MS: number;
export interface SeverityClock {
    readonly respondMs: number;
    readonly finishMs: number;
}
export declare const SEVERITY_CLOCKS: Readonly<Record<Severity, SeverityClock | null>>;
export declare const CHRONIC_AFTER_MS: number;
export declare const CHRONIC_DEADLINE_MULTIPLIER = 3;
export declare const OVERDUE_2X_MULTIPLIER = 2;
/**
 * Too many hand-offs: an issue passed from person to person while still nobody
 * has pressed Start. The Leads hear about it on the second hand-off inside four
 * hours, and only while the issue is unstarted — a hand-off after work began is
 * ordinary delegation, not a stall.
 */
export declare const HANDOFF_WINDOW_MS: number;
export declare const HANDOFF_ALARM_AFTER = 2;
export declare const DEDUP_WINDOW_MS: number;
export declare const IST_OFFSET_MS: number;
export declare const DEFAULT_QUIET_HOURS: {
    readonly startMinute: number;
    readonly endMinute: number;
};
export declare const DIGEST_TIME_IST: {
    readonly hour: 6;
    readonly minute: 0;
};
/** A site's hooter length until its admin picks one. */
export declare const HOOTER_DEFAULT_DURATION_SEC = 60;
/** The hooter lengths a site may pick, and the presets the screen offers. The validators read the same bounds. */
export declare const HOOTER_DURATIONS: {
    readonly minSec: 5;
    readonly maxSec: 600;
    readonly presetsSec: readonly [30, 60, 90, 120, 180, 300, 600];
};
/** How long one send may wait on the providers. An Emergency goes out on the tightest clock. */
export declare const PROVIDER_BUDGET_MS: {
    readonly EMERGENCY: 5000;
    readonly STANDARD: 15000;
};
export type SendBudget = keyof typeof PROVIDER_BUDGET_MS;
export declare const HOOTER_ACK_TIMEOUT_MS = 5000;
export declare const OPERATIONAL_EMERGENCY_CHANNELS: readonly Channel[];
export declare const VIEWER_EMERGENCY_CHANNELS: readonly Channel[];
export declare const IN_APP_ONLY: readonly Channel[];
export declare const SITE_ADMIN_GRANTS: readonly ["PEOPLE", "FULL_SITE"];
/**
 * Every admin grant. Each one opens a plant's Site Settings: Technical through the
 * routing key, People through the notifications key, Full-Site and Global through
 * both (constants/sitePermissions.ts). So all of them hear when a plant's defaults change.
 */
export declare const ADMIN_GRANTS: readonly ["PEOPLE", "TECHNICAL", "FULL_SITE", "GLOBAL"];
export declare const VENDOR_COMPANY = "VENDOR";
export declare const TIMER_LEASE_MS = 60000;
export declare const WORKER_STALE_AFTER_MS: number;
export declare const SHUTDOWN_GRACE_MS = 12000;
export declare const SEND_LEASE_MS = 60000;
/**
 * The live stream. A comment every 25 s keeps load balancers and nginx from
 * closing a quiet connection (both default to 60 s idle). The limits keep one
 * process from being held open by a person with many tabs, by one landing link
 * forwarded round a group, or by more connections than it can serve.
 */
export declare const STREAM_HEARTBEAT_MS = 25000;
export declare const STREAM_RETRY_MS = 5000;
export declare const STREAM_MAX_AGE_MS: number;
export declare const STREAM_MAX_AGE_JITTER_MS: number;
export declare const STREAM_LIMITS: {
    readonly perUser: 5;
    readonly perIssue: 20;
    readonly perProcess: 2000;
};
/** How long a publish or subscribe waits on Redis before it gives up. */
export declare const SIGNAL_BUS_TIMEOUT_MS = 2000;
export declare const SCHEDULER: {
    readonly batchSize: 100;
    readonly minSleepMs: 250;
    readonly maxSleepMs: 30000;
    readonly jitterMs: 500;
    readonly auditEveryMs: 60000;
    readonly workerConcurrency: 8;
    readonly maxTimerAttempts: 10;
};
export declare const RELAY: {
    readonly batchSize: 50;
    readonly publishConcurrency: 8;
    readonly idleSleepMs: 1000;
    readonly backoffBaseMs: 1000;
    readonly backoffMaxMs: number;
    readonly maxAttempts: 20;
};
export declare const DISPATCH: {
    readonly maxAttempts: 5;
    readonly backoffBaseMs: 30000;
    readonly backoffMaxMs: number;
    readonly sendConcurrency: 8;
    readonly sweepBatchSize: 200;
};
export declare const DIGEST_SINGLETON_KEY = "digest:06:00";
export declare const SWEEP_SINGLETON_KEY = "sweep:main";
export declare const SWEEP_INTERVAL_MS = 60000;
export declare const DIGEST_QUERY_LIMIT = 5000;
export declare const USER_LOOKUP_CHUNK = 500;
export declare const FEED_PAGE_LIMIT = 100;
/** How far back the Site Settings failed-messages line looks. */
export declare const FAILURE_WINDOW_MS: number;
/** Browsers one person may keep allowed; the oldest makes way. */
export declare const MAX_PUSH_DEVICES = 10;
/** Names the Emergency alarm lists as being rung right now. */
export declare const MAX_CALLING_NAMES = 5;
/** A WhatsApp or SMS link opens for 24 hours after the alert went out (PM §9.2). */
export declare const LANDING_LINK_TTL_MS: number;
/** The notification service's code for everything the engine sends. */
export declare const NOTIFICATION_CODE = "CTL";
export interface QuietWindow {
    readonly startMinute: number;
    readonly endMinute: number;
}
export type TimedStep = LadderStep;
export type SeverityModes = Readonly<Record<Severity, DeliveryMode>>;
//# sourceMappingURL=closeTheLoop.constants.d.ts.map