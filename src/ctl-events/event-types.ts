// ─── Event Classification ─────────────────────────────────────────────────────

export enum EventFamily {
  A_ISSUE_LIFECYCLE = 'A',
  B_SESSION         = 'B',
  C_DIAGNOSTIC      = 'C',
  D_OUTCOME         = 'D',
  E_TIMERS          = 'E',
  F_NOTIFICATION    = 'F',
  G_GRC             = 'G',
  H_COMMAND         = 'H',
  I_EQUIPMENT       = 'I',
  J_MAINTENANCE     = 'J',
  K_SENSOR_QUALITY  = 'K',
  L_PROCESS         = 'L',
  M_INTELLIGENCE    = 'M',
  N_CONFIG          = 'N',
}

export enum EventKind {
  FACT             = 'E-A',  // something happened — immutable fact
  STATE_TRANSITION = 'E-B',  // tracked object crossed a state boundary
  INTERPRETATION   = 'E-C',  // system concluded something — carries confidence
}

// ─── Master Event Type Enum ────────────────────────────────────────────────────
// Source of truth for all event type strings across all 9 services.
// NEVER emit a string literal — always use this enum.

export enum CtlEventType {

  // ── Family A — Issue Lifecycle ───────────────────────────────────────────────
  // Mental model: spine of Close-The-Loop. State machine:
  // SCHEDULED → OPEN → IN_PROGRESS → WAITING →
  //   PENDING_VERIFICATION → PENDING_SUPERVISOR_APPROVAL → RESOLVED → CLOSED | HELD_OPEN
  // Parallel state: HELP_REQD

  ISSUE_CREATED                       = 'ISSUE_CREATED',
  ISSUE_OPENED                        = 'ISSUE_OPENED',
  ISSUE_ASSIGNED                      = 'ISSUE_ASSIGNED',
  ISSUE_RESOLVED                      = 'ISSUE_RESOLVED',
  ISSUE_CLOSED                        = 'ISSUE_CLOSED',
  ISSUE_REOPENED                      = 'ISSUE_REOPENED',
  AUTO_RECOVERY_CLOSE                 = 'AUTO_RECOVERY_CLOSE',
  SUPERVISOR_FORCE_CLOSED_UNVERIFIED  = 'SUPERVISOR_FORCE_CLOSED_UNVERIFIED',
  LINKED_ISSUE_CREATED                = 'LINKED_ISSUE_CREATED',
  SEVERITY_PROMOTED                   = 'SEVERITY_PROMOTED',
  SEVERITY_PROMOTED_ACKNOWLEDGED      = 'SEVERITY_PROMOTED_ACKNOWLEDGED',
  ISSUE_RESOLUTION_OVERDUE            = 'ISSUE_RESOLUTION_OVERDUE',  // E-C: SLA breached
  HELP_REQUESTED                      = 'HELP_REQUESTED',
  HELP_REQD_CLEARED                   = 'HELP_REQD_CLEARED',

  // ── Family B — Session & Presence ────────────────────────────────────────────
  // Mental model: who is working, can we replay their context.

  SESSION_STARTED                          = 'SESSION_STARTED',
  SESSION_ATTEMPT_STARTED                  = 'SESSION_ATTEMPT_STARTED',
  SESSION_RESUMED                          = 'SESSION_RESUMED',
  SESSION_RESOLUTION_SNAPSHOT_CREATED      = 'SESSION_RESOLUTION_SNAPSHOT_CREATED',
  SESSION_HEARTBEAT                        = 'SESSION_HEARTBEAT',
  SESSION_IDLE                             = 'SESSION_IDLE',              // E-C
  SESSION_ABANDONED                        = 'SESSION_ABANDONED',
  SESSION_TAKEOVER                         = 'SESSION_TAKEOVER',

  // ── Family C — Diagnostic Steps ──────────────────────────────────────────────
  // Mental model: highest-volume operator events; feeds Step-Score, not Equipment History.

