const newDate = new Date();
const hours = newDate.getHours();
const minutes = newDate.getMinutes();
const formattedTime = hours + ":" + (minutes < 10 ? "0" + minutes : minutes);
const ghsToXof = 24;
const xofToGhs = ghsToXof - 1;
const preview = document.getElementById("preview");
const showFee = document.getElementById("showFee");

const amounToSendBox = document.querySelector(".amount-to-send-bx");
const amounToReceiveBox = document.querySelector(".amount-to-receive-bx");
const spanReceiveAmount = document.getElementById("amount-to-receive-span");
const spanSendAmount = document.getElementById("amount-to-send-span");
let sendAmountInput = document.getElementById("sendAmount");
let receiveAmountInput = document.getElementById("receiveAmount");
const senderInput = document.getElementById("senderCountry");
const receiverInput = document.getElementById("receiverCountry");

let error = document.getElementById("error");
let cvx = document.getElementById("cvx");
let senderCountry = document.getElementById("senderCountry").value;
let receiverCountry = document.getElementById("receiverCountry").value;
let amountToSend = parseFloat(document.getElementById("sendAmount").value);
let amountToreceive = parseFloat(document.getElementById("receiveAmount").value);

cvx.classList.add("off");
error.classList.add("off");
showFee.classList.add("off");
preview.classList.remove("off");
preview.disabled = true;
sendAmountInput.setAttribute("min", 0);
receiveAmountInput.setAttribute("min", 0);

function senderInputChange() {
  senderCountry = document.getElementById("senderCountry").value;
  receiverCountry = document.getElementById("receiverCountry").value;
  if (senderCountry === "GHANA" && receiverCountry !== "GHANA") {
    sendAmountInput.value = "";
    receiveAmountInput.value = "";
    spanSendAmount.innerText = "GHS";
    spanReceiveAmount.innerText = "FCFA";
    preview.disabled = true;
    preview.classList.add("off");
    showFee.classList.add("off");

    clearError();
  } else if (senderCountry !== "GHANA" && receiverCountry === "GHANA") {
    sendAmountInput.value = "";
    receiveAmountInput.value = "";
    spanSendAmount.innerText = "FCFA";
    spanReceiveAmount.innerText = "GHS";
    preview.disabled = true;
    preview.classList.remove("off");
    showFee.classList.add("off");
    clearError();
  } else if (senderCountry === receiverCountry || (senderCountry !== "GHANA" && receiverCountry !== "GHANA")) {
    countryChangeError();
  }
}

function receiverInputChange() {
  senderCountry = document.getElementById("senderCountry").value;
  receiverCountry = document.getElementById("receiverCountry").value;
  if (senderCountry === "GHANA" && receiverCountry !== "GHANA") {
    sendAmountInput.value = "";
    receiveAmountInput.value = "";
    spanSendAmount.innerText = "GHS";
    spanReceiveAmount.innerText = "FCFA";
    clearError();
    preview.disabled = true;
    preview.classList.remove("active");
  } else if (senderCountry !== "GHANA" && receiverCountry === "GHANA") {
    sendAmountInput.value = "";
    receiveAmountInput.value = "";
    spanSendAmount.innerText = "GHS";
    spanReceiveAmount.innerText = "GHS";
    clearError();
    preview.disabled = true;
    preview.classList.remove("off");
  } else if (senderCountry === receiverCountry || (senderCountry !== "GHANA" && receiverCountry !== "GHANA")) {
    countryChangeError();
  }
}

function countryChangeError() {
  spanSendAmount.innerText = "";
  spanReceiveAmount.innerText = "";
  amounToSendBox.classList.add("input_stop");
  amounToReceiveBox.classList.add("input_stop");
  cvx.classList.add("off");
  copyWrap.classList.add("off");
  error.classList.remove("off");
  error.innerText = `This transaction is not available`;
  sendAmountInput.disabled = true;
  receiveAmountInput.disabled = true;
  preview.disabled = true;
  preview.classList.remove("off");
  preview.style.display = "block";
  showFee.classList.add("off");
}

function clearError() {
  amounToSendBox.classList.remove("input_stop");
  amounToReceiveBox.classList.remove("input_stop");
  sendAmountInput.disabled = false;
  receiveAmountInput.disabled = false;
  cvx.classList.add("off");
  error.classList.add("off");
  copyWrap.classList.add("off");
  preview.disabled = false;
  preview.classList.add("off");
  preview.style.display = "block";
  localStorage.removeItem("Amount");
  withdrawalCheck.checked = false;
}

