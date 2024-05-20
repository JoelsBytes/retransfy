const eyeVisibles = document.querySelectorAll(".visible");
const eyeInvisibles = document.querySelectorAll(".invisible");
const logCont = document.getElementById("log_c");
const SignCont = document.getElementById("sign_c");

const logA = document.getElementById("az-log");
const signA = document.getElementById("az");
const signB = document.getElementById("az-confirm");

const agreedCont = document.getElementById("terms-bx");
agreedCont.classList.add("off");
const load = document.getElementById("load");
load.classList.add("off");

const restartBx = document.getElementById("az-restart-bx");
restartBx.classList.add("off");

const fgt = document.getElementById("fgt");
const noAccount = document.getElementById("noAccount");
const logText = document.getElementById("ll");
const signText = document.getElementById("ss");

eyeInvisibles.forEach((eyeInvisible) => {
  eyeInvisible.addEventListener("click", () => {
    eyeInvisibles.forEach((eyeInvisible) => {
      eyeInvisible.style.display = "none";
    });

    eyeVisibles.forEach((eyeVisible) => {
      eyeVisible.style.display = "block";
    });

    if (logA.type === "password" || signA.type === "password" || signB.type === "password") {
      logA.type = "text";
      signA.type = "text";
      signB.type = "text";
      logA.className = "textType";
      signA.className = "textType";
      signB.className = "textType";
    } else {
      logA.type = "password";
      signA.type = "password";
      signB.type = "password";
    }
  });
});

eyeVisibles.forEach((eyeVisible) => {
  eyeVisible.addEventListener("click", () => {
    eyeInvisibles.forEach((eyeInvisible) => {
      eyeInvisible.style.display = "block";
    });

    eyeVisibles.forEach((eyeVisible) => {
      eyeVisible.style.display = "none";
    });

    if (logA.type === "text" || signA.type === "text" || signB.type === "text") {
      logA.type = "password";
      signA.type = "password";
      signB.type = "password";
      logA.className = "textType";
      signA.className = "textType";
      signB.className = "textType";
    } else {
      logA.type = "text";
      signA.type = "text";
      signB.type = "text";
    }
  });
});

logCont.classList.add("off");
SignCont.classList.add("off");
const root = document.getElementById("root");
root.classList.add("off");

let l_Error = document.getElementById("l_error");
let s_error = document.getElementById("s_error");
let welcome = document.getElementById("welcome");
const ID = localStorage.getItem("first");
const ID2 = localStorage.getItem("last");
const showUser = document.getElementById("user");

if (ID) {
  welcome.innerHTML = `Hi ${ID.toUpperCase()}. Please log in`;
  showUser.innerHTML = `${ID} ${ID2}`;
} else {
  welcome.innerHTML = `Please login`;
  showUser.innerHTML = "RETRANSFY";
}

const log_f = document.getElementById("log");
const sign_f = document.getElementById("sign");

document.getElementById("ss").addEventListener("click", () => {
  logCont.classList.add("off");
  SignCont.classList.remove("off");
  sign_f.reset();
  l_Error.style.display = "none";
});

document.getElementById("ll").addEventListener("click", () => {
  logCont.classList.remove("off");
  SignCont.classList.add("off");
  log_f.reset();
  s_error.style.display = "none";
});

document.addEventListener("DOMContentLoaded", function () {
  const inUz = localStorage.getItem("USZ");
  const agreement = localStorage.getItem("yes");
  const inF = localStorage.getItem("fn");
  const access = localStorage.getItem("access");
  if (inUz && inF && agreement) {
    load.classList.add("off");
    agreedCont.classList.add("off");
    SignCont.classList.add("off");
    logCont.classList.add("off");
    root.classList.remove("off");
  } else if (!inUz && inF && !agreement) {
    load.classList.add("off");
    agreedCont.classList.remove("off");
    SignCont.classList.add("off");
    logCont.classList.add("off");
    root.classList.add("off");
  } else if (inF && agreement && !inUz) {
    load.classList.add("off");
    agreedCont.classList.add("off");
    SignCont.classList.add("off");
    logCont.classList.remove("off");
    root.classList.add("off");
  } else {
    load.classList.add("off");
    agreedCont.classList.add("off");
    SignCont.classList.remove("off");
    logCont.classList.add("off");
    root.classList.add("off");
  }

  if (access) {
    load.classList.add("off");
    agreedCont.classList.add("off");
    SignCont.classList.add("off");
    root.classList.add("off");
    logCont.classList.remove("off");
    l_Error.style.display = "block";
    l_Error.textContent = `Account suspended. Call 0535060144`;

    fgt.style.display = "none";
    noAccount.style.display = "none";
    signText.style.display = "none";
  }
});

