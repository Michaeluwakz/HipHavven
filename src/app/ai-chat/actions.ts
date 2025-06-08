'use server';

import { propertySuggestionChatbot, type PropertySuggestionChatbotInput, type PropertySuggestionChatbotOutput } from '@/ai/flows/property-suggestion-chatbot';

export async function getPropertySuggestions(input: PropertySuggestionChatbotInput): Promise<PropertySuggestionChatbotOutput | { error: string }> {
  try {
    const result = await propertySuggestionChatbot(input);
    return result;
  } catch (e) {
    console.error("Error calling AI flow:", e);
    const errorMessage = e instanceof Error ? e.message : "An unknown error occurred";
    return { error: `Failed to get suggestions: ${errorMessage}` };
  }
}