function CalculateAmountToReceive() {
  senderCountry = document.getElementById("senderCountry").value;
  receiverCountry = document.getElementById("receiverCountry").value;
  amountToSend = document.getElementById("sendAmount").value;
  amountToreceive = document.getElementById("receiveAmount").value;
  transactionFee = assignTransactionFee();

  if (senderCountry === "GHANA" && receiverCountry !== "GHANA" && amountToSend >= ghsToXof && amountToSend < 9000000) {
    amountToreceive = Math.floor((amountToSend / ghsToXof) * 1000);
    receiveAmountInput.value = amountToreceive;
    spanSendAmount.innerText = "GHS";
    spanReceiveAmount.innerText = "FCFA";
    showFee.classList.remove("off");
    showFee.innerText = `Retransfy fee: GHS ${transactionFee.toFixed(2)}`;
    clearError();
  } else if (senderCountry !== "GHANA" && receiverCountry === "GHANA" && amountToSend >= 1000 && amountToSend < 90000000) {
    amountToreceive = parseFloat(adjustDecimal((amountToSend / 1000) * xofToGhs)).toFixed(2);
    receiveAmountInput.value = amountToreceive;
    spanSendAmount.innerText = "FCFA";
    spanReceiveAmount.innerText = "GHS";
    showFee.classList.remove("off");
    showFee.innerText = `Retransfy fee: ${transactionFee.toLocaleString("fr-FR")} FCFA`;
    clearError();
  } else {
    receiveAmountInput.value = "";
    inputError();
  }
}

function CalculateAmountToSend() {
  senderCountry = document.getElementById("senderCountry").value;
  receiverCountry = document.getElementById("receiverCountry").value;
  amountToSend = document.getElementById("sendAmount").value;
  amountToreceive = document.getElementById("receiveAmount").value;
  transactionFee = assignTransactionFee();

  if (senderCountry === "GHANA" && receiverCountry !== "GHANA" && amountToreceive >= 1000 && amountToSend < 9000000) {
    amountToSend = parseFloat(adjustDecimal((amountToreceive / 1000) * ghsToXof));
    sendAmountInput.value = amountToSend.toFixed(2);
    spanSendAmount.innerText = "GHS";
    spanReceiveAmount.innerText = "FCFA";
    showFee.classList.add("off");
    clearError();
  } else if (senderCountry !== "GHANA" && receiverCountry === "GHANA" && amountToreceive >= xofToGhs && amountToSend < 90000000) {
    amountToSend = Math.ceil((amountToreceive / xofToGhs) * 1000);
    sendAmountInput.value = amountToSend;
    receiverCountry === "GHANA";
    spanSendAmount.innerText = "FCFA";
    spanReceiveAmount.innerText = "GHS";
    showFee.classList.add("off");
    clearError();
  } else {
    sendAmountInput.value = "";
    inputError();
  }
}

function inputError() {
  showFee.classList.add("off");
  amounToSendBox.classList.add("input_stop");
  amounToReceiveBox.classList.add("input_stop");
  spanSendAmount.innerText = "";
  spanReceiveAmount.innerText = "";
  preview.disabled = true;
  preview.classList.remove("off");
  error.classList.remove("off");
  error.innerText = `Invalid amount`;
  cvx.classList.add("off");
  copyWrap.classList.add("off");
}

sendAmountInput.addEventListener("input", CalculateAmountToReceive);
receiveAmountInput.addEventListener("input", CalculateAmountToSend);
senderInput.addEventListener("change", senderInputChange);
receiverInput.addEventListener("change", receiverInputChange);

function cantAddWithdrawal() {
  error.classList.remove("off");
  error.innerText = `Withdrawal fee not found
Please contact the receiver`;
}

