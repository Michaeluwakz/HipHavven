// src/ai/flows/property-suggestion-chatbot.ts
'use server';

/**
 * @fileOverview An AI chatbot that suggests properties based on user preferences.
 *
 * - propertySuggestionChatbot - A function that handles the property suggestion process.
 * - PropertySuggestionChatbotInput - The input type for the propertySuggestionChatbot function.
 * - PropertySuggestionChatbotOutput - The return type for the propertySuggestionChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PropertySuggestionChatbotInputSchema = z.object({
  userPreferences: z
    .string()
    .describe('The user preferences for property suggestions (e.g., \'a house with a pool near the beach\').'),
});
export type PropertySuggestionChatbotInput = z.infer<typeof PropertySuggestionChatbotInputSchema>;

const PropertySuggestionChatbotOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('A list of property suggestions based on the user preferences.'),
});
export type PropertySuggestionChatbotOutput = z.infer<typeof PropertySuggestionChatbotOutputSchema>;

export async function propertySuggestionChatbot(input: PropertySuggestionChatbotInput): Promise<PropertySuggestionChatbotOutput> {
  return propertySuggestionChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'propertySuggestionChatbotPrompt',
  input: {schema: PropertySuggestionChatbotInputSchema},
  output: {schema: PropertySuggestionChatbotOutputSchema},
  prompt: `You are a helpful AI chatbot that suggests properties based on user preferences.

  User Preferences: {{{userPreferences}}}

  Please provide a list of property suggestions based on the user preferences.`,
});

const propertySuggestionChatbotFlow = ai.defineFlow(
  {
    name: 'propertySuggestionChatbotFlow',
    inputSchema: PropertySuggestionChatbotInputSchema,
    outputSchema: PropertySuggestionChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
