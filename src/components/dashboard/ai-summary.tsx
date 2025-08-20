"use client";

import { useState, useTransition } from "react";
import { Sparkles, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAiSummary } from "@/app/actions";
import type { Period } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

interface AiSummaryProps {
  portfolioData: { date: string; value: number }[];
  period: Period;
}

export default function AiSummary({ portfolioData, period }: AiSummaryProps) {
  const [isPending, startTransition] = useTransition();
  const [summary, setSummary] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerateSummary = () => {
    startTransition(async () => {
      const result = await getAiSummary(portfolioData, period);
      if (
        result.includes("couldn't generate insights")
      ) {
        toast({
          title: "Error",
          description: result,
          variant: "destructive",
        });
        setSummary(null);
      } else {
        setSummary(result);
      }
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">AI Insights</CardTitle>
        <Sparkles className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isPending ? (
          <div className="flex items-center justify-center h-24">
            <LoaderCircle className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : summary ? (
          <div className="text-sm space-y-4">
            {summary.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-24 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Get an AI-powered summary of your portfolio performance for the selected period.
            </p>
            <Button onClick={handleGenerateSummary}>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Insights
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
