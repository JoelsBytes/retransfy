import { ax as ghsToXof, bx as xofToGhs, calcF, calcW, decP, isTwoDec } from "../data/data.js";

const cvxRespCp = document.querySelector(".cvx-resp-cp");
const gnRslt = document.getElementById("gnRslt");
const sdRvBxs = document.querySelectorAll(".sd-rv-bx");
const sdCrxy = document.getElementById("sd-crxy");
const rvCrxy = document.getElementById("rv-crxy");
let sdInputEl = document.getElementById("sd-am");
let rvInputEl = document.getElementById("rv-am");
const sdSelectEl = document.getElementById("sd-ctry");
const rvSelectEl = document.getElementById("rv-ctry");
let cvxErr = document.getElementById("error-cvx");
let sdc = document.getElementById("sd-ctry").value;
let rvc = document.getElementById("rv-ctry").value;
let amTS = parseFloat(document.getElementById("sd-am").value);
let amTR = parseFloat(document.getElementById("rv-am").value);
let trF;
let wdF;

cvxErr.style.display = "none";
gnRslt.classList.remove("active");
gnRslt.disabled = true;

function sdcSelectErr() {
  sdCrxy.innerText = "";
  rvCrxy.innerText = "";
  sdRvBxs.forEach((sdRvBx) => {
    sdRvBx.classList.add("input_stop");
  });
  cvxErr.style.display = "block";
  cvxErr.innerHTML = `This transaction is not available`;
  sdInputEl.disabled = true;
  rvInputEl.disabled = true;
  gnRslt.disabled = true;
  gnRslt.classList.remove("active");
  gnRslt.style.display = "block";
  cvxRespCp.innerHTML = "";
}

function inputError() {
  sdRvBxs.forEach((sdRvBx) => {
    sdRvBx.classList.add("input_stop");
  });
  sdCrxy.innerText = "";
  rvCrxy.innerText = "";
  gnRslt.disabled = true;
  gnRslt.classList.remove("active");
  cvxErr.style.display = "block";
  cvxErr.innerText = `Invalid amount`;
  cvxRespCp.innerHTML = "";
}

function clearErr() {
  sdRvBxs.forEach((sdRvBx) => {
    sdRvBx.classList.remove("input_stop");
  });
  sdInputEl.disabled = false;
  rvInputEl.disabled = false;
  cvxErr.style.display = "none";
  gnRslt.disabled = false;
  gnRslt.classList.add("active");
  gnRslt.style.display = "block";
  localStorage.removeItem("Amount");
  wdCheck.checked = false;
  cvxRespCp.innerHTML = "";
}

function sdSelectElChange() {
  sdc = document.getElementById("sd-ctry").value;
  rvc = document.getElementById("rv-ctry").value;

  gnRslt.disabled = true;
  gnRslt.classList.remove("active");

  if (sdc === "GHANA" && rvc !== "GHANA") {
    sdInputEl.value = "";
    rvInputEl.value = "";
    sdCrxy.innerText = "GHS";
    rvCrxy.innerText = "FCFA";
    clearErr();
  } else if (sdc !== "GHANA" && rvc === "GHANA") {
    sdInputEl.value = "";
    rvInputEl.value = "";
    sdCrxy.innerText = "FCFA";
    rvCrxy.innerText = "GHS";
    clearErr();
  } else if (sdc === rvc || (sdc !== "GHANA" && rvc !== "GHANA")) {
    sdInputEl.value = "";
    rvInputEl.value = "";
    sdcSelectErr();
  }
}

function rvSelectElChange() {
  sdc = document.getElementById("sd-ctry").value;
  rvc = document.getElementById("rv-ctry").value;

  gnRslt.disabled = true;
  gnRslt.classList.remove("active");

  if (sdc === "GHANA" && rvc !== "GHANA") {
    sdInputEl.value = "";
    rvInputEl.value = "";
    sdCrxy.innerText = "GHS";
    rvCrxy.innerText = "FCFA";
    clearErr();
  } else if (sdc !== "GHANA" && rvc === "GHANA") {
    sdInputEl.value = "";
    rvInputEl.value = "";
    sdCrxy.innerText = "GHS";
    rvCrxy.innerText = "GHS";
    clearErr();
  } else if (sdc === rvc || (sdc !== "GHANA" && rvc !== "GHANA")) {
    sdInputEl.value = "";
    rvInputEl.value = "";
    sdcSelectErr();
  }
}