const withdrawalCheck = document.getElementById("withdrawalFee");
function withdrawalAdded() {
  let withdrawalFee = 0;
  if (senderCountry === "GHANA" && receiverCountry === "TOGO") {
    if (amountToreceive >= 1000 && amountToreceive <= 5000) {
      withdrawalFee = 150;
    } else if (amountToreceive >= 5001 && amountToreceive <= 13000) {
      withdrawalFee = 400;
    } else if (amountToreceive >= 13001 && amountToreceive <= 15000) {
      withdrawalFee = 450;
    } else if (amountToreceive >= 15001 && amountToreceive <= 16600) {
      withdrawalFee = 500;
    } else if (amountToreceive >= 16601 && amountToreceive <= 20000) {
      withdrawalFee = 600;
    } else if (amountToreceive >= 20001 && amountToreceive <= 47000) {
      withdrawalFee = 850;
    } else if (amountToreceive >= 47001 && amountToreceive <= 50000) {
      withdrawalFee = 900;
    } else if (amountToreceive >= 50001 && amountToreceive <= 94000) {
      withdrawalFee = 1700;
    } else if (amountToreceive >= 94001 && amountToreceive <= 100000) {
      withdrawalFee = 1800;
    } else if (amountToreceive >= 100001 && amountToreceive <= 188000) {
      withdrawalFee = 3400;
    } else if (amountToreceive >= 188001 && amountToreceive <= 200000) {
      withdrawalFee = 3600;
    } else if (amountToreceive >= 200001 && amountToreceive <= 283000) {
      withdrawalFee = 4000;
    } else if (amountToreceive >= 283001 && amountToreceive <= 479000) {
      withdrawalFee = 4500;
    } else if (amountToreceive >= 479001 && amountToreceive <= 500000) {
      withdrawalFee = 4700;
    } else if (amountToreceive > 500000) {
      cantAddWithdrawal();
    }
  } else if (senderCountry === "GHANA" && receiverCountry === "BENIN") {
    if (amountToreceive >= 1000 && amountToreceive <= 5000) {
      withdrawalFee = 100;
    } else if (amountToreceive >= 5001 && amountToreceive <= 10000) {
      withdrawalFee = 200;
    } else if (amountToreceive >= 10001 && amountToreceive <= 20000) {
      withdrawalFee = 350;
    } else if (amountToreceive >= 20001 && amountToreceive <= 50000) {
      withdrawalFee = 700;
    } else if (amountToreceive >= 50001 && amountToreceive <= 100000) {
      withdrawalFee = 1000;
    } else if (amountToreceive >= 100001 && amountToreceive <= 200000) {
      withdrawalFee = 2000;
    } else if (amountToreceive >= 200001 && amountToreceive <= 300000) {
      withdrawalFee = 3000;
    } else if (amountToreceive >= 300001 && amountToreceive <= 500000) {
      withdrawalFee = 3500;
    } else if (amountToreceive > 500000) {
      cantAddWithdrawal();
    }
  } else if (senderCountry === "GHANA" && receiverCountry !== "TOGO" && receiverCountry !== "BENIN") {
    if (amountToreceive > 1000) {
      withdrawalFee = Math.ceil(amountToreceive / 100);
    }
  } else if (senderCountry !== "GHANA" && receiverCountry === "GHANA" && amountToreceive) {
    if (amountToreceive >= 1 && amountToreceive <= 50) {
      withdrawalFee = 0.5;
    } else if (amountToreceive >= 50.5 && amountToreceive <= 2000) {
      withdrawalFee = Math.ceil(amountToreceive / 100);
    } else if (amountToreceive > 2001) {
      withdrawalFee = 20;
    }
  }
  return withdrawalFee;
}

function run() {
  senderCountry = document.getElementById("senderCountry").value;
  receiverCountry = document.getElementById("receiverCountry").value;
  amountToSend = document.getElementById("sendAmount").value;
  amountToreceive = document.getElementById("receiveAmount").value;
  transactionFee = assignTransactionFee();

  if (senderCountry === "GHANA" && receiverCountry !== "GHANA" && amountToreceive >= 1000) {
    amountToSend = parseFloat(adjustDecimal((amountToreceive / 1000) * ghsToXof));
    sendAmountInput.value = amountToSend.toFixed(2);
  } else if (senderCountry !== "GHANA" && receiverCountry === "GHANA" && amountToreceive >= xofToGhs) {
    amountToSend = Math.ceil((amountToreceive / xofToGhs) * 1000);
    sendAmountInput.value = amountToSend;
  }
}
withdrawalCheck.addEventListener("change", () => {
  let actualAmount = 0;
  withdrawalFee = withdrawalAdded();
  if (!amountToreceive && !amountToreceive) {
    error.classList.remove("off");
    error.innerText = `Enter amount`;
    withdrawalCheck.checked = false;
  }
  if (withdrawalCheck.checked) {
    localStorage.setItem("Amount", amountToreceive);
    actualAmount = parseFloat(amountToreceive) + withdrawalFee;
    receiveAmountInput.value = actualAmount;
    preview.style.display = "block";
    run();
  } else {
    actualAmount = localStorage.getItem("Amount", amountToreceive);
    receiveAmountInput.value = actualAmount;
    preview.style.display = "block";
    run();
  }
  copyWrap.classList.add("off");
  cvx.classList.add("off");
});

