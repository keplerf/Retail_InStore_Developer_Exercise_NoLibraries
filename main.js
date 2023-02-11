const navigation = document.querySelector("#nav");
const hightlight = document.createElement("span");
let timeElements;
hightlight.classList.add("highlight");
document.body.appendChild(hightlight);

import data from "/navigation.json" assert { type: "json" };

const createTriggers = () => {
  const triggers = document.querySelectorAll("#nav li");
  triggers.forEach((link) => {
    link.addEventListener("click", (e) => {
      highlightLink(e.currentTarget, triggers);
    });
  });
};
const createNavigation = (list) => {
  list.forEach((item) => {
    navigation.innerHTML += `<li><span data-timeZone="${item.zoneName}" class="time">Times </span><a href="#" >${item.label}</a> </li>`;
  });
  createTriggers();
};

const positionHighlight = (el) => {
  hightlight.style.width = `${el.width}px`;
  hightlight.style.transform = `translate(${el.left}px)`;
};

const highlightLink = (el, triggersElement) => {
  const linkCoords = el.getBoundingClientRect();
  positionHighlight(linkCoords);
  triggersElement.forEach((item) => item.classList.remove("active"));
  el.classList.add("active");
};

const resize = () => {
  const activeLink = document.querySelector("#nav li.active a");
  const linkCoords = activeLink.getBoundingClientRect();
  positionHighlight(linkCoords);
};

const debounce = (func) => {
  var timer;
  return function (event) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(func, 100, event);
  };
};

window.addEventListener(
  "resize",
  debounce(function (e) {
    resize();
  })
);

const updateTimes = () => {
  timeElements.forEach((location) => {
    const output = location.querySelector(".time");
    const timezone = location.getAttribute("data-timeZone");
    const now = timezone != "" ? luxon.DateTime.now().setZone(timezone) : null;
    location.innerHTML = now ? now.toFormat("HH:mm:ss") : "<br> ";
  });
};

const init = (list) => {
  createNavigation(list);
  timeElements = document.querySelectorAll("#nav li .time");
};

init(data.cities);

setInterval(function () {
  updateTimes();
}, 1000);
