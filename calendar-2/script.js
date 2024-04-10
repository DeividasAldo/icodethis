const daysElement = document.querySelector(".calendar-days");
const nextMonthBtn = document.querySelector(".next");
const prevMonthBtn = document.querySelector(".prev");
const monthYearElement = document.querySelector(".month-year");
const openModalBtn = document.querySelector(".open-modal-btn");
const eventsElement = document.querySelector(".events");
const addEventBtn = document.querySelector(".add-event-btn");
const titleInput = document.querySelector(".title-input");
const timeInput = document.querySelector(".time-input");
const modal = document.querySelector(".modal");
const calendar = document.querySelector(".calendar");
const closeModalBtn = document.querySelector(".close-modal-btn");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const currentDate = new Date();
const events = [
  {
    year: 2024,
    month: 3,
    day: 1,

    title: "April Fools Day",
    time: "00:00",
  },
  {
    year: 2024,
    month: 3,
    day: 13,

    title: "Haircut",
    time: "13:30",
  },
  {
    year: 2024,
    month: 3,
    day: 13,

    title: "Basketball practice",
    time: "08:30",
  },
  {
    year: 2024,
    month: 3,
    day: 30,

    title: "Appointment with Jim",
    time: "13:00",
  },
  {
    year: 2024,
    month: 3,
    day: 30,

    title: "Appointment with Jimm",
    time: "14:00",
  },
  {
    year: 2024,
    month: 3,
    day: 30,

    title: "Appointment with Jimmm",
    time: "15:00",
  },
  {
    year: 2024,
    month: 3,
    day: 30,

    title: "Appointment with Jimmmy",
    time: "16:00",
  },
];

function setMonth(e) {
  const action = e.currentTarget.dataset.action;

  if (action === "next") {
    currentDate.setMonth(currentDate.getMonth() + 1);
  } else {
    currentDate.setMonth(currentDate.getMonth() - 1);
  }

  renderDays();
}

function renderDays() {
  daysElement.innerHTML = "";
  eventsElement.innerHTML = "";

  const daysInMonth = getDaysInMonth();
  const weekday = getWeekday();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  for (let i = 0; i < daysInMonth; i++) {
    const currentDay = i + 1;
    const dayEl = document.createElement("div");
    dayEl.dataset.day = currentDay;
    dayEl.textContent = currentDay;
    dayEl.classList.add("day");

    const currentEvents = checkForEvents(currentYear, currentMonth, currentDay);

    if (currentEvents.length > 0) {
      dayEl.classList.add("event");
    }

    if (currentDay === 1) {
      dayEl.style.gridColumn = weekday + 1;
    }

    daysElement.appendChild(dayEl);
  }

  monthYearElement.textContent = `${getMonthName()} ${currentYear}`;
}

function getDaysInMonth() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  return new Date(year, month + 1, 0).getDate();
}

function getMonthName() {
  return months[currentDate.getMonth()].toUpperCase();
}

function getWeekday() {
  const date = currentDate;
  const year = date.getFullYear();
  const month = date.getMonth();
  return new Date(year, month, 1).getDay();
}

function openModal() {
  const dayElements = [...daysElement.children];
  const isDaySelected = dayElements.find((el) =>
    el.classList.contains("selected")
  );

  if (isDaySelected) {
    calendar.style.pointerEvents = "none";
    modal.classList.add("open");
  } else {
    alert("please select a day");
  }
}

function addEvent() {
  const dayElements = [...daysElement.children];
  const dayEl = dayElements.find((el) => el.classList.contains("selected"));

  const time = timeInput.value;
  const title = titleInput.value;

  if (time.trim().length < 1 || title.trim().length < 1) {
    alert("please fill in the inputs, don't leave them blank");
  } else {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = Number(dayEl.dataset.day);

    const event = { time, title, year, month, day };
    events.push(event);

    eventsElement.innerHTML += `<div class="event">
                                    <i class="event-icon fa-regular fa-calendar"></i>
                                    <div class="event-info">
                                        <div class="event-title">${title}</div>
                                    <div class="event-time">${time}</div>
                                </div>
                                </div>`;
    dayEl.classList.add("event");

    timeInput.value = "";
    titleInput.value = "";
    modal.classList.remove("open");
    calendar.style.pointerEvents = "all";
  }
}

function select(e) {
  const isDaySelected = e.target.classList.contains("day");
  if (isDaySelected) {
    eventsElement.innerHTML = "";

    const dayElements = [...daysElement.children];
    dayElements.forEach((dayEl) => dayEl.classList.remove("selected"));

    const currentDay = Number(e.target.dataset.day);
    e.target.classList.add("selected");

    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    if (e.target.classList.contains("event")) {
      const events = checkForEvents(currentYear, currentMonth, currentDay);
      renderEvents(events);
    }
  }
}

function checkForEvents(year, month, day) {
  const eventsExist = events.filter((event) => {
    return event.year === year && event.month === month && event.day === day;
  });

  return eventsExist;
}

function renderEvents(events) {
  events.forEach((ev) => {
    eventsElement.innerHTML += `<div class="event">
                                        <i class="event-icon fa-regular fa-calendar"></i>
                                        <div class="event-info">
                                            <div class="event-title">${ev.title}</div>
                                            <div class="event-time">${ev.time}</div>
                                        </div>
                                    </div>`;
  });
}

function closeModal() {
  timeInput.value = "";
  titleInput.value = "";

  modal.classList.remove("open");
  calendar.style.pointerEvents = "all";
}

openModalBtn.addEventListener("click", openModal);
prevMonthBtn.addEventListener("click", setMonth);
nextMonthBtn.addEventListener("click", setMonth);
daysElement.addEventListener("click", select);
addEventBtn.addEventListener("click", addEvent);
closeModalBtn.addEventListener("click", closeModal);
renderDays();
