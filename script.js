"use strict";

/* ========== Конфигурация и демо-данные ========== */
const KEY = "ict_kg_market_v1";
const CATEGORIES = ["Разработка ПО", "Мобильные приложения", "Веб-студии", "Финтех", "Телеком и ИТ-инфраструктура", "Кибербезопасность", "Аутсорсинг и BPO", "Образование и EdTech"];
const CITIES = ["Бишкек", "Ош", "Каракол", "Джалал-Абад", "Нарын", "Токмок", "Баткен"];
const PTYPES = ["IT-услуга", "Программное обеспечение", "Цифровой продукт"];
const COLORS = ["#10b981", "#0e7490", "#34d399", "#0891b2", "#059669", "#22d3ee", "#065f46", "#164e63"];

// Все названия компаний и показатели — вымышленные, для демонстрации.
const SEED = {
  companies: [
    { id: 1, name: "АлатауСофт (демо)", category: "Разработка ПО", city: "Бишкек", employees: 120, year: 2012, price: 8000, site: "", services: "Заказная разработка, ERP, интеграции" },
    { id: 2, name: "ИссыкМобайл (демо)", category: "Мобильные приложения", city: "Бишкек", employees: 45, year: 2016, price: 5500, site: "", services: "iOS и Android, UX-дизайн" },
    { id: 3, name: "ТяньШань Веб (демо)", category: "Веб-студии", city: "Каракол", employees: 18, year: 2018, price: 1800, site: "", services: "Сайты, интернет-магазины, SEO" },
    { id: 4, name: "ОшПэй (демо)", category: "Финтех", city: "Ош", employees: 60, year: 2019, price: 12000, site: "", services: "Платёжные шлюзы, мобильный банкинг" },
    { id: 5, name: "СарыЧелек Телеком (демо)", category: "Телеком и ИТ-инфраструктура", city: "Бишкек", employees: 210, year: 2005, price: 15000, site: "", services: "Дата-центры, облако, связь" },
    { id: 6, name: "КыргызШит (демо)", category: "Кибербезопасность", city: "Бишкек", employees: 28, year: 2020, price: 6500, site: "", services: "Пентесты, аудит, SOC" },
    { id: 7, name: "ЮгКонтакт (демо)", category: "Аутсорсинг и BPO", city: "Джалал-Абад", employees: 95, year: 2017, price: 3000, site: "", services: "Колл-центр, разметка данных" },
    { id: 8, name: "ЭдуЛаб КР (демо)", category: "Образование и EdTech", city: "Бишкек", employees: 22, year: 2021, price: 2500, site: "", services: "LMS, онлайн-курсы, IT-обучение" },
    { id: 9, name: "НарынДиджитал (демо)", category: "Веб-студии", city: "Нарын", employees: 9, year: 2022, price: 1200, site: "", services: "Лендинги, SMM, брендинг" },
    { id: 10, name: "БишкекКод (демо)", category: "Разработка ПО", city: "Бишкек", employees: 75, year: 2014, price: 7000, site: "", services: "SaaS, облачные решения, DevOps" }
  ],
  products: [
    { id: 1, name: "Разработка корпоративного сайта", type: "IT-услуга", vendor: "ТяньШань Веб (демо)", price: 1500, unit: "проект", desc: "Дизайн, вёрстка, CMS" },
    { id: 2, name: "Мобильное приложение под ключ", type: "IT-услуга", vendor: "ИссыкМобайл (демо)", price: 6000, unit: "проект", desc: "iOS и Android" },
    { id: 3, name: "Облачная CRM", type: "Программное обеспечение", vendor: "БишкекКод (демо)", price: 15, unit: "пользователь/мес.", desc: "Продажи и клиентская база" },
    { id: 4, name: "Платёжный шлюз", type: "Цифровой продукт", vendor: "ОшПэй (демо)", price: 300, unit: "мес.", desc: "Приём онлайн-платежей" },
    { id: 5, name: "Аудит информационной безопасности", type: "IT-услуга", vendor: "КыргызШит (демо)", price: 3500, unit: "проект", desc: "Пентест и отчёт" },
    { id: 6, name: "Платформа онлайн-обучения", type: "Программное обеспечение", vendor: "ЭдуЛаб КР (демо)", price: 200, unit: "мес.", desc: "LMS с тестами и сертификатами" },
    { id: 7, name: "Размещение сервера в ЦОД", type: "IT-услуга", vendor: "СарыЧелек Телеком (демо)", price: 80, unit: "мес.", desc: "Colocation, 1U" }
  ],
  stats: [
    { year: 2018, internet: 38, gdp: 1.8, export: 14 },
    { year: 2019, internet: 45, gdp: 2.0, export: 19 },
    { year: 2020, internet: 52, gdp: 2.4, export: 24 },
    { year: 2021, internet: 58, gdp: 2.7, export: 33 },
    { year: 2022, internet: 65, gdp: 3.1, export: 48 },
    { year: 2023, internet: 70, gdp: 3.4, export: 62 },
    { year: 2024, internet: 75, gdp: 3.8, export: 79 },
    { year: 2025, internet: 79, gdp: 4.1, export: 95 }
  ]
};

