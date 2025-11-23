/**
 * Andamio DB API Client
 *
 * Provides typed methods to interact with the Andamio Database API
 * for fetching and updating lessons.
 */

import { z } from "zod";

// =============================================================================
// Configuration
// =============================================================================

function getConfig() {
  const apiUrl = process.env.ANDAMIO_API_URL || "http://localhost:4000/api/v0";
  const jwtToken = process.env.ANDAMIO_JWT_TOKEN;
  const debug = process.env.DEBUG === "true";

  if (!jwtToken) {
    throw new Error(
      "ANDAMIO_JWT_TOKEN environment variable is required. " +
      "Generate a token using: npx tsx scripts/generate-test-jwt.ts in the andamio-db-api directory"
    );
  }

  return { apiUrl, jwtToken, debug };
}

// =============================================================================
// Schemas (from @andamio/db-api)
// =============================================================================

const lessonWithSLTOutputSchema = z.object({
  title: z.string().nullable(),
  description: z.string().nullable(),
  contentJson: z.object({}).passthrough().nullable(),
  imageUrl: z.string().nullable(),
  videoUrl: z.string().nullable(),
  live: z.boolean().nullable(),
  sltIndex: z.number(),
  sltText: z.string(),
});

const lessonOutputSchema = z.object({
  title: z.string().nullable(),
  description: z.string().nullable(),
  imageUrl: z.string().nullable(),
  videoUrl: z.string().nullable(),
  live: z.boolean().nullable(),
});

const listLessonsOutputSchema = z.array(lessonWithSLTOutputSchema);

type LessonWithSLT = z.infer<typeof lessonWithSLTOutputSchema>;
type LessonOutput = z.infer<typeof lessonOutputSchema>;
type ListLessonsOutput = z.infer<typeof listLessonsOutputSchema>;

// =============================================================================
// API Client
// =============================================================================

/**
 * Fetch a single lesson by course NFT policy, module code, and SLT index
 */
export async function fetchLesson(
  courseNftPolicyId: string,
  moduleCode: string,
  moduleIndex: number
): Promise<LessonWithSLT> {
  const { apiUrl, jwtToken, debug } = getConfig();

  const url = `${apiUrl}/lessons/${courseNftPolicyId}/${moduleCode}/${moduleIndex}`;

  if (debug) {
    console.error(`[API] Fetching lesson: ${url}`);
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to fetch lesson (${response.status}): ${errorText}`
    );
  }

  const data = await response.json();

  // Validate response
  const validated = lessonWithSLTOutputSchema.parse(data);

  if (debug) {
    console.error(`[API] Lesson fetched successfully: ${validated.title}`);
  }

  return validated;
}

/**
 * Fetch all lessons for a module
 */
export async function fetchModuleLessons(
  courseNftPolicyId: string,
  moduleCode: string
): Promise<ListLessonsOutput> {
  const { apiUrl, jwtToken, debug } = getConfig();

  const url = `${apiUrl}/courses/${courseNftPolicyId}/modules/${moduleCode}/lessons`;

  if (debug) {
    console.error(`[API] Fetching module lessons: ${url}`);
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to fetch module lessons (${response.status}): ${errorText}`
    );
  }

  const data = await response.json();

  // Validate response
  const validated = listLessonsOutputSchema.parse(data);

  if (debug) {
    console.error(`[API] Fetched ${validated.length} lessons from module ${moduleCode}`);
  }

  return validated;
}

/**
 * Update a lesson
 */
export async function updateLesson(
  courseNftPolicyId: string,
  moduleCode: string,
  moduleIndex: number,
  updates: {
    title?: string;
    description?: string;
    contentJson?: Record<string, unknown>;
    imageUrl?: string;
    videoUrl?: string;
    live?: boolean;
  }
): Promise<LessonOutput> {
  const { apiUrl, jwtToken, debug } = getConfig();

  const url = `${apiUrl}/lessons/${courseNftPolicyId}/${moduleCode}/${moduleIndex}`;

  const payload = {
    courseNftPolicyId,
    moduleCode,
    moduleIndex,
    ...updates,
  };

  if (debug) {
    console.error(`[API] Updating lesson: ${url}`);
    console.error(`[API] Payload:`, JSON.stringify(payload, null, 2));
  }

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to update lesson (${response.status}): ${errorText}`
    );
  }

  const data = await response.json();

  // Validate response
  const validated = lessonOutputSchema.parse(data);

  if (debug) {
    console.error(`[API] Lesson updated successfully: ${validated.title}`);
  }

  return validated;
}

/**
 * Create a new lesson
 */
export async function createLesson(
  courseNftPolicyId: string,
  moduleCode: string,
  moduleIndex: number,
  lessonData: {
    title?: string;
    description?: string;
    contentJson?: Record<string, unknown>;
    imageUrl?: string;
    videoUrl?: string;
  }
): Promise<LessonOutput> {
  const { apiUrl, jwtToken, debug } = getConfig();

  const url = `${apiUrl}/lessons`;

  const payload = {
    courseNftPolicyId,
    moduleCode,
    moduleIndex,
    ...lessonData,
  };

  if (debug) {
    console.error(`[API] Creating lesson: ${url}`);
    console.error(`[API] Payload:`, JSON.stringify(payload, null, 2));
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to create lesson (${response.status}): ${errorText}`
    );
  }

  const data = await response.json();

  // Validate response
  const validated = lessonOutputSchema.parse(data);

  if (debug) {
    console.error(`[API] Lesson created successfully: ${validated.title}`);
  }

  return validated;
}

