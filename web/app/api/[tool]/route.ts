import { NextRequest, NextResponse } from "next/server";

/**
 * API Route Handler for Andamio Lesson Coach MCP Tools
 *
 * This route forwards requests from the web UI to the MCP server tools.
 * Since the MCP server runs locally and the tools are TypeScript functions,
 * we'll import and call them directly rather than making HTTP requests.
 */

// Import the MCP tools
import {
  validateSLT,
  suggestLessonType,
  generateLesson,
  refineLesson,
  fetchModuleSLTs,
  createSLT,
  updateSLT,
  deleteSLT,
  fetchModuleLessons,
  fetchLesson,
  createLesson,
  updateLesson,
  deleteLesson,
} from "../../../lib/mcp-tools";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ tool: string }> }
) {
  try {
    const body = await request.json();
    const { tool } = await params;

    // Get JWT token from Authorization header
    const authHeader = request.headers.get("Authorization");
    const jwtToken = authHeader?.replace("Bearer ", "") || "";

    // Route to appropriate tool
    switch (tool) {
      case "validate-slt":
        return NextResponse.json(await validateSLT(body.slt));

      case "suggest-lesson-type":
        return NextResponse.json(await suggestLessonType(body.slt));

      case "generate-lesson":
        return NextResponse.json(
          await generateLesson(
            body.slt,
            body.lessonType,
            body.materials,
            body.moduleName,
            body.courseName
          )
        );

      case "fetch-module-slts":
        return NextResponse.json(
          await fetchModuleSLTs(body.courseNftPolicyId, body.moduleCode, jwtToken)
        );

      case "create-slt":
        return NextResponse.json(
          await createSLT(
            body.courseNftPolicyId,
            body.moduleCode,
            body.moduleIndex,
            body.sltText,
            jwtToken
          )
        );

      case "update-slt":
        return NextResponse.json(
          await updateSLT(
            body.courseNftPolicyId,
            body.moduleCode,
            body.moduleIndex,
            body.sltText,
            body.newModuleIndex,
            jwtToken
          )
        );

      case "delete-slt":
        return NextResponse.json(
          await deleteSLT(
            body.courseNftPolicyId,
            body.moduleCode,
            body.moduleIndex,
            jwtToken
          )
        );

      case "fetch-module-lessons":
        return NextResponse.json(
          await fetchModuleLessons(body.courseNftPolicyId, body.moduleCode, jwtToken)
        );

      case "fetch-lesson":
        return NextResponse.json(
          await fetchLesson(
            body.courseNftPolicyId,
            body.moduleCode,
            body.moduleIndex,
            jwtToken
          )
        );

      case "create-lesson":
        return NextResponse.json(
          await createLesson(
            body.courseNftPolicyId,
            body.moduleCode,
            body.moduleIndex,
            body.title,
            body.description,
            body.markdownContent,
            body.imageUrl,
            body.videoUrl,
            jwtToken
          )
        );

      case "update-lesson":
        return NextResponse.json(
          await updateLesson(
            body.courseNftPolicyId,
            body.moduleCode,
            body.moduleIndex,
            body.title,
            body.description,
            body.markdownContent,
            body.imageUrl,
            body.videoUrl,
            body.live,
            jwtToken
          )
        );

      case "delete-lesson":
        return NextResponse.json(
          await deleteLesson(
            body.courseNftPolicyId,
            body.moduleCode,
            body.moduleIndex,
            jwtToken
          )
        );

      case "refine-lesson":
        return NextResponse.json(
          await refineLesson(
            body.slt,
            body.currentContent,
            body.feedback,
            body.lessonType
          )
        );

      default:
        return NextResponse.json(
          { error: `Unknown tool: ${tool}` },
          { status: 404 }
        );
    }
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