/* Описание полей форм */
const FIELDS = {
  companies: [
    { k: "name", l: "Название компании", t: "text", req: 1 },
    { k: "category", l: "Направление", t: "select", o: CATEGORIES },
    { k: "city", l: "Город", t: "select", o: CITIES },
    { k: "year", l: "Год основания", t: "number", min: 1990, max: 2030, req: 1 },
    { k: "employees", l: "Сотрудников", t: "number", min: 1, req: 1 },
    { k: "price", l: "Средняя цена проекта, $", t: "number", min: 0, req: 1 },
    { k: "site", l: "Сайт", t: "url" },
    { k: "services", l: "Услуги и направления деятельности", t: "textarea", wide: 1, req: 1 }
  ],
  products: [
    { k: "name", l: "Название", t: "text", req: 1 },
    { k: "type", l: "Тип", t: "select", o: PTYPES },
    { k: "vendor", l: "Компания-поставщик", t: "text", req: 1 },
    { k: "price", l: "Цена, $", t: "number", min: 0, req: 1 },
    { k: "unit", l: "Единица цены", t: "text", req: 1 },
    { k: "desc", l: "Описание", t: "textarea", wide: 1 }
  ]
};

/* ========== Состояние и localStorage ========== */
let db = load();
function load() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY));
    if (s && s.companies && s.products && s.stats) return s;
  } catch (e) { /* повреждённые данные — используем демо */ }
  return structuredClone(SEED);
}
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(db)); }
  catch (e) { toast("Не удалось сохранить данные в localStorage"); }
}

/* ========== Утилиты ========== */
const $ = (s, r = document) => r.querySelector(s);
const esc = v => String(v ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const fmt = n => Number(n).toLocaleString("ru-RU");
const nextId = list => list.reduce((m, x) => Math.max(m, x.id), 0) + 1;
const sum = (a, f) => a.reduce((s, x) => s + Number(x[f]), 0);
function toast(msg) {
  const t = $("#toast"); t.textContent = msg; t.classList.add("show");
  clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove("show"), 2400);
}
function group(list, key, agg) {
  const m = {};
  list.forEach(x => (m[x[key]] ||= []).push(x));
  return Object.entries(m).map(([k, v]) => [k, agg(v)]);
}

/* ========== Навигация ========== */
const TITLES = { dashboard: "Главная панель", companies: "Каталог IT-компаний", products: "IT-услуги, ПО и цифровые продукты", analytics: "Аналитика рынка", stats: "Статистика и динамика ИКТ", register: "Регистрация IT-компании" };
function show(view) {
  document.querySelectorAll(".view").forEach(v => v.classList.toggle("active", v.id === "view-" + view));
  document.querySelectorAll(".nav").forEach(b => b.classList.toggle("active", b.dataset.view === view));
  $("#viewTitle").textContent = TITLES[view];
  $("#sidebar").classList.remove("open");
  renderAll();
}
document.querySelectorAll(".nav").forEach(b => b.addEventListener("click", () => show(b.dataset.view)));
$("#burger").addEventListener("click", () => $("#sidebar").classList.toggle("open"));

/* ========== Таблицы ========== */
function renderTop() {
  const top = [...db.companies].sort((a, b) => b.employees - a.employees).slice(0, 5);
  $("#topTable").innerHTML = "<tr><th>Компания</th><th>Направление</th><th>Город</th><th>Сотрудники</th></tr>" +
    top.map(c => `<tr><td>${esc(c.name)}</td><td><span class="tag">${esc(c.category)}</span></td><td>${esc(c.city)}</td><td>${fmt(c.employees)}</td></tr>`).join("");
}