function CalcAmTR() {
  sdc = document.getElementById("sd-ctry").value;
  rvc = document.getElementById("rv-ctry").value;
  amTS = document.getElementById("sd-am").value;
  amTR = document.getElementById("rv-am").value;
  trF = calcF(amTS, sdc, rvc);

  const validAmount = isTwoDec(amTS);

  var operatorRegex = /[\+\-\*\/\(\)]/;

  if (operatorRegex.test(amTS)) {
    sdRvBxs.forEach((sdRvBx) => {
      sdRvBx.classList.add("input-operator");
    });
  } else {
    sdRvBxs.forEach((sdRvBx) => {
      sdRvBx.classList.remove("input-operator");
    });
  }

  if (!validAmount) {
    rvInputEl.value = "";
    inputError();
  }

  if (sdc === "GHANA" && rvc !== "GHANA" && amTS >= ghsToXof && amTS < 9000000 && validAmount) {
    amTR = Math.floor((amTS / ghsToXof) * 1000);
    rvInputEl.value = amTR;
    sdCrxy.innerText = "GHS";
    rvCrxy.innerText = "FCFA";
    // dsplF.innerText = `Retransfy fee: GHS ${trF.toFixed(2)}`;
    clearErr();
  } else if (sdc !== "GHANA" && rvc === "GHANA" && amTS >= 1000 && amTS < 90000000 && validAmount) {
    amTR = parseFloat(decP((amTS / 1000) * xofToGhs)).toFixed(2);
    rvInputEl.value = amTR;
    sdCrxy.innerText = "FCFA";
    rvCrxy.innerText = "GHS";
    clearErr();
  } else {
    rvInputEl.value = "";
    inputError();
  }
}

function CalcAmTS() {
  sdc = document.getElementById("sd-ctry").value;
  rvc = document.getElementById("rv-ctry").value;
  amTS = document.getElementById("sd-am").value;
  amTR = document.getElementById("rv-am").value;
  trF = calcF(amTS, sdc, rvc);

  const validAmount = isTwoDec(amTR);

  if (!validAmount) {
    sdInputEl.value = "";
    inputError();
  }

  if (sdc === "GHANA" && rvc !== "GHANA" && amTR >= 1000 && amTS < 9000000 && validAmount) {
    amTS = parseFloat(decP((amTR / 1000) * ghsToXof));
    sdInputEl.value = amTS.toFixed(2);
    sdCrxy.innerText = "GHS";
    rvCrxy.innerText = "FCFA";
    clearErr();
  } else if (sdc !== "GHANA" && rvc === "GHANA" && amTR >= xofToGhs && amTS < 90000000 && validAmount) {
    amTS = Math.ceil((amTR / xofToGhs) * 1000);
    sdInputEl.value = amTS;
    rvc === "GHANA";
    sdCrxy.innerText = "FCFA";
    rvCrxy.innerText = "GHS";
    clearErr();
  } else {
    sdInputEl.value = "";
    inputError();
  }
}

sdInputEl.addEventListener("input", CalcAmTR);
rvInputEl.addEventListener("input", CalcAmTS);
sdSelectEl.addEventListener("change", sdSelectElChange);
rvSelectEl.addEventListener("change", rvSelectElChange);

const evalution = document.getElementById("evlt");
evalution.addEventListener("click", (event) => {
  event.preventDefault();
  const inputEl = document.getElementById("sd-am");
  const toEvalutate = eval(inputEl.value);
  inputEl.value = toEvalutate;
  CalcAmTR();
});

function run() {
  sdc = document.getElementById("sd-ctry").value;
  rvc = document.getElementById("rv-ctry").value;
  amTS = document.getElementById("sd-am").value;
  amTR = document.getElementById("rv-am").value;
  trF = calcF(amTS, sdc, rvc);

  if (sdc === "GHANA" && rvc !== "GHANA" && amTR >= 1000) {
    amTS = parseFloat(decP((amTR / 1000) * ghsToXof));
    sdInputEl.value = amTS.toFixed(2);
  } else if (sdc !== "GHANA" && rvc === "GHANA" && amTR >= xofToGhs) {
    amTS = Math.ceil((amTR / xofToGhs) * 1000);
    sdInputEl.value = amTS;
  }
}

const wdCheck = document.getElementById("wdF");
wdCheck.addEventListener("change", () => {
  let actualAmount = 0;
  wdF = calcW(amTR, sdc, rvc);
  if (!amTR && !amTR) {
    cvxErr.style.display = "block";
    cvxErr.innerText = `Enter amount`;
    wdCheck.checked = false;
  }
  if (wdCheck.checked) {
    localStorage.setItem("Amount", amTR);
    actualAmount = parseFloat(amTR) + wdF;
    rvInputEl.value = actualAmount;
    gnRslt.style.display = "block";
    cvxRespCp.innerHTML = "";
    run();
  } else {
    actualAmount = localStorage.getItem("Amount", amTR);
    rvInputEl.value = actualAmount;
    gnRslt.style.display = "block";
    cvxRespCp.innerHTML = "";
    run();
  }
});

