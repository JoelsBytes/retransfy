import { ax as a, bx as b } from "../data/data.js";
const rateD = document.getElementById("rate-d");
const currentDate = new Date();
const day = String(currentDate.getDate()).padStart(2, "0");
const month = String(currentDate.getMonth() + 1).padStart(2, "0");
const year = currentDate.getFullYear();
const formattedDate = `${day}-${month}-${year}`;
document.getElementById("rateDate").innerHTML = `${formattedDate}`;

rateD.innerHTML = `GHS to FCFA: ${a}
FCFA to GHS: ${b}`;

const copyEn = document.getElementById("copyEn");
copyEn.addEventListener("click", () => {
  copyEn.classList.add("copyChange");

  const textToCopyEn = `
*Rate: ${formattedDate}*
🇬🇭🇹🇬🇧🇯🇨🇮🇧🇫🇸🇳

🔸 CEDIS to FCFA
*GHS ${a} = 1000 FCFA*

🔹 FCFA to CEDIS
*1000 FCFA = GHS ${b}*
  `;
  navigator.clipboard
    .writeText(textToCopyEn)
    .then(() => {})
    .catch((err) => {});
});

const copyFr = document.getElementById("copyFr");
copyFr.addEventListener("click", () => {
  copyFr.classList.remove("copy");
  copyFr.classList.add("copyChange");

  const textToCopyFr = `
*Taux: ${formattedDate}*
🇬🇭🇹🇬🇧🇯🇨🇮🇧🇫🇸🇳

🔸 CEDIS à FCFA
*GHS ${a} = 1000 FCFA*

🔹 FCFA à CEDIS
*1000 FCFA = GHS ${b}*
  `;
  navigator.clipboard
    .writeText(textToCopyFr)
    .then(() => {})
    .catch((err) => {});
});
