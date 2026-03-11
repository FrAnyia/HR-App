const tabs = {
  home: {
    title: "Home",
    description: "Powiadomienia i kluczowe informacje operacyjne HR wymagajace uwagi.",
    sections: [
      {
        title: "Daily Update",
        tag: "Dzisiaj",
        timelineItems: [
          { date: "12 Mar", title: "Aktywne rekrutacje", text: "14 aktywnych procesow, 4 role na etapie finalnych rozmow." },
          { date: "13 Mar", title: "Nowe osoby", text: "Start onboardingu: Ola Kowalska (QA Mid)." },
          { date: "20 Mar", title: "Osoby odchodzace", text: "Marta Lewandowska - zamkniecie procesu offboarding." },
          { date: "24 Mar", title: "Powiadomienia krytyczne", text: "3 zadania HR wymagaja domkniecia do konca dnia." }
        ]
      },
      {
        title: "Kalendarz HR",
        tag: "Kalendarz",
        calendarEvents: [
          {
            id: "evt-ola",
            date: "13.03",
            title: "Start: Ola Kowalska (QA Mid)",
            type: "onboarding",
            actions: [
              { id: "a1", label: "Przygotuj plan onboardingowy (1 tydzien)." },
              { id: "a2", label: "Przygotuj stanowisko pracy i konta." },
              { id: "a3", label: "Zaplanuj onboarding z managerem i buddy." }
            ]
          },
          {
            id: "evt-piotr",
            date: "17.03",
            title: "Start: Piotr Mazur (Developer Mid)",
            type: "onboarding",
            actions: [
              { id: "a1", label: "Wyslij harmonogram pierwszych spotkan." },
              { id: "a2", label: "Zweryfikuj dostepy do repo i narzedzi." },
              { id: "a3", label: "Potwierdz gotowosc sprzetu i licencji." }
            ]
          },
          {
            id: "evt-marta",
            date: "20.03",
            title: "Odejscie: Marta Lewandowska",
            type: "exit",
            actions: [
              { id: "a1", label: "Umow i przeprowadz exit interview." },
              { id: "a2", label: "Zamknij dostepy i uprawnienia." },
              { id: "a3", label: "Potwierdz zwrot sprzetu firmowego." }
            ]
          },
          {
            id: "evt-kamil",
            date: "24.03",
            title: "Odejscie: Kamil Zielinski",
            type: "exit",
            actions: [
              { id: "a1", label: "Zapewnij przekazanie wiedzy w zespole." },
              { id: "a2", label: "Zbierz i zamknij formalnosci HR." },
              { id: "a3", label: "Potwierdz zwrot sprzetu i kart dostepu." }
            ]
          }
        ]
      }
    ]
  },
  rekrutacyjne: {
    title: "Rekrutacja",
    description: "Blind CV generator oparty o firmowy template. Zacznij od zaladowania CV kandydata.",
    custom: "recruitment"
  },
  zaliczenia: {
    title: "Zaliczenia",
    description: "Wpisywanie i tracking zaliczen poziomow na sciezkach Lead Path, DevPath i Associate.",
    custom: "clearances"
  },
  rotacja: {
    title: "Rotacja",
    description: "Edytowalna tabela rotacji, filtrowanie danych i kalkulacja wskaznikow HR dla wybranego okresu.",
    custom: "rotation"
  },
  admin: {
    title: "Panel admin",
    description: "Zarzadzanie uprawnieniami, konfiguracja modulow i porzadkiem danych.",
    sections: [
      {
        title: "Uprawnienia i dostep",
        tag: "Security",
        cards: [
          { title: "Role systemowe", text: "4 wnioski o rozszerzenie uprawnien czekaja na akceptacje." },
          { title: "Integracje", text: "Synchronizacja z ATS i systemem payroll dziala bez bledow." },
          { title: "Polityki", text: "Wymagany przeglad retencji danych kandydatow do konca miesiaca." },
          { title: "Logi zdarzen", text: "Brak krytycznych naruszen, 3 wpisy do przejrzenia." }
        ]
      },
      {
        title: "Checklist admina",
        tag: "Governance",
        details: [
          { title: "Audyt dostepow", text: "Uruchom kwartalny przeglad rol uzytkownikow i wlascicieli procesow." },
          { title: "Konfiguracja modulow", text: "Zablokuj edycje historycznych zaliczen po publikacji payrollu." },
          { title: "Jakosc danych", text: "Dodaj reguly walidacji dla pol obowiazkowych w formularzach HR." }
        ]
      }
    ]
  }
};

const recruitmentState = {
  files: [],
  sourceText: "",
  sanitizedText: "",
  generated: null,
  editMode: false,
  templateLink: "file:///C:/Users/Komputer/Downloads/CV%20template.pdf",
  module: "blindcv",
  metrics: null,
  metricsMessage: "Podlacz integracje i zsynchronizuj dane, aby policzyc wskazniki.",
  integrations: {
    ats: { connected: false, lastSync: null, data: null, label: "ATS" },
    hris: { connected: false, lastSync: null, data: null, label: "HRIS" },
    finance: { connected: false, lastSync: null, data: null, label: "Finance" },
    sourcing: { connected: false, lastSync: null, data: null, label: "Sourcing" }
  }
};

const clearancePaths = {
  lead: {
    label: "Lead Path",
    levels: ["CLA 1", "CLA 2", "CTL 1", "CTL 2", "CTL 3"]
  },
  dev: {
    label: "DevPath",
    specializations: {
      developer: {
        label: "Developer",
        levels: ["Junior", "Ind 1", "Ind 2", "Ind 3", "Mid 1", "Mid 2", "Senior 1", "Senior 2"]
      },
      designer: {
        label: "Designer",
        levels: ["GDJunior", "GDInd 1", "GDInd 2", "GDInd 3", "GDMid 1", "GDMid 2", "GDSenior 1", "GDSenior 2"]
      },
      qa: {
        label: "QA",
        levels: ["QAJunior", "QAInd 1", "QAInd 2", "QAInd 3", "QAMid", "QASenior"]
      }
    }
  },
  associate: {
    label: "Associate",
    specializations: {
      junior: {
        label: "Junior",
        levels: ["J1", "J2", "J3"]
      },
      exp: {
        label: "Exp",
        levels: ["E1", "E2", "E3"]
      }
    }
  }
};

const clearanceState = {
  selectedPath: "lead",
  selectedSpecialization: "developer",
  records: [],
  message: "Wybierz sciezke i dodaj pierwsze zaliczenie poziomu.",
  form: {
    employee: "",
    level: "CLA 1",
    date: "",
    notes: ""
  }
};

function makeRotationRow(overrides = {}) {
  return {
    id: `rot-${Date.now()}-${Math.round(Math.random() * 100000)}`,
    employee: "",
    team: "Engineering",
    role: "",
    hireDate: "",
    exitDate: "",
    exitType: "none",
    reason: "",
    manager: "",
    status: "active",
    fte: "1.0",
    ...overrides
  };
}

const rotationState = {
  metricsPeriodFrom: "",
  metricsPeriodTo: "",
  metricsUsePeriod: false,
  metricsUseTableFilters: false,
  metricsMessage: "Wskazniki przeliczone w trybie calosciowym.",
  filters: {
    search: "",
    team: "all",
    status: "all",
    exitType: "all"
  },
  tableMessage: "Mozesz edytowac kazde pole w tabeli oraz filtrowac dane.",
  rows: [
    makeRotationRow({ employee: "Anna Surma", team: "Engineering", role: "Senior Backend Engineer", hireDate: "2022-04-11", manager: "T. Nowak", status: "active" }),
    makeRotationRow({ employee: "Marek Kaleta", team: "Design", role: "Product Designer", hireDate: "2021-09-01", exitDate: "2026-02-10", exitType: "voluntary", reason: "Zmiana sciezki kariery", manager: "A. Wozniak", status: "exited" }),
    makeRotationRow({ employee: "Kinga Wrona", team: "QA", role: "QA Mid", hireDate: "2023-03-17", manager: "P. Kowal", status: "active" }),
    makeRotationRow({ employee: "Pawel Duda", team: "Engineering", role: "Developer Mid", hireDate: "2020-07-06", exitDate: "2026-01-15", exitType: "involuntary", reason: "Rozstanie za porozumieniem", manager: "T. Nowak", status: "exited" }),
    makeRotationRow({ employee: "Agnieszka Olejnik", team: "HR", role: "HRBP", hireDate: "2024-05-08", manager: "M. Lis", status: "on_leave" })
  ]
};

const dom = {
  content: document.getElementById("tabContent"),
  title: document.getElementById("viewTitle"),
  description: document.getElementById("viewDescription"),
  main: document.querySelector(".main"),
  navItems: Array.from(document.querySelectorAll(".nav-item")),
  sidebar: document.getElementById("sidebar"),
  sidebarToggle: document.getElementById("sidebarToggle"),
  heroActions: document.getElementById("heroActions"),
  metricsPanel: document.getElementById("metricsPanel"),
  calendarPanel: document.getElementById("calendarPanel"),
  quickActionsPanel: document.getElementById("quickActionsPanel"),
  quickActionButtons: document.getElementById("quickActionButtons"),
  quickActionComposer: document.getElementById("quickActionComposer"),
  sideContent: document.getElementById("sideContent"),
  contentGrid: document.querySelector(".content-grid")
};

const quickActionState = {
  selectedAction: null,
  slackNew: {
    channel: "#general",
    person: "Ola Kowalska",
    date: "2026-03-13",
    message: ""
  },
  slackExit: {
    channel: "#general",
    person: "Marta Lewandowska",
    date: "2026-03-20",
    message: ""
  },
  email: {
    recipient: "all_company",
    subject: "Aktualizacja HR",
    message: "Czesc,\n\nprzekazuje aktualizacje dotyczaca zmian personalnych.\n\nPozdrawiam,\nHR"
  },
  event: {
    audience: "all_company",
    date: "",
    name: "",
    message: ""
  }
};

function buildSlackNewTemplate() {
  const state = quickActionState.slackNew;
  return `Hej! \n\n${state.person} dolacza do nas ${state.date}.\nProsze o cieple przywitanie i wsparcie podczas onboardingu.\n\nKanal: ${state.channel}\n#onboarding #people`;
}

