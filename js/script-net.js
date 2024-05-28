const netForm = document.getElementById("network");

netForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const netCountry = document.getElementById("net-country").value;
  const netPhone = document.getElementById("net-phone").value.trim();
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

  if (!netCountry && !netPhone) {
    netError.style.display = "block";
    netError.innerHTML = "Please fill in all fields!";
    netDisplay.style.display = "none";
    return;
  } else if (!netCountry && netPhone) {
    netError.style.display = "block";
    netError.innerHTML = "Please select a country!";
    netDisplay.style.display = "none";
    return;
  }

  if (netCountry === "GHANA") {
    const prefix = netPhone.slice(0, 3);
    const mtnPrefixes = ["054", "024", "059", "053", "055"];
    const atPrefixes = ["057", "027", "026", "056"];
    const vodaPrefixes = ["050", "020"];

    if (netPhone.length < 10 || netPhone.length > 10) {
      netError.style.display = "block";
      netError.innerHTML = `Inavlid Phone number for ${toSentenceCaseWord(netCountry)}.`;
      netDisplay.style.display = "none";
      return;
    }

    if (mtnPrefixes.includes(prefix)) {
      netError.style.display = "none";
      netDisplay.style.display = "block";
      netDisplay.innerHTML = `Network: MTN - ${netCountry}`;
    } else if (atPrefixes.includes(prefix)) {
      netError.style.display = "none";
      netDisplay.style.display = "block";
      netDisplay.innerHTML = `Network: AirtelTigo - ${netCountry}`;
    } else if (vodaPrefixes.includes(prefix)) {
      netError.style.display = "none";
      netDisplay.style.display = "block";
      netDisplay.innerHTML = `Network: Telecel - ${netCountry}`;
    } else {
      netError.style.display = "block";
      netError.innerHTML = `Inavlid Phone number for ${toSentenceCaseWord(netCountry)}.`;
      netDisplay.style.display = "none";
      return;
    }
  }

  if (netCountry === "TOGO") {
    const prefix = netPhone.slice(0, 2);
    const tmoneyPrefixes = ["93", "92", "91", "90", "72", "71", "70", "73"];
    const moovPrefixes = ["99", "98", "97", "96", "79", "78"];

    if (netPhone.length < 8 || netPhone.length > 8) {
      netError.style.display = "block";
      netError.innerHTML = `Inavlid Phone number for ${toSentenceCaseWord(netCountry)}.`;
      netDisplay.style.display = "none";
      return;
    }

    if (tmoneyPrefixes.includes(prefix)) {
      netError.style.display = "none";
      netDisplay.style.display = "block";
      netDisplay.innerHTML = `Network: Togocel - ${netCountry}`;
    } else if (moovPrefixes.includes(prefix)) {
      netError.style.display = "none";
      netDisplay.style.display = "block";
      netDisplay.innerHTML = `Network: Moov Africa - ${netCountry}`;
    } else {
      netError.style.display = "block";
      netError.innerHTML = `Inavlid Phone number for ${toSentenceCaseWord(netCountry)}.`;
      netDisplay.style.display = "none";
      return;
    }
  }

  if (netCountry === "BENIN") {
    const prefix = netPhone.slice(0, 2);
    const mtnPrefixes = ["96", "97", "91", "61", "62", "66", "67", "69", "52", "54", "55", "56"];
    const moovPrefixes = ["95", "94", "98", "99", "60", "64", "68", "65"];

    if (netPhone.length < 8 || netPhone.length > 8) {
      netError.style.display = "block";
      netError.innerHTML = `Inavlid Phone number for ${toSentenceCaseWord(netCountry)}.`;
      netDisplay.style.display = "none";
      return;
    }

    if (mtnPrefixes.includes(prefix)) {
      netError.style.display = "none";
      netDisplay.style.display = "block";
      netDisplay.innerHTML = `Network: MTN - ${netCountry}`;
    } else if (moovPrefixes.includes(prefix)) {
      netError.style.display = "none";
      netDisplay.style.display = "block";
      netDisplay.innerHTML = `Network: Moov Africa - ${netCountry}`;
    } else {
      netError.style.display = "block";
      netError.innerHTML = `Inavlid Phone number for ${toSentenceCaseWord(netCountry)}.`;
      netDisplay.style.display = "none";
      return;
    }
  }

  if (netCountry === "IVORY COAST") {
    const prefix = netPhone.slice(0, 2);
    const mtnPrefixes = ["05"];
    const orangePrefixes = ["07"];
    const moovPrefixes = ["01"];

    if (netPhone.length < 10 || netPhone.length > 10) {
      netError.style.display = "block";
      netError.innerHTML = `Inavlid Phone number for ${toSentenceCaseWord(netCountry)}.`;
      netDisplay.style.display = "none";
      return;
    }

    if (mtnPrefixes.includes(prefix)) {
      netError.style.display = "none";
      netDisplay.style.display = "block";
      netDisplay.innerHTML = `Network: MTN - ${netCountry}`;
    } else if (orangePrefixes.includes(prefix)) {
      netError.style.display = "none";
      netDisplay.style.display = "block";
      netDisplay.innerHTML = `Network: Orange - ${netCountry}`;
    } else if (moovPrefixes.includes(prefix)) {
      netError.style.display = "none";
      netDisplay.style.display = "block";
      netDisplay.innerHTML = `Network: Moov Africa - ${netCountry}`;
    } else {
      netError.style.display = "block";
      netError.innerHTML = `Inavlid Phone number for ${toSentenceCaseWord(netCountry)}.`;
      netDisplay.style.display = "none";
      return;
    }
  }

  if (netCountry === "BURKINA FASO") {
    const prefix = netPhone.slice(0, 2);
    const orangePrefixes = ["05", "06", "07", "54", "55", "56", "57", "64", "65", "66", "77"];
    const moovPrefixes = ["01", "02", "03", "51", "52", "53", "60", "61", "62", "63"];

    if (netPhone.length < 8 || netPhone.length > 8) {
      netError.style.display = "block";
      netError.innerHTML = `Inavlid Phone number for ${toSentenceCaseWord(netCountry)}.`;
      netDisplay.style.display = "none";
      return;
    }

    if (orangePrefixes.includes(prefix)) {
      netError.style.display = "none";
      netDisplay.style.display = "block";
      netDisplay.innerHTML = `Network: Orange - ${netCountry}`;
    } else if (moovPrefixes.includes(prefix)) {
      netError.style.display = "none";
      netDisplay.style.display = "block";
      netDisplay.innerHTML = `Network: Moov Africa - ${netCountry}`;
    } else {
      netError.style.display = "block";
      netError.innerHTML = `Inavlid Phone number for ${toSentenceCaseWord(netCountry)}.`;
      netDisplay.style.display = "none";
      return;
    }
  }

  document.getElementById("net-country").addEventListener("change", () => {
    netError.style.display = "none";
    netDisplay.style.display = "none";
  });
});
