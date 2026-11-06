# TaskFlow — Bilingual Task Manager

TaskFlow is a responsive task-management dashboard built with React and Vite. The interface supports Persian (RTL) and English (LTR), while keeping task data and the selected language in browser storage.

## Features

- Persian and English interface with one-click language switching
- Automatic RTL/LTR layout direction
- Persistent language preference
- Create, complete, and delete tasks
- Mark tasks as important
- Search by task title or description
- Filter all, pending, completed, and important tasks
- Dashboard statistics and completion progress
- Responsive layout for desktop, tablet, and mobile
- Modal form validation, Escape-to-close, and click-outside-to-close
- Toast feedback for task actions
- Existing tasks stored in `localStorage` are retained

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Data storage

Tasks are stored in the browser under the `todos` localStorage key. The selected interface language is stored under `app-language`.

Switching the interface language does not translate user-created task titles or descriptions; it only changes application interface text.

## Tech stack

- React 18
- Vite 5
- CSS
- Font Awesome icons