function buildSlackExitTemplate() {
  const state = quickActionState.slackExit;
  return `Hej! \n\n${state.person} konczy wspolprace z dniem ${state.date}.\nDziekujemy za wspolna prace i wsparcie zespolu.\n\nKanal: ${state.channel}\n#offboarding #people`;
}

function ensureQuickActionDefaults() {
  if (!quickActionState.slackNew.message) {
    quickActionState.slackNew.message = buildSlackNewTemplate();
  }
  if (!quickActionState.slackExit.message) {
    quickActionState.slackExit.message = buildSlackExitTemplate();
  }
}

function selectedHomeActionFormHtml() {
  const channels = ["#general", "#hr", "#delivery", "#company-news"];
  const newPeople = ["Ola Kowalska", "Piotr Mazur", "Kinga Wrona"];
  const exitPeople = ["Marta Lewandowska", "Kamil Zielinski", "Pawel Duda"];

  if (quickActionState.selectedAction === "slack_new") {
    const state = quickActionState.slackNew;
    return `
      <div class="quick-actions-composer">
        <div class="form-grid">
          <div>
            <label class="field-label" for="qa-slack-new-channel">Kanal</label>
            <select id="qa-slack-new-channel" data-qa-field="slackNew.channel">
              ${channels.map((item) => `<option value="${escapeHtml(item)}" ${state.channel === item ? "selected" : ""}>${escapeHtml(item)}</option>`).join("")}
            </select>
          </div>
          <div>
            <label class="field-label" for="qa-slack-new-person">Nowa osoba</label>
            <select id="qa-slack-new-person" data-qa-field="slackNew.person">
              ${newPeople.map((item) => `<option value="${escapeHtml(item)}" ${state.person === item ? "selected" : ""}>${escapeHtml(item)}</option>`).join("")}
            </select>
          </div>
          <div class="full-width">
            <label class="field-label" for="qa-slack-new-date">Data dolaczenia</label>
            <input id="qa-slack-new-date" type="date" value="${escapeHtml(state.date)}" data-qa-field="slackNew.date">
          </div>
          <div class="full-width">
            <label class="field-label" for="qa-slack-new-message">Template wiadomosci</label>
            <textarea id="qa-slack-new-message" data-qa-field="slackNew.message">${escapeHtml(state.message)}</textarea>
          </div>
        </div>
      </div>
    `;
  }

  if (quickActionState.selectedAction === "slack_exit") {
    const state = quickActionState.slackExit;
    return `
      <div class="quick-actions-composer">
        <div class="form-grid">
          <div>
            <label class="field-label" for="qa-slack-exit-channel">Kanal</label>
            <select id="qa-slack-exit-channel" data-qa-field="slackExit.channel">
              ${channels.map((item) => `<option value="${escapeHtml(item)}" ${state.channel === item ? "selected" : ""}>${escapeHtml(item)}</option>`).join("")}
            </select>
          </div>
          <div>
            <label class="field-label" for="qa-slack-exit-person">Osoba odchodzaca</label>
            <select id="qa-slack-exit-person" data-qa-field="slackExit.person">
              ${exitPeople.map((item) => `<option value="${escapeHtml(item)}" ${state.person === item ? "selected" : ""}>${escapeHtml(item)}</option>`).join("")}
            </select>
          </div>
          <div class="full-width">
            <label class="field-label" for="qa-slack-exit-date">Data odejscia</label>
            <input id="qa-slack-exit-date" type="date" value="${escapeHtml(state.date)}" data-qa-field="slackExit.date">
          </div>
          <div class="full-width">
            <label class="field-label" for="qa-slack-exit-message">Template wiadomosci</label>
            <textarea id="qa-slack-exit-message" data-qa-field="slackExit.message">${escapeHtml(state.message)}</textarea>
          </div>
        </div>
      </div>
    `;
  }

  if (quickActionState.selectedAction === "email") {
    const state = quickActionState.email;
    return `
      <div class="quick-actions-composer">
        <div class="form-grid">
          <div>
            <label class="field-label" for="qa-email-recipient">Odbiorcy</label>
            <select id="qa-email-recipient" data-qa-field="email.recipient">
              <option value="all_company" ${state.recipient === "all_company" ? "selected" : ""}>Cala firma</option>
              <option value="delivery" ${state.recipient === "delivery" ? "selected" : ""}>Delivery</option>
              <option value="leaders" ${state.recipient === "leaders" ? "selected" : ""}>Liderzy</option>
            </select>
          </div>
          <div>
            <label class="field-label" for="qa-email-subject">Temat</label>
            <input id="qa-email-subject" type="text" value="${escapeHtml(state.subject)}" data-qa-field="email.subject">
          </div>
          <div class="full-width">
            <label class="field-label" for="qa-email-message">Tresc</label>
            <textarea id="qa-email-message" data-qa-field="email.message">${escapeHtml(state.message)}</textarea>
          </div>
        </div>
      </div>
    `;
  }

  if (quickActionState.selectedAction === "event") {
    const state = quickActionState.event;
    return `
      <div class="quick-actions-composer">
        <div class="form-grid">
          <div>
            <label class="field-label" for="qa-event-audience">Grupa / osoba</label>
            <select id="qa-event-audience" data-qa-field="event.audience">
              <option value="all_company" ${state.audience === "all_company" ? "selected" : ""}>Cala firma</option>
              <option value="new_hires" ${state.audience === "new_hires" ? "selected" : ""}>Nowe osoby</option>
              <option value="exits" ${state.audience === "exits" ? "selected" : ""}>Osoby odchodzace</option>
              <option value="leaders" ${state.audience === "leaders" ? "selected" : ""}>Liderzy</option>
            </select>
          </div>
          <div>
            <label class="field-label" for="qa-event-date">Termin</label>
            <input id="qa-event-date" type="datetime-local" value="${escapeHtml(state.date)}" data-qa-field="event.date">
          </div>
          <div class="full-width">
            <label class="field-label" for="qa-event-name">Nazwa wydarzenia</label>
            <input id="qa-event-name" type="text" value="${escapeHtml(state.name)}" data-qa-field="event.name">
          </div>
          <div class="full-width">
            <label class="field-label" for="qa-event-message">Opis</label>
            <textarea id="qa-event-message" data-qa-field="event.message">${escapeHtml(state.message)}</textarea>
          </div>
        </div>
      </div>
    `;
  }

  return `<div class="helper-text">Wybierz akcje, aby uzupelnic szczegoly.</div>`;
}

function renderHomeQuickActions() {
  ensureQuickActionDefaults();
  if (!dom.quickActionButtons || !dom.quickActionComposer) return;

  const isHome = dom.main.classList.contains("is-home");
  if (dom.quickActionsPanel) {
    dom.quickActionsPanel.classList.toggle("hidden", !isHome);
  }
  if (!isHome) return;

  dom.quickActionButtons.querySelectorAll("[data-home-action]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.homeAction === quickActionState.selectedAction);
  });

  dom.quickActionComposer.innerHTML = selectedHomeActionFormHtml();

  dom.quickActionComposer.querySelectorAll("[data-qa-field]").forEach((field) => {
    field.addEventListener("input", (event) => {
      const [group, key] = event.target.dataset.qaField.split(".");
      if (!quickActionState[group] || !key) return;
      quickActionState[group][key] = event.target.value;

      if (group === "slackNew" && key !== "message") {
        quickActionState.slackNew.message = buildSlackNewTemplate();
        renderHomeQuickActions();
      }
      if (group === "slackExit" && key !== "message") {
        quickActionState.slackExit.message = buildSlackExitTemplate();
        renderHomeQuickActions();
      }
    });
  });
}

function bindQuickActionsEvents() {
  if (!dom.quickActionButtons) return;
  dom.quickActionButtons.querySelectorAll("[data-home-action]").forEach((button) => {
    button.addEventListener("click", () => {
      quickActionState.selectedAction = button.dataset.homeAction;
      renderHomeQuickActions();
    });
  });
}

const homeState = {
  selectedEventId: "evt-ola",
  daysAhead: 14,
  checklist: {}
};

function parseCalendarDate(value) {
  const match = String(value || "").match(/^(\d{1,2})\.(\d{1,2})$/);
  if (!match) return null;
  const day = Number(match[1]);
  const month = Number(match[2]);
  const now = new Date();
  const year = now.getFullYear();
  return new Date(year, month - 1, day);
}

