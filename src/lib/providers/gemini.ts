// Gemini provider - coming soon

export interface GeminiOptions {
  text: string;
  prompt: string;
}

export function geminiGrammarCheck(): Promise<string> {
  return Promise.reject(new Error("Gemini support is coming soon."));
}
