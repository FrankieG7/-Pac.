'use server';
/**
 * @fileOverview A Genkit flow for generating personalized investment insights and strategic recommendations.
 *
 * - generatePersonalizedInsights - A function that handles the personalized insights generation process.
 * - PersonalizedInsightsInput - The input type for the generatePersonalizedInsights function.
 * - PersonalizedInsightsOutput - The return type for the generatePersonalizedInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedInsightsInputSchema = z.object({
  portfolioSummary: z
    .string()
    .describe('A summary of the user\'s portfolio performance.'),
  marketTrends: z
    .string()
    .describe('A summary of current market conditions and trends.'),
});
export type PersonalizedInsightsInput = z.infer<
  typeof PersonalizedInsightsInputSchema
>;

const PersonalizedInsightsOutputSchema = z.object({
  insight: z.string().describe('The main personalized investment insight.'),
  recommendations: z
    .array(z.string())
    .describe('A list of strategic recommendations.'),
});
export type PersonalizedInsightsOutput = z.infer<
  typeof PersonalizedInsightsOutputSchema
>;

export async function generatePersonalizedInsights(
  input: PersonalizedInsightsInput
): Promise<PersonalizedInsightsOutput> {
  try {
    return await personalizedInsightsFlow(input);
  } catch (error) {
    console.error('Error in generatePersonalizedInsights:', error);
    throw error;
  }
}

const prompt = ai.definePrompt({
  name: 'personalizedInsightsPrompt',
  input: {schema: PersonalizedInsightsInputSchema},
  output: {schema: PersonalizedInsightsOutputSchema},
  prompt: `You are an expert financial advisor specializing in investment strategies and market analysis.
Your goal is to provide personalized, actionable investment insights and strategic recommendations to a portfolio owner.

Here is a summary of the user's portfolio performance:
{{{portfolioSummary}}}

Here are the current market conditions and trends:
{{{marketTrends}}}

Based on this information, provide a concise main insight and a list of strategic recommendations.
Ensure the recommendations are clear, actionable, and tailored to the provided portfolio and market context.`,
});

const personalizedInsightsFlow = ai.defineFlow(
  {
    name: 'personalizedInsightsFlow',
    inputSchema: PersonalizedInsightsInputSchema,
    outputSchema: PersonalizedInsightsOutputSchema,
  },
  async input => {
    try {
      if (!process.env.GOOGLE_GENAI_API_KEY && !process.env.GEMINI_API_KEY) {
        throw new Error('Missing Gemini API key: neither GOOGLE_GENAI_API_KEY nor GEMINI_API_KEY is configured.');
      }
      const {output} = await prompt(input);
      if (!output) {
        throw new Error('AI failed to generate personalized insights. The model did not return a valid output.');
      }
      return output;
    } catch (error) {
      console.error('Error in personalizedInsightsFlow:', error);
      throw error;
    }
  }
);