  STEP_SHOWN                          = 'STEP_SHOWN',
  STEP_COMPLETED                      = 'STEP_COMPLETED',
  STEP_AUTO_ADVANCED                  = 'STEP_AUTO_ADVANCED',
  STEP_SKIPPED                        = 'STEP_SKIPPED',
  STEP_CORRECTED                      = 'STEP_CORRECTED',
  STEP_SUPERSEDED                     = 'STEP_SUPERSEDED',
  STEP_SUPPRESSED                     = 'STEP_SUPPRESSED',
  STEP_CONFIRMED                      = 'STEP_CONFIRMED',
  BRANCH_TAKEN                        = 'BRANCH_TAKEN',
  NUMERIC_READING_SUBMITTED           = 'NUMERIC_READING_SUBMITTED',
  MULTI_SELECT_OPTION_SELECTED        = 'MULTI_SELECT_OPTION_SELECTED',
  INSTRUMENT_GAP_REPORTED             = 'INSTRUMENT_GAP_REPORTED',
  CLEARANCE_BLOCKED                   = 'CLEARANCE_BLOCKED',
  TREE_COMPLETED                      = 'TREE_COMPLETED',
  TREE_ABANDONED                      = 'TREE_ABANDONED',

  // ── Family D — Root Cause, Verification, Approval ────────────────────────────
  // Mental model: was the diagnosis right, did the fix hold, who signed off.

  OPERATOR_DECLARED_RESOLUTION        = 'OPERATOR_DECLARED_RESOLUTION',
  ROOT_CAUSE_SELECTED                 = 'ROOT_CAUSE_SELECTED',
  UNAUTHORED_ROOT_CAUSE_ENTERED       = 'UNAUTHORED_ROOT_CAUSE_ENTERED',
  ROOT_CAUSE_ACCURACY_RECORDED        = 'ROOT_CAUSE_ACCURACY_RECORDED',  // E-C
  FALSE_ALARM_REPORTED                = 'FALSE_ALARM_REPORTED',          // E-C
  VERIFICATION_SUBMITTED              = 'VERIFICATION_SUBMITTED',
  VERIFICATION_PASSED                 = 'VERIFICATION_PASSED',
  VERIFICATION_FAILED                 = 'VERIFICATION_FAILED',
  REMEDIATION_APPROVAL_REQUESTED      = 'REMEDIATION_APPROVAL_REQUESTED',
  REMEDIATION_APPROVAL_APPROVED       = 'REMEDIATION_APPROVAL_APPROVED',
  REMEDIATION_APPROVAL_REJECTED       = 'REMEDIATION_APPROVAL_REJECTED',
  RESOLUTION_REJECTED                 = 'RESOLUTION_REJECTED',

  // ── Family E — Timers ─────────────────────────────────────────────────────────
  // Mental model: real dwell time; the clock never lies.
  // Rule: WAIT is non-skippable real dwell — never pauses when operator leaves.

  TIMER_STARTED                            = 'TIMER_STARTED',
  TIMER_COMPLETED                          = 'TIMER_COMPLETED',
  TIMER_EXTENDED                           = 'TIMER_EXTENDED',
  TIMER_SUPERSEDED                         = 'TIMER_SUPERSEDED',
  TIMER_SUPERSEDED_NOTIFICATION_OPENED     = 'TIMER_SUPERSEDED_NOTIFICATION_OPENED',

  // ── Family F — Notification & Escalation ──────────────────────────────────────
  // Mental model: delivery about events — its own lifecycle, never an issue-state change.
  // Rule: NOTIFICATION_ACKNOWLEDGED stops escalation timer but does NOT move issue state.

  NOTIFICATION_FIRED                  = 'NOTIFICATION_FIRED',
  NOTIFICATION_DEDUPED                = 'NOTIFICATION_DEDUPED',
  NOTIFICATION_PROMOTED               = 'NOTIFICATION_PROMOTED',
  NOTIFICATION_ACKNOWLEDGED           = 'NOTIFICATION_ACKNOWLEDGED',
  NOTIFICATION_ROUTED                 = 'NOTIFICATION_ROUTED',
  NOTIFICATION_ESCALATED              = 'NOTIFICATION_ESCALATED',
  NOTIFICATION_HOOTER_FIRED           = 'NOTIFICATION_HOOTER_FIRED',
  NOTIFICATION_HOOTER_SILENCED        = 'NOTIFICATION_HOOTER_SILENCED',
  NOTIFICATION_DISMISSED              = 'NOTIFICATION_DISMISSED',
  NOTIFICATION_BATCH_DISMISSED        = 'NOTIFICATION_BATCH_DISMISSED',
  NOTIFICATION_SIREN_MUTED            = 'NOTIFICATION_SIREN_MUTED',
  OPERATOR_QUIET_MUTE_REQUESTED       = 'OPERATOR_QUIET_MUTE_REQUESTED',
  SUPERVISOR_CALL_INITIATED           = 'SUPERVISOR_CALL_INITIATED',
  EMERGENCY_TRIGGERED                 = 'EMERGENCY_TRIGGERED',
  ESCALATION_CHAIN_CONFIGURED         = 'ESCALATION_CHAIN_CONFIGURED',
  ESCALATION_GAP_DETECTED             = 'ESCALATION_GAP_DETECTED',       // E-C
  NOTIFICATION_ROUTING_CONFIGURED     = 'NOTIFICATION_ROUTING_CONFIGURED',
  NOTIFICATION_ROUTING_GAP_DETECTED   = 'NOTIFICATION_ROUTING_GAP_DETECTED', // E-C

