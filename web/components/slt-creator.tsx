"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle2Icon,
  XCircleIcon,
  SparklesIcon,
  LoaderIcon,
  LightbulbIcon,
} from "lucide-react";
import { api, type LessonType } from "@/lib/api-client";
import { toast } from "sonner";

interface SLTCreatorProps {
  courseNftPolicyId: string;
  moduleCode: string;
  onClose: () => void;
  onCreated: () => void;
}

export function SLTCreator({ courseNftPolicyId, moduleCode, onClose, onCreated }: SLTCreatorProps) {
  const [sltText, setSltText] = useState("I can ");
  const [moduleIndex, setModuleIndex] = useState(0);
  const [isValidating, setIsValidating] = useState(false);
  const [validation, setValidation] = useState<{ valid: boolean; suggestions?: string[] } | null>(null);
  const [suggestion, setSuggestion] = useState<{ lessonType: LessonType; rationale: string } | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Validate SLT as user types (with debounce)
  useEffect(() => {
    if (sltText.length < 8) {
      setValidation(null);
      setSuggestion(null);
      return;
    }

    const timer = setTimeout(async () => {
      setIsValidating(true);
      try {
        const result = await api.validateSLT(sltText);
        setValidation(result);

        // If valid, also get lesson type suggestion
        if (result.valid) {
          const suggestionResult = await api.suggestLessonType(sltText);
          setSuggestion(suggestionResult);
        } else {
          setSuggestion(null);
        }
      } catch (error) {
        console.error("Validation error:", error);
      } finally {
        setIsValidating(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [sltText]);

  const handleCreate = async () => {
    if (!validation?.valid) {
      toast.error("Please fix validation errors before creating the SLT");
      return;
    }

    setIsCreating(true);
    try {
      await api.createSLT({
        courseNftPolicyId,
        moduleCode,
        moduleIndex,
        sltText,
      });

      toast.success("SLT created successfully!");
      onCreated();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create SLT");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl border-l-8 border-t-2 border-r-2 border-b-2 border-foreground">
        <DialogHeader className="border-b-2 border-foreground pb-4">
          <DialogTitle className="flex items-center gap-3 text-xl font-black uppercase tracking-tight">
            <SparklesIcon className="h-6 w-6" strokeWidth={3} />
            Create New SLT
          </DialogTitle>
          <DialogDescription className="font-bold uppercase text-xs tracking-wider">
            Student Learning Targets are "I can" statements that define specific capabilities learners
            will gain. The coach will validate your SLT and suggest the best lesson type.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* SLT Text Input */}
          <div className="space-y-3 border-l-4 border-foreground pl-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="slt-text" className="text-xs font-black uppercase tracking-wider">SLT Statement</Label>
              {isValidating && (
                <Badge variant="outline" className="gap-2 border-2 border-foreground font-black uppercase text-xs">
                  <LoaderIcon className="h-3 w-3 animate-spin" strokeWidth={3} />
                  Validating...
                </Badge>
              )}
              {!isValidating && validation && (
                <Badge
                  variant={validation.valid ? "default" : "destructive"}
                  className="border-2 border-foreground font-black uppercase text-xs"
                >
                  {validation.valid ? (
                    <>
                      <CheckCircle2Icon className="h-3 w-3 mr-1" strokeWidth={3} />
                      Valid SLT
                    </>
                  ) : (
                    <>
                      <XCircleIcon className="h-3 w-3 mr-1" strokeWidth={3} />
                      Needs Improvement
                    </>
                  )}
                </Badge>
              )}
            </div>
            <Textarea
              id="slt-text"
              value={sltText}
              onChange={(e) => setSltText(e.target.value)}
              placeholder='I can create a new Module in the Andamio Platform'
              className="min-h-[100px] text-base border-2 border-input"
            />

            {/* Validation Feedback */}
            {validation && !validation.valid && validation.suggestions && (
              <div className="p-4 bg-muted/30 border-l-4 border-foreground">
                <div className="flex items-start gap-3">
                  <LightbulbIcon className="h-5 w-5 mt-0.5 flex-shrink-0" strokeWidth={3} />
                  <div className="space-y-2">
                    <p className="text-xs font-black uppercase tracking-wider">
                      Suggestions for improvement:
                    </p>
                    <ul className="text-sm space-y-1">
                      {validation.suggestions.map((suggestion, i) => (
                        <li key={i}>• {suggestion}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Lesson Type Suggestion */}
            {suggestion && validation?.valid && (
              <div className="p-4 bg-muted/30 border-l-4 border-foreground">
                <div className="flex items-start gap-3">
                  <SparklesIcon className="h-5 w-5 mt-0.5 flex-shrink-0" strokeWidth={3} />
                  <div className="space-y-2">
                    <p className="text-xs font-black uppercase tracking-wider">
                      Recommended lesson type: <strong className="capitalize">{suggestion.lessonType.replace('-', ' ')}</strong>
                    </p>
                    <p className="text-sm">
                      {suggestion.rationale}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Module Index */}
          <div className="space-y-3 border-l-4 border-foreground pl-4">
            <Label htmlFor="slt-index" className="text-xs font-black uppercase tracking-wider">SLT Index (0-24)</Label>
            <Input
              id="slt-index"
              type="number"
              min="0"
              max="24"
              value={moduleIndex}
              onChange={(e) => setModuleIndex(parseInt(e.target.value) || 0)}
              className="border-2 border-input"
            />
            <p className="text-xs text-muted-foreground">
              Each module can have up to 25 SLTs (indexed 0-24). Choose the next available index.
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t-2 border-muted">
            <Button variant="outline" onClick={onClose} disabled={isCreating} className="border-2 border-foreground font-bold uppercase tracking-wider">
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              disabled={!validation?.valid || isCreating}
              className="bg-foreground text-background hover:bg-foreground/90 font-black uppercase tracking-wider border-l-4 border-foreground"
            >
              {isCreating ? (
                <>
                  <LoaderIcon className="h-4 w-4 mr-2 animate-spin" strokeWidth={3} />
                  Creating...
                </>
              ) : (
                "Create SLT"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