function filterCalendarEventsByDays(events, daysAhead) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const max = new Date(now);
  max.setDate(max.getDate() + daysAhead);
  return events.filter((event) => {
    const eventDate = parseCalendarDate(event.date);
    if (!eventDate || Number.isNaN(eventDate.getTime())) return false;
    return eventDate >= now && eventDate <= max;
  });
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function normalizeWhitespace(text) {
  return String(text || "")
    .replace(/\r/g, "")
    .replace(/\t/g, " ")
    .replace(/ {2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function anonymizeText(text) {
  let value = normalizeWhitespace(text);
  const patterns = [
    [/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[email removed]"],
    [/(\+?\d[\d\s().-]{7,}\d)/g, "[phone removed]"],
    [/(https?:\/\/[^\s]+)/gi, "[link removed]"],
    [/\b(?:linkedin|github|behance|portfolio)\b[^\n]*/gi, "[profile removed]"],
    [/\b(?:date of birth|born|urodzon[aey]?|data urodzenia)\b[^\n]*/gi, "[birth date removed]"],
    [/\b(?:married|single|nationality|citizenship|obywatelstwo|stan cywilny)\b[^\n]*/gi, "[personal data removed]"]
  ];

  patterns.forEach(([pattern, replacement]) => {
    value = value.replace(pattern, replacement);
  });

  return value;
}

function collectItems(text, limit) {
  return String(text || "")
    .split(/\n|•|\-/)
    .map((item) => item.trim())
    .filter((item) => item.length > 10)
    .slice(0, limit);
}

function firstParagraph(text) {
  const paragraph = String(text || "")
    .split(/\n\n|\n/)
    .map((item) => item.trim())
    .filter((item) => item.length > 30)[0];
  return paragraph || "Profil wygenerowany automatycznie na podstawie przeslanego CV. Wymaga recznej weryfikacji przed wysylka do klienta.";
}

function deriveBlindCv() {
  const source = recruitmentState.sanitizedText;
  if (!source.trim()) {
    recruitmentState.generated = null;
    return;
  }

  recruitmentState.generated = {
    documentTitle: "BLIND CV",
    role: "Role: to be confirmed",
    summary: firstParagraph(source),
    coreSkills: collectItems(source, 8),
    experience: collectItems(source, 8),
    achievements: collectItems(source, 6),
    education: collectItems(source, 4),
    additional: "Automatyczne odczytanie CV moze pominac fragmenty z layoutu tabelarycznego. Sprawdz sekcje przed wysylka."
  };
}

function renderList(items) {
  if (!items || !items.length) {
    return "<p class=\"muted\">Brak danych do automatycznego wypelnienia.</p>";
  }

  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function renderDefaultTab(tabKey) {
  const tab = tabs[tabKey];
  const isHome = tabKey === "home";
  dom.content.innerHTML = tab.sections.map((section) => {
    const sectionClass = isHome && section.title === "Daily Update" ? "tab-section tab-section--daily-update" : "tab-section";
    const sectionLabel = isHome ? "" : `<p class="panel__label">${escapeHtml(tab.title)}</p>`;
    const cards = section.cards
      ? `<div class="cards-grid">${section.cards.map((card) => `<button class="option-tile" type="button" data-action="tile-open" data-title="${escapeHtml(card.title)}"><strong>${escapeHtml(card.title)}</strong><p>${escapeHtml(card.text)}</p></button>`).join("")}</div>`
      : "";

    const details = section.details
      ? `<div class="detail-list">${section.details.map((detail) => `<button class="option-tile option-tile--soft" type="button" data-action="tile-open" data-title="${escapeHtml(detail.title)}"><strong>${escapeHtml(detail.title)}</strong><small>${escapeHtml(detail.text)}</small></button>`).join("")}</div>`
      : "";
    const timelineItems = section.timelineItems
      ? `<div class="timeline daily-update-list">${section.timelineItems.map((item) => `<article class="timeline__item daily-update-item"><strong>${escapeHtml(item.date)}</strong><p><b>${escapeHtml(item.title)}:</b> ${escapeHtml(item.text)}</p></article>`).join("")}</div>`
      : "";

    const calendarEvents = section.calendarEvents
      ? (() => {
        const filteredEvents = filterCalendarEventsByDays(section.calendarEvents, homeState.daysAhead);
        const selected = filteredEvents.find((item) => item.id === homeState.selectedEventId) || filteredEvents[0];
        if (!selected) {
          return `<div class="alert">Brak terminow w wybranym zakresie ${homeState.daysAhead} dni.</div>`;
        }
        const selectedSet = homeState.checklist[selected.id] || {};
        const checklist = `
          <article class="tab-section home-checklist">
            <div class="panel__header">
              <div>
                <p class="panel__label">Akcje dla terminu</p>
                <h3>${escapeHtml(selected.title)}</h3>
                <p>${selected.type === "exit" ? "Checklist offboardingowy" : "Checklist onboardingowy"}</p>
              </div>
            </div>
            <div class="content-stack">
              ${selected.actions.map((action) => `
                <label class="checklist-item">
                  <input type="checkbox" ${selectedSet[action.id] ? "checked" : ""} data-action="home-toggle-check" data-event-id="${selected.id}" data-check-id="${action.id}">
                  <span>${escapeHtml(action.label)}</span>
                </label>
              `).join("")}
            </div>
          </article>
        `;
        return `
          <div class="home-calendar-layout">
            <div class="calendar-grid">
              ${filteredEvents.map((event) => `<button class="option-tile option-tile--calendar ${event.id === selected.id ? "is-active" : ""}" type="button" data-action="home-select-event" data-event-id="${event.id}"><span class="calendar-date">${escapeHtml(event.date)}</span><strong>${escapeHtml(event.title)}</strong><small>${event.type === "exit" ? "Odejscie" : "Onboarding"}</small></button>`).join("")}
            </div>
            ${checklist}
          </div>
        `;
      })()
      : "";

    return `
      <section class="${sectionClass}">
        <div class="tab-section__header">
          <div>
            ${sectionLabel}
            <h3>${escapeHtml(section.title)}</h3>
          </div>
          ${section.calendarEvents
            ? `<div class="inline-actions"><label class="field-label" for="home-days-ahead">Dni do przodu</label><select id="home-days-ahead" class="home-days-select" data-action="home-set-days"><option value="7" ${homeState.daysAhead === 7 ? "selected" : ""}>7</option><option value="14" ${homeState.daysAhead === 14 ? "selected" : ""}>14</option><option value="30" ${homeState.daysAhead === 30 ? "selected" : ""}>30</option></select></div>`
            : `<span class="pill">${escapeHtml(section.tag)}</span>`}
        </div>
        ${cards}
        ${details}
        ${timelineItems}
        ${calendarEvents}
      </section>
    `;
  }).join("");

  const isAdmin = tabKey === "admin";
  dom.heroActions.classList.toggle("hidden", isHome);
  dom.metricsPanel.classList.toggle("hidden", isAdmin);
  dom.sideContent.classList.remove("hidden");
  dom.contentGrid.classList.remove("is-recruitment");
  if (dom.calendarPanel) {
    dom.calendarPanel.classList.toggle("hidden", isAdmin);
  }

  dom.content.querySelectorAll("[data-action='tile-open']").forEach((tile) => {
    tile.addEventListener("click", () => {
      const title = tile.dataset.title || "Opcja";
      alert(`Wybrano: ${title}`);
    });
  });

  dom.content.querySelectorAll("[data-action='home-select-event']").forEach((button) => {
    button.addEventListener("click", () => {
      homeState.selectedEventId = button.dataset.eventId;
      renderTab("home");
    });
  });

  dom.content.querySelectorAll("[data-action='home-toggle-check']").forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
      const eventId = event.target.dataset.eventId;
      const checkId = event.target.dataset.checkId;
      if (!homeState.checklist[eventId]) {
        homeState.checklist[eventId] = {};
      }
      homeState.checklist[eventId][checkId] = event.target.checked;
    });
  });

  dom.content.querySelectorAll("[data-action='home-set-days']").forEach((select) => {
    select.addEventListener("change", (event) => {
      homeState.daysAhead = Number(event.target.value) || 14;
      renderTab("home");
    });
  });
}

function formatDateTime(value) {
  if (!value) return "brak";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "brak";
  return parsed.toLocaleString("pl-PL");
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function sum(values) {
  return values.reduce((acc, item) => acc + (Number(item) || 0), 0);
}

function daysBetween(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return null;
  return Math.max(0, Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
}

function computeRecruitmentMetrics() {
  const ats = recruitmentState.integrations.ats.data || {};
  const finance = recruitmentState.integrations.finance.data || {};
  const sourcing = recruitmentState.integrations.sourcing.data || {};

  const applicants = asArray(ats.applicants);
  const hires = asArray(ats.hires);
  const applicantsCount = Number(ats.applicantsCount) || applicants.length;
  const hiresCount = Number(ats.hiresCount) || hires.length;

  const timeToHireSamples = hires
    .map((hire) => daysBetween(hire.openedAt || hire.requisitionOpenedAt, hire.hiredAt || hire.acceptedAt))
    .filter((value) => value !== null);
  const avgTimeToHire = timeToHireSamples.length ? (sum(timeToHireSamples) / timeToHireSamples.length) : 0;

  const sourceEntries = [
    ...applicants.map((item) => item.source),
    ...hires.map((item) => item.source),
    ...asArray(sourcing.sources).map((item) => item.name)
  ].filter(Boolean);
  const sourceCounts = sourceEntries.reduce((acc, source) => {
    acc[source] = (acc[source] || 0) + 1;
    return acc;
  }, {});
  const topSources = Object.entries(sourceCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const totalCost = Number(finance.totalRecruitmentCost) || sum(asArray(finance.costs).map((item) => item.amount));
  const costPerHire = hiresCount > 0 ? totalCost / hiresCount : 0;
  const conversionRate = applicantsCount > 0 ? (hiresCount / applicantsCount) * 100 : 0;

  recruitmentState.metrics = {
    applicantsCount,
    hiresCount,
    avgTimeToHire,
    totalCost,
    costPerHire,
    conversionRate,
    topSources
  };
  recruitmentState.metricsMessage = "Wskazniki wyliczone na podstawie zsynchronizowanych integracji.";
}

function getSampleIntegrationPayload(key) {
  if (key === "ats") {
    return {
      applicants: [
        { id: "a1", source: "LinkedIn" },
        { id: "a2", source: "Referral" },
        { id: "a3", source: "LinkedIn" },
        { id: "a4", source: "NoFluffJobs" },
        { id: "a5", source: "Referral" }
      ],
      hires: [
        { id: "h1", source: "LinkedIn", openedAt: "2026-01-08", hiredAt: "2026-02-14" },
        { id: "h2", source: "Referral", openedAt: "2026-01-15", hiredAt: "2026-02-10" }
      ]
    };
  }
  if (key === "finance") {
    return {
      totalRecruitmentCost: 38600,
      currency: "PLN"
    };
  }
  if (key === "sourcing") {
    return {
      sources: [
        { name: "LinkedIn", campaigns: 2 },
        { name: "Referral", campaigns: 1 },
        { name: "NoFluffJobs", campaigns: 1 }
      ]
    };
  }
  return { records: [] };
}

function integrationTileHtml(key, integration) {
  const status = integration.connected ? "Polaczono" : "Niepolaczone";
  const sync = integration.lastSync ? formatDateTime(integration.lastSync) : "brak";
  return `
    <article class="option-tile option-tile--integration">
      <strong>${escapeHtml(integration.label)}</strong>
      <p>Status: ${escapeHtml(status)}</p>
      <small>Ostatnia synchronizacja: ${escapeHtml(sync)}</small>
      <div class="inline-actions">
        <button class="secondary-button" type="button" data-action="toggle-integration" data-int="${key}">${integration.connected ? "Rozlacz" : "Polacz"}</button>
        <button class="secondary-button" type="button" data-action="load-integration" data-int="${key}">Wczytaj JSON</button>
        <button class="secondary-button is-accent" type="button" data-action="sync-integration" data-int="${key}">Sync</button>
      </div>
      <input class="hidden" type="file" accept=".json" data-integration-input="${key}">
    </article>
  `;
}

function metricsResultHtml() {
  if (!recruitmentState.metrics) {
    return `<div class="alert">${escapeHtml(recruitmentState.metricsMessage)}</div>`;
  }

  const metrics = recruitmentState.metrics;
  const sourceRows = metrics.topSources.length
    ? metrics.topSources.map(([source, count]) => `<li>${escapeHtml(source)}: ${count}</li>`).join("")
    : "<li>Brak danych o zrodlach.</li>";

  return `
    <section class="tab-section">
      <div class="panel__header">
        <div>
          <p class="panel__label">Wynik</p>
          <h3>Wskazniki rekrutacyjne</h3>
        </div>
      </div>
      <div class="cards-grid">
        <article class="detail-card"><strong>Time to Hire</strong><p>${metrics.avgTimeToHire.toFixed(1)} dni</p></article>
        <article class="detail-card"><strong>Cost per Hire</strong><p>${metrics.costPerHire.toFixed(0)} PLN</p></article>
        <article class="detail-card"><strong>Konwersja</strong><p>${metrics.conversionRate.toFixed(1)}%</p></article>
        <article class="detail-card"><strong>Aplikacje / Hires</strong><p>${metrics.applicantsCount} / ${metrics.hiresCount}</p></article>
      </div>
      <div class="detail-card">
        <strong>Zrodla pozyskiwania kandydatow</strong>
        <ul>${sourceRows}</ul>
      </div>
    </section>
  `;
}

function recruitmentAnalyticsHtml() {
  const integrationTiles = Object.entries(recruitmentState.integrations)
    .map(([key, integration]) => integrationTileHtml(key, integration))
    .join("");

  return `
    <section class="tab-section">
      <div class="workbench-header">
        <div>
          <p class="panel__label">Wskazniki rekrutacyjne</p>
          <h3>Integracje i obliczenia KPI</h3>
          <p>Zrodla danych pochodza z integracji z ATS, HRIS, Finance i systemow sourcingowych.</p>
        </div>
        <div class="inline-actions">
          <button class="secondary-button is-accent" type="button" data-action="calculate-metrics">Przelicz wskazniki</button>
          <button class="secondary-button" type="button" data-action="reset-metrics">Reset</button>
        </div>
      </div>
      <div class="cards-grid">${integrationTiles}</div>
      <p class="helper-text">Format JSON (minimum): ATS -> applicants[], hires[]; Finance -> totalRecruitmentCost; Sourcing -> sources[].</p>
    </section>
    ${metricsResultHtml()}
  `;
}

function recruitmentUploadHtml() {
  const fileRows = recruitmentState.files.length
    ? recruitmentState.files.map((file, index) => `
      <article class="upload-item">
        <div>
          <strong>${escapeHtml(file.name)}</strong>
          <p>${escapeHtml(file.statusMessage)}</p>
        </div>
        <button class="icon-button" type="button" data-action="remove-file" data-index="${index}">Usun</button>
      </article>
    `).join("")
    : `<div class="alert">Dodaj CV kandydata. Obslugiwane formaty: TXT, RTF, DOCX, PDF. Format DOC wymaga konwersji do DOCX/PDF.</div>`;

  return `
    <section class="tab-section">
      <div class="workbench-header">
        <div>
          <p class="panel__label">Blind CV</p>
          <h3>Generowanie zgodnie z template PDF</h3>
          <p>Na tym etapie wystarczy przeslac CV i wygenerowac dokument. Edycja pojawi sie dopiero po generacji.</p>
        </div>
        <a class="secondary-button" href="${recruitmentState.templateLink}" target="_blank" rel="noreferrer">Otworz template PDF</a>
      </div>
    </section>

    <section class="tab-section">
      <div class="panel__header">
        <div>
          <p class="panel__label">Krok 1</p>
          <h3>Przeslij CV kandydata</h3>
        </div>
        <span class="pill">Upload</span>
      </div>
      <label class="upload-dropzone" id="uploadDropzone">
        <input id="cvFileInput" type="file" multiple accept=".txt,.rtf,.docx,.pdf,.doc">
        <strong>Przeciagnij plik lub kliknij, aby wybrac CV</strong>
        <p class="helper-text">Parser dziala w przegladarce. Dla PDF i DOCX probujemy automatycznego odczytu tresci.</p>
      </label>
      <div class="upload-list">${fileRows}</div>
      <div class="inline-actions">
        <button class="secondary-button is-accent" type="button" data-action="generate" ${recruitmentState.files.length ? "" : "disabled"}>Generuj Blind CV</button>
      </div>
    </section>
  `;
}

function blindCvDocumentHtml() {
  const generated = recruitmentState.generated;
  return `
    <div class="blind-cv-template">
      <header class="blind-cv-template__header">
        <p>SE LLEO - CONFIDENTIAL</p>
        <h2>${escapeHtml(generated.documentTitle)}</h2>
        <span>${escapeHtml(generated.role)}</span>
      </header>

      <section class="blind-cv-section">
        <h3>Professional Summary</h3>
        <p>${escapeHtml(generated.summary)}</p>
      </section>

      <section class="blind-cv-grid">
        <article class="blind-cv-section">
          <h3>Core Competencies</h3>
          ${renderList(generated.coreSkills)}
        </article>
        <article class="blind-cv-section">
          <h3>Education & Certifications</h3>
          ${renderList(generated.education)}
        </article>
      </section>

      <section class="blind-cv-section">
        <h3>Relevant Experience</h3>
        ${renderList(generated.experience)}
      </section>

      <section class="blind-cv-section">
        <h3>Selected Achievements</h3>
        ${renderList(generated.achievements)}
      </section>

      <section class="blind-cv-section">
        <h3>Additional Notes</h3>
        <p>${escapeHtml(generated.additional)}</p>
      </section>
    </div>
  `;
}

function recruitmentResultHtml() {
  const generated = recruitmentState.generated;
  const editor = recruitmentState.editMode
    ? `
      <section class="tab-section">
        <div class="panel__header">
          <div>
            <p class="panel__label">Edycja</p>
            <h3>Popraw brakujace fragmenty</h3>
          </div>
          <button class="secondary-button" type="button" data-action="close-edit">Zwin edycje</button>
        </div>
        <div class="form-grid">
          <div class="full-width">
            <label class="field-label" for="edit-summary">Professional Summary</label>
            <textarea id="edit-summary" data-edit-field="summary">${escapeHtml(generated.summary)}</textarea>
          </div>
          <div class="full-width">
            <label class="field-label" for="edit-skills">Core Competencies (1 linia = 1 punkt)</label>
            <textarea id="edit-skills" data-edit-field="coreSkills">${escapeHtml(generated.coreSkills.join("\n"))}</textarea>
          </div>
          <div class="full-width">
            <label class="field-label" for="edit-experience">Relevant Experience (1 linia = 1 punkt)</label>
            <textarea id="edit-experience" data-edit-field="experience">${escapeHtml(generated.experience.join("\n"))}</textarea>
          </div>
          <div class="full-width">
            <label class="field-label" for="edit-achievements">Selected Achievements (1 linia = 1 punkt)</label>
            <textarea id="edit-achievements" data-edit-field="achievements">${escapeHtml(generated.achievements.join("\n"))}</textarea>
          </div>
          <div class="full-width">
            <label class="field-label" for="edit-education">Education & Certifications (1 linia = 1 punkt)</label>
            <textarea id="edit-education" data-edit-field="education">${escapeHtml(generated.education.join("\n"))}</textarea>
          </div>
          <div class="full-width">
            <label class="field-label" for="edit-additional">Additional Notes</label>
            <textarea id="edit-additional" data-edit-field="additional">${escapeHtml(generated.additional)}</textarea>
          </div>
        </div>
      </section>
    `
    : "";

  return `
    <section class="tab-section">
      <div class="workbench-header">
        <div>
          <p class="panel__label">Krok 2</p>
          <h3>Wygenerowany Blind CV</h3>
          <p>Dokument zostal zlozony automatycznie. Jesli parser pominie fragmenty, otworz edycje i popraw pola.</p>
        </div>
        <div class="inline-actions">
          <button class="secondary-button" type="button" data-action="edit">Edytuj Blind CV</button>
          <button class="secondary-button is-accent" type="button" data-action="export">Eksportuj HTML</button>
          <button class="secondary-button" type="button" data-action="reset">Nowe CV</button>
        </div>
      </div>
      ${blindCvDocumentHtml()}
    </section>
    ${editor}
  `;
}

function renderRecruitmentTab() {
  dom.contentGrid.classList.add("is-recruitment");
  dom.sideContent.classList.add("hidden");
  const isBlindCv = recruitmentState.module === "blindcv";
  const moduleTiles = `
    <section class="tab-section">
      <div class="cards-grid">
        <button class="option-tile ${isBlindCv ? "is-active" : ""}" type="button" data-action="switch-module" data-module="blindcv">
          <strong>Generator Blind CV</strong>
          <p>Upload CV, automatyczne generowanie i reczna edycja po wygenerowaniu.</p>
        </button>
        <button class="option-tile ${!isBlindCv ? "is-active" : ""}" type="button" data-action="switch-module" data-module="analytics">
          <strong>Wskazniki rekrutacyjne</strong>
          <p>Time to Hire, Cost per Hire, zrodla pozyskiwania i wspolczynnik konwersji.</p>
        </button>
      </div>
    </section>
  `;
  const moduleContent = isBlindCv
    ? (!recruitmentState.generated ? recruitmentUploadHtml() : recruitmentResultHtml())
    : recruitmentAnalyticsHtml();
  dom.content.innerHTML = moduleTiles + moduleContent;

  bindRecruitmentEvents();
}

function exportBlindCv() {
  if (!recruitmentState.generated) return;

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Blind CV</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 24px; color: #1a2530; }
    h1, h2, h3 { margin: 0; }
    section { margin-top: 18px; }
    ul { margin: 8px 0 0 18px; }
    li { margin-bottom: 6px; }
  </style>
</head>
<body>
  ${blindCvDocumentHtml()}
</body>
</html>`;

  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "blind-cv.html";
  link.click();
  URL.revokeObjectURL(url);
}

async function loadScript(src) {
  const existing = document.querySelector(`script[src="${src}"]`);
  if (existing) return;

  await new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

async function extractDocxText(file) {
  if (!window.mammoth) {
    await loadScript("https://unpkg.com/mammoth@1.8.0/mammoth.browser.min.js");
  }

  const result = await window.mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
  return result.value || "";
}

async function extractPdfText(file) {
  if (!window.pdfjsLib) {
    const module = await import("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.3.136/pdf.min.mjs");
    window.pdfjsLib = module;
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.3.136/pdf.worker.min.mjs";
  }

  const pdf = await window.pdfjsLib.getDocument({ data: await file.arrayBuffer() }).promise;
  const pages = [];
  for (let page = 1; page <= pdf.numPages; page += 1) {
    const current = await pdf.getPage(page);
    const content = await current.getTextContent();
    pages.push(content.items.map((item) => item.str).join(" "));
  }

  return pages.join("\n\n");
}

async function parseFile(file) {
  const extension = file.name.split(".").pop().toLowerCase();

  if (extension === "txt" || extension === "rtf") {
    return {
      name: file.name,
      statusMessage: "Plik odczytany lokalnie.",
      extractedText: normalizeWhitespace(await file.text())
    };
  }

  if (extension === "docx") {
    try {
      return {
        name: file.name,
        statusMessage: "DOCX odczytany poprawnie.",
        extractedText: normalizeWhitespace(await extractDocxText(file))
      };
    } catch {
      return {
        name: file.name,
        statusMessage: "Nie udalo sie odczytac DOCX. Wklej tekst recznie po generacji.",
        extractedText: ""
      };
    }
  }

  if (extension === "pdf") {
    try {
      return {
        name: file.name,
        statusMessage: "PDF odczytany z warstwy tekstowej.",
        extractedText: normalizeWhitespace(await extractPdfText(file))
      };
    } catch {
      return {
        name: file.name,
        statusMessage: "PDF nie ma czytelnej warstwy tekstowej. Wymagana reczna korekta po generacji.",
        extractedText: ""
      };
    }
  }

  if (extension === "doc") {
    return {
      name: file.name,
      statusMessage: "Format DOC wymaga konwersji do DOCX lub PDF.",
      extractedText: ""
    };
  }

  return {
    name: file.name,
    statusMessage: "Nieobslugiwany format.",
    extractedText: ""
  };
}

function bindRecruitmentEvents() {
  const fileInput = document.getElementById("cvFileInput");
  const dropzone = document.getElementById("uploadDropzone");

  if (fileInput) {
    fileInput.addEventListener("change", async (event) => {
      const selected = Array.from(event.target.files || []);
      for (const file of selected) {
        recruitmentState.files.push(await parseFile(file));
      }
      fileInput.value = "";
      renderTab("rekrutacyjne");
    });
  }

  if (dropzone) {
    ["dragenter", "dragover"].forEach((name) => {
      dropzone.addEventListener(name, (event) => {
        event.preventDefault();
        dropzone.classList.add("is-dragover");
      });
    });

    ["dragleave", "drop"].forEach((name) => {
      dropzone.addEventListener(name, (event) => {
        event.preventDefault();
        dropzone.classList.remove("is-dragover");
      });
    });

    dropzone.addEventListener("drop", async (event) => {
      const selected = Array.from((event.dataTransfer && event.dataTransfer.files) || []);
      for (const file of selected) {
        recruitmentState.files.push(await parseFile(file));
      }
      renderTab("rekrutacyjne");
    });
  }

  dom.content.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.action;
      const index = Number(button.dataset.index);
      const integrationKey = button.dataset.int;
      const module = button.dataset.module;

      if (action === "switch-module") {
        recruitmentState.module = module;
      }

      if (action === "remove-file") {
        recruitmentState.files.splice(index, 1);
      }

      if (action === "generate") {
        recruitmentState.sourceText = recruitmentState.files.map((file) => `### ${file.name}\n${file.extractedText}`).join("\n\n");
        recruitmentState.sanitizedText = anonymizeText(recruitmentState.sourceText);
        deriveBlindCv();
      }

      if (action === "edit") {
        recruitmentState.editMode = true;
      }

      if (action === "close-edit") {
        recruitmentState.editMode = false;
      }

      if (action === "reset") {
        recruitmentState.files = [];
        recruitmentState.sourceText = "";
        recruitmentState.sanitizedText = "";
        recruitmentState.generated = null;
        recruitmentState.editMode = false;
      }

      if (action === "export") {
        exportBlindCv();
      }

      if (action === "toggle-integration") {
        const integration = recruitmentState.integrations[integrationKey];
        integration.connected = !integration.connected;
        if (!integration.connected) {
          integration.data = null;
          integration.lastSync = null;
        }
      }

      if (action === "sync-integration") {
        const integration = recruitmentState.integrations[integrationKey];
        integration.connected = true;
        integration.data = getSampleIntegrationPayload(integrationKey);
        integration.lastSync = new Date().toISOString();
      }

      if (action === "load-integration") {
        const input = dom.content.querySelector(`[data-integration-input='${integrationKey}']`);
        if (input) input.click();
      }

      if (action === "calculate-metrics") {
        computeRecruitmentMetrics();
      }

      if (action === "reset-metrics") {
        recruitmentState.metrics = null;
        recruitmentState.metricsMessage = "Wskazniki zostaly zresetowane. Zsynchronizuj integracje i przelicz ponownie.";
      }

      renderTab("rekrutacyjne");
    });
  });

  dom.content.querySelectorAll("[data-integration-input]").forEach((input) => {
    input.addEventListener("change", async (event) => {
      const file = event.target.files && event.target.files[0];
      if (!file) return;
      const key = event.target.dataset.integrationInput;
      try {
        const payload = JSON.parse(await file.text());
        recruitmentState.integrations[key].data = payload;
        recruitmentState.integrations[key].connected = true;
        recruitmentState.integrations[key].lastSync = new Date().toISOString();
        recruitmentState.metricsMessage = "Dane z integracji zostaly wczytane. Mozesz uruchomic przeliczanie KPI.";
      } catch {
        recruitmentState.metricsMessage = "Nie udalo sie odczytac JSON z integracji.";
      }
      event.target.value = "";
      renderTab("rekrutacyjne");
    });
  });

  dom.content.querySelectorAll("[data-edit-field]").forEach((field) => {
    field.addEventListener("input", (event) => {
      if (!recruitmentState.generated) return;
      const key = event.target.dataset.editField;
      const raw = event.target.value;

      if (["coreSkills", "experience", "achievements", "education"].includes(key)) {
        recruitmentState.generated[key] = raw.split("\n").map((line) => line.trim()).filter(Boolean);
      } else {
        recruitmentState.generated[key] = raw;
      }
    });
  });
}

