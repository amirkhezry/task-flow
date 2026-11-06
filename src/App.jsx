import "./App.css";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "./context/LanguageContext";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Todo from "./components/Todo/Todo";
import AddTodoModal from "./components/AddTodoModal/AddTodoModal";

function readInitialTodos() {
  try {
    const savedTodos = localStorage.getItem("todos");
    if (!savedTodos) return [];
    const parsedTodos = JSON.parse(savedTodos);
    return Array.isArray(parsedTodos) ? parsedTodos : [];
  } catch {
    return [];
  }
}

function App() {
  const { t, language } = useLanguage();
  const [newTodoOpen, setNewTodoOpen] = useState(false);
  const [todos, setTodos] = useState(readInitialTodos);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem("todos", JSON.stringify(todos));
    } catch {
      // Keep the interface functional if storage is disabled or full.
    }
  }, [todos]);

  useEffect(() => {
    if (!toast) return undefined;
    const timeoutId = window.setTimeout(() => setToast(""), 2600);
    return () => window.clearTimeout(timeoutId);
  }, [toast]);

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((todo) => todo.complete).length;
    const pending = total - completed;
    const important = todos.filter(
      (todo) => todo.isimportant && !todo.complete,
    ).length;

    return {
      total,
      completed,
      pending,
      important,
      progress: total === 0 ? 0 : Math.round((completed / total) * 100),
    };
  }, [todos]);

  const filteredTodos = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLocaleLowerCase(
      language === "fa" ? "fa-IR" : "en-US",
    );

    return todos.filter((todo) => {
      const title = String(todo.title ?? "").toLocaleLowerCase(
        language === "fa" ? "fa-IR" : "en-US",
      );
      const description = String(todo.description ?? "").toLocaleLowerCase(
        language === "fa" ? "fa-IR" : "en-US",
      );
      const matchesSearch =
        !normalizedQuery ||
        title.includes(normalizedQuery) ||
        description.includes(normalizedQuery);

      const matchesFilter =
        activeFilter === "all" ||
        (activeFilter === "pending" && !todo.complete) ||
        (activeFilter === "completed" && todo.complete) ||
        (activeFilter === "important" && todo.isimportant && !todo.complete);

      return matchesSearch && matchesFilter;
    });
  }, [todos, activeFilter, searchQuery, language]);

  const filters = [
    { id: "all", label: t("filterAll") },
    { id: "pending", label: t("filterPending") },
    { id: "completed", label: t("filterCompleted") },
    { id: "important", label: t("filterImportant") },
  ];

  function addTodo(title, description, isimportant) {
    setTodos((current) => [
      ...current,
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        title: title.trim(),
        description: description.trim(),
        isimportant,
        complete: false,
      },
    ]);
    setNewTodoOpen(false);
    setToast(t("taskCreated"));
  }

  function completeTodo(id) {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, complete: true } : todo,
      ),
    );
    setToast(t("taskCompleted"));
  }

  function deleteTodo(id) {
    setTodos((current) => current.filter((todo) => todo.id !== id));
    setToast(t("taskDeleted"));
  }

  return (
    <div className="app-shell" id="dashboard">
      <Header />

      <main className="dashboard page-container">
        <section className="dashboard-heading">
          <div className="dashboard-copy">
            <span className="dashboard-eyebrow">{t("dashboardEyebrow")}</span>
            <h1>{t("dashboardTitle")}</h1>
            <p>{t("dashboardDescription")}</p>
          </div>

          <button
            className="primary-action"
            type="button"
            onClick={() => setNewTodoOpen(true)}
          >
            <i className="fa-solid fa-plus" aria-hidden="true" />
            <span>{t("createTask")}</span>
          </button>
        </section>

        <section className="stats-grid" aria-label={t("totalTasks")}>
          <article className="stat-card stat-card-purple">
            <div className="stat-topline">
              <span className="stat-icon"><i className="fa-solid fa-layer-group" /></span>
              <span className="stat-trend">{t("totalTasks")}</span>
            </div>
            <strong className="stat-number">{stats.total}</strong>
            <span className="stat-caption">{t("allRegistered")}</span>
          </article>

          <article className="stat-card stat-card-orange">
            <div className="stat-topline">
              <span className="stat-icon"><i className="fa-regular fa-clock" /></span>
              <span className="stat-trend">{t("pendingTasks")}</span>
            </div>
            <strong className="stat-number">{stats.pending}</strong>
            <span className="stat-caption">{t("leftToDo")}</span>
          </article>

          <article className="stat-card stat-card-green">
            <div className="stat-topline">
              <span className="stat-icon"><i className="fa-solid fa-check" /></span>
              <span className="stat-trend">{t("completedTasks")}</span>
            </div>
            <strong className="stat-number">{stats.completed}</strong>
            <span className="stat-caption">{t("finishedTasks")}</span>
          </article>

          <article className="stat-card stat-card-rose">
            <div className="stat-topline">
              <span className="stat-icon"><i className="fa-solid fa-star" /></span>
              <span className="stat-trend">{t("importantTasks")}</span>
            </div>
            <strong className="stat-number">{stats.important}</strong>
            <span className="stat-caption">{t("priorityTasks")}</span>
          </article>
        </section>

        <section className="progress-card">
          <div className="progress-heading">
            <div>
              <h2>{t("overallProgress")}</h2>
              <p>{t("progressDescription")}</p>
            </div>
            <strong>{stats.progress}%</strong>
          </div>

          <div
            className="progress-track"
            role="progressbar"
            aria-label={t("overallProgress")}
            aria-valuenow={stats.progress}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              className="progress-fill"
              style={{ width: `${stats.progress}%` }}
            />
          </div>

          <div className="progress-meta">
            <span>{stats.completed} {t("progressOf")} {stats.total} {t("progressCompleted")}</span>
            <span>{stats.pending} {t("pendingTasks")}</span>
          </div>
        </section>

        <section className="tasks-section" id="tasks">
          <div className="tasks-heading">
            <div>
              <span className="section-kicker">{t("workspaceEyebrow")}</span>
              <h2>{t("myTasks")}</h2>
              <p>{t("tasksDescription")}</p>
            </div>
            <span className="task-count">{filteredTodos.length} / {todos.length}</span>
          </div>

          <div className="tasks-toolbar">
            <label className="search-box">
              <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
              <input
                type="search"
                placeholder={t("searchPlaceholder")}
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                aria-label={t("searchPlaceholder")}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="clear-search"
                  onClick={() => setSearchQuery("")}
                  aria-label={t("close")}
                >
                  <i className="fa-solid fa-xmark" />
                </button>
              )}
            </label>

            <div className="filter-list" role="group" aria-label={t("myTasks")}>
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  className={activeFilter === filter.id ? "filter-active" : ""}
                  onClick={() => setActiveFilter(filter.id)}
                  aria-pressed={activeFilter === filter.id}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div className="tasks-list">
            {filteredTodos.length > 0 ? (
              filteredTodos.map((todo) => (
                <Todo
                  key={todo.id}
                  {...todo}
                  onComplete={completeTodo}
                  onDelete={deleteTodo}
                />
              ))
            ) : (
              <div className="empty-state">
                <div className="empty-icon">
                  <i className="fa-regular fa-clipboard" aria-hidden="true" />
                </div>
                <h3>{searchQuery || activeFilter !== "all" ? t("noResults") : t("noTasks")}</h3>
                <p>{searchQuery || activeFilter !== "all" ? t("searchHint") : t("emptyHint")}</p>
                {!searchQuery && activeFilter === "all" && (
                  <button type="button" onClick={() => setNewTodoOpen(true)}>
                    <i className="fa-solid fa-plus" />
                    {t("createFirstTask")}
                  </button>
                )}
              </div>
            )}
          </div>
        </section>
      </main>

      {newTodoOpen && (
        <AddTodoModal
          onshow={addTodo}
          onclose={() => setNewTodoOpen(false)}
        />
      )}

      {toast && (
        <div className="toast-message" role="status">
          <i className="fa-solid fa-circle-check" aria-hidden="true" />
          {toast}
        </div>
      )}

      <Footer />
    </div>
  );
}

export default App;
