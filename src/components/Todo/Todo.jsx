import { useLanguage } from "../../context/LanguageContext";

function Todo({
  id,
  title,
  description,
  complete,
  isimportant,
  onComplete,
  onDelete,
}) {
  const { t } = useLanguage();

  return (
    <article className={`task-card ${complete ? "task-card-complete" : ""}`}>
      <div className="task-main">
        <span className={`task-status-icon ${complete ? "is-complete" : ""}`}>
          <i className={`fa-solid ${complete ? "fa-check" : "fa-list-check"}`} aria-hidden="true" />
        </span>
        <div className="task-content">
          <h3 className={complete ? "task-title-complete" : ""}>{title}</h3>
          <p className="task-desc">{description}</p>
        </div>
      </div>

      <div className="task-actions">
        <div className="task-badges">
          {complete && <span className="task-badge badge-completed">{t("completedLabel")}</span>}
          {!complete && <span className="task-badge badge-pending">{t("pendingLabel")}</span>}
          {isimportant && <span className="task-badge badge-important"><i className="fa-solid fa-star" /> {t("importantLabel")}</span>}
        </div>

        <div className="task-buttons">
          {!complete && (
            <button
              className="icon-action complete-action"
              type="button"
              onClick={() => onComplete(id)}
              aria-label={t("markComplete")}
              title={t("markComplete")}
            >
              <i className="fa-solid fa-check" aria-hidden="true" />
            </button>
          )}
          <button
            className="icon-action delete-action"
            type="button"
            onClick={() => onDelete(id)}
            aria-label={t("deleteTask")}
            title={t("deleteTask")}
          >
            <i className="fa-solid fa-trash-can" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default Todo;
