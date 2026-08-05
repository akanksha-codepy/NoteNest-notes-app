# NoteNest — Upgrade notes and setup

This workspace has been scaffolded to become "NoteNest" — a premium notes/productivity app using React, Tailwind CSS and Framer Motion.

Local setup (install dependencies):

```bash
# from project root
npm install tailwindcss postcss autoprefixer framer-motion react-icons
# if you use pnpm/yarn use equivalent commands

# start dev server (vite)
npm run dev
```

Tailwind: `tailwind.config.cjs` and `postcss.config.cjs` were added. The project `src/index.css` contains Tailwind directives.

Files added:
- `src/context/NotesContext.jsx` — notes state and localStorage persistence
- `src/hooks/*` — localStorage + shortcuts
- `src/components/*` — UI components (Sidebar, Header, NoteCard, NoteEditor, Modal, StatsPanel, EmptyState)
- `src/pages/Home.jsx` — main layout and grid
- `tailwind.config.cjs`, `postcss.config.cjs`

Next steps:
- Install the packages above
- Run dev server and verify animations
- Customize styles and add further tests or integrations