sign_f.addEventListener("submit", function (event) {
  event.preventDefault();

  const country = document.getElementById("country").value.toLowerCase();
  const firstName = document.getElementById("first").value.trim().toLowerCase();
  const lastName = document.getElementById("last").value.trim().toLowerCase();
  const phone = document.getElementById("phone").value.trim().toLowerCase();
  const az = document.getElementById("az").value.trim();
  const az_confirm = document.getElementById("az-confirm").value.trim();

  if (country === "" || !firstName || !lastName || !phone || !az || !az_confirm) {
    s_error.style.display = "block";
    s_error.textContent = "Please fill in all fields.";
    return;
  }

  if (az.length < 8) {
    s_error.style.display = "block";
    s_error.textContent = "Password must be at least 8 Characters";
    return;
  }

  if (az !== az_confirm) {
    s_error.style.display = "block";
    s_error.textContent = "Passwords do not match";
    return;
  }

  let uppercaseRegex = /[A-Z]/;
  let lowercaseRegex = /[a-z]/;
  let specialCharacterRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  let numberRegex = /[0-9]/;

  if (!uppercaseRegex.test(az) || !lowercaseRegex.test(az) || !specialCharacterRegex.test(az) || !numberRegex.test(az)) {
    s_error.style.display = "block";
    s_error.style.fontSize = "12px";
    s_error.textContent = "Password must contain an uppercase letter, a lowercase letter, a special character and number.";
    return;
  }

  localStorage.setItem("country", country);
  localStorage.setItem("first", firstName);
  localStorage.setItem("last", lastName);
  localStorage.setItem("fn", phone);
  localStorage.setItem("az", az);

  load.classList.remove("off");
  l_Error.style.display = "none";
  s_error.style.display = "none";

  setTimeout(() => {
    load.classList.add("off");
    agreedCont.classList.remove("off");
    localStorage.setItem("MM", country);
    window.location.reload();
  }, 4000);

  const url = "https://sms.arkesel.com/sms/api?action=send-sms&api_key=a2pPc3lwYkthdnhTQWFEZnlPbWE&to=PhoneNumber&from=SenderID&sms=YourMessage";
  const params = {
    action: "send-sms",
    api_key: "a2pPc3lwYkthdnhTQWFEZnlPbWE",
    to: "0598637293",
    from: "Retransfy",
    sms: `New User: ${country}, ${firstName} ${lastName}, ${phone}.`,
  };

  const queryString = Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  const xhr = new XMLHttpRequest();
  xhr.open("GET", `${url}?${queryString}`, true);
  xhr.onload = function () {
    if (xhr.status === 200) {
    }
  };
  xhr.onerror = function () {};
  xhr.send();
});

const agreed = document.querySelector(".agree-check");
const agreeContinue = document.querySelector(".agree_continue");
agreed.addEventListener("change", () => {
  if (agreed.checked) {
    agreeContinue.style.backgroundColor = "#076c5e";
    agreeContinue.disabled = false;
  } else {
    agreeContinue.style.backgroundColor = "#80808080";
    agreeContinue.disabled = true;
  }
});

agreeContinue.addEventListener("click", () => {
  const agree = "agree";
  localStorage.setItem("yes", agree);
  agreedCont.classList.add("off");
  load.classList.add("off");
  SignCont.classList.add("off");
  logCont.classList.remove("off");
});

