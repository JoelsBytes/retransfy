let usn = [];

async function loadUsn() {
  const response = await fetch("clou/uft.xlsx");
  const data = await response.arrayBuffer();
  const workbook = XLSX.read(data, { type: "array" });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  usn = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: true });
}

loadUsn();

const form = document.getElementById("form-rct");
const rctResponse = document.getElementById("rct-response");
const copyButton = document.getElementById("copy");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  const ghXof = 25;
  const xofgh = ghXof - 1;

  const time = document.getElementById("time").value;
  const senderCountry = document.getElementById("senderCountry").value;
  const receiverCountry = document.getElementById("receiverCountry").value;
  let amountReceived = Number(document.getElementById("amountReceived").value);
  let trx = document.getElementById("trx").value.trim();
  if (trx === "1") {
    trx = `${day}${month}${year}${time.replace(":", "")}`;
  }
  let receiver = document.getElementById("receiver").value.trim();
  receiver = receiver.replace(/\s/g, "");
  receiver = receiver.replace(/\+?228|\+?229|\+?225|\+?226|\+?221|\+?223|\+?233|00228|00229|00225|00226|00221|00223|00233/g, "");
  receiver = receiver.replace(/[-_=/.:;'"]/g, "");
  let sender = document.getElementById("sender").value.trim();
  sender = sender.replace(/\s/g, "");
  sender = sender.replace(/\+?228|\+?229|\+?225|\+?226|\+?221|\+?223|\+?233|00228|00229|00225|00226|00221|00223|00233/g, "");
  sender = sender.replace(/[-_=/.:;'"]/g, "");

  const errorM = document.getElementById("error");

  if (!time || !receiver || !sender || !trx || !amountReceived) {
    errorM.style.display = "block";
    errorM.innerHTML = "Please fill in all fields!";
    form.style.display = "flex";
    rctResponse.style.display = "none";
    return;
  } else if (senderCountry === receiverCountry) {
    errorM.style.display = "block";
    errorM.innerHTML = "Something went wrong! Please try again.";
    form.style.display = "flex";
    rctResponse.style.display = "none";
    return;
  } else if (senderCountry !== "GHANA" && receiverCountry !== "GHANA") {
    errorM.style.display = "block";
    errorM.innerHTML = "Something went wrong! Please try again.";
    form.style.display = "flex";
    rctResponse.style.display = "none";
    return;
  } else {
    let rc = "";
    let sd = "";

    for (let i = 0; i < usn.length; i++) {
      if (usn[i][1] == receiver) {
        rc = usn[i][0];
      }
      if (usn[i][1] == sender) {
        sd = usn[i][0];
      }
      if (rc && sd) break;
    }

    const enD = [" GH", " TG", " BN", " CI", " BF", " SN", " ML"];

    enD.forEach((ending) => {
      sd = sd.replace(ending, "");
      rc = rc.replace(ending, "");
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
    copyButton.classList.remove("copyChange");
    const resp = document.getElementById("response");
    let transactionFee;
    let amountToSend;

    if (senderCountry === "GHANA" && receiverCountry !== "GHANA") {
      amountToSend = adjustDecimal((amountReceived / 1000) * ghXof);
    } else if (senderCountry !== "GHANA" && receiverCountry === "GHANA") {
      amountToSend = Math.ceil(amountReceived / xofgh) * 1000;
    }

    if (senderCountry === "GHANA" && receiverCountry === "TOGO") {
      if (amountToSend >= ghXof && amountToSend <= 130) {
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
      } else if (amountToSend >= 1000001 && amountToSend <= 10000000) {
        transactionFee = Math.ceil(amountToSend * 0.005);
      }
    } else if (senderCountry === "GHANA" && receiverCountry !== "GHANA" && receiverCountry !== "TOGO") {
      if (amountToSend >= ghXof && amountToSend <= 130) {
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
      } else if (amountToSend >= 1000001 && amountToSend <= 10000000) {
        transactionFee = Math.ceil(amountToSend * 0.005);
      }
    } else if (senderCountry !== "GHANA" && receiverCountry === "GHANA") {
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

    if (receiverCountry === "TOGO") {
      receiver = "+228" + receiver;
    } else if (receiverCountry === "BENIN") {
      receiver = "+229" + receiver;
    } else if (receiverCountry === "IVORY COAST") {
      receiver = "+225" + receiver;
    } else if (receiverCountry === "BURKINA FASO") {
      receiver = "+226" + receiver;
    } else if (receiverCountry === "SENEGAL") {
      receiver = "+221" + receiver;
    } else if (receiverCountry === "MALI") {
      receiver = "+223" + receiver;
    } else if (receiverCountry === "GHANA") {
      receiver = receiver;
    }

    if (senderCountry === "TOGO") {
      sender = "+228" + sender;
    } else if (senderCountry === "BENIN") {
      sender = "+229" + sender;
    } else if (senderCountry === "IVORY COAST") {
      sender = "+225" + sender;
    } else if (senderCountry === "BURKINA FASO") {
      sender = "+226" + sender;
    } else if (senderCountry === "SENEGAL") {
      sender = "+221" + sender;
    } else if (senderCountry === "MALI") {
      sender = "+223" + sender;
    } else if (senderCountry === "GHANA") {
      sender = sender;
    }

    let totalPaid = amountToSend + transactionFee;
    if (senderCountry === "GHANA" && receiverCountry !== "GHANA") {
      resp.innerHTML = `Transaction successful via Retransfy.
You've sent ${amountReceived.toLocaleString(
        "fr-FR"
      )} FCFA to ${receiver} ${rc.toUpperCase()} at a rate of ${ghXof} | ${senderCountry} to ${receiverCountry};
${formattedDate} | ${time} | Transaction ID: ${trx}. You paid a total of GHS ${totalPaid.toFixed(
        2
      )}, including a transaction fee of GHS ${transactionFee.toFixed(2)} via ${sender} ${sd.toUpperCase()}.`;
    } else if (senderCountry !== "GHANA" && receiverCountry === "GHANA") {
      resp.innerHTML = `Transaction successful via Retransfy.
You've sent GHS ${amountReceived.toFixed(2)} to ${receiver} ${rc.toUpperCase()} at a rate of ${xofgh} | ${senderCountry} to ${receiverCountry};
${formattedDate} | ${time} | Transaction ID: ${trx}. You paid a total of ${totalPaid.toLocaleString(
        "fr-FR"
      )}, including a transaction fee of ${transactionFee.toLocaleString("fr-FR")} via ${sender} ${sd.toUpperCase()}.`;
    }

    errorM.style.display = "none";
    form.style.display = "none";
    rctResponse.style.display = "flex";
  }
});

copyButton.addEventListener("click", () => {
  copyButton.classList.add("copyChange");

  const textToCopy = document.getElementById("response").innerHTML;
  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {})
    .catch((err) => {});
});

document.getElementById("goHome").addEventListener("click", () => {
  rctResponse.style.display = "none";
  form.style.display = "flex";
});