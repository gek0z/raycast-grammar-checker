# Grammar Checker

A Raycast extension that grammar-checks text from your clipboard using OpenAI or Google Gemini.

## Requirements

- **OpenAI models**: Requires a ChatGPT **Plus** or **Pro** account. Authenticates via OAuth, no API key needed.
- **Gemini models**: Requires a free Gemini API key from [aistudio.google.com/apikey](https://aistudio.google.com/apikey).

## How it works

1. Copy text to your clipboard
2. Open Raycast and run **Check Grammar**
3. See the corrected text with an inline diff highlighting changes, plus a metadata sidebar with word/character count, correction count, and model
4. Press Enter to copy the corrected text to your clipboard

All checks are saved to a local history (up to 50 entries, 7 days) that you can browse with `Cmd + Y`.

## Settings

Open settings with `Cmd + Shift + ,` from within the extension.

| Setting | Description |
|---|---|
| **Model** | Choose between OpenAI models (GPT-5.4, etc.) or Gemini models (2.5 Flash, 2.5 Pro) |
| **Grammar Check Prompt** | Customize the instruction sent to the model |
| **Gemini API Key** | Required when using Gemini models |

## Authentication

### OpenAI

On first use with an OpenAI model, you'll be prompted to sign in with your OpenAI account. Requires a ChatGPT **Plus** or **Pro** subscription. The extension uses the same OAuth flow as the [Codex CLI](https://github.com/openai/codex) (PKCE with a localhost callback). Tokens are stored locally and refreshed automatically.

1. Press Enter on "Sign in with OpenAI"
2. Complete the login in your browser
3. You'll see "Authenticated!", close the tab and return to Raycast

### Gemini

Set your API key in Settings. No sign-in flow needed.

## Actions

| Action | Shortcut |
|---|---|
| Copy Corrected Text | `Enter` |
| Paste Corrected Text | `Cmd + V` |
| Re-check Clipboard | `Cmd + R` |
| View History | `Cmd + Y` |
| Settings | `Cmd + Shift + ,` |
| Clear History | `Cmd + Shift + Delete` |
| Sign Out | `Cmd + Shift + O` |

## Development

```bash
bun install
git config core.hooksPath .githooks
bun run dev
```

To run with mock API responses (no real calls):

```bash
bun run dev:mock
```

Git hooks run automatically:
- **pre-commit**: ESLint + Prettier on staged files
- **pre-push**: tests (only when source files changed)

## Technical details

- **OpenAI Auth**: OAuth 2.0 PKCE flow via `auth.openai.com` with a temporary localhost server on port 1455. Requires ChatGPT Plus or Pro.
- **OpenAI API**: ChatGPT Codex backend (`chatgpt.com/backend-api/codex/responses`) with streaming SSE
- **Gemini API**: Google Generative Language API (`generativelanguage.googleapis.com/v1beta`) with API key auth
- **Models**: OpenAI (GPT-5.4, GPT-5.3 Codex, GPT-5.2 Codex, and more), Gemini (2.5 Flash, 2.5 Pro)
- **Token storage**: Raycast `LocalStorage` with automatic refresh
- **History**: last 50 checks stored locally, auto-expires after 7 days
- **Clipboard validation**: checks for text content before making API calls
