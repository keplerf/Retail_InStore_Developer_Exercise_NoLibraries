data = {
  cities: [
    {
      section: "cupertino",
      label: "Cupertino",
      zoneName: "America/Los_Angeles",
    },
    {
      section: "new-york-city",
      label: "New York City",
      zoneName: "America/New_York",
    },
    {
      section: "london",
      label: "London",
      zoneName: "America/Los_Angeles",
    },
    {
      section: "amsterdam",
      label: "Amsterdam",
      zoneName: "Europe/Amsterdam",
    },
    {
      section: "tokyo",
      label: "Tokyo",
      zoneName: "Asia/Tokyo",
    },
    {
      section: "hong-kong",
      label: "Hong Kong",
      zoneName: "Asia/Hong_Kong",
    },
    {
      section: "sydney",
      label: "Sydney",
      zoneName: "Australia/Sydney",
    },
  ],
};

const navigation = document.querySelector("#nav");
const hightlight = document.createElement("span");
hightlight.classList.add("highlight");
document.body.appendChild(hightlight);

const createNavigation = (list) => {
  list.forEach((item) => {
    navigation.innerHTML += `<li><span data-timeZone="${item.zoneName}" class="time">Times </span><a href="#" >${item.label}</a> </li>`;
  });
};
createNavigation(data.cities);

const triggers = document.querySelectorAll("#nav li");

const positionHighlight = (el) => {
  hightlight.style.width = `${el.width}px`;
  // hightlight.style.transform = `translate(${el.left}px , ${el.top}px)`;
  hightlight.style.transform = `translate(${el.left}px)`;
};

const highlightLink = (el) => {
  const linkCoords = el.getBoundingClientRect();
  positionHighlight(linkCoords);
  triggers.forEach((item) => item.classList.remove("active"));
  el.classList.add("active");
};

triggers.forEach((link) => {
  link.addEventListener("click", (e) => {
    highlightLink(e.currentTarget);
  });
});

const timeLink = document.querySelector("#nav li .time");

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

const timeElements = document.querySelectorAll("#nav li .time");

const updateTimes = () => {
  timeElements.forEach((location) => {
    const output = location.querySelector(".time");
    const timezone = location.getAttribute("data-timeZone");
    console.log("timezone ", timezone);
    const now = timezone != "" ? luxon.DateTime.now().setZone(timezone) : null;
    location.innerHTML = now ? now.toFormat("HH:mm:ss") : "<br> ";
  });
};

setInterval(function () {
  updateTimes();
}, 1000);
