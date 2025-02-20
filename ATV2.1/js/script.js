function updateClock(timezone) {
    const clockElement = document.getElementById("clock");
    const now = new Date();
    const formatter = new Intl.DateTimeFormat("pt-BR", {
        timeZone: timezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    });
    clockElement.textContent = formatter.format(now);
}

function startClock() {
    const timezoneSelector = document.getElementById("timezone-selector");
    let selectedTimezone = timezoneSelector.value;
    updateClock(selectedTimezone);
    setInterval(() => {
        updateClock(selectedTimezone);
    }, 1000);
    timezoneSelector.addEventListener("change", (event) => {
        selectedTimezone = event.target.value;
        updateClock(selectedTimezone);
    });
}

window.onload = startClock;
