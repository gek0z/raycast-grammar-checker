/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** Model - The AI model to use for grammar checking */
  "model": "gpt-5.4" | "gpt-5.3-codex" | "gpt-5.2-codex" | "gemini",
  /** Grammar Check Prompt - Custom instruction for the grammar checker. The text to check is sent as the user message. */
  "prompt": string
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

