# TaskFlow — Bilingual Task Manager

A modern, responsive task management application built with **React** and **Vite**. TaskFlow helps users organize their daily tasks through a clean dashboard, task filters, progress tracking, and a bilingual interface.

The application supports **Persian (RTL)** and **English (LTR)**, with persistent preferences and task data using browser `localStorage`.

## Features

### Task Management

- Create new tasks with a title and description.
- Mark tasks as important.
- Mark tasks as completed.
- Delete tasks.
- Search tasks by title or description.
- Filter tasks by status:
  - All tasks
  - Pending tasks
  - Completed tasks
  - Important tasks

### Dashboard

- Overview of total tasks.
- Pending and completed task statistics.
- Important task counter.
- Overall completion percentage.
- Visual progress indicator.

### Bilingual Interface

- Persian and English language support.
- One-click language switching.
- Automatic RTL and LTR layout direction.
- Persistent language preference.
- Localized interface text.

### User Experience

- Responsive design for desktop, tablet, and mobile.
- Modal form for creating tasks.
- Form validation.
- Close modal with the Escape key or by clicking outside.
- Toast notifications for task actions.
- Persistent task data using `localStorage`.

## Tech Stack

- **React 18.3.1** — Building the user interface
- **Vite 5.4.8** — Development server and build tool
- **JavaScript (ES Modules)** — Application logic
- **CSS** — Responsive styling and layout
- **Font Awesome** — Icons
- **ESLint 9.11.1** — Code linting

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed.

### Installation

Clone the repository:

```bash
git clone https://github.com/amirkhezry/task-flow.git
```

Navigate to the project directory:

```bash
cd task-flow
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal.

## Production Build

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Data Storage

TaskFlow uses browser `localStorage` to persist application data.

| Storage Key    | Description                                      |
| -------------- | ------------------------------------------------ |
| `todos`        | Stores user-created tasks and their information. |
| `app-language` | Stores the selected interface language.          |

Switching between Persian and English changes the application interface, but does not translate user-created task titles or descriptions.

Task data is stored locally in the browser and is not synchronized between devices.

## Project Structure

```text
task-flow/
├── public/
│   ├── fonts/
│   └── images/
├── src/
│   ├── components/
│   │   ├── AddTodoModal/
│   │   ├── Footer/
│   │   ├── Header/
│   │   └── Todo/
│   ├── context/
│   │   └── LanguageContext.jsx
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

## Future Improvements

- Edit existing tasks.
- Add task deadlines and priority levels.
- Sort tasks by date or priority.
- Add dark mode.
- Add cloud-based data synchronization.

## Author

**Amir Khezri**

GitHub: [@amirkhezry](https://github.com/amirkhezry)
