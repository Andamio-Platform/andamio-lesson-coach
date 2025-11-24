"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SparklesIcon,
  LoaderIcon,
  SaveIcon,
  EyeIcon,
  CodeIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
  MessageSquareIcon,
  CheckCircle2Icon,
  AlertCircleIcon,
} from "lucide-react";
import { api, type LessonType, type Lesson } from "@/lib/api-client";
import { toast } from "sonner";
import { TiptapRenderer } from "@/components/tiptap-renderer";
import type { JSONContent } from "@tiptap/core";

interface LessonEditorProps {
  courseNftPolicyId: string;
  moduleCode: string;
  moduleIndex: number;
}

const LESSON_TYPES: { value: LessonType; label: string }[] = [
  { value: "product-demo", label: "Product Demo" },
  { value: "developer-docs", label: "Developer Docs" },
  { value: "how-to-guide", label: "How-To Guide" },
  { value: "org-onboarding", label: "Organization Onboarding" },
];

export function LessonEditor({ courseNftPolicyId, moduleCode, moduleIndex }: LessonEditorProps) {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [contentJson, setContentJson] = useState<JSONContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [sltText, setSltText] = useState("");
  const [lessonType, setLessonType] = useState<LessonType>("product-demo");
  const [materials, setMaterials] = useState("");
  const [feedback, setFeedback] = useState("");
  const [editMode, setEditMode] = useState<"preview" | "edit">("preview");

  useEffect(() => {
    loadLesson();
  }, [courseNftPolicyId, moduleCode, moduleIndex]);

  const loadLesson = async () => {
    setIsLoading(true);
    try {
      const result = await api.fetchLesson(courseNftPolicyId, moduleCode, moduleIndex);
      console.log("Loaded lesson:", result.lesson);
      console.log("Content length:", result.lesson.content?.length);
      console.log("ContentJson:", result.lesson.contentJson ? "present" : "null");
      setLesson(result.lesson);
      setSltText(result.lesson.sltText);
      setContentJson(result.lesson.contentJson || null);
    } catch (error) {
      // Lesson doesn't exist yet
      setLesson(null);
      setContentJson(null);
      // Try to get SLT
      try {
        const sltsResult = await api.fetchModuleSLTs(courseNftPolicyId, moduleCode);
        const slt = sltsResult.slts.find((s) => s.moduleIndex === moduleIndex);
        if (slt) {
          setSltText(slt.sltText);
        }
      } catch (e) {
        console.error("Failed to load SLT:", e);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (!sltText) {
      toast.error("SLT is required to generate a lesson");
      return;
    }

    setIsGenerating(true);
    try {
      const result = await api.generateLesson({
        slt: sltText,
        lessonType,
        materials: materials || undefined,
        moduleCode,
      });

      if (lesson) {
        // Update existing lesson
        setLesson({ ...lesson, content: result.markdown });
      } else {
        // Create new lesson structure
        setLesson({
          id: "",
          title: sltText,
          sltText,
          content: result.markdown,
          live: false,
          moduleIndex,
        });
      }

      setEditMode("edit");
      toast.success("Lesson generated! Review and refine below.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to generate lesson");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!lesson) return;

    console.log("Saving lesson with ID:", lesson.id, "Type:", typeof lesson.id);

    setIsSaving(true);
    try {
      // Check if lesson has a valid ID (not empty string)
      if (lesson.id && lesson.id !== "") {
        console.log("Updating existing lesson");
        console.log("Sending markdown content length:", lesson.content?.length);
        console.log("First 200 chars:", lesson.content?.substring(0, 200));
        // Update existing
        await api.updateLesson({
          courseNftPolicyId,
          moduleCode,
          moduleIndex,
          title: lesson.title,
          description: lesson.description,
          markdownContent: lesson.content,
          imageUrl: lesson.imageUrl,
          videoUrl: lesson.videoUrl,
          live: lesson.live,
        });
        toast.success("Lesson updated successfully!");
        // Reload to get the updated contentJson from the server
        await loadLesson();
      } else {
        console.log("Creating new lesson");
        // Create new
        const result = await api.createLesson({
          courseNftPolicyId,
          moduleCode,
          moduleIndex,
          title: lesson.title,
          description: lesson.description,
          markdownContent: lesson.content,
          imageUrl: lesson.imageUrl,
          videoUrl: lesson.videoUrl,
        });
        setLesson(result.lesson);
        toast.success("Lesson created successfully!");
        // Reload to get the contentJson from the server
        await loadLesson();
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save lesson");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!lesson) return;

    setIsSaving(true);
    try {
      await api.updateLesson({
        courseNftPolicyId,
        moduleCode,
        moduleIndex,
        live: !lesson.live,
      });
      setLesson({ ...lesson, live: !lesson.live });
      toast.success(lesson.live ? "Lesson unpublished" : "Lesson published!");
      await loadLesson();
    } catch (error) {
      toast.error("Failed to update publish status");
    } finally {
      setIsSaving(false);
    }
  };

  const handleRefine = async () => {
    if (!lesson || !feedback) return;

    setIsRefining(true);
    try {
      const result = await api.refineLesson({
        slt: sltText,
        currentContent: lesson.content,
        feedback,
        lessonType,
      });

      // Update lesson with refined content
      setLesson({ ...lesson, content: result.markdown });
      // Clear the contentJson so it will re-render from markdown
      setContentJson(null);
      setEditMode("edit"); // Switch to edit mode to see the changes
      toast.success("Lesson refined! Review the changes and save when ready.");

      // Clear feedback after successful refinement
      setFeedback("");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to refine lesson");
    } finally {
      setIsRefining(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="flex items-center justify-center gap-2 text-slate-600">
            <LoaderIcon className="h-5 w-5 animate-spin" />
            <span>Loading lesson...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Generation Panel */}
      {!lesson && (
        <Card className="border-scaffold-heavy bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-black uppercase tracking-tight">
              <SparklesIcon className="h-6 w-6" strokeWidth={3} />
              Generate New Lesson
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>SLT</Label>
              <p className="text-sm font-medium p-3 bg-white/50 dark:bg-slate-800/50 rounded border">
                {sltText || "No SLT found for this index"}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="lesson-type">Lesson Type</Label>
              <Select value={lessonType} onValueChange={(v) => setLessonType(v as LessonType)}>
                <SelectTrigger id="lesson-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LESSON_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="materials">Supporting Materials (Optional)</Label>
              <Textarea
                id="materials"
                value={materials}
                onChange={(e) => setMaterials(e.target.value)}
                placeholder="Screenshots, code examples, documentation links, or context..."
                className="min-h-[100px]"
              />
            </div>

            <Button
              onClick={handleGenerate}
              disabled={!sltText || isGenerating}
              className="w-full bg-foreground text-background hover:bg-foreground/90 font-black uppercase tracking-wider border-scaffold-heavy"
            >
              {isGenerating ? (
                <>
                  <LoaderIcon className="h-4 w-4 mr-2 animate-spin" />
                  Generating Lesson...
                </>
              ) : (
                <>
                  <SparklesIcon className="h-4 w-4 mr-2" />
                  Generate Lesson
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Lesson Editor - Side by Side Layout */}
      {lesson && (
        <>
          {/* Status & Action Bar */}
          <div className="border-scaffold-1 bg-card p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <Badge
                  variant={lesson.live ? "default" : "outline"}
                  className={`uppercase tracking-wider font-black text-xs px-4 py-2 ${lesson.live ? "bg-foreground text-background" : "border-2 border-foreground"}`}
                >
                  {lesson.live ? (
                    <>
                      <CheckCircle2Icon className="h-4 w-4 mr-2" strokeWidth={3} />
                      Live
                    </>
                  ) : (
                    <>
                      <AlertCircleIcon className="h-4 w-4 mr-2" strokeWidth={3} />
                      Draft
                    </>
                  )}
                </Badge>
                <div className="border-l-2 border-muted pl-6">
                  <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Target</span>
                  <p className="text-sm font-black mt-1">{lesson.sltText}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePublish}
                  disabled={isSaving}
                  className="border-l-4 border-foreground font-black uppercase tracking-wider"
                >
                  {lesson.live ? "Unpublish" : "Publish"}
                </Button>
                <Button
                  size="sm"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-foreground text-background hover:bg-foreground/90 font-black uppercase tracking-wider border-l-4 border-foreground"
                >
                  {isSaving ? (
                    <>
                      <LoaderIcon className="h-4 w-4 mr-2 animate-spin" />
                      Saving
                    </>
                  ) : (
                    <>
                      <SaveIcon className="h-4 w-4 mr-2" strokeWidth={3} />
                      Save
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Split Layout: Content + Interactive Feedback */}
          <div className="grid grid-cols-3 gap-6">
            {/* Main Content Area - 2/3 width */}
            <div className="col-span-2 space-y-6">
              <Tabs value={editMode} onValueChange={(v) => setEditMode(v as "preview" | "edit")} className="w-full">
                <TabsList className="grid w-full grid-cols-2 h-14 bg-card p-0 border-scaffold-heavy">
                  <TabsTrigger
                    value="preview"
                    className="h-full data-[state=active]:bg-foreground data-[state=active]:text-background font-black uppercase tracking-wider"
                  >
                    <EyeIcon className="h-5 w-5 mr-2" strokeWidth={3} />
                    Preview
                  </TabsTrigger>
                  <TabsTrigger
                    value="edit"
                    className="h-full data-[state=active]:bg-foreground data-[state=active]:text-background font-black uppercase tracking-wider"
                  >
                    <CodeIcon className="h-5 w-5 mr-2" strokeWidth={3} />
                    Edit
                  </TabsTrigger>
                </TabsList>

                {/* Preview Mode */}
                <TabsContent value="preview" className="mt-6">
                  <Card className="border-scaffold-2">
                    <CardContent className="p-10">
                      <TiptapRenderer content={contentJson} className="text-base" />
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Edit Mode */}
                <TabsContent value="edit" className="mt-6">
                  <Card className="border-scaffold-2">
                    <CardContent className="p-8 space-y-6">
                      <div className="space-y-3">
                        <Label className="text-xs font-black uppercase tracking-wider">Title</Label>
                        <Input
                          value={lesson.title}
                          onChange={(e) => setLesson({ ...lesson, title: e.target.value })}
                          className="font-black text-lg"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-xs font-black uppercase tracking-wider">Description</Label>
                        <Textarea
                          value={lesson.description || ""}
                          onChange={(e) => setLesson({ ...lesson, description: e.target.value })}
                          className="min-h-[80px]"
                        />
                      </div>

                      <Separator className="my-6" />

                      <div className="space-y-3">
                        <Label className="text-xs font-black uppercase tracking-wider">Content (Markdown)</Label>
                        <Textarea
                          value={lesson.content}
                          onChange={(e) => setLesson({ ...lesson, content: e.target.value })}
                          className="min-h-[500px] font-mono text-sm"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Interactive Feedback Panel - 1/3 width, always visible */}
            <div className="col-span-1">
              <Card className="border-scaffold-4 sticky top-24 bg-muted/30">
                <CardHeader className="border-b-4 border-foreground">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <MessageSquareIcon className="h-6 w-6" strokeWidth={3} />
                    <span className="font-black uppercase tracking-tight">Refine</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {/* Quick Feedback Buttons */}
                  <div className="space-y-3">
                    <p className="text-xs font-black uppercase tracking-wider text-muted-foreground">Quick Actions</p>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-l-4 border-foreground font-bold uppercase text-xs"
                        onClick={() => setFeedback("This lesson looks great! Clear and well-structured.")}
                      >
                        <ThumbsUpIcon className="h-4 w-4 mr-1" strokeWidth={3} />
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-l-4 border-foreground font-bold uppercase text-xs"
                        onClick={() => setFeedback("Needs improvement: ")}
                      >
                        <ThumbsDownIcon className="h-4 w-4 mr-1" strokeWidth={3} />
                        Revise
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  {/* Detailed Feedback */}
                  <div className="space-y-3">
                    <Label className="text-xs font-black uppercase tracking-wider">Your Feedback</Label>
                    <Textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Tell us what to improve...
• Add more examples
• Simplify language
• Add code snippets
• Reorganize sections"
                      className="min-h-[200px] resize-none font-mono text-sm"
                    />
                  </div>

                  {/* Refine Button */}
                  <Button
                    size="lg"
                    disabled={!feedback || isRefining}
                    onClick={handleRefine}
                    className="w-full bg-foreground text-background hover:bg-foreground/90 font-black uppercase tracking-wider py-6 border-scaffold-heavy"
                  >
                    {isRefining ? (
                      <>
                        <LoaderIcon className="h-5 w-5 mr-2 animate-spin" strokeWidth={3} />
                        Refining Lesson...
                      </>
                    ) : (
                      <>
                        <SparklesIcon className="h-5 w-5 mr-2" strokeWidth={3} />
                        {feedback ? "Refine Lesson" : "Enter Feedback First"}
                      </>
                    )}
                  </Button>

                  {/* Active Refinement Indicator */}
                  {isRefining && (
                    <div className="p-4 bg-foreground/5 border-l-4 border-foreground animate-pulse-fade">
                      <div className="flex items-center gap-3">
                        <LoaderIcon className="h-5 w-5 animate-spin" strokeWidth={3} />
                        <div className="space-y-1">
                          <p className="text-xs font-black uppercase tracking-wider">Processing Your Feedback</p>
                          <p className="text-sm">The AI is refining the lesson based on your input...</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Feedback History */}
                  {feedback && (
                    <div className="pt-4 border-t-2 border-muted">
                      <p className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-3">
                        Recent Feedback
                      </p>
                      <div className="space-y-2">
                        <div className="text-xs p-3 bg-background/50 border-l-2 border-foreground">
                          <p className="font-mono">{feedback.slice(0, 100)}{feedback.length > 100 ? '...' : ''}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
