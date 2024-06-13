import { sntzNum } from "../data/data.js";
let uftx = {};
async function loadUftx() {
  const response = await fetch("cle/uft.xlsx");
  const data = await response.arrayBuffer();
  const workbook = XLSX.read(data, { type: "array" });

  workbook.SheetNames.forEach((sheetName) => {
    const worksheet = workbook.Sheets[sheetName];
    uftx[sheetName] = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: true });
  });
}

loadUftx();

const custForm = document.getElementById("cust-form");

custForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const custNmInput = document.getElementById("cust-num");
  custNmInput.maxLength = "15";
  let custNm = document.getElementById("cust-num").value.trim();

  custNm = sntzNum(custNm);

  const custErr = document.getElementById("cust-error");
  const custDisplay = document.getElementById("cust-display");

  if (!custNm) {
    custErr.style.display = "block";
    custErr.innerHTML = "Enter a number.";
    custDisplay.style.display = "none";
    return;
  } else if (custNm.length < 8 || custNm.length > 10) {
    custErr.style.display = "block";
    custErr.innerHTML = "Invalid number.";
    custDisplay.style.display = "none";
    return;
  } else {
    let nm = "";
    for (const sheetName in uftx) {
      const sheetData = uftx[sheetName];
      for (let i = 0; i < sheetData.length; i++) {
        if (sheetData[i][1] == custNm) {
          nm = sheetData[i][0];
          break;
        }
      }
      if (nm) break;
    }

    const enD = [" GH", " TG", " BN", " CI", " BF", " SN", " ML"];

    enD.forEach((ending) => {
      nm = nm.replace(ending, "");
    });

    if (nm) {
      custErr.style.display = "none";
      custDisplay.style.display = "block";
      custDisplay.innerHTML = `${nm}`;
    } else {
      custErr.style.display = "block";
      custErr.innerHTML = `${custNm} is not found.`;
      custDisplay.style.display = "none";
    }
  }
});
