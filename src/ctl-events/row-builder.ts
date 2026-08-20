import { randomUUID } from 'crypto';
import type {
  CtlEventType,
  CtlEntityType,
  CtlSeverity,
  CtlEventStatus,
  EventFamily,
} from './event-types';

// ─── Shared types ─────────────────────────────────────────────────────────────
// These are imported by every service's thin ctl-events.dal.ts

export type CtlEventKindValue = 'E-A' | 'E-B' | 'E-C';

export type InsertCtlEventInput = {
  type:                    CtlEventType | string;
  kind:                    CtlEventKindValue;
  family:                  EventFamily | string;
  occurredAt:              Date;
  source:                  string;
  entityType?:             CtlEntityType;
  workspaceId?:            string;
  plantId?:                string;
  issueId?:                string;
  equipmentId?:            string;
  operatorId?:             string;
  supervisorId?:           string;
  sessionId?:              string;
  grcGroupId?:             string;
  correlationId?:          string;
  assetId?:                string;
  payload:                 Record<string, unknown>;
  confidence?:             number;
  intelligenceAnnotation?: string;
  severity?:               CtlSeverity;
  efStatus?:               CtlEventStatus;
  parentEventId?:          string;
  acknowledgedAt?:         Date;
};

export type CtlEventRow = {
  event_id:                string;
  type:                    string;
  kind:                    CtlEventKindValue;
  family:                  string;
  entity_type:             string;
  occurred_at:             number;
  created_at:              number;
  source:                  string;
  workspace_id:            string;
  plant_id:                string;
  issue_id:                string;
  equipment_id:            string;
  operator_id:             string;
  supervisor_id:           string;
  session_id:              string;
  grc_group_id:            string;
  correlation_id:          string;
  asset_id:                string;
  payload:                 string;
  confidence:              number | null;
  intelligence_annotation: string;
  severity:                string;
  ef_status:               string;
  parent_event_id:         string;
  acknowledged_at:         number | null;
};

// ─── Validation ───────────────────────────────────────────────────────────────

export function validateCtlEvent(input: InsertCtlEventInput): string | null {
  if (!input.type)   return 'type is required';
  if (!input.kind)   return 'kind is required';
  if (!input.family) return 'family is required';
  if (!input.source) return 'source is required';
  if (input.kind === 'E-C' && input.confidence == null)
    return `E-C event "${input.type}" requires confidence (0-100) — D8`;
  if (input.kind === 'E-C' && !input.intelligenceAnnotation)
    return `E-C event "${input.type}" requires intelligenceAnnotation (basis) — D8`;
  if (input.confidence != null && (input.confidence < 0 || input.confidence > 100))
    return 'confidence must be 0–100';
  return null;
}

// ─── Row builder ──────────────────────────────────────────────────────────────
// Pure function — no side effects. Used by every service's ctl-events.dal.ts.

export function buildCtlEventRow(input: InsertCtlEventInput): CtlEventRow {
  const now = Date.now();
  return {
    event_id:                randomUUID(),
    type:                    input.type,
    kind:                    input.kind,
    family:                  input.family,
    entity_type:             input.entityType      ?? '',
    occurred_at:             input.occurredAt.getTime(),
    created_at:              now,
    source:                  input.source,
    workspace_id:            input.workspaceId     ?? '',
    plant_id:                input.plantId         ?? '',
    issue_id:                input.issueId         ?? '',
    equipment_id:            input.equipmentId     ?? '',
    operator_id:             input.operatorId      ?? '',
    supervisor_id:           input.supervisorId    ?? '',
    session_id:              input.sessionId       ?? '',
    grc_group_id:            input.grcGroupId      ?? '',
    correlation_id:          input.correlationId   ?? '',
    asset_id:                input.assetId         ?? '',
    payload:                 JSON.stringify(input.payload),
    confidence:              input.confidence      ?? null,
    intelligence_annotation: input.intelligenceAnnotation ?? '',
    severity:                input.severity        ?? '',
    ef_status:               input.efStatus        ?? '',
    parent_event_id:         input.parentEventId   ?? '',
    acknowledged_at:         input.acknowledgedAt  ? input.acknowledgedAt.getTime() : null,
  };
}
