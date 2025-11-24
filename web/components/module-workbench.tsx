"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRightIcon,
  CheckCircle2Icon,
  FlaskConicalIcon,
  PlusIcon,
  SparklesIcon,
  AlertCircleIcon,
} from "lucide-react";
import { SLTCreator } from "@/components/slt-creator";
import { SLTList } from "@/components/slt-list";

interface ModuleWorkbenchProps {
  onSLTClick?: (courseNftPolicyId: string, moduleCode: string, moduleIndex: number) => void;
}

export function ModuleWorkbench({ onSLTClick }: ModuleWorkbenchProps) {
  const [moduleInfo, setModuleInfo] = useState({
    courseNftPolicyId: "",
    moduleCode: "",
  });
  const [showSLTCreator, setShowSLTCreator] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const hasModuleInfo = moduleInfo.courseNftPolicyId && moduleInfo.moduleCode;

  return (
    <div className="space-y-6">
      {/* Module Setup Card */}
      <Card className="border-l-8 border-t-2 border-r-2 border-b-2 border-foreground bg-card">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-3 text-2xl font-black uppercase tracking-tight">
                <FlaskConicalIcon className="h-7 w-7" strokeWidth={3} />
                Module Workshop
              </CardTitle>
              <CardDescription className="mt-2 font-bold uppercase text-xs tracking-wider">
                Create and manage Student Learning Targets
              </CardDescription>
            </div>
            {!hasModuleInfo && (
              <Badge variant="outline" className="border-2 border-foreground font-black uppercase text-xs">
                Setup Required
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3 border-l-4 border-foreground pl-4">
              <Label htmlFor="policyId" className="text-xs font-black uppercase tracking-wider">
                Course NFT Policy ID
              </Label>
              <Input
                id="policyId"
                placeholder="e.g., abc123..."
                value={moduleInfo.courseNftPolicyId}
                onChange={(e) =>
                  setModuleInfo((prev) => ({ ...prev, courseNftPolicyId: e.target.value }))
                }
                className="font-mono text-sm border-2 border-input"
              />
            </div>
            <div className="space-y-3 border-l-4 border-foreground pl-4">
              <Label htmlFor="moduleCode" className="text-xs font-black uppercase tracking-wider">
                Module Code
              </Label>
              <Input
                id="moduleCode"
                placeholder="e.g., MOD-101"
                value={moduleInfo.moduleCode}
                onChange={(e) =>
                  setModuleInfo((prev) => ({ ...prev, moduleCode: e.target.value }))
                }
                className="border-2 border-input"
              />
            </div>
          </div>

          {hasModuleInfo && (
            <div className="pt-4 border-t-2 border-muted">
              <div className="flex items-center gap-3 p-4 bg-muted border-l-4 border-foreground">
                <CheckCircle2Icon className="h-5 w-5" strokeWidth={3} />
                <span className="font-bold">
                  Working on: <span className="font-black uppercase">{moduleInfo.moduleCode}</span>
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {hasModuleInfo && (
        <>
          {/* Action Panel */}
          <Card className="border-l-8 border-t-2 border-r-2 border-b-2 border-foreground bg-muted/20">
            <CardHeader className="border-b-2 border-foreground">
              <CardTitle className="flex items-center gap-3 text-xl font-black uppercase tracking-tight">
                <SparklesIcon className="h-6 w-6" strokeWidth={3} />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <Button
                onClick={() => setShowSLTCreator(true)}
                className="w-full justify-start bg-foreground text-background hover:bg-foreground/90 font-black uppercase tracking-wider h-14 border-l-4 border-foreground"
              >
                <PlusIcon className="h-5 w-5 mr-3" strokeWidth={3} />
                Create New SLT
                <ArrowRightIcon className="h-5 w-5 ml-auto" strokeWidth={3} />
              </Button>

              <div className="p-4 bg-card border-l-4 border-foreground">
                <div className="flex items-start gap-3">
                  <AlertCircleIcon className="h-5 w-5 mt-0.5 flex-shrink-0" strokeWidth={3} />
                  <div className="space-y-1">
                    <p className="font-black uppercase text-xs tracking-wider">Pro Tip</p>
                    <p className="text-sm">
                      Start by creating SLTs for your module. Each SLT represents
                      a specific capability learners will gain. Well-crafted SLTs are the foundation
                      of great lessons.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SLT Creator Dialog */}
          {showSLTCreator && (
            <SLTCreator
              courseNftPolicyId={moduleInfo.courseNftPolicyId}
              moduleCode={moduleInfo.moduleCode}
              onClose={() => setShowSLTCreator(false)}
              onCreated={() => {
                setShowSLTCreator(false);
                setRefreshKey((prev) => prev + 1);
              }}
            />
          )}

          {/* SLT List */}
          <SLTList
            key={refreshKey}
            courseNftPolicyId={moduleInfo.courseNftPolicyId}
            moduleCode={moduleInfo.moduleCode}
            onSLTClick={onSLTClick}
          />
        </>
      )}
    </div>
  );
}
