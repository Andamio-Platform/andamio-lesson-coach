/**
 * Lesson Refinement Generator
 *
 * Takes existing lesson content and user feedback, generates an improved version using Claude.
 * This is NOT a full regeneration - it's an iterative refinement based on specific feedback.
 *
 * CRITICAL CONSTRAINTS:
 * - Preserve the lesson's core structure and pedagogical approach
 * - Apply user feedback precisely without over-editing
 * - Maintain word count limits (900 words total)
 * - Keep contribution-centered framing
 *
 * REFINEMENT APPROACH:
 * - Understand the specific feedback provided
 * - Identify which sections need changes
 * - Apply improvements while preserving what works
 * - Maintain consistency with original lesson type
 */

import Anthropic from "@anthropic-ai/sdk";
import * as dotenv from "dotenv";

dotenv.config();

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function refineLesson(
  slt: string,
  currentContent: string,
  feedback: string,
  lessonType?: string
): Promise<string> {
  // Validate API key is available
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error(
      "ANTHROPIC_API_KEY environment variable is not set. Please add it to your .env file."
    );
  }

  const systemPrompt = `You are an expert pedagogical designer for the Andamio Platform, specializing in contribution-centered learning. Your role is to refine lesson content based on specific user feedback while preserving the lesson's core structure and pedagogical approach.

CRITICAL PRINCIPLES:
1. **Contribution-Centered**: Andamio is NOT a Learning Management System. Learning happens in service of becoming a contributor to a Project.
2. **Capability-Focused**: Frame everything around what learners can DO, not just what they know
3. **Assignment as Proof**: The Module Assignment is proof of capability, not just "homework"
4. **Word Limit**: Maximum 900 words total (600 words main content + 300 words supplementary)

REFINEMENT GUIDELINES:
- Apply the user's feedback precisely - don't over-edit
- Preserve the lesson's structure and flow
- Maintain markdown formatting
- Keep the contribution-centered language
- If feedback asks for examples, add 1-2 concrete examples
- If feedback asks for simplification, reduce jargon and break into smaller steps
- If feedback asks for more detail, expand only the relevant sections

AVOID:
- Traditional LMS language ("complete the lesson", "earn points", "get certified")
- Vague learning objectives ("understand", "be familiar with", "learn about")
- Over-complicating simple concepts
- Adding unnecessary sections the user didn't ask for`;

  const userPrompt = `Please refine the following lesson based on the user's specific feedback.

**Student Learning Target**: ${slt}
${lessonType ? `**Lesson Type**: ${lessonType}` : ""}

**User Feedback**:
${feedback}

**Current Lesson Content**:
${currentContent}

---

Please provide the COMPLETE refined lesson in markdown format. Apply the user's feedback while preserving the lesson's structure and contribution-centered framing. Return only the refined markdown content, no explanations or meta-commentary.`;

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: userPrompt,
        },
      ],
    });

    // Extract text from response
    const textBlock = message.content.find((block) => block.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      throw new Error("No text content in Claude's response");
    }

    return textBlock.text;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to refine lesson with Claude: ${error.message}`);
    }
    throw error;
  }
}