function getClearanceTrack(pathKey, specializationKey) {
  if (pathKey === "lead") {
    return {
      pathLabel: clearancePaths.lead.label,
      specializationLabel: "",
      levels: clearancePaths.lead.levels
    };
  }

  const path = clearancePaths[pathKey];
  if (!path || !path.specializations) {
    return {
      pathLabel: clearancePaths.lead.label,
      specializationLabel: "",
      levels: clearancePaths.lead.levels
    };
  }

  const specialization = path.specializations[specializationKey] || Object.values(path.specializations)[0];
  return {
    pathLabel: path.label,
    specializationLabel: specialization.label,
    levels: specialization.levels
  };
}

function setDefaultClearanceLevel() {
  const track = getClearanceTrack(clearanceState.selectedPath, clearanceState.selectedSpecialization);
  clearanceState.form.level = track.levels[0] || "";
}

function getNextLevel(levels, currentLevel) {
  const index = levels.indexOf(currentLevel);
  if (index < 0 || index >= levels.length - 1) return "Brak (najwyzszy poziom)";
  return levels[index + 1];
}

function baseChecklistForTrack(pathKey, specializationKey) {
  if (pathKey === "lead") {
    return ["Leadership i ownership", "Komunikacja i stakeholder management", "Planowanie i delivery", "Rozwoj zespolu"];
  }
  if (pathKey === "dev" && specializationKey === "developer") {
    return ["Jakosc techniczna", "Wspolpraca zespolowa", "Samodzielnosc", "Wplyw na produkt"];
  }
  if (pathKey === "dev" && specializationKey === "designer") {
    return ["Jakosc projektowa", "Badania i discovery", "Wspolpraca z zespolami", "Wpływ na UX i biznes"];
  }
  if (pathKey === "dev" && specializationKey === "qa") {
    return ["Strategia testow", "Automatyzacja i narzedzia", "Jakosc procesu", "Wspolpraca release"];
  }
  return ["Realizacja celow", "Jakosc wykonania", "Wspolpraca zespolowa", "Komunikacja"];
}