/**
 * Delete a lesson
 */
export async function deleteLesson(
  courseNftPolicyId: string,
  moduleCode: string,
  moduleIndex: number
): Promise<{ success: boolean }> {
  const { apiUrl, jwtToken, debug } = getConfig();

  const url = `${apiUrl}/lessons/${courseNftPolicyId}/${moduleCode}/${moduleIndex}`;

  if (debug) {
    console.error(`[API] Deleting lesson: ${url}`);
  }

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to delete lesson (${response.status}): ${errorText}`
    );
  }

  const data = await response.json();

  if (debug) {
    console.error(`[API] Lesson deleted successfully`);
  }

  return data;
}

// =============================================================================
// SLT Operations
// =============================================================================

const sltOutputSchema = z.object({
  id: z.string(),
  moduleIndex: z.number(),
  sltText: z.string(),
});

const listSLTsOutputSchema = z.array(sltOutputSchema);

type SLTOutput = z.infer<typeof sltOutputSchema>;
type ListSLTsOutput = z.infer<typeof listSLTsOutputSchema>;

/**
 * Fetch all SLTs for a module
 */
export async function fetchModuleSLTs(
  courseNftPolicyId: string,
  moduleCode: string
): Promise<ListSLTsOutput> {
  const { apiUrl, jwtToken, debug } = getConfig();

  const url = `${apiUrl}/slts/${courseNftPolicyId}/${moduleCode}`;

  if (debug) {
    console.error(`[API] Fetching module SLTs: ${url}`);
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to fetch module SLTs (${response.status}): ${errorText}`
    );
  }

  const data = await response.json();

  // Validate response
  const validated = listSLTsOutputSchema.parse(data);

  if (debug) {
    console.error(`[API] Fetched ${validated.length} SLTs from module ${moduleCode}`);
  }

  return validated;
}

/**
 * Create a new SLT
 */
export async function createSLT(
  courseNftPolicyId: string,
  moduleCode: string,
  moduleIndex: number,
  sltText: string
): Promise<SLTOutput> {
  const { apiUrl, jwtToken, debug } = getConfig();

  const url = `${apiUrl}/slts`;

  const payload = {
    courseNftPolicyId,
    moduleCode,
    moduleIndex,
    sltText,
  };

  if (debug) {
    console.error(`[API] Creating SLT: ${url}`);
    console.error(`[API] Payload:`, JSON.stringify(payload, null, 2));
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to create SLT (${response.status}): ${errorText}`
    );
  }

  const data = await response.json();

  // Validate response
  const validated = sltOutputSchema.parse(data);

  if (debug) {
    console.error(`[API] SLT created successfully at index ${validated.moduleIndex}`);
  }

  return validated;
}

/**
 * Update an SLT
 */
export async function updateSLT(
  courseNftPolicyId: string,
  moduleCode: string,
  moduleIndex: number,
  updates: {
    sltText?: string;
    newModuleIndex?: number;
  }
): Promise<SLTOutput> {
  const { apiUrl, jwtToken, debug } = getConfig();

  const url = `${apiUrl}/slts/${courseNftPolicyId}/${moduleCode}/${moduleIndex}`;

  const payload = {
    courseNftPolicyId,
    moduleCode,
    moduleIndex,
    ...updates,
  };

  if (debug) {
    console.error(`[API] Updating SLT: ${url}`);
    console.error(`[API] Payload:`, JSON.stringify(payload, null, 2));
  }

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to update SLT (${response.status}): ${errorText}`
    );
  }

  const data = await response.json();

  // Validate response
  const validated = sltOutputSchema.parse(data);

  if (debug) {
    console.error(`[API] SLT updated successfully`);
  }

  return validated;
}

/**
 * Batch update SLT indexes (for reordering)
 */
export async function batchUpdateSLTIndexes(
  updates: Array<{ id: string; moduleIndex: number }>
): Promise<{ success: boolean; count: number }> {
  const { apiUrl, jwtToken, debug } = getConfig();

  const url = `${apiUrl}/slts/batch-update-indexes`;

  const payload = { updates };

  if (debug) {
    console.error(`[API] Batch updating SLT indexes: ${url}`);
    console.error(`[API] Updating ${updates.length} SLTs`);
  }

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to batch update SLT indexes (${response.status}): ${errorText}`
    );
  }

  const data = await response.json();

  if (debug) {
    console.error(`[API] Batch updated ${data.count} SLT indexes successfully`);
  }

  return data;
}

/**
 * Delete an SLT (and its lesson if it exists)
 */
export async function deleteSLT(
  courseNftPolicyId: string,
  moduleCode: string,
  moduleIndex: number
): Promise<{ success: boolean }> {
  const { apiUrl, jwtToken, debug } = getConfig();

  const url = `${apiUrl}/slts/${courseNftPolicyId}/${moduleCode}/${moduleIndex}`;

  if (debug) {
    console.error(`[API] Deleting SLT: ${url}`);
  }

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to delete SLT (${response.status}): ${errorText}`
    );
  }

  const data = await response.json();

  if (debug) {
    console.error(`[API] SLT deleted successfully`);
  }

  return data;
}
