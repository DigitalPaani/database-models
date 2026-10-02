export const ROLE_KEYS = [
  'L1_OPERATOR',
  'L2',
  'L3_LEAD',
  'L4_SENIOR_LEAD',
  'NON_OP',
  'REGULAR_NON_OP',
  'SENIOR_NON_OP',
] as const;
export type RoleKey = (typeof ROLE_KEYS)[number];