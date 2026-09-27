# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

Lint and type-check commands
- `npm run lint` — Run ESLint
- `npx tsc --noEmit` — Type-check the project

Build commands
- `npm run build` — Build for production
- `npm run dev` — Start development server

Testing
- No test framework configured
- Run `npm run dev` and manually test at http://localhost:3000
