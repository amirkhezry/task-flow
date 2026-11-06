import { createContext, useContext, useEffect, useMemo, useState } from "react";

const LanguageContext = createContext(null);

const translations = {
  fa: {
    appName: "تسک‌فلو",
    appTagline: "مدیریت هوشمند کارها",
    pageTitle: "تسک‌فلو — مدیریت هوشمند وظایف",
    mainNavigation: "ناوبری اصلی",
    workspaceEyebrow: "فضای مدیریت وظایف",
    navDashboard: "داشبورد",
    navTasks: "وظایف من",
    navAbout: "درباره پروژه",
    language: "زبان",
    persian: "فارسی",
    english: "English",
    dashboardEyebrow: "مدیریت هوشمند وظایف",
    dashboardTitle: "روزت رو هدفمندتر بساز",
    dashboardDescription: "همه کارهایت را یک‌جا مدیریت کن، روی اولویت‌ها تمرکز کن و قدم‌به‌قدم پیشرفتت را ببین.",
    createTask: "تسک جدید",
    totalTasks: "کل وظایف",
    pendingTasks: "در انتظار انجام",
    completedTasks: "انجام‌شده",
    importantTasks: "مهم و فوری",
    allRegistered: "تمام وظایف ثبت‌شده",
    leftToDo: "وظایف باقی‌مانده",
    finishedTasks: "وظایف به پایان رسیده",
    priorityTasks: "وظایف مهمِ باقی‌مانده",
    overallProgress: "پیشرفت کلی",
    progressDescription: "نمایی از عملکرد و میزان انجام وظایف",
    progressOf: "از",
    progressCompleted: "وظیفه تکمیل شده",
    myTasks: "وظایف من",
    tasksDescription: "برنامه‌ات را مرتب کن و کار بعدی را شروع کن.",
    searchPlaceholder: "جستجو در عنوان یا توضیحات...",
    filterAll: "همه",
    filterPending: "در انتظار",
    filterCompleted: "انجام‌شده",
    filterImportant: "مهم",
    noResults: "نتیجه‌ای پیدا نشد",
    noTasks: "هنوز وظیفه‌ای ثبت نکرده‌ای",
    searchHint: "عبارت جستجو یا فیلتر انتخاب‌شده را تغییر بده.",
    emptyHint: "با ساخت اولین تسک، برنامه‌ریزی روزانه‌ات را شروع کن.",
    createFirstTask: "ساخت اولین تسک",
    completedLabel: "انجام‌شده",
    pendingLabel: "در انتظار",
    importantLabel: "مهم",
    markComplete: "علامت‌گذاری به‌عنوان انجام‌شده",
    deleteTask: "حذف وظیفه",
    addModalTitle: "ساخت وظیفه جدید",
    taskTitle: "عنوان وظیفه",
    taskTitlePlaceholder: "مثلاً: مطالعه فصل سوم الگوریتم",
    taskDescription: "توضیحات",
    taskDescriptionPlaceholder: "جزئیات یا یادداشت‌های مربوط به این وظیفه...",
    markImportant: "این وظیفه مهم است",
    requiredFields: "لطفاً عنوان و توضیحات را وارد کن.",
    cancel: "انصراف",
    create: "ایجاد وظیفه",
    close: "بستن",
    footerMade: "ساخته‌شده با",
    footerBy: "توسط",
    taskCreated: "وظیفه با موفقیت اضافه شد.",
    taskDeleted: "وظیفه حذف شد.",
    taskCompleted: "آفرین! یک وظیفه دیگر انجام شد.",
  },
  en: {
    appName: "TaskFlow",
    appTagline: "Smart task management",
    pageTitle: "TaskFlow — Smart Task Management",
    mainNavigation: "Main navigation",
    workspaceEyebrow: "YOUR WORKSPACE",
    navDashboard: "Dashboard",
    navTasks: "My Tasks",
    navAbout: "About",
    language: "Language",
    persian: "فارسی",
    english: "English",
    dashboardEyebrow: "SMART TASK MANAGEMENT",
    dashboardTitle: "Make your day more intentional",
    dashboardDescription: "Manage everything in one place, focus on priorities, and track your progress one step at a time.",
    createTask: "New task",
    totalTasks: "Total tasks",
    pendingTasks: "In progress",
    completedTasks: "Completed",
    importantTasks: "Important",
    allRegistered: "All tasks you've created",
    leftToDo: "Tasks left to do",
    finishedTasks: "Tasks you've finished",
    priorityTasks: "Important unfinished tasks",
    overallProgress: "Overall progress",
    progressDescription: "A snapshot of your productivity and completed work",
    progressOf: "of",
    progressCompleted: "tasks completed",
    myTasks: "My tasks",
    tasksDescription: "Stay organized and focus on what comes next.",
    searchPlaceholder: "Search by title or description...",
    filterAll: "All",
    filterPending: "Pending",
    filterCompleted: "Completed",
    filterImportant: "Important",
    noResults: "No results found",
    noTasks: "You haven't added any tasks yet",
    searchHint: "Try changing your search term or selected filter.",
    emptyHint: "Create your first task and start planning your day.",
    createFirstTask: "Create your first task",
    completedLabel: "Completed",
    pendingLabel: "Pending",
    importantLabel: "Important",
    markComplete: "Mark as completed",
    deleteTask: "Delete task",
    addModalTitle: "Create a new task",
    taskTitle: "Task title",
    taskTitlePlaceholder: "e.g. Study chapter three of algorithms",
    taskDescription: "Description",
    taskDescriptionPlaceholder: "Add details or notes about this task...",
    markImportant: "Mark this task as important",
    requiredFields: "Please enter both a title and a description.",
    cancel: "Cancel",
    create: "Create task",
    close: "Close",
    footerMade: "Made with",
    footerBy: "by",
    taskCreated: "Task added successfully.",
    taskDeleted: "Task deleted.",
    taskCompleted: "Great work! Another task completed.",
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try {
      const saved = localStorage.getItem("app-language");
      return saved === "en" || saved === "fa" ? saved : "fa";
    } catch {
      return "fa";
    }
  });

  useEffect(() => {
    const direction = language === "fa" ? "rtl" : "ltr";
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
    document.documentElement.dataset.language = language;
    document.title = translations[language].pageTitle;
    try {
      localStorage.setItem("app-language", language);
    } catch {
      // The app remains usable when browser storage is unavailable.
    }
  }, [language]);

  const value = useMemo(() => {
    const t = (key) => translations[language]?.[key] ?? key;
    return {
      language,
      setLanguage,
      direction: language === "fa" ? "rtl" : "ltr",
      t,
    };
  }, [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}
