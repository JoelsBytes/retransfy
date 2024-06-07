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

function oneByDefault(b, e, r, t, v, x, y) {
  b.style.display = "flex";
  e.style.display = "none";
  r.style.display = "none";
  t.style.display = "none";
  v.style.display = "none";
  x.style.display = "none";
  y.style.display = "none";
  navLinks.classList.remove("active");
}

const defaultItem = localStorage.getItem("dflt");
if (!defaultItem) {
  oneByDefault(rate, rct, ar, cust, nw, cvx, defaultBx);
} else if (defaultItem === "CVX") {
  oneByDefault(cvx, rate, ar, cust, nw, rct, defaultBx);
} else if (defaultItem === "RCPT") {
  oneByDefault(rct, rate, ar, cust, nw, cvx, defaultBx);
} else if (defaultItem === "A-R") {
  oneByDefault(ar, rct, rate, cust, nw, cvx, defaultBx);
} else if (defaultItem === "NW") {
  oneByDefault(nw, rct, rate, ar, cust, cvx, defaultBx);
} else if (defaultItem === "NS") {
  oneByDefault(cust, rct, rate, ar, nw, cvx, defaultBx);
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

rctLink.addEventListener("click", () => {
  oneByDefault(rct, rate, ar, cust, nw, cvx, defaultBx);
});

arLink.addEventListener("click", () => {
  oneByDefault(ar, rate, rct, cust, nw, cvx, defaultBx);
});

rateLink.addEventListener("click", () => {
  oneByDefault(rate, ar, rct, cust, nw, cvx, defaultBx);
});

nwLink.addEventListener("click", () => {
  oneByDefault(nw, ar, rct, cust, rate, cvx, defaultBx);
});

custLink.addEventListener("click", () => {
  oneByDefault(cust, ar, rct, nw, rate, cvx, defaultBx);
});

cvxLink.addEventListener("click", () => {
  oneByDefault(cvx, ar, rct, nw, rate, cust, defaultBx);
});

defaultLink.addEventListener("click", () => {
  oneByDefault(defaultBx, cvx, ar, rct, nw, rate, cust);
});