function buildLevelChecklist(pathKey, specializationKey, level) {
  const generic = baseChecklistForTrack(pathKey, specializationKey);
  const items = [`Wymagania poziomu ${level}`, ...generic];
  return items.map((label, index) => ({
    id: `chk-${Date.now()}-${Math.round(Math.random() * 100000)}-${index}`,
    label,
    done: false
  }));
}

function checklistProgress(record) {
  const total = (record.checklist || []).length;
  const done = (record.checklist || []).filter((item) => item.done).length;
  const percent = total ? Math.round((done / total) * 100) : 0;
  return { total, done, percent };
}

function checklistStatus(record) {
  const { total, done } = checklistProgress(record);
  if (!total || done === 0) return "Rozpoczecie";
  if (done >= total) return "Zaliczony";
  return "W trakcie";
}

function normalizeClearanceForm() {
  const dateValue = clearanceState.form.date ? new Date(clearanceState.form.date) : null;
  const date = dateValue && !Number.isNaN(dateValue.getTime())
    ? dateValue.toISOString().slice(0, 10)
    : new Date().toISOString().slice(0, 10);

  return {
    employee: normalizeWhitespace(clearanceState.form.employee),
    level: clearanceState.form.level,
    date,
    notes: normalizeWhitespace(clearanceState.form.notes)
  };
}