  // ── Family G — GRC / Group Remote Control ────────────────────────────────────
  // Mental model: who holds the lease on the physical plant.
  // State machine: idle → confirm → active → return
  // Rule: Emergency Override is the ONLY way a second operator enters an active session.

  GRC_PENDING_ENTERED                 = 'GRC_PENDING_ENTERED',
  GRC_REMOTE_ACTIVATED                = 'GRC_REMOTE_ACTIVATED',
  GRC_RETURN_TO_AUTO                  = 'GRC_RETURN_TO_AUTO',
  GRC_AUTO_EXTENDED                   = 'GRC_AUTO_EXTENDED',
  GRC_SETPOINT_APPLIED                = 'GRC_SETPOINT_APPLIED',
  GRC_MODE_OVERRIDDEN_TO_REMOTE       = 'GRC_MODE_OVERRIDDEN_TO_REMOTE',
  GRC_SAFETY_OVERRIDE_BLOCKED         = 'GRC_SAFETY_OVERRIDE_BLOCKED',   // E-C
  GRC_REMOTE_LOCK_ACTIVE              = 'GRC_REMOTE_LOCK_ACTIVE',
  GRC_REMOTE_TRANSFER_REQUESTED       = 'GRC_REMOTE_TRANSFER_REQUESTED',
  GRC_REMOTE_TRANSFER_APPROVED        = 'GRC_REMOTE_TRANSFER_APPROVED',
  GRC_REMOTE_TRANSFER_REJECTED        = 'GRC_REMOTE_TRANSFER_REJECTED',
  GRC_REMOTE_SESSION_RELEASED         = 'GRC_REMOTE_SESSION_RELEASED',
  GRC_REMOTE_SESSION_EXPIRED          = 'GRC_REMOTE_SESSION_EXPIRED',
  GRC_REMOTE_AUTO_RETURNED            = 'GRC_REMOTE_AUTO_RETURNED',
  GRC_EMERGENCY_OVERRIDE_REQUESTED    = 'GRC_EMERGENCY_OVERRIDE_REQUESTED',
  GRC_EMERGENCY_OVERRIDE_APPROVED     = 'GRC_EMERGENCY_OVERRIDE_APPROVED',
  GRC_EMERGENCY_OVERRIDE_DENIED       = 'GRC_EMERGENCY_OVERRIDE_DENIED',

  // ── Family H — Command & Actuation ────────────────────────────────────────────
  // Mental model: intent to change the physical world; PLC is final authority.
  // Unified contract (D5/X8): 3-state ack, sequenceNumber, ACCEPTED ≤3s, EXECUTED ≤10s.

  CONTROL_COMMAND_REQUESTED           = 'CONTROL_COMMAND_REQUESTED',
  CONTROL_COMMAND_ACCEPTED            = 'CONTROL_COMMAND_ACCEPTED',
  CONTROL_COMMAND_BLOCKED             = 'CONTROL_COMMAND_BLOCKED',
  CONTROL_COMMAND_DISPATCHED          = 'CONTROL_COMMAND_DISPATCHED',
  CONTROL_COMMAND_EXECUTED            = 'CONTROL_COMMAND_EXECUTED',
  CONTROL_COMMAND_REJECTED_BY_PLC     = 'CONTROL_COMMAND_REJECTED_BY_PLC',
  CONTROL_COMMAND_TIMED_OUT           = 'CONTROL_COMMAND_TIMED_OUT',

