const clock = document.querySelector("div#clock");
const calender = document.querySelector("div#date");

const week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

function drawClock() {
    const today = new Date();
    const year = today.getFullYear().toString();
    const month = today.getMonth().toString();
    const date = today.getDate().toString();
    const day = today.getDay();
    const hours = today.getHours().toString().padStart(2, "0");
    const minutes = today.getMinutes().toString().padStart(2, "0");
    const seconds = today.getSeconds().toString().padStart(2, "0");
    calender.innerText = `${year}-${month}-${date} ${week[day]}`;
    clock.innerText = `${hours}:${minutes}:${seconds}`;
}

drawClock();
setInterval(drawClock, 1000);
