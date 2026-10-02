"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WORKER_STALE_AFTER_MS = exports.TIMER_LEASE_MS = exports.VENDOR_COMPANY = exports.ADMIN_GRANTS = exports.SITE_ADMIN_GRANTS = exports.IN_APP_ONLY = exports.VIEWER_EMERGENCY_CHANNELS = exports.OPERATIONAL_EMERGENCY_CHANNELS = exports.HOOTER_ACK_TIMEOUT_MS = exports.PROVIDER_BUDGET_MS = exports.HOOTER_DURATIONS = exports.HOOTER_DEFAULT_DURATION_SEC = exports.DIGEST_TIME_IST = exports.DEFAULT_QUIET_HOURS = exports.IST_OFFSET_MS = exports.DEDUP_WINDOW_MS = exports.HANDOFF_ALARM_AFTER = exports.HANDOFF_WINDOW_MS = exports.OVERDUE_2X_MULTIPLIER = exports.CHRONIC_DEADLINE_MULTIPLIER = exports.CHRONIC_AFTER_MS = exports.SEVERITY_CLOCKS = exports.OPENED_AT_SKEW_MS = exports.DAY_MS = exports.HOUR_MS = exports.MINUTE_MS = exports.ROUTING_BUCKETS = exports.OPERATIONAL_GROUPS = exports.ROLE_GROUP_BY_ROLE = exports.ROLE_GROUPS = exports.ROSTER_GAPS = exports.COVERAGE_GAPS = exports.ROUTE_REASONS = exports.DIGEST_ITEM_KINDS = exports.MODE_RANK = exports.DELIVERY_MODES = exports.ALWAYS_REACHES = exports.WORK_ISSUE_PERMISSION = exports.BROWSER_START_SOURCES = exports.START_SOURCES = exports.NAMED_KINDS = exports.DEFAULT_LANGUAGE = exports.READING_TRENDS = exports.LANGUAGES = exports.REALTIME_CHANNELS = exports.CHANNELS = exports.STEP_RANK = exports.LADDER_STEPS = exports.SEVERITY_RANK = exports.SEVERITIES = void 0;
exports.NOTIFICATION_CODE = exports.LANDING_LINK_TTL_MS = exports.MAX_CALLING_NAMES = exports.MAX_PUSH_DEVICES = exports.FAILURE_WINDOW_MS = exports.FEED_PAGE_LIMIT = exports.USER_LOOKUP_CHUNK = exports.DIGEST_QUERY_LIMIT = exports.SWEEP_INTERVAL_MS = exports.SWEEP_SINGLETON_KEY = exports.DIGEST_SINGLETON_KEY = exports.DISPATCH = exports.RELAY = exports.SCHEDULER = exports.SIGNAL_BUS_TIMEOUT_MS = exports.STREAM_LIMITS = exports.STREAM_MAX_AGE_JITTER_MS = exports.STREAM_MAX_AGE_MS = exports.STREAM_RETRY_MS = exports.STREAM_HEARTBEAT_MS = exports.SEND_LEASE_MS = exports.SHUTDOWN_GRACE_MS = void 0;
exports.SEVERITIES = ["EMERGENCY", "MAJOR", "MINOR", "CAUTION"];
exports.SEVERITY_RANK = {
    CAUTION: 0,
    MINOR: 1,
    MAJOR: 2,
    EMERGENCY: 3,
};
exports.LADDER_STEPS = [
    "OPENED",
    "NOT_STARTED",
    "OVERDUE",
    "OVERDUE_2X",
    "CHRONIC",
];
exports.STEP_RANK = {
    OPENED: 0,
    NOT_STARTED: 1,
    OVERDUE: 2,
    OVERDUE_2X: 3,
    CHRONIC: 4,
};
/** WEB_PUSH rides along with IN_APP for people who allowed browser notifications (BE-28). */
exports.CHANNELS = [
    "WHATSAPP",
    "SMS",
    "CALL",
    "EMAIL",
    "HOOTER",
    "IN_APP",
    "WEB_PUSH",
];
exports.REALTIME_CHANNELS = ["WHATSAPP", "SMS"];
/** The languages the engine writes messages in; a site may offer any of them. */
exports.LANGUAGES = ["en", "hi"];
/** Which way the reading on an alert is moving, when the trigger says. */
exports.READING_TRENDS = ["RISING", "FALLING", "STEADY"];
/** What anyone without a language of their own, and any plant that offers none, is written to in. */
exports.DEFAULT_LANGUAGE = "en";
/** Messages addressed to one person: a hand-off, an approval, a help request. */
exports.NAMED_KINDS = [
    "HANDED_TO_YOU",
    "TAKEN_OVER",
    "APPROVAL_WAITING",
    "APPROVAL_GRANTED",
    "APPROVAL_REFUSED",
    "REPORT_CLOSED",
    "ROSTER_CHANGED",
    "NEED_HELP",
    "NO_OPERATOR",
];
/** Where a Start came from. A browser can claim the first two; the trigger's work-started is the third. */
exports.START_SOURCES = ["APP", "LANDING", "INTERNAL"];
exports.BROWSER_START_SOURCES = [
    "APP",
    "LANDING",
];
/** The platform permission working an Issue needs, at the Issue's plant. */
exports.WORK_ISSUE_PERMISSION = "ops.issueSessions.create";
exports.ALWAYS_REACHES = [
    "HANDED_TO_YOU",
    "APPROVAL_DECIDED",
    "APPROVALS_WAITING",
    "HELP_REQUESTS",
    "EMERGENCY",
    "EMERGENCY_UNLESS_TURNED_DOWN",
];
exports.DELIVERY_MODES = ["NOW", "DIGEST", "OFF"];
exports.MODE_RANK = {
    OFF: 0,
    DIGEST: 1,
    NOW: 2,
};
/** What a morning-email line is about. The digest schema enforces this same list. */
exports.DIGEST_ITEM_KINDS = [
    "ISSUE_STEP",
    "CHRONIC",
    "ALERTED",
    "HELD",
    "COVERAGE_DROP",
    "HOOTER_WATCHDOG",
];
/** Why a person was sent a message. The attempt schema enforces this same list, so the two cannot drift. */
exports.ROUTE_REASONS = [
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
];
/** Why a plant's alerts might reach nobody. The first two are roster facts and block saving the roster;
 *  the last two are the people's own settings, which are allowed and only warn. */