gnRslt.addEventListener("click", (event) => {
  event.preventDefault();

  gnRslt.style.display = "none";

  let forCopy = "";
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  sdc = document.getElementById("sd-ctry").value;
  rvc = document.getElementById("rv-ctry").value;
  amTS = parseFloat(document.getElementById("sd-am").value);
  amTR = parseFloat(document.getElementById("rv-am").value);
  trF = calcF(amTS, sdc, rvc);

  let totalToPay = amTS + trF;
  cvxErr.style.display = "none";

  const cvxResp = document.createElement("div");
  cvxResp.className = "cvx";
  cvxResp.id = "cvx";
  cvxRespCp.appendChild(cvxResp);
  cvxResp.innerHTML = `
<p>Amount to receive: <span id="rslt1">${sdc === "GHANA" ? amTR.toLocaleString("fr-FR") + " FCFA" : "GHS " + amTR.toFixed(2)}</span></P>
<p>Equivalence: <span id="rslt2">${sdc === "GHANA" ? "GHS " + amTS.toFixed(2) : amTS.toLocaleString("fr-FR") + " FCFA"}</span></p>
<p>Transaction fee: <span id="rslt3">${sdc === "GHANA" ? "GHS " + trF.toFixed(2) : trF.toLocaleString("fr-FR") + " FCFA"}</span></p>
<p>Total to pay: <span id="rslt4">${sdc === "GHANA" ? "GHS " + totalToPay.toFixed(2) : totalToPay.toLocaleString("fr-FR") + " FCFA"}</span></p>
`;

  const copyDiv = document.createElement("div");
  copyDiv.className = "copy_s";
  copyDiv.id = "copy_s";
  copyDiv.innerHTML = `
<p>Copy</p>
<button type="button" id="copy-en">EN</button>
<button type="button" id="copy-fr">FR</button>
`;

  cvxRespCp.appendChild(copyDiv);

  forCopy = `${sdc} to ${rvc}
${formattedDate} || Rate: ${sdc === "GHANA" ? ghsToXof : xofToGhs}

Amount to receive: ${sdc === "GHANA" ? amTR.toLocaleString("fr-FR") + " FCFA" : "GHS " + amTR.toFixed(2)}
Equivalence: ${sdc === "GHANA" ? "GHS " + amTS.toFixed(2) : amTS.toLocaleString("fr-FR") + " FCFA"}
Transaction fee: ${sdc === "GHANA" ? "GHS " + trF.toFixed(2) : trF.toLocaleString("fr-FR") + " FCFA"}
Total to Pay: ${sdc === "GHANA" ? "GHS " + totalToPay.toFixed(2) : totalToPay.toLocaleString("fr-FR") + " FCFA"}`;

  const copy = document.getElementById("copy-en");
  const copier = document.getElementById("copy-fr");
  copy.addEventListener("click", async function () {
    const text = forCopy;
    const paragrafs = text.split("\n");

    const originalText = paragrafs
      .map((paragraf, index) => {
        if (paragraf.includes("Amount to receive") || paragraf.includes("Total to Pay")) {
          return `*${paragraf}*`;
        }
        return paragraf;
      })
      .join("\n");

    try {
      await navigator.clipboard.writeText(originalText);
    } catch (err) {}
    copy.textContent = "✔";
  });

  copier.addEventListener("click", async function () {
    const text = forCopy;
    const lines = text.split("\n");

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      switch (i) {
        case 0:
          line = line.replace(/to/g, "vers").replace(/IVORY COAST/g, "CÔTE D'IVOIRE");
          break;
        case 1:
          line = line.replace(/Rate:/g, "Taux:");
          break;
        default:
          line = line
            .replace(/Amount to receive/g, "Montant à recevoir")
            .replace(/Equivalence/g, "Équivalence")
            .replace(/Transaction fee/g, "Frais de transaction")
            .replace(/Total to Pay/g, "Total à payer");
          break;
      }
      lines[i] = line;
    }
    const translatedText = lines
      .map((line, index) => {
        if (line.includes("Montant à recevoir") || line.includes("Total à payer")) {
          return `*${line}*`;
        }
        return line;
      })
      .join("\n");

    try {
      await navigator.clipboard.writeText(translatedText);
    } catch (err) {}

    copier.textContent = "✔";
  });
});
