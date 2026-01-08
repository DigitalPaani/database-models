"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// whatsapp
const DELIVERY_STATUS_ENUMS = ["NOT_AVAILABLE", "ACCEPTED", "SCHEDULED", "CANCELED", "QUEUED", "SENDING", "SENT", "FAILED", "DELIVERED", "UNDELIVERED", "RECEIVING", "READ"];
const CONTENT_TEMPLATE_IDS = {
    new_insight: {
        template_id: "HX5c8b1d03be029231c8eab79c3a3bcd5b",
    },
    account_pending_updates: {
        template_id: "HX2144bc651f8d97ea037f0de1af082d0a",
    },
    dashboard_report_ready: {
        template_id: "HXaf4bf2b9a2f22f06372da1f76d237eeb",
    },
    workflow_transition_message: {
        template_id: "HXd81b52f613d8312dff802950a1f741d8",
    },
    otp_verification: {
        template_id: "HX02d30db46d07078c202e07d9cbfefeea",
    },
    phone_number_verification_reminder: {
        template_id: "HX2ac44606e4ca458007fecb0841922645"
    },
    phone_number_verified_successfully: {
        template_id: "HX974f508d826b1474cd333e8bde2a9971"
    }
};
const PHONE_VERIFICATION_LAST_DATE = '2026-01-06T12:44:00Z';
exports.default = {
    DELIVERY_STATUS_ENUMS,
    CONTENT_TEMPLATE_IDS,
    PHONE_VERIFICATION_LAST_DATE
};
