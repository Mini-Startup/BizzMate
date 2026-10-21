"use server";

import { ContactSchema } from "@/validations/contact";

/**
 * Server Action for handling consultation and project inquiry submissions.
 * Validates external user input on the server using Zod and returns typed action results.
 *
 * @param {Object} _prevState Previous action state
 * @param {FormData|Object} payload Form data or direct payload
 * @returns {Promise<{ ok: boolean, data?: Object, error?: string, fieldErrors?: Record<string, string[]> }>}
 */
export async function submitContactInquiryAction(_prevState, payload) {
  try {
    const rawData =
      payload instanceof FormData
        ? Object.fromEntries(payload.entries())
        : payload || {};

    const parsed = ContactSchema.safeParse(rawData);

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      return {
        ok: false,
        error: "Please correct the highlighted fields.",
        fieldErrors,
      };
    }

    const { name, email, industry, message } = parsed.data;

    // Simulate inquiry ingestion / persistence (ready for DB / email service integration)
    const inquiryRecord = {
      id: `inq_${Date.now()}`,
      name,
      email,
      industry: industry || "General Inquiry",
      message: message || "No message provided",
      receivedAt: new Date().toISOString(),
    };

    return {
      ok: true,
      data: {
        id: inquiryRecord.id,
        name: inquiryRecord.name,
      },
    };
  } catch (err) {
    return {
      ok: false,
      error: "An unexpected error occurred while processing your request. Please try again.",
    };
  }
}
