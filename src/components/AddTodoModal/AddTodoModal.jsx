import { useEffect, useState } from "react";
import "./AddTodoModal.css";
import { useLanguage } from "../../context/LanguageContext";

function AddTodoModal({ onshow, onclose }) {
  const { t } = useLanguage();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isImportant, setIsImportant] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") onclose();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onclose]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim() || !description.trim()) {
      setError(t("requiredFields"));
      return;
    }

    onshow(title, description, isImportant);
  }

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onclose();
      }}
    >
      <section
        className="task-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <header className="modal-heading">
          <div className="modal-heading-icon">
            <i className="fa-solid fa-square-plus" aria-hidden="true" />
          </div>
          <div>
            <h2 id="modal-title">{t("addModalTitle")}</h2>
            <p>{t("tasksDescription")}</p>
          </div>
          <button
            className="modal-close"
            type="button"
            onClick={onclose}
            aria-label={t("close")}
          >
            <i className="fa-solid fa-xmark" />
          </button>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="modal-form-body">
            <label className="form-field">
              <span>{t("taskTitle")}</span>
              <input
                autoFocus
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                  setError("");
                }}
                placeholder={t("taskTitlePlaceholder")}
                maxLength={100}
              />
            </label>

            <label className="form-field">
              <span>{t("taskDescription")}</span>
              <textarea
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                  setError("");
                }}
                placeholder={t("taskDescriptionPlaceholder")}
                rows={4}
                maxLength={600}
              />
            </label>

            <label className="important-checkbox">
              <input
                type="checkbox"
                checked={isImportant}
                onChange={(event) => setIsImportant(event.target.checked)}
              />
              <span className="custom-checkbox"><i className="fa-solid fa-check" /></span>
              <span>{t("markImportant")}</span>
            </label>

            {error && <p className="form-error" role="alert">{error}</p>}
          </div>

          <footer className="modal-actions">
            <button className="modal-cancel" type="button" onClick={onclose}>
              {t("cancel")}
            </button>
            <button className="modal-submit" type="submit">
              <i className="fa-solid fa-plus" aria-hidden="true" />
              {t("create")}
            </button>
          </footer>
        </form>
      </section>
    </div>
  );
}

export default AddTodoModal;
