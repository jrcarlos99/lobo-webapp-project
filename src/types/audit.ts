export type FieldChangeDetail = {
  type: "field_change";
  field: string;
  previousValue?: string | null;
  newValue?: string | null;
  message?: string;
  meta?: Record<string, unknown>;
};

export type ResourceEventDetail = {
  type: "resource_event";
  resource: string;
  resourceId?: string | number;
  message?: string;
  meta?: Record<string, unknown>;
};

export type ActionDetail = {
  type: "action";
  actionName: string;
  message?: string;
  meta?: Record<string, unknown>;
};

export type UnknownDetail = {
  type: "unknown";
  message?: string;
  meta?: Record<string, unknown>;
  [key: string]: unknown;
};

export type LogDetail =
  | FieldChangeDetail
  | ResourceEventDetail
  | ActionDetail
  | UnknownDetail;

export type AuditLog = {
  id: string;
  timestamp: string;
  userId?: string;
  username?: string;
  action: string;
  detail?: LogDetail;
};