function clearanceFormHtml(track) {
  const levelOptions = track.levels
    .map((level) => `<option value="${escapeHtml(level)}" ${clearanceState.form.level === level ? "selected" : ""}>${escapeHtml(level)}</option>`)
    .join("");

  return `
    <section class="tab-section">
      <div class="panel__header">
        <div>
          <p class="panel__label">Nowe zaliczenie</p>
          <h3>Wpisz poziom i rozpocznij checklist</h3>
        </div>
        <span class="pill">${escapeHtml(track.pathLabel)}${track.specializationLabel ? ` / ${escapeHtml(track.specializationLabel)}` : ""}</span>
      </div>
      <div class="form-grid">
        <div>
          <label class="field-label" for="clearance-employee">Osoba</label>
          <input id="clearance-employee" type="text" value="${escapeHtml(clearanceState.form.employee)}" placeholder="Imie i nazwisko" data-clearance-input="employee">
        </div>
        <div>
          <label class="field-label" for="clearance-level">Poziom</label>
          <select id="clearance-level" data-clearance-input="level">${levelOptions}</select>
        </div>
        <div>
          <label class="field-label" for="clearance-date">Data</label>
          <input id="clearance-date" type="date" value="${escapeHtml(clearanceState.form.date)}" data-clearance-input="date">
        </div>
        <div class="full-width">
          <label class="field-label" for="clearance-notes">Notatki</label>
          <textarea id="clearance-notes" data-clearance-input="notes" placeholder="Kontekst zaliczenia, feedback, uzasadnienie.">${escapeHtml(clearanceState.form.notes)}</textarea>
        </div>
      </div>
      <div class="inline-actions">
        <button class="secondary-button is-accent" type="button" data-action="clearance-add">Dodaj zaliczenie</button>
        <button class="secondary-button" type="button" data-action="clearance-clear-form">Wyczysc formularz</button>
      </div>
    </section>
  `;
}

function clearanceTrackingHtml(track) {
  const scopedRecords = clearanceState.records.filter((item) => {
    const isPath = item.path === clearanceState.selectedPath;
    if (!isPath) return false;
    if (item.path === "lead") return true;
    return item.specialization === clearanceState.selectedSpecialization;
  });

  const rows = scopedRecords.length
    ? scopedRecords
      .map((record) => {
        const progressData = checklistProgress(record);
        const status = checklistStatus(record);
        const nextLevel = getNextLevel(track.levels, record.level);
        const progressIndex = Math.max(0, track.levels.indexOf(record.level) + 1);
        const progress = Math.round((progressIndex / track.levels.length) * 100);
        const checklistRows = (record.checklist || [])
          .map((item) => `
            <label class="checklist-item">
              <input type="checkbox" ${item.done ? "checked" : ""} data-action="clearance-toggle-item" data-id="${record.id}" data-item-id="${item.id}">
              <span>${escapeHtml(item.label)}</span>
            </label>
          `)
          .join("");

        return `
          <article class="option-tile option-tile--integration">
            <strong>${escapeHtml(record.employee)}</strong>
            <p>Poziom: ${escapeHtml(record.level)} (${progress}%)</p>
            <small>Status: ${escapeHtml(status)} | Data: ${escapeHtml(record.date)} | Kolejny poziom: ${escapeHtml(nextLevel)}</small>
            <small>Checklist: ${progressData.done}/${progressData.total} (${progressData.percent}%)</small>
            ${record.notes ? `<p>${escapeHtml(record.notes)}</p>` : ""}
            <div class="content-stack">${checklistRows}</div>
            <div class="inline-actions">
              <button class="secondary-button" type="button" data-action="clearance-mark-all" data-id="${record.id}">Zaznacz wszystko</button>
              <button class="secondary-button" type="button" data-action="clearance-unmark-all" data-id="${record.id}">Odznacz wszystko</button>
              <button class="icon-button" type="button" data-action="clearance-remove" data-id="${record.id}">Usun</button>
            </div>
          </article>
        `;
      })
      .join("")
    : `<div class="alert">Brak wpisow dla wybranej sciezki.</div>`;

  return `
    <section class="tab-section">
      <div class="panel__header">
        <div>
          <p class="panel__label">Tracking</p>
          <h3>Zaliczenia poziomow i czesci skladowe</h3>
          <p>${escapeHtml(clearanceState.message)}</p>
        </div>
      </div>
      <div class="content-stack">${rows}</div>
    </section>
  `;
}

function renderClearanceTab() {
  dom.contentGrid.classList.add("is-recruitment");
  dom.sideContent.classList.add("hidden");
  dom.heroActions.classList.add("hidden");
  dom.metricsPanel.classList.add("hidden");

  const pathTiles = Object.entries(clearancePaths)
    .map(([key, config]) => `
      <button class="option-tile ${clearanceState.selectedPath === key ? "is-active" : ""}" type="button" data-action="clearance-path" data-path="${key}">
        <strong>${escapeHtml(config.label)}</strong>
        <p>${key === "lead" ? "CLA/CTL" : key === "dev" ? "Developer, Designer, QA" : "Junior i Exp"}</p>
      </button>
    `)
    .join("");

  const selectedConfig = clearancePaths[clearanceState.selectedPath];
  const specializationTiles = selectedConfig.specializations
    ? Object.entries(selectedConfig.specializations)
      .map(([key, specialization]) => `
        <button class="option-tile option-tile--soft ${clearanceState.selectedSpecialization === key ? "is-active" : ""}" type="button" data-action="clearance-specialization" data-specialization="${key}">
          <strong>${escapeHtml(specialization.label)}</strong>
          <p>${escapeHtml(specialization.levels.join(" / "))}</p>
        </button>
      `)
      .join("")
    : "";

  const track = getClearanceTrack(clearanceState.selectedPath, clearanceState.selectedSpecialization);

  dom.content.innerHTML = `
    <section class="tab-section">
      <div class="panel__header">
        <div>
          <p class="panel__label">Sciezki zaliczeniowe</p>
          <h3>Lead Path / DevPath / Associate</h3>
        </div>
      </div>
      <div class="cards-grid">${pathTiles}</div>
      ${specializationTiles ? `<div class="cards-grid">${specializationTiles}</div>` : ""}
    </section>
    ${clearanceFormHtml(track)}
    ${clearanceTrackingHtml(track)}
  `;

  bindClearanceEvents();
}

function bindClearanceEvents() {
  dom.content.querySelectorAll("[data-clearance-input]").forEach((input) => {
    const handler = (event) => {
      const key = event.target.dataset.clearanceInput;
      clearanceState.form[key] = event.target.value;
    };
    input.addEventListener("input", handler);
    input.addEventListener("change", handler);
  });

  dom.content.querySelectorAll("[data-action]").forEach((control) => {
    control.addEventListener("click", () => {
      const action = control.dataset.action;

      if (action === "clearance-path") {
        clearanceState.selectedPath = control.dataset.path;
        const specializations = clearancePaths[clearanceState.selectedPath].specializations;
        if (specializations) {
          clearanceState.selectedSpecialization = Object.keys(specializations)[0];
        } else {
          clearanceState.selectedSpecialization = "developer";
        }
        setDefaultClearanceLevel();
        renderTab("zaliczenia");
      }

      if (action === "clearance-specialization") {
        clearanceState.selectedSpecialization = control.dataset.specialization;
        setDefaultClearanceLevel();
        renderTab("zaliczenia");
      }

      if (action === "clearance-add") {
        const form = normalizeClearanceForm();
        if (!form.employee) {
          clearanceState.message = "Pole 'Osoba' jest wymagane.";
          renderTab("zaliczenia");
          return;
        }
        clearanceState.records.unshift({
          id: `clr-${Date.now()}-${Math.round(Math.random() * 100000)}`,
          employee: form.employee,
          path: clearanceState.selectedPath,
          specialization: clearanceState.selectedPath === "lead" ? null : clearanceState.selectedSpecialization,
          level: form.level,
          date: form.date,
          notes: form.notes,
          checklist: buildLevelChecklist(clearanceState.selectedPath, clearanceState.selectedSpecialization, form.level)
        });
        clearanceState.message = "Dodano zaliczenie poziomu i zaktualizowano tracking.";
        clearanceState.form.employee = "";
        clearanceState.form.notes = "";
        clearanceState.form.date = "";
        setDefaultClearanceLevel();
        renderTab("zaliczenia");
      }

      if (action === "clearance-clear-form") {
        clearanceState.form.employee = "";
        clearanceState.form.notes = "";
        clearanceState.form.date = "";
        setDefaultClearanceLevel();
        renderTab("zaliczenia");
      }

      if (action === "clearance-toggle-item") {
        const record = clearanceState.records.find((item) => item.id === control.dataset.id);
        if (!record) return;
        const checklistItem = (record.checklist || []).find((item) => item.id === control.dataset.itemId);
        if (!checklistItem) return;
        checklistItem.done = !checklistItem.done;
        const status = checklistStatus(record);
        clearanceState.message = `Zaktualizowano checklist dla ${record.employee}. Status: ${status}.`;
        renderTab("zaliczenia");
      }

      if (action === "clearance-mark-all") {
        const record = clearanceState.records.find((item) => item.id === control.dataset.id);
        if (!record) return;
        (record.checklist || []).forEach((item) => {
          item.done = true;
        });
        clearanceState.message = `Wszystkie podpunkty oznaczone jako zaliczone dla ${record.employee}.`;
        renderTab("zaliczenia");
      }

      if (action === "clearance-unmark-all") {
        const record = clearanceState.records.find((item) => item.id === control.dataset.id);
        if (!record) return;
        (record.checklist || []).forEach((item) => {
          item.done = false;
        });
        clearanceState.message = `Checklist wyczyszczona dla ${record.employee}.`;
        renderTab("zaliczenia");
      }

      if (action === "clearance-remove") {
        clearanceState.records = clearanceState.records.filter((item) => item.id !== control.dataset.id);
        clearanceState.message = "Usunieto wpis zaliczenia.";
        renderTab("zaliczenia");
      }
    });
  });
}

