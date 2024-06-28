import { escond, cache, mostrar, rtMngs } from "../data/data.js";

const burger = document.getElementById("burger");
const navLinks = document.getElementById("nav-links");

burger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

const root = document.querySelector(".root");
root.addEventListener("click", () => {
  navLinks.classList.remove("active");
});

const defaultLink = document.getElementById("default-link");
const defaultBx = document.getElementById("default-bx");
const defaultForm = document.getElementById("open-default");
const cvxLink = document.getElementById("cvx-link");
const rctLink = document.getElementById("rct-link");
const arLink = document.getElementById("ar-link");
const rateLink = document.getElementById("rate-link");
const nwLink = document.getElementById("nw-link");
const custLink = document.getElementById("cust-link");
const cvx = document.getElementById("main_cvx");
const rct = document.getElementById("rct-bx");
const ar = document.getElementById("a-r-t-bx");
const rate = document.getElementById("rate-bx");
const nw = document.getElementById("net-bx");
const cust = document.getElementById("cust-bx");

const setMng = document.querySelector(".set-for-mng");
document.addEventListener("DOMContentLoaded", () => {
  const cd = localStorage.getItem("kd");

  if (cd === rtMngs[2]) {
    const elmts = [setMng, ar, arLink, rct, rctLink];
    escond(elmts);

    const optionsData = [
      { value: "CVX", text: "Converter" },
      { value: "NW", text: "Find Network" },
      { value: "NS", text: "Search number" },
      { value: "R", text: "Reset" },
    ];

    const selectBx = document.getElementById("default-menu-item");
    function populateSelect(options) {
      selectBx.innerHTML = "";
      options.forEach((option) => {
        const newOption = document.createElement("option");
        newOption.value = option.value;
        newOption.textContent = option.text;
        selectBx.appendChild(newOption);
      });
    }
    populateSelect(optionsData);
  } else if (cd === rtMngs[1]) {
    const elmts = [setMng, ar, arLink];
    escond(elmts);

    const optionsData = [
      { value: "CVX", text: "Converter" },
      { value: "NW", text: "Find Network" },
      { value: "NS", text: "Search number" },
      { value: "RCPT", text: "Transactions" },
      { value: "R", text: "Reset" },
    ];

    const selectBx = document.getElementById("default-menu-item");
    function populateSelect(options) {
      selectBx.innerHTML = "";
      options.forEach((option) => {
        const newOption = document.createElement("option");
        newOption.value = option.value;
        newOption.textContent = option.text;
        selectBx.appendChild(newOption);
      });
    }
    populateSelect(optionsData);
  } else if (cd === rtMngs[0]) {
    cache(setMng);

    const optionsData = [
      { value: "CVX", text: "Converter" },
      { value: "A-R", text: "API Generator" },
      { value: "NW", text: "Find Network" },
      { value: "NS", text: "Search number" },
      { value: "RCPT", text: "Transactions" },
      { value: "R", text: "Reset" },
    ];

    const selectBx = document.getElementById("default-menu-item");
    function populateSelect(options) {
      selectBx.innerHTML = "";
      options.forEach((option) => {
        const newOption = document.createElement("option");
        newOption.value = option.value;
        newOption.textContent = option.text;
        selectBx.appendChild(newOption);
      });
    }
    populateSelect(optionsData);
  } else {
    const getMng = document.createElement("div");
    getMng.innerHTML = ` 
    <form id="set-mng">
      <input type="text" id="code" placeholder="Enter your code" />
      <button type="submit">Enter</button>
    </form>
        `;
    setMng.appendChild(getMng);

    const setMngForm = document.getElementById("set-mng");

    setMngForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const code = document.getElementById("code").value.trim();
      localStorage.setItem("kd", code);
      window.location.reload();
    });
  }
});

const defaultItem = localStorage.getItem("dflt");
if (!defaultItem) {
  const elmts = [rct, ar, cust, nw, cvx, defaultBx];
  escond(elmts);
  mostrar(rate);
} else if (defaultItem === "CVX") {
  const elmts = [rate, ar, cust, nw, rct, defaultBx];
  escond(elmts);
  mostrar(cvx);
} else if (defaultItem === "RCPT") {
  const elmts = [rate, ar, cust, nw, cvx, defaultBx];
  escond(elmts);
  mostrar(rct);
} else if (defaultItem === "A-R") {
  const elmts = [rct, rate, cust, nw, cvx, defaultBx];
  escond(elmts);
  mostrar(ar);
} else if (defaultItem === "NW") {
  const elmts = [rct, rate, ar, cust, cvx, defaultBx];
  escond(elmts);
  mostrar(nw);
} else if (defaultItem === "NS") {
  const elmts = [rct, rate, ar, nw, cvx, defaultBx];
  escond(elmts);
  mostrar(cust);
}

const menuSelect = document.getElementById("default-menu-item");
menuSelect.addEventListener("change", () => {
  const resetDefault = document.querySelector(".set-default");
  const menuItem = document.getElementById("default-menu-item").value;
  if (menuItem === "R") {
    resetDefault.innerHTML = "Reset Default";
    resetDefault.style.backgroundColor = "darkred";
  } else {
    resetDefault.innerHTML = "Set as Deafult";
    resetDefault.style.backgroundColor = "#076c5e";
  }
});

defaultForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const menuItem = document.getElementById("default-menu-item").value;

  if (!menuItem) {
    return;
  } else if (menuItem === "CVX") {
    localStorage.setItem("dflt", "CVX");
    window.location.reload();
  } else if (menuItem === "RCPT") {
    localStorage.setItem("dflt", "RCPT");
    window.location.reload();
  } else if (menuItem === "A-R") {
    localStorage.setItem("dflt", "A-R");
    window.location.reload();
  } else if (menuItem === "NW") {
    localStorage.setItem("dflt", "NW");
    window.location.reload();
  } else if (menuItem === "NS") {
    localStorage.setItem("dflt", "NS");
    window.location.reload();
  } else if (menuItem === "R") {
    localStorage.removeItem("dflt");
    window.location.reload();
  }
});

function affich(d, e) {
  mostrar(d);
  escond(e);
  navLinks.classList.remove("active");
}

rctLink.addEventListener("click", () => {
  const elmts = [rate, ar, cust, nw, cvx, defaultBx];
  affich(rct, elmts);
});

arLink.addEventListener("click", () => {
  const elmts = [rate, rct, cust, nw, cvx, defaultBx];
  affich(ar, elmts);
});

rateLink.addEventListener("click", () => {
  const elmts = [ar, rct, cust, nw, cvx, defaultBx];
  affich(rate, elmts);
});

nwLink.addEventListener("click", () => {
  const elmts = [ar, rct, cust, rate, cvx, defaultBx];
  affich(nw, elmts);
});

custLink.addEventListener("click", () => {
  const elmts = [ar, rct, nw, rate, cvx, defaultBx];
  affich(cust, elmts);
});

cvxLink.addEventListener("click", () => {
  const elmts = [ar, rct, nw, rate, cust, defaultBx];
  affich(cvx, elmts);
});

defaultLink.addEventListener("click", () => {
  const elmts = [cvx, ar, rct, nw, rate, cust];
  affich(defaultBx, elmts);
});
