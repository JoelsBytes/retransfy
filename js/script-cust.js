let uftx = [];

async function loadUftx() {
  const response = await fetch("cle/uftx.xlsx");
  const data = await response.arrayBuffer();
  const workbook = XLSX.read(data, { type: "array" });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  uftx = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: true });
}

loadUftx();

const formCust = document.getElementById("client");

formCust.addEventListener("submit", (event) => {
  event.preventDefault();
  const senderInput = document.getElementById("cust-number");
  senderInput.maxLength = "15";
  let sender = document.getElementById("cust-number").value.trim();
  sender = sender.replace(/\s/g, "");
  sender = sender.replace(/\+228|\+229|\+225|\+226|\+221|\+223|00228|00229|00225|00226|00221|00223/g, "");
  sender = sender.replace(/\+233|00233/g, "0");
  sender = sender.replace(/[-_=/.:;'"]/g, "");

  const errorCust = document.getElementById("cust-error");
  const custDisplay = document.getElementById("cust-display");

  if (!sender) {
    errorCust.style.display = "block";
    errorCust.innerHTML = "Enter a number.";
    custDisplay.style.display = "none";
    return;
  } else if (sender.length < 8 || sender.length > 10 || sender.length === 9) {
    errorCust.style.display = "block";
    errorCust.innerHTML = "Invalid number.";
    custDisplay.style.display = "none";
    return;
  } else {
    let user = "";

    for (let i = 0; i < uftx.length; i++) {
      if (uftx[i][1] == sender) {
        user = uftx[i][0];
      }
      if (user) break;
    }

    const enD = [" GH", " TG", " BN", " CI", " BF", " SN", " ML"];

    enD.forEach((ending) => {
      user = user.replace(ending, "");
    });

    if (user) {
      errorCust.style.display = "none";
      custDisplay.style.display = "block";
      custDisplay.innerHTML = `${user}`;
    } else {
      errorCust.style.display = "block";
      errorCust.innerHTML = "User does not exist";
      custDisplay.style.display = "none";
    }
  }
});