function parseDate(value) {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function withinPeriod(dateValue, fromDate, toDate) {
  const current = parseDate(dateValue);
  if (!current) return false;
  if (fromDate && current < fromDate) return false;
  if (toDate && current > toDate) return false;
  return true;
}

function isActiveOnDate(row, dateValue) {
  const date = parseDate(dateValue);
  const hire = parseDate(row.hireDate);
  const exit = parseDate(row.exitDate);
  if (!date || !hire) return false;
  if (hire > date) return false;
  if (exit && exit <= date) return false;
  return true;
}

function monthsBetween(startValue, endValue) {
  const start = parseDate(startValue);
  const end = parseDate(endValue);
  if (!start || !end || end < start) return 0;
  const diffMs = end.getTime() - start.getTime();
  return diffMs / (1000 * 60 * 60 * 24 * 30.4375);
}

function uniqueTeamOptions() {
  const unique = Array.from(new Set(rotationState.rows.map((row) => row.team).filter(Boolean)));
  return unique.length ? unique : ["Engineering", "Design", "QA", "HR", "Operations"];
}

function applyRotationFilters(rows) {
  const search = rotationState.filters.search.trim().toLowerCase();
  return rows.filter((row) => {
    if (rotationState.filters.team !== "all" && row.team !== rotationState.filters.team) return false;
    if (rotationState.filters.status !== "all" && row.status !== rotationState.filters.status) return false;
    if (rotationState.filters.exitType !== "all" && row.exitType !== rotationState.filters.exitType) return false;
    if (!search) return true;

    const haystack = [
      row.employee,
      row.team,
      row.role,
      row.reason,
      row.manager,
      row.status
    ].join(" ").toLowerCase();

    return haystack.includes(search);
  });
}

function getRowsForRotationSelection() {
  return rotationState.rows.filter((row) => {
    if (rotationState.filters.team !== "all" && row.team !== rotationState.filters.team) return false;
    if (rotationState.filters.status !== "all" && row.status !== rotationState.filters.status) return false;
    if (rotationState.filters.exitType !== "all" && row.exitType !== rotationState.filters.exitType) return false;
    return true;
  });
}

function getRowsForMetricsSelection() {
  if (rotationState.metricsUseTableFilters) {
    return getRowsForRotationSelection();
  }
  return rotationState.rows;
}

function computeRotationMetrics() {
  const rowsForMetrics = getRowsForMetricsSelection();
  const totals = {
    headcountStart: 0,
    headcountEnd: 0,
    avgHeadcount: 0,
    exits: 0,
    voluntaryExits: 0,
    involuntaryExits: 0,
    retentionRate: 0,
    turnoverRate: 0,
    voluntaryTurnoverRate: 0,
    avgTenureMonths: 0,
    periodLabel: "Calosciowo",
    periodActive: false
  };

  if (!rowsForMetrics.length) {
    return totals;
  }

  if (!rotationState.metricsUsePeriod) {
    const exitsRows = rowsForMetrics.filter((row) => parseDate(row.exitDate));
    const activeNow = rowsForMetrics.filter((row) => row.status === "active" || row.status === "on_leave").length;
    const exited = rowsForMetrics.filter((row) => row.status === "exited" || parseDate(row.exitDate)).length;
    const voluntaryExits = rowsForMetrics.filter((row) => row.exitType === "voluntary").length;
    const involuntaryExits = rowsForMetrics.filter((row) => row.exitType === "involuntary").length;
    const avgTenureMonths = exitsRows.length
      ? exitsRows.reduce((sumValue, row) => sumValue + monthsBetween(row.hireDate, row.exitDate), 0) / exitsRows.length
      : 0;

    return {
      ...totals,
      headcountStart: rowsForMetrics.length,
      headcountEnd: activeNow,
      avgHeadcount: (rowsForMetrics.length + activeNow) / 2,
      exits: exited,
      voluntaryExits,
      involuntaryExits,
      retentionRate: rowsForMetrics.length ? (activeNow / rowsForMetrics.length) * 100 : 0,
      turnoverRate: rowsForMetrics.length ? (exited / rowsForMetrics.length) * 100 : 0,
      voluntaryTurnoverRate: rowsForMetrics.length ? (voluntaryExits / rowsForMetrics.length) * 100 : 0,
      avgTenureMonths
    };
  }

  const fromDate = parseDate(rotationState.metricsPeriodFrom);
  const toDate = parseDate(rotationState.metricsPeriodTo);
  if (!fromDate || !toDate || fromDate > toDate) {
    return {
      ...totals,
      periodLabel: "Nieprawidlowy okres",
      periodActive: true
    };
  }

  const headcountStart = rowsForMetrics.filter((row) => isActiveOnDate(row, rotationState.metricsPeriodFrom)).length;
  const headcountEnd = rowsForMetrics.filter((row) => isActiveOnDate(row, rotationState.metricsPeriodTo)).length;
  const avgHeadcount = (headcountStart + headcountEnd) / 2;
  const exitsInPeriod = rowsForMetrics.filter((row) => withinPeriod(row.exitDate, fromDate, toDate));
  const exits = exitsInPeriod.length;
  const voluntaryExits = exitsInPeriod.filter((row) => row.exitType === "voluntary").length;
  const involuntaryExits = exitsInPeriod.filter((row) => row.exitType === "involuntary").length;
  const retentionRate = headcountStart > 0 ? ((headcountStart - exits) / headcountStart) * 100 : 0;
  const turnoverRate = avgHeadcount > 0 ? (exits / avgHeadcount) * 100 : 0;
  const voluntaryTurnoverRate = avgHeadcount > 0 ? (voluntaryExits / avgHeadcount) * 100 : 0;
  const avgTenureMonths = exits > 0
    ? exitsInPeriod.reduce((sumValue, row) => sumValue + monthsBetween(row.hireDate, row.exitDate), 0) / exits
    : 0;

  return {
    headcountStart,
    headcountEnd,
    avgHeadcount,
    exits,
    voluntaryExits,
    involuntaryExits,
    retentionRate,
    turnoverRate,
    voluntaryTurnoverRate,
    avgTenureMonths,
    periodLabel: `${rotationState.metricsPeriodFrom} - ${rotationState.metricsPeriodTo}`,
    periodActive: true
  };
}

function rotationMetricsHtml() {
  const metrics = computeRotationMetrics();
  const scopeLabel = rotationState.metricsUseTableFilters
    ? "wg filtrow tabeli"
    : "wszystkie dane (niezaleznie od filtrow tabeli)";
  return `
    <section class="tab-section">
      <div class="panel__header">
        <div>
          <p class="panel__label">Wskazniki HR</p>
          <h3>Retencja i rotacja</h3>
          <p>Tryb: ${escapeHtml(metrics.periodLabel)}</p>
          <p>Zakres danych: ${escapeHtml(scopeLabel)}</p>
          <p>${escapeHtml(rotationState.metricsMessage)}</p>
        </div>
      </div>
      <div class="form-grid">
        <div>
          <label class="field-label" for="rotation-metrics-from">Okres od (opcjonalnie)</label>
          <input id="rotation-metrics-from" type="date" value="${escapeHtml(rotationState.metricsPeriodFrom)}">
        </div>
        <div>
          <label class="field-label" for="rotation-metrics-to">Okres do (opcjonalnie)</label>
          <input id="rotation-metrics-to" type="date" value="${escapeHtml(rotationState.metricsPeriodTo)}">
        </div>
        <div class="full-width">
          <label class="field-label" for="rotation-metrics-scope">Liczenie wskaznikow</label>
          <select id="rotation-metrics-scope">
            <option value="all" ${rotationState.metricsUseTableFilters ? "" : "selected"}>Wszystkie dane (bez filtrow tabeli)</option>
            <option value="table" ${rotationState.metricsUseTableFilters ? "selected" : ""}>Dane po filtrach tabeli</option>
          </select>
        </div>
      </div>
      <div class="inline-actions">
        <button class="secondary-button is-accent" type="button" data-action="rotation-apply-metrics-period">Przelicz</button>
        <button class="secondary-button" type="button" data-action="rotation-reset-metrics-period">Wyniki calosciowe</button>
      </div>
      <div class="cards-grid">
        <article class="option-tile option-tile--soft"><strong>Retencja</strong><p>${metrics.retentionRate.toFixed(1)}%</p></article>
        <article class="option-tile option-tile--soft"><strong>Rotacja</strong><p>${metrics.turnoverRate.toFixed(1)}%</p></article>
        <article class="option-tile option-tile--soft"><strong>Rotacja dobrowolna</strong><p>${metrics.voluntaryTurnoverRate.toFixed(1)}%</p></article>
        <article class="option-tile option-tile--soft"><strong>Odejscia (dobr./niedobr.)</strong><p>${metrics.exits} (${metrics.voluntaryExits}/${metrics.involuntaryExits})</p></article>
      </div>
      <div class="cards-grid">
        <article class="option-tile option-tile--soft"><strong>Headcount start</strong><p>${metrics.headcountStart}</p></article>
        <article class="option-tile option-tile--soft"><strong>Headcount end</strong><p>${metrics.headcountEnd}</p></article>
        <article class="option-tile option-tile--soft"><strong>Sredni headcount</strong><p>${metrics.avgHeadcount.toFixed(1)}</p></article>
        <article class="option-tile option-tile--soft"><strong>Sredni staz przy odejsciu</strong><p>${metrics.avgTenureMonths.toFixed(1)} mies.</p></article>
      </div>
    </section>
  `;
}

function rotationControlsHtml() {
  const teamOptions = uniqueTeamOptions();
  const teamSelect = teamOptions
    .map((team) => `<option value="${escapeHtml(team)}" ${rotationState.filters.team === team ? "selected" : ""}>${escapeHtml(team)}</option>`)
    .join("");

  return `
    <section class="tab-section">
      <div class="panel__header">
        <div>
          <p class="panel__label">Zakres i filtry</p>
          <h3>Filtry tabeli</h3>
          <p>${escapeHtml(rotationState.tableMessage)}</p>
        </div>
      </div>
      <div class="form-grid">
        <div class="full-width">
          <label class="field-label" for="rotation-search">Szukaj</label>
          <input id="rotation-search" type="text" value="${escapeHtml(rotationState.filters.search)}" placeholder="Imie, rola, manager, powod odejscia">
        </div>
        <div>
          <label class="field-label" for="rotation-team">Zespol</label>
          <select id="rotation-team">
            <option value="all" ${rotationState.filters.team === "all" ? "selected" : ""}>Wszystkie</option>
            ${teamSelect}
          </select>
        </div>
        <div>
          <label class="field-label" for="rotation-status">Status</label>
          <select id="rotation-status">
            <option value="all" ${rotationState.filters.status === "all" ? "selected" : ""}>Wszystkie</option>
            <option value="active" ${rotationState.filters.status === "active" ? "selected" : ""}>Active</option>
            <option value="on_leave" ${rotationState.filters.status === "on_leave" ? "selected" : ""}>On leave</option>
            <option value="exited" ${rotationState.filters.status === "exited" ? "selected" : ""}>Exited</option>
          </select>
        </div>
        <div>
          <label class="field-label" for="rotation-exit-type">Typ odejscia</label>
          <select id="rotation-exit-type">
            <option value="all" ${rotationState.filters.exitType === "all" ? "selected" : ""}>Wszystkie</option>
            <option value="none" ${rotationState.filters.exitType === "none" ? "selected" : ""}>Brak</option>
            <option value="voluntary" ${rotationState.filters.exitType === "voluntary" ? "selected" : ""}>Dobrowolne</option>
            <option value="involuntary" ${rotationState.filters.exitType === "involuntary" ? "selected" : ""}>Niedobrowolne</option>
          </select>
        </div>
      </div>
      <div class="inline-actions">
        <button class="secondary-button is-accent" type="button" data-action="rotation-apply">Zastosuj filtry</button>
        <button class="secondary-button" type="button" data-action="rotation-reset-filters">Reset filtrow</button>
        <button class="secondary-button" type="button" data-action="rotation-add-row">Dodaj wiersz</button>
      </div>
    </section>
  `;
}

function rotationTableHtml() {
  const teamOptions = ["Engineering", "Design", "QA", "HR", "Operations"];
  const rows = applyRotationFilters(rotationState.rows);

  const body = rows.length
    ? rows.map((row) => `
      <tr>
        <td><input type="text" value="${escapeHtml(row.employee)}" data-rotation-row="${row.id}" data-field="employee"></td>
        <td>
          <select data-rotation-row="${row.id}" data-field="team">
            ${teamOptions
              .map((team) => `<option value="${escapeHtml(team)}" ${row.team === team ? "selected" : ""}>${escapeHtml(team)}</option>`)
              .join("")}
          </select>
        </td>
        <td><input type="text" value="${escapeHtml(row.role)}" data-rotation-row="${row.id}" data-field="role"></td>
        <td><input type="date" value="${escapeHtml(row.hireDate)}" data-rotation-row="${row.id}" data-field="hireDate"></td>
        <td><input type="date" value="${escapeHtml(row.exitDate)}" data-rotation-row="${row.id}" data-field="exitDate"></td>
        <td>
          <select data-rotation-row="${row.id}" data-field="exitType">
            <option value="none" ${row.exitType === "none" ? "selected" : ""}>Brak</option>
            <option value="voluntary" ${row.exitType === "voluntary" ? "selected" : ""}>Dobrowolne</option>
            <option value="involuntary" ${row.exitType === "involuntary" ? "selected" : ""}>Niedobrowolne</option>
          </select>
        </td>
        <td><input type="text" value="${escapeHtml(row.reason)}" data-rotation-row="${row.id}" data-field="reason"></td>
        <td><input type="text" value="${escapeHtml(row.manager)}" data-rotation-row="${row.id}" data-field="manager"></td>
        <td>
          <select data-rotation-row="${row.id}" data-field="status">
            <option value="active" ${row.status === "active" ? "selected" : ""}>Active</option>
            <option value="on_leave" ${row.status === "on_leave" ? "selected" : ""}>On leave</option>
            <option value="exited" ${row.status === "exited" ? "selected" : ""}>Exited</option>
          </select>
        </td>
        <td><input type="number" step="0.1" min="0" value="${escapeHtml(row.fte)}" data-rotation-row="${row.id}" data-field="fte"></td>
        <td><button class="icon-button" type="button" data-action="rotation-remove-row" data-id="${row.id}">Usun</button></td>
      </tr>
    `).join("")
    : `<tr><td colspan="11"><div class="alert">Brak danych po filtrowaniu.</div></td></tr>`;

  return `
    <section class="tab-section">
      <div class="panel__header">
        <div>
          <p class="panel__label">Tabela rotacji</p>
          <h3>Edytowalne dane z mozliwoscia filtrowania</h3>
        </div>
      </div>
      <div class="rotation-table-wrap">
        <table class="rotation-table">
          <thead>
            <tr>
              <th>Pracownik</th>
              <th>Zespol</th>
              <th>Rola</th>
              <th>Data dolaczenia</th>
              <th>Data odejscia</th>
              <th>Typ odejscia</th>
              <th>Powod</th>
              <th>Manager</th>
              <th>Status</th>
              <th>FTE</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>${body}</tbody>
        </table>
      </div>
    </section>
  `;
}

function renderRotationTab() {
  dom.contentGrid.classList.add("is-recruitment");
  dom.sideContent.classList.add("hidden");
  dom.heroActions.classList.add("hidden");
  dom.metricsPanel.classList.add("hidden");

  dom.content.innerHTML = `
    <div class="rotation-view">
      ${rotationMetricsHtml()}
      ${rotationControlsHtml()}
      ${rotationTableHtml()}
    </div>
  `;

  bindRotationEvents();
}

function bindRotationEvents() {
  dom.content.querySelectorAll("[data-rotation-row]").forEach((field) => {
    field.addEventListener("change", (event) => {
      const id = event.target.dataset.rotationRow;
      const key = event.target.dataset.field;
      const row = rotationState.rows.find((item) => item.id === id);
      if (!row || !key) return;
      row[key] = event.target.value;
      if (["team", "status", "exitType", "hireDate", "exitDate"].includes(key)) {
        renderTab("rotacja");
      }
    });
  });

  dom.content.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.action;

      if (action === "rotation-apply") {
        const search = dom.content.querySelector("#rotation-search");
        const team = dom.content.querySelector("#rotation-team");
        const status = dom.content.querySelector("#rotation-status");
        const exitType = dom.content.querySelector("#rotation-exit-type");

        rotationState.filters.search = search ? search.value : "";
        rotationState.filters.team = team ? team.value : "all";
        rotationState.filters.status = status ? status.value : "all";
        rotationState.filters.exitType = exitType ? exitType.value : "all";
        rotationState.tableMessage = "Zastosowano filtry tabeli.";
        if (rotationState.metricsUseTableFilters) {
          rotationState.metricsMessage = "Wskazniki uwzgledniaja aktualne filtry tabeli.";
        }
        renderTab("rotacja");
      }

      if (action === "rotation-reset-filters") {
        rotationState.filters = { search: "", team: "all", status: "all", exitType: "all" };
        rotationState.tableMessage = "Filtry zostaly wyczyszczone.";
        if (rotationState.metricsUseTableFilters) {
          rotationState.metricsMessage = "Filtry tabeli wyczyszczone. Wskazniki nadal liczone wg filtrow tabeli.";
        }
        renderTab("rotacja");
      }

      if (action === "rotation-apply-metrics-period") {
        const from = dom.content.querySelector("#rotation-metrics-from");
        const to = dom.content.querySelector("#rotation-metrics-to");
        const scope = dom.content.querySelector("#rotation-metrics-scope");
        rotationState.metricsPeriodFrom = from ? from.value : "";
        rotationState.metricsPeriodTo = to ? to.value : "";
        rotationState.metricsUseTableFilters = scope ? scope.value === "table" : rotationState.metricsUseTableFilters;
        rotationState.metricsUsePeriod = Boolean(rotationState.metricsPeriodFrom && rotationState.metricsPeriodTo);
        rotationState.metricsMessage = rotationState.metricsUsePeriod
          ? `Wskazniki przeliczone dla wybranego okresu${rotationState.metricsUseTableFilters ? " i wg filtrow tabeli." : "."}`
          : `Wskazniki przeliczone bez okresu${rotationState.metricsUseTableFilters ? " i wg filtrow tabeli." : " dla wszystkich danych."}`;
        renderTab("rotacja");
      }

      if (action === "rotation-reset-metrics-period") {
        rotationState.metricsPeriodFrom = "";
        rotationState.metricsPeriodTo = "";
        rotationState.metricsUsePeriod = false;
        rotationState.metricsMessage = rotationState.metricsUseTableFilters
          ? "Wskazniki przeliczone w trybie calosciowym wg filtrow tabeli."
          : "Wskazniki przeliczone w trybie calosciowym.";
        renderTab("rotacja");
      }

      if (action === "rotation-add-row") {
        rotationState.rows.unshift(makeRotationRow({ status: "active", exitType: "none", team: "Engineering" }));
        rotationState.tableMessage = "Dodano nowy wiersz tabeli.";
        renderTab("rotacja");
      }

      if (action === "rotation-remove-row") {
        rotationState.rows = rotationState.rows.filter((row) => row.id !== button.dataset.id);
        rotationState.tableMessage = "Usunieto wiersz z tabeli.";
        renderTab("rotacja");
      }
    });
  });
}

function renderTab(tabKey) {
  const tab = tabs[tabKey];
  dom.title.textContent = tab.title;
  dom.description.textContent = tab.description;
  dom.main.classList.toggle("is-home", tabKey === "home");

  if (tab.custom === "recruitment") {
    renderRecruitmentTab();
  } else if (tab.custom === "clearances") {
    renderClearanceTab();
  } else if (tab.custom === "rotation") {
    renderRotationTab();
  } else {
    renderDefaultTab(tabKey);
  }

  dom.navItems.forEach((item) => {
    item.classList.toggle("is-active", item.dataset.tab === tabKey);
  });

  renderHomeQuickActions();
}

dom.navItems.forEach((item) => {
  item.addEventListener("click", () => renderTab(item.dataset.tab));
});

dom.sidebarToggle.addEventListener("click", () => {
  dom.sidebar.classList.toggle("is-collapsed");
});

bindQuickActionsEvents();
renderTab("home");