  // ── Family I — Equipment State & Maintenance ──────────────────────────────────
  // Mental model: what the asset would tell you about itself.
  // Equipment History feeders — only this family + K + G + H appear in Equipment History.

  EQUIPMENT_STATE_CHANGED             = 'EQUIPMENT_STATE_CHANGED',
  EQUIPMENT_CONFIG_CHANGED            = 'EQUIPMENT_CONFIG_CHANGED',
  MAINTENANCE_MODE_SET                = 'MAINTENANCE_MODE_SET',
  MAINTENANCE_MODE_CLEARED            = 'MAINTENANCE_MODE_CLEARED',
  MANUAL_DOWNLOADED                   = 'MANUAL_DOWNLOADED',
  HELP_SERVICE_TEAM_CALLED            = 'HELP_SERVICE_TEAM_CALLED',
  HELP_COLLEAGUE_REQUESTED            = 'HELP_COLLEAGUE_REQUESTED',
  PHOTO_UPLOADED                      = 'PHOTO_UPLOADED',
  PHOTO_SKIPPED                       = 'PHOTO_SKIPPED',

  // ── Family J — Maintenance Lifecycle, Spares, Vendor (concept / P2+) ─────────

  MAINTENANCE_SCHEDULED               = 'MAINTENANCE_SCHEDULED',
  MAINTENANCE_STARTED                 = 'MAINTENANCE_STARTED',
  MAINTENANCE_COMPLETED               = 'MAINTENANCE_COMPLETED',
  MAINTENANCE_OVERDUE                 = 'MAINTENANCE_OVERDUE',           // E-C
  MAINTENANCE_CANCELLED               = 'MAINTENANCE_CANCELLED',
  EQUIPMENT_INSPECTED                 = 'EQUIPMENT_INSPECTED',
  EQUIPMENT_HEALTH_SCORE_CHANGED      = 'EQUIPMENT_HEALTH_SCORE_CHANGED',
  RUNTIME_MILESTONE_CROSSED           = 'RUNTIME_MILESTONE_CROSSED',
  SUBCOMPONENT_STATE_CHANGED          = 'SUBCOMPONENT_STATE_CHANGED',

  // ── Family K — Sensor & Data Quality ──────────────────────────────────────────
  // Mental model: can I believe this number? Trust in the truth layer.

  SENSOR_FAULT_OPENED                 = 'SENSOR_FAULT_OPENED',           // E-C
  SENSOR_FAULT_CLOSED                 = 'SENSOR_FAULT_CLOSED',
  DATA_BREAK_DETECTED                 = 'DATA_BREAK_DETECTED',           // E-C
  DATA_BREAK_RESOLVED                 = 'DATA_BREAK_RESOLVED',
  DATA_QUALITY_SCORE_LOW              = 'DATA_QUALITY_SCORE_LOW',        // E-C
  SENSOR_DRIFT_DETECTED               = 'SENSOR_DRIFT_DETECTED',         // E-C
  SENSOR_UNIT_CONFIG_CHANGED          = 'SENSOR_UNIT_CONFIG_CHANGED',
  SENSOR_REPLACED                     = 'SENSOR_REPLACED',
  DEPENDENCY_FAULT_INFERRED           = 'DEPENDENCY_FAULT_INFERRED',     // E-C; proposed

  // ── Family L — Process, Cycle, Biological (concept / P2+) ────────────────────

  PROCESS_PARAMETER_BREACH            = 'PROCESS_PARAMETER_BREACH',      // E-C
  PROCESS_PARAMETER_CLEARED           = 'PROCESS_PARAMETER_CLEARED',
  CHEMICAL_DOSING_EVENT               = 'CHEMICAL_DOSING_EVENT',
  CYCLE_PHASE_TRANSITION              = 'CYCLE_PHASE_TRANSITION',
  COMPLIANCE_BREACH_DETECTED          = 'COMPLIANCE_BREACH_DETECTED',    // E-C
  COMPLIANCE_BREACH_PREDICTED         = 'COMPLIANCE_BREACH_PREDICTED',   // E-C

