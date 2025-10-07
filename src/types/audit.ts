export type LogDetail =
  | {
      type: "field_change";
      field: string;
      previousValue?: string;
      newValue?: string;
      message?: string;
    }
  | {
      type: "resource_event";
      resource: string;
      resourceId?: string | number;
      message?: string;
    }
  | {
      type: "action";
      actionName: string;
      message?: string;
    }
  | Record<string, any>;

export type AuditLog = {
  id: string;
  timestamp: string;
  userId?: string;
  username?: string;
  action: string;
  detail?: LogDetail;
};
