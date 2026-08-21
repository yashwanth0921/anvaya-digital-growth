"use node";

import { action } from "../_generated/server";
import { google } from "googleapis";

export const testAuth = action({
  args: {},
  handler: async () => {
    const credentialsJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
    if (!credentialsJson) return { error: "No GOOGLE_SERVICE_ACCOUNT_JSON set" };
    try {
      const credentials = JSON.parse(credentialsJson);
      return { 
        hasKey: !!credentials.private_key, 
        email: credentials.client_email,
        project: credentials.project_id 
      };
    } catch (e: any) {
      return { parseError: e.message };
    }
  },
});