function filteredCompanies() {
  const q = $("#cSearch").value.trim().toLowerCase(), cat = $("#cCat").value, s = $("#cSort").value;
  return db.companies
    .filter(c => (!cat || c.category === cat) && (!q || [c.name, c.services, c.city, c.category].join(" ").toLowerCase().includes(q)))
    .sort((a, b) => s === "name" ? a.name.localeCompare(b.name, "ru") : s === "year" ? a.year - b.year : b[s] - a[s]);
}
function renderCompanies() {
  const list = filteredCompanies();
  $("#cTable").innerHTML = "<tr><th>Название</th><th>Направление</th><th>Город</th><th>Год</th><th>Сотр.</th><th>Цена проекта</th><th>Услуги</th><th></th></tr>" +
    (list.length ? list.map(c => `<tr>
      <td><b>${esc(c.name)}</b>${c.site ? `<br><a href="${esc(c.site)}" target="_blank" rel="noopener">сайт</a>` : ""}</td>
      <td><span class="tag">${esc(c.category)}</span></td><td>${esc(c.city)}</td><td>${c.year}</td><td>${fmt(c.employees)}</td>
      <td>$${fmt(c.price)}</td><td>${esc(c.services)}</td>
      <td class="act"><button class="btn outline sm" data-edit="companies" data-id="${c.id}">Изменить</button><button class="btn danger sm" data-del="companies" data-id="${c.id}">Удалить</button></td></tr>`).join("")
      : `<tr><td colspan="8" class="empty">Ничего не найдено. Измените запрос или добавьте компанию.</td></tr>`);
  $("#cCount").textContent = `Показано ${list.length} из ${db.companies.length}`;
}

function filteredProducts() {
  const q = $("#pSearch").value.trim().toLowerCase(), t = $("#pType").value;
  return db.products.filter(p => (!t || p.type === t) && (!q || [p.name, p.vendor, p.desc].join(" ").toLowerCase().includes(q)));
}
function renderProducts() {
  const list = filteredProducts();
  $("#pTable").innerHTML = "<tr><th>Название</th><th>Тип</th><th>Поставщик</th><th>Цена</th><th>Описание</th><th></th></tr>" +
    (list.length ? list.map(p => `<tr>
      <td><b>${esc(p.name)}</b></td><td><span class="tag blue">${esc(p.type)}</span></td><td>${esc(p.vendor)}</td>
      <td>$${fmt(p.price)} / ${esc(p.unit)}</td><td>${esc(p.desc)}</td>
      <td class="act"><button class="btn outline sm" data-edit="products" data-id="${p.id}">Изменить</button><button class="btn danger sm" data-del="products" data-id="${p.id}">Удалить</button></td></tr>`).join("")
      : `<tr><td colspan="6" class="empty">Ничего не найдено. Измените запрос или добавьте запись.</td></tr>`);
  $("#pCount").textContent = `Показано ${list.length} из ${db.products.length}`;
}

function renderStatsTable() {
  $("#sTable").innerHTML = "<tr><th>Год</th><th>Пользователи интернета, %</th><th>Доля ИКТ в ВВП, %</th><th>Экспорт ИТ-услуг, млн $</th><th>Рост экспорта</th></tr>" +
    db.stats.map((s, i) => {
      const g = i ? ((s.export / db.stats[i - 1].export - 1) * 100).toFixed(0) + "%" : "—";
      return `<tr><td>${s.year}</td><td>${s.internet}</td><td>${s.gdp}</td><td>${s.export}</td><td>${g}</td></tr>`;
    }).join("");
}

function renderKpis() {
  const c = db.companies, last = db.stats[db.stats.length - 1], prev = db.stats[db.stats.length - 2];
  const avg = c.length ? Math.round(sum(c, "price") / c.length) : 0;
  const cards = [
    ["Компаний в каталоге", fmt(c.length), "демо"],
    ["Сотрудников в ИКТ", fmt(sum(c, "employees")), "по каталогу"],
    ["Средняя цена проекта", "$" + fmt(avg), "по каталогу"],
    ["Услуг и продуктов", fmt(db.products.length), "демо"],
    ["Доля ИКТ в ВВП", last.gdp + "%", prev ? `+${(last.gdp - prev.gdp).toFixed(1)} п.п. к ${prev.year}` : ""],
    ["Экспорт ИТ-услуг", "$" + last.export + " млн", `${last.year} г., демо`]
  ];
  $("#kpis").innerHTML = cards.map(([l, v, n]) => `<div class="card"><span>${l}</span><b>${v}</b><small>${n}</small></div>`).join("");
}

