import { sntzNum } from "../data/data.js";
const netForm = document.getElementById("network");
netForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const netCtry = document.getElementById("net-ctry").value;
  let netFn = document.getElementById("net-fn").value.trim();

  netFn = sntzNum(netFn);

  const netError = document.getElementById("error-net");
  const netDisplay = document.getElementById("net-display");

  function toSentenceCaseWord(sentence) {
    if (!sentence) {
      return sentence;
    }
    return sentence
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  if (!netCtry && !netFn) {
    netError.style.display = "block";
    netError.innerHTML = "Please fill in all fields!";
    netDisplay.style.display = "none";
    return;
  } else if (!netCtry && netFn) {
    netError.style.display = "block";
    netError.innerHTML = "Please select a country.";
    netDisplay.style.display = "none";
    return;
  } else if (netCtry && !netFn) {
    netError.style.display = "block";
    netError.innerHTML = "Please enter a number.";
    netDisplay.style.display = "none";
    return;
  }

  if (netCtry === "GHANA") {
    const prefix = netFn.slice(0, 3);
    const mtnPrefixes = ["054", "024", "059", "053", "055"];
    const atPrefixes = ["057", "027", "026", "056"];
    const vodaPrefixes = ["050", "020"];

    if (netFn.length < 10 || netFn.length > 10) {
      netError.style.display = "block";
      netError.innerHTML = `Inavlid Phone number for ${toSentenceCaseWord(netCtry)}.`;
      netDisplay.style.display = "none";
      return;
    }

    if (mtnPrefixes.includes(prefix)) {
      netError.style.display = "none";
      netDisplay.style.display = "block";
      netDisplay.innerHTML = `Network: MTN - ${netCtry}`;
    } else if (atPrefixes.includes(prefix)) {
      netError.style.display = "none";
      netDisplay.style.display = "block";
      netDisplay.innerHTML = `Network: AirtelTigo - ${netCtry}`;
    } else if (vodaPrefixes.includes(prefix)) {
      netError.style.display = "none";
      netDisplay.style.display = "block";
      netDisplay.innerHTML = `Network: Telecel - ${netCtry}`;
    } else {
      netError.style.display = "block";
      netError.innerHTML = `Inavlid Phone number for ${toSentenceCaseWord(netCtry)}.`;
      netDisplay.style.display = "none";
      return;
    }
  }

  if (netCtry === "TOGO") {
    const prefix = netFn.slice(0, 2);
    const tmoneyPrefixes = ["93", "92", "91", "90", "72", "71", "70", "73"];
    const moovPrefixes = ["99", "98", "97", "96", "79", "78"];

    if (netFn.length < 8 || netFn.length > 8) {
      netError.style.display = "block";
      netError.innerHTML = `Inavlid Phone number for ${toSentenceCaseWord(netCtry)}.`;
      netDisplay.style.display = "none";
      return;
    }

    if (tmoneyPrefixes.includes(prefix)) {
      netError.style.display = "none";
      netDisplay.style.display = "block";
      netDisplay.innerHTML = `Network: Togocel - ${netCtry}`;
    } else if (moovPrefixes.includes(prefix)) {
      netError.style.display = "none";
      netDisplay.style.display = "block";
      netDisplay.innerHTML = `Network: Moov Africa - ${netCtry}`;
    } else {
      netError.style.display = "block";
      netError.innerHTML = `Inavlid Phone number for ${toSentenceCaseWord(netCtry)}.`;
      netDisplay.style.display = "none";
      return;
    }
  }

  if (netCtry === "BENIN") {
    const prefix = netFn.slice(0, 2);
    const mtnPrefixes = ["96", "97", "91", "61", "62", "66", "67", "69", "52", "54", "55", "56", "57"];
    const moovPrefixes = ["95", "94", "98", "99", "60", "63", "64", "65", "68"];

    if (netFn.length < 8 || netFn.length > 8) {
      netError.style.display = "block";
      netError.innerHTML = `Inavlid Phone number for ${toSentenceCaseWord(netCtry)}.`;
      netDisplay.style.display = "none";
      return;
    }

    if (mtnPrefixes.includes(prefix)) {
      netError.style.display = "none";
      netDisplay.style.display = "block";
      netDisplay.innerHTML = `Network: MTN - ${netCtry}`;
    } else if (moovPrefixes.includes(prefix)) {
      netError.style.display = "none";
      netDisplay.style.display = "block";
      netDisplay.innerHTML = `Network: Moov Africa - ${netCtry}`;
    } else {
      netError.style.display = "block";
      netError.innerHTML = `Inavlid Phone number for ${toSentenceCaseWord(netCtry)}.`;
      netDisplay.style.display = "none";
      return;
    }
  }

  if (netCtry === "IVORY COAST") {
    const prefix = netFn.slice(0, 2);
    const mtnPrefixes = ["05"];
    const orangePrefixes = ["07"];
    const moovPrefixes = ["01"];

    if (netFn.length < 10 || netFn.length > 10) {
      netError.style.display = "block";
      netError.innerHTML = `Inavlid Phone number for ${toSentenceCaseWord(netCtry)}.`;
      netDisplay.style.display = "none";
      return;
    }

    if (mtnPrefixes.includes(prefix)) {
      netError.style.display = "none";
      netDisplay.style.display = "block";
      netDisplay.innerHTML = `Network: MTN - ${netCtry}`;
    } else if (orangePrefixes.includes(prefix)) {
      netError.style.display = "none";
      netDisplay.style.display = "block";
      netDisplay.innerHTML = `Network: Orange - ${netCtry}`;
    } else if (moovPrefixes.includes(prefix)) {
      netError.style.display = "none";
      netDisplay.style.display = "block";
      netDisplay.innerHTML = `Network: Moov Africa - ${netCtry}`;
    } else {
      netError.style.display = "block";
      netError.innerHTML = `Inavlid Phone number for ${toSentenceCaseWord(netCtry)}.`;
      netDisplay.style.display = "none";
      return;
    }
  }

  if (netCtry === "BURKINA FASO") {
    const prefix = netFn.slice(0, 2);
    const orangePrefixes = ["05", "06", "07", "54", "55", "56", "57", "64", "65", "66", "77"];
    const moovPrefixes = ["01", "02", "03", "51", "52", "53", "60", "61", "62", "63"];

    if (netFn.length < 8 || netFn.length > 8) {
      netError.style.display = "block";
      netError.innerHTML = `Inavlid Phone number for ${toSentenceCaseWord(netCtry)}.`;
      netDisplay.style.display = "none";
      return;
    }

    if (orangePrefixes.includes(prefix)) {
      netError.style.display = "none";
      netDisplay.style.display = "block";
      netDisplay.innerHTML = `Network: Orange - ${netCtry}`;
    } else if (moovPrefixes.includes(prefix)) {
      netError.style.display = "none";
      netDisplay.style.display = "block";
      netDisplay.innerHTML = `Network: Moov Africa - ${netCtry}`;
    } else {
      netError.style.display = "block";
      netError.innerHTML = `Inavlid Phone number for ${toSentenceCaseWord(netCtry)}.`;
      netDisplay.style.display = "none";
      return;
    }
  }

  document.getElementById("net-country").addEventListener("change", () => {
    netError.style.display = "none";
    netDisplay.style.display = "none";
  });
});
