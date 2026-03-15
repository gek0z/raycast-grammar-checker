/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** Model - The AI model to use for grammar checking */
  "model": "gpt-5.4" | "gpt-5.3-codex" | "gpt-5.2-codex" | "gpt-5.2" | "gpt-5.1-codex-max" | "gpt-5.1-codex" | "gpt-5.1" | "gpt-5-codex" | "gpt-5" | "gpt-5.1-codex-mini" | "gpt-5-codex-mini" | "gemini-2.5-flash" | "gemini-2.5-pro",
  /** Grammar Check Prompt - Custom instruction for the grammar checker. The text to check is sent as the user message. */
  "prompt": string,
  /** Gemini API Key - Required for Gemini models. Get a free key at https://aistudio.google.com/apikey */
  "geminiApiKey"?: string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `check-grammar` command */
  export type CheckGrammar = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `check-grammar` command */
  export type CheckGrammar = {}
}