exports.COVERAGE_GAPS = [
    "NO_OPERATOR_WITH_VERIFIED_PHONE",
    "NO_LEAD_WITH_VERIFIED_PHONE",
    "NO_OPERATOR_HEARS_MAJOR",
    "NO_LEAD_HEARS_MAJOR",
];
exports.ROSTER_GAPS = new Set([
    "NO_OPERATOR_WITH_VERIFIED_PHONE",
    "NO_LEAD_WITH_VERIFIED_PHONE",
]);
exports.ROLE_GROUPS = [
    "OPERATOR",
    "LEAD",
    "SENIOR_LEAD",
    "REGULAR_NON_OP",
    "SENIOR_NON_OP",
];
exports.ROLE_GROUP_BY_ROLE = {
    L1_OPERATOR: "OPERATOR",
    L2: "OPERATOR",
    L3_LEAD: "LEAD",
    L4_SENIOR_LEAD: "SENIOR_LEAD",
    NON_OP: "REGULAR_NON_OP",
    REGULAR_NON_OP: "REGULAR_NON_OP",
    SENIOR_NON_OP: "SENIOR_NON_OP",
};
exports.OPERATIONAL_GROUPS = new Set([
    "OPERATOR",
    "LEAD",
    "SENIOR_LEAD",
]);
/** The lines the Site Settings routing table lists people on, in the order it reads them. */
exports.ROUTING_BUCKETS = [
    "OPERATOR",
    "LEAD",
    "SENIOR_LEAD",
    "CLIENT",
    "SITE_ADMIN",
];
exports.MINUTE_MS = 60_000;
exports.HOUR_MS = 60 * exports.MINUTE_MS;
exports.DAY_MS = 24 * exports.HOUR_MS;
/** How far ahead of our clock an open may be and still count as now: clock skew, not a scheduled start. */
exports.OPENED_AT_SKEW_MS = 2 * exports.MINUTE_MS;
exports.SEVERITY_CLOCKS = {
    EMERGENCY: { respondMs: 1 * exports.HOUR_MS, finishMs: 4 * exports.HOUR_MS },
    MAJOR: { respondMs: 8 * exports.HOUR_MS, finishMs: 24 * exports.HOUR_MS },
    MINOR: { respondMs: 24 * exports.HOUR_MS, finishMs: 72 * exports.HOUR_MS },
    CAUTION: null,
};
exports.CHRONIC_AFTER_MS = 7 * exports.DAY_MS;
exports.CHRONIC_DEADLINE_MULTIPLIER = 3;
exports.OVERDUE_2X_MULTIPLIER = 2;
/**
 * Too many hand-offs: an issue passed from person to person while still nobody
 * has pressed Start. The Leads hear about it on the second hand-off inside four
 * hours, and only while the issue is unstarted — a hand-off after work began is
 * ordinary delegation, not a stall.
 */
