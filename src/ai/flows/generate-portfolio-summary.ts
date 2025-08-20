'use server';

/**
 * @fileOverview AI-powered insights summarizing portfolio performance over a selected period, highlighting key trends and significant changes.
 *
 * - generatePortfolioSummary - A function that handles the portfolio summary generation process.
 * - GeneratePortfolioSummaryInput - The input type for the generatePortfolioSummary function.
 * - GeneratePortfolioSummaryOutput - The return type for the generatePortfolioSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePortfolioSummaryInputSchema = z.object({
  portfolioData: z.string().describe('JSON string containing the portfolio data.'),
  selectedPeriod: z.string().describe('The selected time period for data display (e.g., last month, last year).'),
});
export type GeneratePortfolioSummaryInput = z.infer<typeof GeneratePortfolioSummaryInputSchema>;

const GeneratePortfolioSummaryOutputSchema = z.object({
  summary: z.string().describe('A summary of the portfolio performance over the selected period, highlighting key trends and significant changes.'),
});
export type GeneratePortfolioSummaryOutput = z.infer<typeof GeneratePortfolioSummaryOutputSchema>;

export async function generatePortfolioSummary(input: GeneratePortfolioSummaryInput): Promise<GeneratePortfolioSummaryOutput> {
  return generatePortfolioSummaryFlow(input);
}

const findNoteworthyChanges = ai.defineTool({
  name: 'findNoteworthyChanges',
  description: 'Identifies significant changes or milestones in the portfolio data over the selected period.',
  inputSchema: z.object({
    portfolioData: z.string().describe('JSON string containing the portfolio data.'),
    selectedPeriod: z.string().describe('The selected time period for data display (e.g., last month, last year).'),
  }),
  outputSchema: z.string().describe('A description of any noteworthy changes or milestones found in the portfolio data.'),
},
async (input) => {
  // Mock implementation - replace with actual data analysis logic.
  // This could involve comparing current performance against historical data, 
  // identifying significant gains or losses, or detecting changes in asset allocation.
  console.log("findNoteworthyChanges called with:" + input.portfolioData);
  return `No significant changes detected in portfolio data for the period: ${input.selectedPeriod}.`;
});

const prompt = ai.definePrompt({
  name: 'generatePortfolioSummaryPrompt',
  input: {schema: GeneratePortfolioSummaryInputSchema},
  output: {schema: GeneratePortfolioSummaryOutputSchema},
  tools: [findNoteworthyChanges],
  prompt: `You are an AI assistant that analyzes financial portfolio data and provides insightful summaries.

  Analyze the provided portfolio data for the selected period and generate a summary highlighting key trends, and significant changes.
  If the findNoteworthyChanges tool returns any significant changes or milestones, incorporate them into the summary.

  Portfolio Data: {{{portfolioData}}}
  Selected Period: {{{selectedPeriod}}}

  Consider overall performance, asset allocation, and any significant events that may have impacted the portfolio.
  Be concise and focus on the most important takeaways for the user.
`,
});

const generatePortfolioSummaryFlow = ai.defineFlow(
  {
    name: 'generatePortfolioSummaryFlow',
    inputSchema: GeneratePortfolioSummaryInputSchema,
    outputSchema: GeneratePortfolioSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
