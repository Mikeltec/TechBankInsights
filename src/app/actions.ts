"use server";

import { generatePortfolioSummary } from "@/ai/flows/generate-portfolio-summary";
import type { Period } from "@/lib/data";

export async function getAiSummary(
  portfolioData: { date: string; value: number }[],
  period: Period
) {
  try {
    const result = await generatePortfolioSummary({
      portfolioData: JSON.stringify(portfolioData),
      selectedPeriod: period,
    });
    return result.summary;
  } catch (error) {
    console.error("Error generating AI summary:", error);
    return "We couldn't generate insights at this time. Please try again later.";
  }
}