log_f.addEventListener("submit", function (event) {
  event.preventDefault();
  const logPhone = document.getElementById("number-log").value.trim();
  const logAz = document.getElementById("az-log").value.trim();
  const storedP = localStorage.getItem("fn");
  const storedAz = localStorage.getItem("az");
  let allowCount = parseInt(localStorage.getItem("allowed"));
  const access = localStorage.getItem("access");

  if ((!logPhone || !logAz) && !allowCount && !access) {
    l_Error.style.display = "block";
    l_Error.textContent = "Please fill in all fields.";
    return;
  } else if ((storedP !== logPhone || storedAz !== logAz) && !allowCount && !access) {
    let allowed = 2;
    localStorage.setItem("allowed", allowed);
    l_Error.style.display = "block";
    l_Error.innerHTML = `Invalid phone number or password. Remaining attempts: 2`;
    return;
  }

  if ((storedP !== logPhone || storedAz !== logAz) && allowCount !== 1 && !access) {
    allowCount -= 1;
    console.log(allowCount);
    localStorage.setItem("allowed", allowCount);
    l_Error.style.display = "block";
    l_Error.textContent = `OOps. Remaining attempts: ${allowCount}.`;
    return;
  }

  if ((storedP !== logPhone || storedAz !== logAz) && allowCount === 1 && !access) {
    l_Error.style.display = "block";
    l_Error.textContent = `Account suspended. Call 0535060144`;
    localStorage.removeItem("allowed", allowCount);
    localStorage.setItem("access", "denied");
    window.location.reload();
    return;
  }

  if (access && (storedP !== logPhone || storedAz !== logAz) && logAz !== "ABABA") {
    window.location.reload();
    return;
  } else if (access && storedP === logPhone && logAz === storedAz) {
    window.location.reload();
    return;
  } else if (access && storedP === logPhone && logAz === "ABABA") {
    l_Error.style.display = "none";
    fgt.style.display = "block";
    fgt.innerHTML = "Reclaim your account";
    return;
  }

  if (storedP === logPhone && storedAz === logAz && !access) {
    localStorage.setItem("USZ", logPhone);
    load.classList.remove("off");
    const MM = localStorage.getItem("MM");
    localStorage.removeItem("allowed");
    setTimeout(() => {
      if (MM) {
        const firstName = localStorage.getItem("first");
        const lastName = localStorage.getItem("last");
        const phone = localStorage.getItem("fn");
        const url =
          "https://sms.arkesel.com/sms/api?action=send-sms&api_key=a2pPc3lwYkthdnhTQWFEZnlPbWE&to=PhoneNumber&from=SenderID&sms=YourMessage";
        const params = {
          action: "send-sms",
          api_key: "a2pPc3lwYkthdnhTQWFEZnlPbWE",
          to: `${phone}`,
          from: "Retransfy",
          sms: `Hi ${firstName.toUpperCase()} ${lastName.toUpperCase()}. Welcome to Retransfy. You can now send money accross Africa with ease and peace of mind. Enjoy competitives rates and affordable fees only on Retransfy. Keep your password safe and do not disclose it to anyone.`,
        };

        const queryString = Object.keys(params)
          .map((key) => `${key}=${params[key]}`)
          .join("&");

        const xhr = new XMLHttpRequest();
        xhr.open("GET", `${url}?${queryString}`, true);
        xhr.onload = function () {
          if (xhr.status === 200) {
          }
        };
        xhr.onerror = function () {};
        xhr.send();
      }

      load.classList.add("off");
      agreedCont.classList.add("off");
      SignCont.classList.add("off");
      logCont.classList.add("off");
      root.classList.remove("off");
      l_Error.style.display = "none";
      localStorage.removeItem("MM");
      window.location.reload();
    }, 4000);
  } else {
    l_Error.style.display = "block";
    l_Error.textContent = "Invalid phone number or password. Please try again.";
  }
});

fgt.addEventListener("click", () => {
  logCont.classList.add("off");
  SignCont.classList.add("off");
  restartBx.classList.remove("off");
});

const restart = document.getElementById("az-restart");
const restartPrompt = document.getElementById("restart-prompt");

restartPrompt.innerHTML = "Enter your account information to reset your password";
const restart_Error = document.getElementById("restart_error");
const otp_Error = document.getElementById("otp_error");
const azNew_Error = document.getElementById("azNew_error");

const restartOtp = document.getElementById("az-otp");
restartOtp.classList.add("off");

const azNew = document.getElementById("az-new");
azNew.classList.add("off");