function adjustDecimal(number) {
  if (number % 1 === 0) {
    return number;
  } else if (number % 1 <= 0.1) {
    return Math.floor(number) + 0.1;
  } else if (number % 1 > 0.1 && number % 1 <= 0.2) {
    return Math.floor(number) + 0.2;
  } else if (number % 1 > 0.2 && number % 1 <= 0.3) {
    return Math.floor(number) + 0.3;
  } else if (number % 1 > 0.3 && number % 1 <= 0.4) {
    return Math.floor(number) + 0.4;
  } else if (number % 1 > 0.4 && number % 1 <= 0.5) {
    return Math.floor(number) + 0.5;
  } else if (number % 1 > 0.5 && number % 1 <= 0.6) {
    return Math.floor(number) + 0.6;
  } else if (number % 1 > 0.6 && number % 1 <= 0.7) {
    return Math.floor(number) + 0.7;
  } else if (number % 1 > 0.7 && number % 1 <= 0.8) {
    return Math.floor(number) + 0.8;
  } else if (number % 1 > 0.8 && number % 1 <= 0.9) {
    return Math.floor(number) + 0.9;
  } else if (number % 1 > 0.9) {
    return Math.ceil(number);
  } else {
    return Math.ceil(number);
  }
}

function assignTransactionFee() {
  let transactionFee = 0;
  //(GHANA to TOGO)
  if (senderCountry === "GHANA" && receiverCountry === "TOGO") {
    if (amountToSend >= ghsToXof && amountToSend <= 130) {
      transactionFee = 5;
    } else if (amountToSend >= 131 && amountToSend <= 500) {
      transactionFee = 10;
    } else if (amountToSend >= 501 && amountToSend <= 800) {
      transactionFee = 15;
    } else if (amountToSend >= 801 && amountToSend <= 1200) {
      transactionFee = 20;
    } else if (amountToSend >= 1201 && amountToSend <= 3000) {
      transactionFee = 30;
    } else if (amountToSend >= 3001 && amountToSend <= 5000) {
      transactionFee = 40;
    } else if (amountToSend >= 5001 && amountToSend <= 8000) {
      transactionFee = 60;
    } else if (amountToSend >= 8001 && amountToSend <= 9000) {
      transactionFee = 80;
    } else if (amountToSend >= 9001 && amountToSend <= 10000) {
      transactionFee = 100;
    } else if (amountToSend >= 10001 && amountToSend <= 100000) {
      transactionFee = Math.ceil(amountToSend * 0.015);
    } else if (amountToSend >= 100001 && amountToSend <= 150000) {
      transactionFee = 1800;
    } else if (amountToSend >= 150001 && amountToSend <= 200000) {
      transactionFee = Math.ceil(amountToSend * 0.01);
    } else if (amountToSend >= 200001 && amountToSend <= 500000) {
      transactionFee = 2500;
    } else if (amountToSend >= 500001 && amountToSend <= 1000000) {
      transactionFee = 4000;
    } else if (amountToSend >= 1000001 && amountToSend <= 100000000) {
      transactionFee = Math.ceil(amountToSend * 0.005);
    }
  }
  //(GHANA to BCB)
  else if (senderCountry === "GHANA" && receiverCountry !== "GHANA" && receiverCountry !== "TOGO") {
    if (amountToSend >= ghsToXof && amountToSend <= 130) {
      transactionFee = 10;
    } else if (amountToSend >= 131 && amountToSend <= 500) {
      transactionFee = 15;
    } else if (amountToSend >= 501 && amountToSend <= 800) {
      transactionFee = 20;
    } else if (amountToSend >= 801 && amountToSend <= 1200) {
      transactionFee = 30;
    } else if (amountToSend >= 1201 && amountToSend <= 3000) {
      transactionFee = 40;
    } else if (amountToSend >= 3001 && amountToSend <= 5000) {
      transactionFee = 50;
    } else if (amountToSend >= 5001 && amountToSend <= 8000) {
      transactionFee = 80;
    } else if (amountToSend >= 8001 && amountToSend <= 9000) {
      transactionFee = 100;
    } else if (amountToSend >= 9001 && amountToSend <= 10000) {
      transactionFee = 120;
    } else if (amountToSend >= 10001 && amountToSend <= 100000) {
      transactionFee = Math.ceil(amountToSend * 0.02);
    } else if (amountToSend >= 100001 && amountToSend <= 150000) {
      transactionFee = 2000;
    } else if (amountToSend >= 150001 && amountToSend <= 200000) {
      transactionFee = Math.ceil(amountToSend * 0.015);
    } else if (amountToSend >= 200001 && amountToSend <= 500000) {
      transactionFee = 3500;
    } else if (amountToSend >= 500001 && amountToSend <= 1000000) {
      transactionFee = 5000;
    } else if (amountToSend >= 1000001 && amountToSend <= 100000000) {
      transactionFee = Math.ceil(amountToSend * 0.005);
    }
  }
  //(ALL COUNTRIES to GHANA)
  else if (senderCountry !== "GHANA" && receiverCountry === "GHANA") {
    if (amountToSend >= 1000 && amountToSend <= 6000) {
      transactionFee = 500;
    } else if (amountToSend >= 6001 && amountToSend <= 20000) {
      transactionFee = 1000;
    } else if (amountToSend >= 20001 && amountToSend <= 40000) {
      transactionFee = 2000;
    } else if (amountToSend >= 40001 && amountToSend <= 60000) {
      transactionFee = 3000;
    } else if (amountToSend >= 60001 && amountToSend <= 100000) {
      transactionFee = 4000;
    } else if (amountToSend >= 100001 && amountToSend <= 300000) {
      transactionFee = 5000;
    } else if (amountToSend >= 300001 && amountToSend <= 400000) {
      transactionFee = 7000;
    } else if (amountToSend >= 400001 && amountToSend <= 500000) {
      transactionFee = 8000;
    } else if (amountToSend >= 500001 && amountToSend <= 1000000) {
      transactionFee = 12000;
    } else if (amountToSend >= 1000001 && amountToSend <= 2000000) {
      transactionFee = Math.ceil(amountToSend * 0.015);
    } else if (amountToSend >= 2000001 && amountToSend <= 3000000) {
      transactionFee = 30000;
    } else if (amountToSend >= 3000001 && amountToSend <= 10000000) {
      transactionFee = Math.ceil(amountToSend * 0.01);
    } else if (amountToSend >= 10000001 && amountToSend <= 30000000) {
      transactionFee = 150000;
    } else if (amountToSend >= 3000001 && amountToSend <= 500000000) {
      transactionFee = Math.ceil(amountToSend * 0.005);
    }
  }
  return transactionFee;
}

