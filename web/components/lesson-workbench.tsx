"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2Icon, SparklesIcon } from "lucide-react";
import { LessonEditor } from "@/components/lesson-editor";

interface LessonWorkbenchProps {
  selectedSLT?: {
    courseNftPolicyId: string;
    moduleCode: string;
    moduleIndex: number;
  } | null;
}

export function LessonWorkbench({ selectedSLT }: LessonWorkbenchProps) {
  const [moduleInfo, setModuleInfo] = useState({
    courseNftPolicyId: "",
    moduleCode: "",
    moduleIndex: 0,
  });

  // Update module info when SLT is selected from Module Workshop
  useEffect(() => {
    if (selectedSLT) {
      setModuleInfo(selectedSLT);
    }
  }, [selectedSLT]);

  const hasModuleInfo = moduleInfo.courseNftPolicyId && moduleInfo.moduleCode;

  return (
    <div className="space-y-6">
      {/* Context Card */}
      <Card className="border-scaffold-3 bg-card">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <SparklesIcon className="h-5 w-5" strokeWidth={3} />
                Andamio Lesson Coach
              </CardTitle>
              <CardDescription className="font-bold uppercase text-xs tracking-wider">
                Generate and refine lessons with AI-powered pedagogical guidance
              </CardDescription>
            </div>
            {!hasModuleInfo && (
              <Badge variant="outline" className="border-2 border-foreground font-black uppercase text-xs">
                Setup Required
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lesson-policyId">Course NFT Policy ID</Label>
              <Input
                id="lesson-policyId"
                placeholder="e.g., abc123..."
                value={moduleInfo.courseNftPolicyId}
                onChange={(e) =>
                  setModuleInfo((prev) => ({ ...prev, courseNftPolicyId: e.target.value }))
                }
                className="font-mono text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lesson-moduleCode">Module Code</Label>
              <Input
                id="lesson-moduleCode"
                placeholder="e.g., MOD-101"
                value={moduleInfo.moduleCode}
                onChange={(e) =>
                  setModuleInfo((prev) => ({ ...prev, moduleCode: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lesson-moduleIndex">SLT Index</Label>
              <Input
                id="lesson-moduleIndex"
                type="number"
                min="0"
                max="24"
                placeholder="0-24"
                value={moduleInfo.moduleIndex}
                onChange={(e) =>
                  setModuleInfo((prev) => ({ ...prev, moduleIndex: parseInt(e.target.value) || 0 }))
                }
              />
            </div>
          </div>

          {hasModuleInfo && (
            <div className="pt-2">
              <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-400">
                <CheckCircle2Icon className="h-4 w-4" />
                <span>
                  Ready to work on: <strong>{moduleInfo.moduleCode}</strong> - SLT {moduleInfo.moduleIndex}
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {hasModuleInfo && (
        <LessonEditor
          courseNftPolicyId={moduleInfo.courseNftPolicyId}
          moduleCode={moduleInfo.moduleCode}
          moduleIndex={moduleInfo.moduleIndex}
        />
      )}
    </div>
  );
}