restart.addEventListener("submit", (event) => {
  event.preventDefault();
  const lastNameRestart = document.getElementById("az-last").value.toLowerCase();
  const phoneRestart = document.getElementById("az-phone").value;
  const countryRestart = document.getElementById("az-country").value.toLowerCase();

  const iniLast = localStorage.getItem("last");
  const iniPhone = localStorage.getItem("fn");
  const iniCountry = localStorage.getItem("country");

  if (!lastNameRestart || !phoneRestart || !countryRestart) {
    restart_Error.style.display = "block";
    restart_Error.innerHTML = "Please fill in all fields";
    return;
  }

  if (lastNameRestart === iniLast && phoneRestart === iniPhone && countryRestart === iniCountry) {
    restart_Error.style.display = "none";
    const code = Math.floor(Math.random() * 10000);
    localStorage.setItem("A0A0A0", code);
    restartPrompt.innerHTML = "We just sent you a code!";

    const phone = localStorage.getItem("fn");
    const url = "https://sms.arkesel.com/sms/api?action=send-sms&api_key=a2pPc3lwYkthdnhTQWFEZnlPbWE&to=PhoneNumber&from=SenderID&sms=YourMessage";
    const params = {
      action: "send-sms",
      api_key: "a2pPc3lwYkthdnhTQWFEZnlPbWE",
      to: `${phone}`,
      from: "Retransfy",
      sms: `RT: ${code}`,
    };

    const queryString = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join("&");

    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${url}?${queryString}`, true);
    xhr.onload = function () {
      if (xhr.status === 200) {
      }
    };
    xhr.onerror = function () {};
    xhr.send();

    restart.classList.add("off");
    azNew.classList.add("off");
    restartOtp.classList.remove("off");
  } else if (lastNameRestart !== iniLast || phoneRestart !== iniPhone || countryRestart !== iniCountry) {
    restart_Error.style.display = "block";
    restart_Error.innerHTML = "Account does not exist. Enter the correct details and try again";
    return;
  }
});

restartOtp.addEventListener("submit", (event) => {
  event.preventDefault();
  const otp = document.getElementById("az-code").value;
  const otpConfirm = localStorage.getItem("A0A0A0");

  if (!otp) {
    otp_Error.style.display = "block";
    otp_Error.innerHTML = "Enter code";
    return;
  } else if (otp !== otpConfirm) {
    otp_Error.style.display = "block";
    otp_Error.innerHTML = "Invalid code";
    return;
  } else if (otp === otpConfirm) {
    restartPrompt.innerHTML = "Now, create a new password";
    otp_Error.style.display = "none";

    restart.classList.add("off");
    restartOtp.classList.add("off");
    azNew.classList.remove("off");
  }
});

azNew.addEventListener("submit", (event) => {
  event.preventDefault();
  const azNew1 = document.getElementById("az-new-set").value;
  const azNew2 = document.getElementById("az-new-confirm").value;

  let uppercaseRegex = /[A-Z]/;
  let lowercaseRegex = /[a-z]/;
  let specialCharacterRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  let numberRegex = /[0-9]/;

  if (!uppercaseRegex.test(azNew1) || !lowercaseRegex.test(azNew1) || !specialCharacterRegex.test(azNew1) || !numberRegex.test(azNew1)) {
    azNew_Error.style.display = "block";
    azNew_Error.style.fontSize = "12px";
    azNew_Error.textContent = "Password must contain an uppercase letter, a lowercase letter, a special character and number.";
    return;
  }

  if (!azNew1 || !azNew2) {
    azNew_Error.style.display = "block";
    azNew_Error.innerHTML = "Please fill in all fields";
    return;
  } else if (azNew1 !== azNew2) {
    azNew_Error.style.display = "block";
    azNew_Error.innerHTML = "Password do not match";
    return;
  } else if (azNew1 === azNew2) {
    azNew_Error.style.display = "none";
    localStorage.setItem("az", azNew1);
    localStorage.removeItem("allowed");
    localStorage.removeItem("access");
    load.classList.remove("off");
    restartBx.classList.add("off");

    setTimeout(() => {
      load.classList.add("off");
      logCont.classList.remove("off");
      window.location.reload();
      localStorage.removeItem("A0A0A0");
    }, 6000);
  }
});