exports.HANDOFF_WINDOW_MS = 4 * exports.HOUR_MS;
exports.HANDOFF_ALARM_AFTER = 2;
exports.DEDUP_WINDOW_MS = 5 * exports.MINUTE_MS;
exports.IST_OFFSET_MS = 330 * exports.MINUTE_MS;
exports.DEFAULT_QUIET_HOURS = {
    startMinute: 22 * 60,
    endMinute: 6 * 60,
};
exports.DIGEST_TIME_IST = { hour: 6, minute: 0 };
/** A site's hooter length until its admin picks one. */
exports.HOOTER_DEFAULT_DURATION_SEC = 60;
/** The hooter lengths a site may pick, and the presets the screen offers. The validators read the same bounds. */
exports.HOOTER_DURATIONS = {
    minSec: 5,
    maxSec: 600,
    presetsSec: [30, 60, 90, 120, 180, 300, 600],
};
/** How long one send may wait on the providers. An Emergency goes out on the tightest clock. */
exports.PROVIDER_BUDGET_MS = {
    EMERGENCY: 5_000,
    STANDARD: 15_000,
};
exports.HOOTER_ACK_TIMEOUT_MS = 5_000;
exports.OPERATIONAL_EMERGENCY_CHANNELS = [
    "WHATSAPP",
    "SMS",
    "CALL",
    "IN_APP",
];
exports.VIEWER_EMERGENCY_CHANNELS = [
    "WHATSAPP",
    "SMS",
    "IN_APP",
];
exports.IN_APP_ONLY = ["IN_APP"];
exports.SITE_ADMIN_GRANTS = ["PEOPLE", "FULL_SITE"];
/**
 * Every admin grant. Each one opens a plant's Site Settings: Technical through the
 * routing key, People through the notifications key, Full-Site and Global through
 * both (constants/sitePermissions.ts). So all of them hear when a plant's defaults change.
 */
exports.ADMIN_GRANTS = [
    "PEOPLE",
    "TECHNICAL",
    "FULL_SITE",
    "GLOBAL",
];
exports.VENDOR_COMPANY = "VENDOR";
exports.TIMER_LEASE_MS = 60_000;
exports.WORKER_STALE_AFTER_MS = 3 * exports.MINUTE_MS;
exports.SHUTDOWN_GRACE_MS = 12_000;
exports.SEND_LEASE_MS = 60_000;
/**
 * The live stream. A comment every 25 s keeps load balancers and nginx from
 * closing a quiet connection (both default to 60 s idle). The limits keep one
 * process from being held open by a person with many tabs, by one landing link
 * forwarded round a group, or by more connections than it can serve.
 */
exports.STREAM_HEARTBEAT_MS = 25_000;
exports.STREAM_RETRY_MS = 5_000;
exports.STREAM_MAX_AGE_MS = 30 * 60_000;
exports.STREAM_MAX_AGE_JITTER_MS = 5 * 60_000;
exports.STREAM_LIMITS = {
    perUser: 5,
    perIssue: 20,
    perProcess: 2_000,
};
/** How long a publish or subscribe waits on Redis before it gives up. */
exports.SIGNAL_BUS_TIMEOUT_MS = 2_000;
exports.SCHEDULER = {
    batchSize: 100,
    minSleepMs: 250,
    maxSleepMs: 30_000,
    jitterMs: 500,
    auditEveryMs: 60_000,
    workerConcurrency: 8,
    maxTimerAttempts: 10,
};
exports.RELAY = {
    batchSize: 50,
    publishConcurrency: 8,
    idleSleepMs: 1_000,
    backoffBaseMs: 1_000,
    backoffMaxMs: 5 * exports.MINUTE_MS,
    maxAttempts: 20,
};
exports.DISPATCH = {
    maxAttempts: 5,
    backoffBaseMs: 30_000,
    backoffMaxMs: 30 * exports.MINUTE_MS,
    sendConcurrency: 8,
    sweepBatchSize: 200,
};
exports.DIGEST_SINGLETON_KEY = "digest:06:00";
exports.SWEEP_SINGLETON_KEY = "sweep:main";
exports.SWEEP_INTERVAL_MS = 60_000;
exports.DIGEST_QUERY_LIMIT = 5_000;
exports.USER_LOOKUP_CHUNK = 500;
exports.FEED_PAGE_LIMIT = 100;
/** How far back the Site Settings failed-messages line looks. */
exports.FAILURE_WINDOW_MS = 7 * exports.DAY_MS;
/** Browsers one person may keep allowed; the oldest makes way. */
exports.MAX_PUSH_DEVICES = 10;
/** Names the Emergency alarm lists as being rung right now. */
exports.MAX_CALLING_NAMES = 5;
/** A WhatsApp or SMS link opens for 24 hours after the alert went out (PM §9.2). */
exports.LANDING_LINK_TTL_MS = 24 * exports.HOUR_MS;
/** The notification service's code for everything the engine sends. */
exports.NOTIFICATION_CODE = "CTL";
