"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ListIcon, LoaderIcon, BookOpenIcon, TrashIcon } from "lucide-react";
import { api, type SLT } from "@/lib/api-client";
import { toast } from "sonner";

interface SLTListProps {
  courseNftPolicyId: string;
  moduleCode: string;
  onSLTClick?: (courseNftPolicyId: string, moduleCode: string, moduleIndex: number) => void;
}

export function SLTList({ courseNftPolicyId, moduleCode, onSLTClick }: SLTListProps) {
  const [slts, setSlts] = useState<SLT[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    loadSLTs();
  }, [courseNftPolicyId, moduleCode]);

  const loadSLTs = async () => {
    setIsLoading(true);
    try {
      const result = await api.fetchModuleSLTs(courseNftPolicyId, moduleCode);
      setSlts(result.slts);
    } catch (error) {
      toast.error("Failed to load SLTs");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (slt: SLT) => {
    if (!confirm(`Delete SLT: "${slt.sltText}"?\n\nThis will also delete the lesson if it exists.`)) {
      return;
    }

    setDeletingId(slt.id);
    try {
      await api.deleteSLT(courseNftPolicyId, moduleCode, slt.moduleIndex);
      toast.success("SLT deleted");
      await loadSLTs();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete SLT");
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="flex items-center justify-center gap-2 text-slate-600">
            <LoaderIcon className="h-5 w-5 animate-spin" />
            <span>Loading SLTs...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-l-8 border-t-2 border-r-2 border-b-2 border-foreground bg-card">
      <CardHeader className="border-b-2 border-foreground">
        <CardTitle className="flex items-center gap-3 text-xl font-black uppercase tracking-tight">
          <ListIcon className="h-6 w-6" strokeWidth={3} />
          Module SLTs
          <Badge variant="outline" className="ml-auto border-2 border-foreground font-black text-xs">
            {slts.length} / 25
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {slts.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed border-muted">
            <BookOpenIcon className="h-16 w-16 mx-auto mb-4 opacity-20" strokeWidth={2} />
            <p className="font-black uppercase text-sm tracking-wider">No SLTs Created Yet</p>
            <p className="text-sm text-muted-foreground mt-2">Create your first SLT to get started!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {slts.map((slt) => (
              <div
                key={slt.id}
                className="flex items-start gap-4 p-4 border-l-4 border-foreground bg-muted/30 hover:bg-muted/50 transition-colors group"
              >
                <Badge variant="outline" className="mt-0.5 shrink-0 border-2 border-foreground font-black min-w-[3rem] justify-center">
                  {slt.moduleIndex}
                </Badge>
                <button
                  onClick={() => onSLTClick?.(courseNftPolicyId, moduleCode, slt.moduleIndex)}
                  className="flex-1 text-sm text-left font-medium hover:font-black transition-all"
                >
                  {slt.sltText}
                </button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(slt)}
                  disabled={deletingId === slt.id}
                  className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-destructive-foreground"
                >
                  {deletingId === slt.id ? (
                    <LoaderIcon className="h-4 w-4 animate-spin" strokeWidth={3} />
                  ) : (
                    <TrashIcon className="h-4 w-4" strokeWidth={3} />
                  )}
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
