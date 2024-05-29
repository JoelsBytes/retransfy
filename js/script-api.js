const apiForm = document.getElementById("api");
apiForm.addEventListener("submit", calculateRate);
function calculateRate(event) {
  event.preventDefault();
  const Currency = document.getElementById("currency").value;
  const BuyInput = parseFloat(document.getElementById("buyBN").value);
  const SellInput = parseFloat(document.getElementById("sellBN").value);
  const amountEl = document.getElementById("amount");
  const amount = parseFloat(amountEl.value);
  const payingEl = document.getElementById("paying");
  const paying = parseFloat(payingEl.value);
  const rate = document.getElementById("showrate");
  const pnl = document.getElementById("pnl");
  let amountToReceiveEl = 0;
  let rateEl = 0;
  let pnlEl = 0;
  let other = 0;

  if (Currency === "FCFA" && BuyInput && SellInput && amount && paying) {
    rateEl = (1000 * BuyInput) / SellInput;
    amountToReceiveEl = (amount / rateEl) * 1000;
    pnlEl = amountToReceiveEl - paying;
    other = (pnlEl / 1000) * rateEl;

    rate.style.display = "block";
    rate.textContent = `${rateEl.toFixed(5)} | ${Math.round(amountToReceiveEl).toLocaleString("fr-FR")} FCFA`;

    pnl.style.display = "block";
    pnl.textContent = `${Math.round(pnlEl).toLocaleString("fr-FR")} FCFA | ${other.toFixed(3)} GHS`;
  } else if (Currency === "GHS" && BuyInput && SellInput && amount && paying) {
    rateEl = (1000 * SellInput) / BuyInput;
    amountToReceiveEl = (amount / 1000) * rateEl;
    pnlEl = amountToReceiveEl - paying;
    other = (pnlEl * 1000) / rateEl;

    rate.style.display = "block";
    rate.textContent = `${rateEl.toFixed(5)} | ${amountToReceiveEl.toFixed(2)} GHS`;

    pnl.style.display = "block";
    pnl.textContent = `${pnlEl.toFixed(2)} GHS | ${Math.round(other).toLocaleString("fr-FR")} FCFA`;
  }
}