  // ── Family M — Intelligence: Anomalies, Insights, Recommendations ────────────
  // Mental model: system's opinions. Every one carries confidence + basis (D8).
  // MANDATORY: intelligenceAnnotation.basis for every E-C event.

  ANOMALY_DETECTED                    = 'ANOMALY_DETECTED',              // E-C
  INSIGHT_GENERATED                   = 'INSIGHT_GENERATED',             // E-C
  ALERT_FIRED                         = 'ALERT_FIRED',
  ALERT_SUPPRESSED                    = 'ALERT_SUPPRESSED',
  PREDICTED_FAILURE                   = 'PREDICTED_FAILURE',             // E-C
  ROOT_CAUSE_ACCURACY_ANALYSIS        = 'ROOT_CAUSE_ACCURACY_ANALYSIS',  // E-C
  RECOMMENDATION_PENDING              = 'RECOMMENDATION_PENDING',
  RECOMMENDATION_APPROVED             = 'RECOMMENDATION_APPROVED',
  RECOMMENDATION_REJECTED             = 'RECOMMENDATION_REJECTED',

  // ── Family N — Config, Workforce, Twin ────────────────────────────────────────
  // Mental model: governance + everything a compliance auditor asks for.

  SME_DRAFT_AUTOSAVED                 = 'SME_DRAFT_AUTOSAVED',
  TREE_VERSION_DEPLOYED               = 'TREE_VERSION_DEPLOYED',
  TREE_DRAFT_CREATED_FROM_VERSION     = 'TREE_DRAFT_CREATED_FROM_VERSION',
  VOICE_PLAYBACK_STARTED              = 'VOICE_PLAYBACK_STARTED',
  VOICE_PLAYBACK_COMPLETED            = 'VOICE_PLAYBACK_COMPLETED',
  VOICE_INPUT_CAPTURED                = 'VOICE_INPUT_CAPTURED',
  CONFIG_CHANGED                      = 'CONFIG_CHANGED',
  SHIFT_HANDOVER_STARTED              = 'SHIFT_HANDOVER_STARTED',
  SHIFT_HANDOVER_ACKNOWLEDGED         = 'SHIFT_HANDOVER_ACKNOWLEDGED',
  USER_IMPERSONATION_STARTED          = 'USER_IMPERSONATION_STARTED',
  USER_IMPERSONATION_ENDED            = 'USER_IMPERSONATION_ENDED',
  BACKDATED_ENTRY_COSIGNED            = 'BACKDATED_ENTRY_COSIGNED',
}

// ─── Entity Type (resolves Q5: Tasks reuse Issue events) ─────────────────────

export type CtlEntityType = 'ISSUE' | 'TASK' | 'EQUIPMENT' | 'SESSION' | '';

// ─── Severity (locked in spec §5) ────────────────────────────────────────────
// Spec names: emergency | critical | high | low
// Display:    Emergency · Major · Minor · Caution

export type CtlSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO' | '';

// ─── Issue State Machine (spec §5) ────────────────────────────────────────────

export type IssueState =
  | 'SCHEDULED'
  | 'OPEN'
  | 'IN_PROGRESS'
  | 'WAITING'
  | 'PENDING_VERIFICATION'
  | 'PENDING_SUPERVISOR_APPROVAL'
  | 'RESOLVED'
  | 'HELD_OPEN'
  | 'CLOSED';

export type CtlEventStatus = 'ACTIVE' | 'IN_PROGRESS' | 'CLOSED' | '';

// ─── Control Command Kinds (D5 / spec §5) ─────────────────────────────────────

export type CommandKind =
  | 'APPLY_SETPOINT'
  | 'REQUEST_REMOTE'
  | 'START_EQUIPMENT'
  | 'STOP_EQUIPMENT'
  | 'OPEN_VALVE'
  | 'CLOSE_VALVE'
  | 'SET_VFD_HZ'
  | 'RETURN_TO_AUTO'
  | 'EMERGENCY_RETURN_TO_AUTO';

// ─── Skip Reason Codes (spec §5, immutable) ──────────────────────────────────

export type SkipReasonCode =
  | 'NO_INSTRUMENT'
  | 'NOT_APPLICABLE'
  | 'ALREADY_CHECKED'
  | 'SKILL_GAP'
  | 'SUPERVISOR_SKIPPED'
  | 'TIME_PRESSURE'
  | 'OTHER';
