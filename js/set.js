//Menu

const menus = document.querySelectorAll("#menuImage, #Menu");
const menuItems = document.getElementById("mainMenu");
const mainInterface = document.getElementById("main_cvx");
menuItems.classList.add("off");

menus.forEach((menu) => {
  menu.addEventListener("click", () => {
    menuItems.classList.remove("off");
    mainInterface.style.pointerEvents = "none";
  });
});

const closeMenu = document.getElementById("closeWindow");
closeMenu.addEventListener("click", () => {
  menuItems.classList.add("off");
  mainInterface.style.pointerEvents = "auto";
});

const confirm = document.getElementById("confirm");
const optionNo = document.getElementById("noOption");
const optionYes = document.getElementById("yesOption");
confirm.classList.add("off");

const logOut = document.getElementById("logOut");
logOut.addEventListener("click", () => {
  confirm.classList.remove("off");
  document.getElementById("confirmText").innerText = "Are you sure you want to log out?";

  optionNo.addEventListener("click", () => {
    confirm.classList.add("off");
  });

  optionYes.addEventListener("click", () => {
    confirm.classList.add("off");
    localStorage.removeItem("USZ");
    window.location.reload();
  });
});

const termText = document.querySelector(".term-text");
termText.innerHTML = `RETRANSFY is an enterprise that offers a fast and convenient solution for sending and receiving money between Ghana and countries such as Togo, Benin, Ivory Coast, Burkina Faso, Senegal, and others.


RETRANSFY ENTERPRISE is officially registered with REGISTRAR GENERAL GHANA.

Since July 2022, we've helped tens of thousands of people send money to their families and friends in these countries. It doesn't matter if it's a small or big amount, we're here to make it simple and secure. Trust is the foundation of our business, and we're committed to giving great service to all our customers.

There is a transaction fee for each amount you send using Retransfy Enterprise. 

Customers have the option to either add our transaction fee to the amount they are sending or request us to subtract our transaction fee from the amount they are sending. 

We will always provide you with the conversion before proceeding with the transaction. Please carefully read and understand the conversion before proceeding with the transaction.

Our transactions typically take 10 to 30 minutes to complete. Processing time may sometimes extend to 45 minutes or more if there is a high volume of transactions.
`;

const firstEl = document.getElementById("first");
const lastEl = document.getElementById("last");
const phoneEl = document.getElementById("phone");
const azEl = document.getElementById("az");
const az_El = document.getElementById("az-confirm");
const number_log = document.getElementById("number-log");
const az_log = document.getElementById("az-log");

firstEl.placeholder = "Firstname(s)";
lastEl.placeholder = "Surname";
phoneEl.placeholder = "Phone number";
azEl.placeholder = "Create a Password";
az_El.placeholder = "Confirm Password";
number_log.placeholder = "Phone number";
az_log.placeholder = "Password";
