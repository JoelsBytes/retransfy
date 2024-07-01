import { ax as ghXof, bx as xofgh, calcF, decP, sntzNum, vldtNum } from "../data/data.js";

let usn = {};

async function loadUsn() {
  const response = await fetch("cle/uft.xlsx");
  const data = await response.arrayBuffer();
  const workbook = XLSX.read(data, { type: "array" });

  workbook.SheetNames.forEach((sheetName) => {
    const worksheet = workbook.Sheets[sheetName];
    usn[sheetName] = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: true });
  });
}

loadUsn();

const form = document.getElementById("form-rct");
const rctResp = document.getElementById("rct-resp");
const copyButton = document.getElementById("copy");

function runRCT(se, re) {
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  const errorM = document.getElementById("error");
  const time = document.getElementById("time").value;
  const sdRctry = document.getElementById("s-ctry").value;
  const rvRctry = document.getElementById("r-ctry").value;
  let amRcv = Number(document.getElementById("am-rcv").value);

  let a = false;

  let trx = document.getElementById("trx").value.trim();

  if (trx === "1") {
    trx = `${day}${month}${year}${time.replace(":", "")}`;
  }
  let rvR = document.getElementById("rc-num").value.trim();
  rvR = sntzNum(rvR);

  let sdR = document.getElementById("sd-num").value.trim();

  let pm = "CASH-OUT";
  let pn = "";

  if (sdRctry === "GHANA" && sdR.startsWith("@")) {
    sdR = sdR.replace("@", "");
    pm = `DIRECT TRANSFER + CASH-OUT FEE`;
  } else if (sdRctry !== "GHANA" && sdR.startsWith("@")) {
    pn = "TRX ID:" + sdR.replace("@", "");
    if (sdRctry === "TOGO") {
      sdR = "90000000";
      a = true;
    } else if (sdRctry === "BENIN") {
      sdR = "60000000";
      a = true;
    } else if (sdRctry === "IVORY COAST") {
      sdR = "0100000000";
      a = true;
    } else if (sdRctry === "BURKINA FASO") {
      sdR = "55000000";
      a = true;
    } else if (sdRctry === "SENEGAL") {
      sdR = "77000000";
      a = true;
    } else if (sdRctry === "MALI") {
      sdR = "76000000";
      a = true;
    }

    pm = "";
  }

  let acct = String(document.getElementById("acct").value);
  if (acct && acct !== "0") {
    acct = ` | 00${acct}-ACCT-RT`;
  } else if (rvRctry !== "TOGO" && acct === "0") {
    acct = "none";
  }

  sdR = sntzNum(sdR);

  let aProcess = false;
  let bProcess = false;
  aProcess = vldtNum(sdRctry, sdR, aProcess);
  bProcess = vldtNum(rvRctry, rvR, bProcess);

  if (!time || !rvR || !sdR || !trx || !amRcv || !acct) {
    errorM.style.display = "block";
    errorM.innerHTML = "Please fill in all fields!";
    form.style.display = "flex";
    rctResp.style.display = "none";
    return;
  } else if (rvRctry === "TOGO" && acct === "0") {
    errorM.style.display = "block";
    errorM.innerHTML = "Something went wrong! Try again.";
    form.style.display = "flex";
    rctResp.style.display = "none";
    return;
  } else if (sdRctry === rvRctry) {
    errorM.style.display = "block";
    errorM.innerHTML = "Country error.";
    form.style.display = "flex";
    rctResp.style.display = "none";
    return;
  } else if (sdRctry !== "GHANA" && rvRctry !== "GHANA") {
    errorM.style.display = "block";
    errorM.innerHTML = "Country error.";
    form.style.display = "flex";
    rctResp.style.display = "none";
    return;
  }

  if (aProcess && !bProcess) {
    errorM.style.display = "block";
    errorM.innerHTML = "Receiver invalid";
    form.style.display = "flex";
    rctResp.style.display = "none";
    return;
  } else if (!aProcess && bProcess) {
    errorM.style.display = "block";
    errorM.innerHTML = "Sender invalid";
    form.style.display = "flex";
    rctResp.style.display = "none";
    return;
  } else if (!aProcess && !bProcess) {
    errorM.style.display = "block";
    errorM.innerHTML = "Sender and Receiver not valid";
    form.style.display = "flex";
    rctResp.style.display = "none";
    return;
  } else if (aProcess && bProcess) {
    let rc = "";
    let sd = "";

    for (const sheetName in usn) {
      const sheetData = usn[sheetName];
      for (let i = 0; i < sheetData.length; i++) {
        if (sheetData[i][1] == sdR) {
          sd = sheetData[i][0];
        }

        if (sheetData[i][1] == rvR) {
          rc = sheetData[i][0];
        }

        if (rc && sd) break;
      }
      if (rc && sd) break;
    }

    const enD = [" GH", " TG", " BN", " CI", " BF", " SN", " ML"];

    enD.forEach((ending) => {
      sd = sd.replace(ending, "");
      rc = rc.replace(ending, "");
    });

    if (sd === "" && se) {
      sd = se;
    }

    if (rc === "" && re) {
      rc = re;
    }

    let amTsd;

    if (sdRctry === "GHANA" && rvRctry !== "GHANA") {
      amTsd = decP((amRcv / 1000) * ghXof);
    } else if (sdRctry !== "GHANA" && rvRctry === "GHANA") {
      amTsd = Math.ceil((decP(amRcv) / xofgh) * 1000);
    }

    let trxFee = calcF(amTsd, sdRctry, rvRctry);

    let tlPaid = amTsd + trxFee;
    if (rvRctry === "TOGO") {
      rvR = "+228" + rvR;
    } else if (rvRctry === "BENIN") {
      rvR = "+229" + rvR;
    } else if (rvRctry === "IVORY COAST") {
      rvR = "+225" + rvR;
    } else if (rvRctry === "BURKINA FASO") {
      rvR = "+226" + rvR;
    } else if (rvRctry === "SENEGAL") {
      rvR = "+221" + rvR;
    } else if (rvRctry === "MALI") {
      rvR = "+223" + rvR;
    } else if (rvRctry === "GHANA") {
      rvR = rvR;
    }

    if (sdRctry === "TOGO") {
      sdR = "+228" + sdR;
    } else if (sdRctry === "BENIN") {
      sdR = "+229" + sdR;
    } else if (sdRctry === "IVORY COAST") {
      sdR = "+225" + sdR;
    } else if (sdRctry === "BURKINA FASO") {
      sdR = "+226" + sdR;
    } else if (sdRctry === "SENEGAL") {
      sdR = "+221" + sdR;
    } else if (sdRctry === "MALI") {
      sdR = "+223" + sdR;
    } else if (sdRctry === "GHANA") {
      sdR = sdR;
    }

    if (sd) {
      sd = " " + sd;
    }

    if (rc) {
      rc = " " + rc;
    }

    if (acct === "none") {
      acct = "";
    }

    if (a && sdRctry !== "GHANA") {
      sdR = pn;
    }
trxFee = 0;
    const resp = document.getElementById("resp");
    if (sdRctry === "GHANA" && rvRctry !== "GHANA") {
      resp.innerHTML = `Transaction successful via Retransfy.
You've sent ${amRcv.toLocaleString("fr-FR")} FCFA to ${rvR}${rc.toUpperCase()} at a rate of ${ghXof} | ${sdRctry} to ${rvRctry}${acct};
${formattedDate} | ${time} | Transaction ID: ${trx}. You paid a total of GHS ${tlPaid.toFixed(2)}, including a transaction fee of GHS ${trxFee.toFixed(2)} via ${pm} - ${sdR}${sd.toUpperCase()}.`;
    } else if (sdRctry !== "GHANA" && rvRctry === "GHANA") {
      resp.innerHTML = `Transaction successful via Retransfy.
You've sent GHS ${amRcv.toFixed(2)} to ${rvR}${rc.toUpperCase()} at a rate of ${xofgh} | ${sdRctry} to ${rvRctry}${acct};
${formattedDate} | ${time} | Transaction ID: ${trx}. You paid a total of ${tlPaid.toLocaleString("fr-FR")} FCFA, including a transaction fee of ${trxFee.toLocaleString("fr-FR")} FCFA via ${sdR}${sd.toUpperCase()}.`;
    }

    copyButton.classList.remove("copyChange");
    errorM.style.display = "none";
    form.style.display = "none";
    rctResp.style.display = "flex";
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  runRCT();
});

const addCust = document.getElementById("add-cust");
const confirmCust = document.getElementById("confirm-cust");
const otherFields = document.getElementById("other-fields");
addCust.addEventListener("click", () => {
  otherFields.classList.toggle("reveal");
});

confirmCust.addEventListener("click", (event) => {
  event.preventDefault();
  const sdrName = document.getElementById("sdr-name").value.trim();
  const rcvName = document.getElementById("rcv-name").value.trim();
  runRCT(sdrName, rcvName);
  otherFields.classList.remove("reveal");
  document.getElementById("sdr-name").value = "";
  document.getElementById("rcv-name").value = "";
});

copyButton.addEventListener("click", () => {
  copyButton.classList.add("copyChange");

  const textToCopy = document.getElementById("resp").innerHTML;
  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {})
    .catch((err) => {});
});

document.getElementById("goHome").addEventListener("click", () => {
  rctResp.style.display = "none";
  form.style.display = "flex";
});
