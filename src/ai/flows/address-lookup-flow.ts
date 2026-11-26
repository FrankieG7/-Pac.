'use server';
/**
 * @fileOverview This file implements a Genkit flow for analyzing crypto wallet addresses or public ledger IDs.
 *
 * - lookupAddressInsights - An async function that initiates the AI-powered analysis of a given address.
 * - AddressLookupInput - The input type for the lookupAddressInsights function, specifying the address to analyze.
 * - AddressLookupOutput - The return type for the lookupAddressInsights function, containing the analysis results.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input schema for the address lookup flow.
const AddressLookupInputSchema = z.object({
  address: z.string().describe('A crypto wallet address or public ledger ID to be analyzed.'),
});
export type AddressLookupInput = z.infer<typeof AddressLookupInputSchema>;

// Output schema for the address lookup flow results.
const AddressLookupOutputSchema = z.object({
  transactionHistorySummary: z.string().describe('A concise summary of the transaction history associated with the address.'),
  associatedRisks: z.string().describe('Details about any associated risks, such as links to illicit activities, known scams, suspicious transaction patterns, or network vulnerabilities.'),
  verificationStatus: z.string().describe('The verification status of the address (e.g., "Verified", "Unverified", "High Confidence", "Low Confidence").'),
  trustScore: z.number().int().min(0).max(100).describe('A numerical score (0-100) representing the overall trustworthiness of the address.'),
});
export type AddressLookupOutput = z.infer<typeof AddressLookupOutputSchema>;

/**
 * Initiates an AI-powered analysis of a given crypto wallet address or public ledger ID.
 *
 * @param input - An object containing the address to analyze.
 * @returns A promise that resolves to an object containing the transaction history summary, associated risks, verification status, and a trust score.
 */
export async function lookupAddressInsights(input: AddressLookupInput): Promise<AddressLookupOutput> {
  try {
    return await addressLookupFlow(input);
  } catch (error) {
    console.error('Error in lookupAddressInsights:', error);
    throw error;
  }
}

// Defines the prompt for the address lookup AI model.
const addressLookupPrompt = ai.definePrompt({
  name: 'addressLookupPrompt',
  input: {schema: AddressLookupInputSchema},
  output: {schema: AddressLookupOutputSchema},
  prompt: `You are an expert blockchain analyst and security specialist. Your task is to provide a comprehensive analysis of a given crypto wallet address or public ledger ID.

Analyze the provided address and generate:
1. A concise summary of its transaction history.
2. Any associated risks, including but not limited to, links to illicit activities, known scams, suspicious transaction patterns, or network vulnerabilities.
3. Its verification status, indicating confidence in its legitimacy or known associations.
4. An overall trust score from 0 to 100, where 100 is highly trustworthy and 0 is completely untrustworthy.

Address to analyze: {{{address}}}`,
});

// Defines the Genkit flow for address lookup.
const addressLookupFlow = ai.defineFlow(
  {
    name: 'addressLookupFlow',
    inputSchema: AddressLookupInputSchema,
    outputSchema: AddressLookupOutputSchema,
  },
  async (input) => {
    try {
      if (!process.env.GOOGLE_GENAI_API_KEY && !process.env.GEMINI_API_KEY) {
        throw new Error('Missing Gemini API key: neither GOOGLE_GENAI_API_KEY nor GEMINI_API_KEY is configured.');
      }
      const {output} = await addressLookupPrompt(input);
      if (!output) {
        throw new Error('AI failed to generate address insights. The model did not return a valid output.');
      }
      return output;
    } catch (error) {
      console.error('Error in addressLookupFlow:', error);
      throw error;
    }
  }
);
