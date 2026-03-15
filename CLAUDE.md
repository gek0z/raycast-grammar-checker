# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Raycast extension that grammar-checks clipboard text using OpenAI's ChatGPT Codex backend. Authenticates via OAuth PKCE (same flow as Codex CLI), no API keys needed. Supports multiple models with a provider architecture for future expansion (e.g. Gemini).

## Commands

```bash
bun install          # Install dependencies
bun run dev          # Start Raycast development mode
bun run build        # Build for production
bun run lint         # Lint
bun run fix-lint     # Lint with auto-fix
bun run test         # Run tests (vitest)
bun run test:watch   # Run tests in watch mode
```

Run a single test file:
```bash
bunx vitest run src/lib/__tests__/api.test.ts
```

## Linting

`bun run lint` runs three checks in order: package.json validation, ESLint, and Prettier. `bun run fix-lint` auto-fixes what it can. ESLint config is in `eslint.config.js` (flat config using `@raycast/eslint-config`).

Git hooks in `.githooks/` (configured via `core.hooksPath`):
- **pre-commit**: runs `bun run lint` (ESLint + Prettier)
- **pre-push**: runs `bun run test`

After cloning, run:
```bash
git config core.hooksPath .githooks
```

## Architecture

Single-command extension (`check-grammar`) with a provider-based architecture:

- **`src/check-grammar.tsx`** — Main React component. Handles all UI states: auth prompt, loading animation (ASCII art + progress bar), result view with inline diff (LCS-based word diff), history list/detail views. Reads user preferences for model and prompt. Validates clipboard content before making API calls.
- **`src/lib/oauth.ts`** — OAuth 2.0 PKCE flow against `auth.openai.com`. Spins up a temporary HTTP server on port 1455 (binds to `127.0.0.1`, redirect URI uses `localhost`). Tokens stored in Raycast `LocalStorage` with automatic refresh.
- **`src/lib/api.ts`** — Shared helpers (JWT decoding, account ID extraction, SSE stream parsing) and unified `checkGrammar()` entry point that routes to the appropriate provider.
- **`src/lib/providers/codex.ts`** — ChatGPT Codex backend provider. Calls `chatgpt.com/backend-api/codex/responses` with streaming SSE. Sends `ChatGPT-Account-ID` header extracted from JWT.
- **`src/lib/providers/gemini.ts`** — Gemini provider placeholder (coming soon).
- **`src/lib/history.ts`** — Persists grammar check history in `LocalStorage`. Max 50 entries, auto-expires after 7 days.
- **`src/lib/log.ts`** — Debug logging to file in extension support path.

### Preferences

Defined in `package.json` under `preferences`:
- **model**: dropdown (gpt-5.4, gpt-5.3-codex, gpt-5.2-codex, gemini)
- **prompt**: text field for custom grammar check instruction

## Testing

Tests use vitest with `@raycast/api` aliased to a stub at `src/lib/__tests__/__mocks__/raycast-api.ts` (configured in `vitest.config.ts`). Tests that need real `LocalStorage` behavior use `vi.mock` to provide an in-memory store (see `history.test.ts`). Provider tests mock `fetch` globally (see `providers/codex.test.ts`).
