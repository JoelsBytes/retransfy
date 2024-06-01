const burger = document.getElementById("burger");
const navLinks = document.getElementById("nav-links");

burger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

const onTop = document.getElementById("onTop");
const cvxHref = document.getElementById("cvxHref");
const custHref = document.getElementById("custHref");
const netHref = document.getElementById("netHref");
const rateHref = document.getElementById("rateHref");
const rctHref = document.getElementById("rctHref");
const apiHref = document.getElementById("apiHref");
const apiBx = document.getElementById("api-bx");
const rctBx = document.getElementById("rct-bx");
const rateBx = document.getElementById("rate-bx");
const netBx = document.getElementById("net-bx");
const custBx = document.getElementById("cust-bx");
const cvxBx = document.getElementById("main_cvx");
const onTopBx = document.getElementById("onTopBx");
const onTopForm = document.getElementById("order-form");

function unoActivar(b, e, r, t, v, x, y) {
  b.style.display = "flex";
  e.style.display = "none";
  r.style.display = "none";
  t.style.display = "none";
  v.style.display = "none";
  x.style.display = "none";
  y.style.display = "none";
  navLinks.classList.remove("active");
}

const openN = localStorage.getItem("order");
if (!openN) {
  unoActivar(rateBx, rctBx, apiBx, custBx, netBx, cvxBx, onTopBx);
} else if (openN === "RCPT") {
  unoActivar(rctBx, rateBx, apiBx, custBx, netBx, cvxBx, onTopBx);
} else if (openN === "CVX") {
  unoActivar(cvxBx, rateBx, apiBx, custBx, netBx, rctBx, onTopBx);
}

onTopForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const menuItem = document.getElementById("change-order").value;

  if (!menuItem) {
    return;
  } else if (menuItem === "RCPT") {
    localStorage.setItem("order", "RCPT");
    window.location.reload();
  } else if (menuItem === "CVX") {
    localStorage.setItem("order", "CVX");
    window.location.reload();
  } else if (menuItem === "R") {
    localStorage.removeItem("order");
    window.location.reload();
  }
});

rctHref.addEventListener("click", () => {
  unoActivar(rctBx, rateBx, apiBx, custBx, netBx, cvxBx, onTopBx);
});

apiHref.addEventListener("click", () => {
  unoActivar(apiBx, rateBx, rctBx, custBx, netBx, cvxBx, onTopBx);
});

rateHref.addEventListener("click", () => {
  unoActivar(rateBx, apiBx, rctBx, custBx, netBx, cvxBx, onTopBx);
});

netHref.addEventListener("click", () => {
  unoActivar(netBx, apiBx, rctBx, custBx, rateBx, cvxBx, onTopBx);
});

custHref.addEventListener("click", () => {
  unoActivar(custBx, apiBx, rctBx, netBx, rateBx, cvxBx, onTopBx);
});

cvxHref.addEventListener("click", () => {
  unoActivar(cvxBx, apiBx, rctBx, netBx, rateBx, custBx, onTopBx);
});

onTop.addEventListener("click", () => {
  unoActivar(onTopBx, cvxBx, apiBx, rctBx, netBx, rateBx, custBx);
});
