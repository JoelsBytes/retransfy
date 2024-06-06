const aRtForm = document.getElementById("a-r-t");
aRtForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const cuRR = document.getElementById("cur-cy").value;
  const bDl = parseFloat(document.getElementById("b-dl").value);
  const sDl = parseFloat(document.getElementById("s-dl").value);
  const amNt = parseFloat(document.getElementById("am-nt").value);
  const pYing = parseFloat(document.getElementById("p-ying").value);
  const dsplRT = document.getElementById("dsplRT");
  const pnl = document.getElementById("pnl");

  let amNtEl = 0;
  let rtEl = 0;
  let pnlEl = 0;
  let other = 0;

  if (cuRR === "FCFA" && bDl && sDl && amNt && pYing) {
    rtEl = (1000 * bDl) / sDl;
    amNtEl = (amNt / rtEl) * 1000;
    pnlEl = amNtEl - pYing;
    other = (pnlEl / 1000) * rtEl;

    dsplRT.style.display = "block";
    dsplRT.textContent = `${rtEl.toFixed(5)} | ${Math.round(amNtEl).toLocaleString("fr-FR")} FCFA`;

    pnl.style.display = "block";
    pnl.textContent = `${Math.round(pnlEl).toLocaleString("fr-FR")} FCFA | ${other.toFixed(3)} GHS`;
  } else if (cuRR === "GHS" && bDl && sDl && amNt && pYing) {
    rtEl = (1000 * sDl) / bDl;
    amNtEl = (amNt / 1000) * rtEl;
    pnlEl = amNtEl - pYing;
    other = (pnlEl * 1000) / rtEl;

    dsplRT.style.display = "block";
    dsplRT.textContent = `${rtEl.toFixed(5)} | ${amNtEl.toFixed(2)} GHS`;

    pnl.style.display = "block";
    pnl.textContent = `${pnlEl.toFixed(2)} GHS | ${Math.round(other).toLocaleString("fr-FR")} FCFA`;
  }
});