/* ========== Графики Chart.js ========== */
const charts = {};
function chart(id, type, labels, datasets, opts = {}) {
  if (typeof Chart === "undefined") return;
  charts[id]?.destroy();
  charts[id] = new Chart($("#" + id), {
    type, data: { labels, datasets },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: datasets.length > 1 || ["doughnut", "pie"].includes(type), position: "bottom" } }, ...opts }
  });
}
const ds = (data, label) => ({ label, data, backgroundColor: COLORS, borderColor: "#fff", borderWidth: 1 });

function renderCharts(view) {
  const c = db.companies, st = db.stats, years = st.map(s => s.year);
  if (view === "dashboard") {
    const g = group(c, "category", v => v.length);
    chart("chDashCat", "doughnut", g.map(x => x[0]), [ds(g.map(x => x[1]))]);
    chart("chDashShare", "line", years, [{ label: "Доля ИКТ в ВВП, %", data: st.map(s => s.gdp), borderColor: "#10b981", backgroundColor: "rgba(16,185,129,.2)", fill: true, tension: .3 }]);
  }
  if (view === "analytics") {
    const p = group(c, "category", v => Math.round(sum(v, "price") / v.length));
    chart("chPrice", "bar", p.map(x => x[0]), [{ label: "$", data: p.map(x => x[1]), backgroundColor: "#0e7490" }]);
    const ci = group(c, "city", v => v.length);
    chart("chCity", "pie", ci.map(x => x[0]), [ds(ci.map(x => x[1]))]);
    const e = group(c, "category", v => sum(v, "employees"));
    chart("chEmp", "bar", e.map(x => x[0]), [{ label: "Сотрудники", data: e.map(x => x[1]), backgroundColor: "#10b981" }], { indexAxis: "y" });
    const t = group(db.products, "type", v => v.length);
    chart("chType", "doughnut", t.map(x => x[0]), [ds(t.map(x => x[1]))]);
  }
  if (view === "stats") {
    chart("chStat1", "line", years, [
      { label: "Пользователи интернета, %", data: st.map(s => s.internet), borderColor: "#0e7490", tension: .3 },
      { label: "Доля ИКТ в ВВП, %", data: st.map(s => s.gdp), borderColor: "#10b981", tension: .3 }
    ]);
    chart("chStat2", "bar", years, [{ label: "млн $", data: st.map(s => s.export), backgroundColor: "#10b981" }]);
  }
}

function renderAll() {
  const view = document.querySelector(".view.active").id.replace("view-", "");
  renderKpis(); renderTop(); renderCompanies(); renderProducts(); renderStatsTable();
  renderCharts(view);
}

