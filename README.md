<p align="center">
  <img src="public/favicon.png" alt="Claude Resume" width="80" />
</p>

<h1 align="center">Claude Resume</h1>

<p align="center">
  An interactive CLI-style portfolio that mimics the <a href="https://claude.ai/code">Claude Code</a> terminal.<br/>
  Built with Next.js 15, React 19, TypeScript, and Tailwind CSS 4.
</p>

<p align="center">
  <a href="https://alfonsobaena.dev">Live Demo</a>
</p>

---

## What is this?

A developer portfolio disguised as a terminal. Visitors interact with it using slash commands — just like Claude Code — to explore work experience, skills, certifications, and more. Plain text input triggers an AI chat powered by Google Gemini that responds in character.

```
❯ /about          → Summary & current role
❯ /experience     → Work history timeline
❯ /skills         → Technical skills grouped by category
❯ /certs          → Professional certifications
❯ /contact        → Links, socials & email
❯ /download       → Download PDF resume
❯ /model          → Switch between career "models"
❯ /doctor         → Run diagnostics (humorous)
❯ /cost           → Cost analysis report
❯ /usage          → Session usage stats
❯ /init           → Generate a fake CLAUDE.md
❯ Just type...    → Chat with the AI clone
```

## Tech Stack

- **Framework**: Next.js 15 (App Router, Turbopack)
- **UI**: React 19, Tailwind CSS 4
- **Language**: TypeScript
- **AI**: Google Gemini 2.5 Flash Lite via Vercel AI SDK (Edge runtime, streaming)
- **Font**: JetBrains Mono
- **Data**: JSON Resume format

## Getting Started

```bash
git clone https://github.com/ambaena/claude-resume.git
cd claude-resume
pnpm install
```

Create a `.env.local` file:

```env
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key
```

```bash
pnpm dev     # Start dev server with Turbopack
pnpm build   # Production build
pnpm start   # Start production server
```

## Project Structure

```
src/
├── app/                  # Next.js App Router
│   ├── page.tsx          # Main page
│   └── api/chat/         # AI chat endpoint (Edge runtime)
├── components/
│   ├── Terminal.tsx       # Central orchestrator — owns all state
│   ├── WelcomeScreen.tsx  # Welcome box with tips & recent activity
│   ├── InputBox.tsx       # Input with slash menu
│   └── commands/          # One component per command
│       ├── About.tsx
│       ├── Experience.tsx
│       ├── Skills.tsx
│       ├── Models.tsx
│       ├── Doctor.tsx
│       └── ...
├── config/
│   ├── site.ts            # Site metadata (name, version, URL)
│   └── personal.ts        # Personal config (career models, fun content)
├── lib/
│   ├── commands.ts        # Command registry & matching
│   ├── resume-data.ts     # Typed resume.json wrapper
│   ├── system-prompt.ts   # AI system prompt (auto-populated from resume)
│   └── colors.ts          # Color palette
└── data/
    └── resume.json        # Resume data (JSON Resume format)
```

## How It Works

**Terminal.tsx** is the brain. It manages input state, command history, theme, and the AI chat flow. Everything flows through it.

**Commands** are registered in `src/lib/commands.ts`. Each command maps to a React component in `src/components/commands/`. Unrecognized commands trigger fuzzy matching with Levenshtein distance suggestions.

**AI Chat**: Any non-slash input goes to `/api/chat` (Edge runtime) which streams responses from Gemini. The system prompt is auto-generated from `resume.json` data, so the AI always has accurate, up-to-date information.

**Resume data** lives in `resume.json` at the project root using the [JSON Resume](https://jsonresume.org/) schema. All components read from this single source of truth.
