"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FlaskConicalIcon, SparklesIcon, LogOutIcon, LayoutDashboardIcon } from "lucide-react";
import { AuthPanel } from "@/components/auth-panel";
import { ModuleWorkbench } from "@/components/module-workbench";
import { LessonWorkbench } from "@/components/lesson-workbench";
import { api } from "@/lib/api-client";

export function LessonLaboratory() {
  const [hasToken, setHasToken] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeWorkbench, setActiveWorkbench] = useState<"module" | "lesson">("module");
  const [selectedSLT, setSelectedSLT] = useState<{
    courseNftPolicyId: string;
    moduleCode: string;
    moduleIndex: number;
  } | null>(null);

  // Check for token on mount (client-side only)
  useEffect(() => {
    setHasToken(!!api.getJwtToken());
    setIsLoading(false);
  }, []);

  const handleSLTClick = (courseNftPolicyId: string, moduleCode: string, moduleIndex: number) => {
    setSelectedSLT({ courseNftPolicyId, moduleCode, moduleIndex });
    setActiveWorkbench("lesson");
  };

  if (!hasToken) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="inline-block p-3 bg-zinc-900 mb-4">
              <LayoutDashboardIcon className="h-12 w-12 text-zinc-500" strokeWidth={1.5} />
            </div>
            <h1 className="text-2xl font-semibold text-white mb-2">Andamio Lesson Coach</h1>
            <p className="text-sm text-zinc-500">Professional Content Dashboard</p>
          </div>
          <div className="bg-zinc-900 p-6">
            <AuthPanel onAuthenticated={() => setHasToken(true)} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Top Navigation Bar */}
      <header className="bg-zinc-900">
        <div className="w-full px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-zinc-800">
                <LayoutDashboardIcon className="h-5 w-5 text-zinc-400" strokeWidth={1.5} />
              </div>
              <div>
                <h1 className="text-base font-medium text-white">Andamio Lesson Coach</h1>
                <p className="text-xs text-zinc-500">Content Dashboard</p>
              </div>
            </div>

            <button
              onClick={() => {
                api.clearJwtToken();
                setHasToken(false);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white text-sm transition-colors"
            >
              <LogOutIcon className="h-4 w-4" strokeWidth={1.5} />
              <span>Exit</span>
            </button>
          </div>
        </div>
      </header>

      {/* Full Width Dashboard */}
      <main className="w-full">
        <Tabs value={activeWorkbench} onValueChange={(v) => setActiveWorkbench(v as "module" | "lesson")} className="w-full">
          {/* Horizontal Tab Bar */}
          <div className="bg-zinc-900">
            <div className="w-full px-6">
              <TabsList className="h-12 bg-transparent p-0 gap-6 border-0">
                <TabsTrigger
                  value="module"
                  className="flex items-center gap-2 px-0 py-3 bg-transparent data-[state=active]:bg-transparent border-b-2 border-transparent data-[state=active]:border-zinc-400 text-zinc-500 data-[state=active]:text-white rounded-none text-sm font-normal transition-all"
                >
                  <FlaskConicalIcon className="h-4 w-4" strokeWidth={1.5} />
                  <span>Module Workshop</span>
                </TabsTrigger>
                <TabsTrigger
                  value="lesson"
                  className="flex items-center gap-2 px-0 py-3 bg-transparent data-[state=active]:bg-transparent border-b-2 border-transparent data-[state=active]:border-zinc-400 text-zinc-500 data-[state=active]:text-white rounded-none text-sm font-normal transition-all"
                >
                  <SparklesIcon className="h-4 w-4" strokeWidth={1.5} />
                  <span>Lesson Coach</span>
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          {/* Content Area - Full Width */}
          <div className="w-full">
            <TabsContent value="module" className="m-0 p-6">
              <ModuleWorkbench onSLTClick={handleSLTClick} />
            </TabsContent>

            <TabsContent value="lesson" className="m-0 p-6">
              <LessonWorkbench selectedSLT={selectedSLT} />
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  );
}
