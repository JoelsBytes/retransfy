const burger = document.getElementById("burger");
const navLinks = document.getElementById("nav-links");

burger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

const rctBx = document.getElementById("rct-bx");
const rctHref = document.getElementById("rctHref");

const apiBx = document.getElementById("api-bx");
const apiHref = document.getElementById("apiHref");

const rateBx = document.getElementById("rate-bx");
const rateHref = document.getElementById("rateHref");

const netBx = document.getElementById("net-bx");
const netHref = document.getElementById("netHref");

const custBx = document.getElementById("cust-bx");
const custHref = document.getElementById("custHref");

const cvxBx = document.getElementById("main_cvx");
const cvxHref = document.getElementById("cvxHref");

const onTopBx = document.getElementById("onTopBx");
const onTop = document.getElementById("onTop");
const onTopForm = document.getElementById("order-form");

const openN = localStorage.getItem("order");
if (!openN) {
  rctBx.style.display = "none";
  apiBx.style.display = "none";
  rateBx.style.display = "flex";
  netBx.style.display = "none";
  custBx.style.display = "none";
  cvxBx.style.display = "none";
  onTopBx.style.display = "none";
} else if (openN === "RCPT") {
  rctBx.style.display = "flex";
  apiBx.style.display = "none";
  rateBx.style.display = "none";
  netBx.style.display = "none";
  custBx.style.display = "none";
  cvxBx.style.display = "none";
  onTopBx.style.display = "none";
} else if (openN === "CVX") {
  rctBx.style.display = "none";
  apiBx.style.display = "none";
  rateBx.style.display = "none";
  netBx.style.display = "none";
  custBx.style.display = "none";
  cvxBx.style.display = "flex";
  onTopBx.style.display = "none";
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
  rctBx.style.display = "flex";
  apiBx.style.display = "none";
  rateBx.style.display = "none";
  netBx.style.display = "none";
  custBx.style.display = "none";
  cvxBx.style.display = "none";
});

apiHref.addEventListener("click", () => {
  rctBx.style.display = "none";
  apiBx.style.display = "flex";
  rateBx.style.display = "none";
  netBx.style.display = "none";
  netBx.style.display = "none";
  custBx.style.display = "none";
  cvxBx.style.display = "none";
  onTopBx.style.display = "none";
});

rateHref.addEventListener("click", () => {
  rctBx.style.display = "none";
  apiBx.style.display = "none";
  rateBx.style.display = "flex";
  netBx.style.display = "none";
  custBx.style.display = "none";
  cvxBx.style.display = "none";
  onTopBx.style.display = "none";
});

netHref.addEventListener("click", () => {
  rctBx.style.display = "none";
  apiBx.style.display = "none";
  rateBx.style.display = "none";
  netBx.style.display = "flex";
  custBx.style.display = "none";
  cvxBx.style.display = "none";
  onTopBx.style.display = "none";
});

custHref.addEventListener("click", () => {
  rctBx.style.display = "none";
  apiBx.style.display = "none";
  rateBx.style.display = "none";
  netBx.style.display = "none";
  custBx.style.display = "flex";
  cvxBx.style.display = "none";
  onTopBx.style.display = "none";
});

cvxHref.addEventListener("click", () => {
  rctBx.style.display = "none";
  apiBx.style.display = "none";
  rateBx.style.display = "none";
  netBx.style.display = "none";
  custBx.style.display = "none";
  cvxBx.style.display = "flex";
  onTopBx.style.display = "none";
});

onTop.addEventListener("click", () => {
  rctBx.style.display = "none";
  apiBx.style.display = "none";
  rateBx.style.display = "none";
  netBx.style.display = "none";
  custBx.style.display = "none";
  cvxBx.style.display = "none";
  onTopBx.style.display = "flex";
});