/* ========== Формы, добавление, редактирование, удаление ========== */
function fieldHtml(f, v, p) {
  const id = `${p}_${f.k}`, val = v ?? "";
  const attrs = `id="${id}" name="${f.k}" ${f.req ? "required" : ""}`;
  let input;
  if (f.t === "select") input = `<select ${attrs}>${f.o.map(o => `<option ${o === val ? "selected" : ""}>${esc(o)}</option>`).join("")}</select>`;
  else if (f.t === "textarea") input = `<textarea ${attrs} rows="3">${esc(val)}</textarea>`;
  else input = `<input ${attrs} type="${f.t}" value="${esc(val)}" ${f.min !== undefined ? `min="${f.min}"` : ""} ${f.max !== undefined ? `max="${f.max}"` : ""} ${f.t === "url" ? 'placeholder="https://"' : ""}>`;
  return `<label class="field ${f.wide ? "wide" : ""}" for="${id}">${f.l}${f.req ? " *" : ""}${input}</label>`;
}
function readForm(form, type) {
  const rec = {};
  FIELDS[type].forEach(f => {
    const v = form.elements[f.k].value.trim();
    rec[f.k] = f.t === "number" ? Number(v) : v;
  });
  return rec;
}
function validUrl(rec) {
  if (rec.site && !/^https?:\/\//i.test(rec.site)) { toast("Адрес сайта должен начинаться с http:// или https://"); return false; }
  return true;
}

let editing = null; // { type, id }
function openModal(type, id) {
  editing = { type, id };
  const rec = id ? db[type].find(x => x.id === id) : {};
  const noun = type === "companies" ? "компанию" : "запись";
  $("#modalTitle").textContent = id ? "Редактировать " + noun : "Добавить " + noun;
  $("#modalFields").innerHTML = FIELDS[type].map(f => fieldHtml(f, rec[f.k], "m")).join("");
  $("#modal").showModal();
}
$("#modalCancel").addEventListener("click", () => $("#modal").close());
$("#modalForm").addEventListener("submit", e => {
  e.preventDefault();
  const { type, id } = editing, rec = readForm(e.target, type);
  if (type === "companies" && !validUrl(rec)) return;
  if (id) Object.assign(db[type].find(x => x.id === id), rec);
  else db[type].push({ id: nextId(db[type]), ...rec });
  save(); $("#modal").close(); renderAll();
  toast(id ? "Изменения сохранены" : "Запись добавлена");
});

// Форма регистрации
$("#regForm").innerHTML = FIELDS.companies.map(f => fieldHtml(f, "", "r")).join("") +
  `<div class="actions"><button type="reset" class="btn outline">Очистить</button><button type="submit" class="btn">Зарегистрировать компанию</button></div>`;
$("#regForm").addEventListener("submit", e => {
  e.preventDefault();
  const rec = readForm(e.target, "companies");
  if (!validUrl(rec)) return;
  if (db.companies.some(c => c.name.toLowerCase() === rec.name.toLowerCase())) { toast("Компания с таким названием уже есть в каталоге"); return; }
  db.companies.push({ id: nextId(db.companies), ...rec });
  save(); e.target.reset(); toast("Компания зарегистрирована"); show("companies");
});

// Кнопки редактирования/удаления (делегирование)
document.addEventListener("click", e => {
  const b = e.target.closest("[data-edit],[data-del]");
  if (!b) return;
  const id = Number(b.dataset.id);
  if (b.dataset.edit) openModal(b.dataset.edit, id);
  else if (confirm("Удалить запись? Это действие нельзя отменить.")) {
    db[b.dataset.del] = db[b.dataset.del].filter(x => x.id !== id);
    save(); renderAll(); toast("Запись удалена");
  }
});
$("#cAdd").addEventListener("click", () => openModal("companies"));
$("#pAdd").addEventListener("click", () => openModal("products"));

/* ========== Фильтры ========== */
$("#cCat").innerHTML = '<option value="">Все направления</option>' + CATEGORIES.map(c => `<option>${c}</option>`).join("");
$("#pType").innerHTML = '<option value="">Все типы</option>' + PTYPES.map(c => `<option>${c}</option>`).join("");
["#cSearch", "#cCat", "#cSort"].forEach(s => $(s).addEventListener("input", renderCompanies));
["#pSearch", "#pType"].forEach(s => $(s).addEventListener("input", renderProducts));

/* ========== Экспорт CSV ========== */
function exportCsv(name, headers, rows) {
  const cell = v => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const csv = "\uFEFF" + [headers, ...rows].map(r => r.map(cell).join(";")).join("\r\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  a.download = `${name}_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click(); URL.revokeObjectURL(a.href);
  toast("Файл CSV сформирован");
}
$("#cCsv").addEventListener("click", () => exportCsv("kompanii_ikt_kg",
  ["Название", "Направление", "Город", "Год основания", "Сотрудники", "Цена проекта, $", "Сайт", "Услуги"],
  filteredCompanies().map(c => [c.name, c.category, c.city, c.year, c.employees, c.price, c.site, c.services])));
$("#pCsv").addEventListener("click", () => exportCsv("produkty_ikt_kg",
  ["Название", "Тип", "Поставщик", "Цена, $", "Единица", "Описание"],
  filteredProducts().map(p => [p.name, p.type, p.vendor, p.price, p.unit, p.desc])));
$("#sCsv").addEventListener("click", () => exportCsv("statistika_ikt_kg",
  ["Год", "Пользователи интернета, %", "Доля ИКТ в ВВП, %", "Экспорт ИТ-услуг, млн $"],
  db.stats.map(s => [s.year, s.internet, s.gdp, s.export])));

/* ========== Сброс данных ========== */
$("#resetBtn").addEventListener("click", () => {
  if (!confirm("Заменить все данные демонстрационным набором? Ваши записи будут удалены.")) return;
  db = structuredClone(SEED); save(); renderAll(); toast("Демо-данные восстановлены");
});

/* ========== Запуск ========== */
renderAll();
