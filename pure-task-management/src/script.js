const priorities = [
  { value: 0, label: "معمولی", className: "priority code-0" },
  { value: 1, label: "مهم", className: "priority code-1" },
  { value: 2, label: "خیلی مهم", className: "priority code-2" },
  { value: 3, label: "فوری", className: "priority code-3" },
  { value: 4, label: "خیلی فوری", className: "priority code-4" },
];

const taskStatus = [
  {
    id: crypto.randomUUID(),
    value: "COMPLETED",
    title: "تکمیل شده",
  },
  {
    id: crypto.randomUUID(),
    value: "ON-GOING",
    title: "درحال انجام",
  },
  {
    id: crypto.randomUUID(),
    value: "PENDING",
    title: "در انتظار",
  },
  {
    id: crypto.randomUUID(),
    value: "PAUSED",
    title: "متوقف شده",
  },
  {
    id: crypto.randomUUID(),
    value: "DELETED",
    title: "حذف شده",
  },
];

const sortOptions = [
  {
    id: crypto.randomUUID(),
    title: "همه",
    value: "ALL",
    icon: '<i class="fa-solid fa-list-ul"></i>',
  },
  {
    id: crypto.randomUUID(),
    title: "تکمیل شده ها",
    value: "COMPLETED",
    icon: '<i class="fa-solid fa-check-double"></i>',
  },
  {
    id: crypto.randomUUID(),
    value: "ON-GOING",
    title: "درحال انجام",
    icon: '<i class="fa-solid fa-spinner"></i>',
  },
  {
    id: crypto.randomUUID(),
    value: "PENDING",
    title: "در انتظار",
    icon: '<i class="fa-solid fa-info"></i>',
  },
  {
    id: crypto.randomUUID(),
    value: "PAUSED",
    title: "متوقف شده ها",
    icon: '<i class="fa-solid fa-circle-stop"></i>',
  },
];

// In Array Baraye Dropdown [نمایش فقط آیتم های ...] Hast
const filterOpts = [
  {
    id: crypto.randomUUID(),
    title: "همه",
    value: "ALL",
    icon: '<i class="fa-solid fa-list-ul"></i>',
  },
  {
    id: crypto.randomUUID(),
    title: "تکمیل شده ها",
    value: "COMPLETED",
    icon: '<i class="fa-solid fa-check-double"></i>',
  },
  {
    id: crypto.randomUUID(),
    value: "ON-GOING",
    title: "درحال انجام",
    icon: '<i class="fa-solid fa-spinner"></i>',
  },
  {
    id: crypto.randomUUID(),
    value: "PENDING",
    title: "در انتظار",
    icon: '<i class="fa-solid fa-info"></i>',
  },
  {
    id: crypto.randomUUID(),
    value: "PAUSED",
    title: "متوقف شده ها",
    icon: '<i class="fa-solid fa-circle-stop"></i>',
  },
];