//Convertion & result
const copy = document.getElementById("copy");
const copier = document.getElementById("copier");
const copyWrap = document.getElementById("copy_buttons");
copyWrap.classList.add("off");

let forCopy = "";
function applyConvert() {
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  senderCountry = document.getElementById("senderCountry").value;
  receiverCountry = document.getElementById("receiverCountry").value;
  amountToSend = parseFloat(document.getElementById("sendAmount").value);
  amountToreceive = parseFloat(document.getElementById("receiveAmount").value);
  transactionFee = assignTransactionFee();

  let totalToPay = amountToSend + transactionFee;
  error.classList.add("off");
  showFee.classList.add("off");
  copyWrap.classList.remove("off");
  copy.textContent = "EN";
  copier.textContent = "FR";
  cvx.classList.remove("off");

  document.getElementById("rslt1").textContent = `${
    senderCountry === "GHANA" ? amountToreceive.toLocaleString("fr-FR") + " FCFA" : "GHS " + amountToreceive.toFixed(2)
  }`;
  document.getElementById("rslt2").textContent = `${
    senderCountry === "GHANA" ? "GHS " + amountToSend.toFixed(2) : amountToSend.toLocaleString("fr-FR") + " FCFA"
  }`;
  document.getElementById("rslt3").textContent = `${
    senderCountry === "GHANA" ? "GHS " + transactionFee.toFixed(2) : transactionFee.toLocaleString("fr-FR") + " FCFA"
  }`;
  document.getElementById("rslt4").textContent = `${
    senderCountry === "GHANA" ? "GHS " + totalToPay.toFixed(2) : totalToPay.toLocaleString("fr-FR") + " FCFA"
  }`;

  return (forCopy = `${senderCountry} to ${receiverCountry}
${formattedDate} || Rate: ${ghsToXof}

Amount to receive: ${senderCountry === "GHANA" ? amountToreceive.toLocaleString("fr-FR") + " FCFA" : "GHS " + amountToreceive.toFixed(2)}
Amount to send: ${senderCountry === "GHANA" ? "GHS " + amountToSend.toFixed(2) : amountToSend.toLocaleString("fr-FR") + " FCFA"}
Retransfy fee: ${senderCountry === "GHANA" ? "GHS " + transactionFee.toFixed(2) : transactionFee.toLocaleString("fr-FR") + " FCFA"}
Total to Pay: ${senderCountry === "GHANA" ? "GHS " + totalToPay.toFixed(2) : totalToPay.toLocaleString("fr-FR") + " FCFA"}`);
}

preview.addEventListener("click", (event) => {
  event.preventDefault();
  applyConvert();
  preview.style.display = "none";
});

//Copy
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
          .replace(/Amount to send/g, "Montant à envoyer")
          .replace(/Transaction fee/g, "Frais de Retransfy")
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
