export const ax = 25.5;
export const bx = ax - 1;

export function calcF(amt, cfs, cfr) {
  if (cfs === "GHANA" && cfr === "TOGO") {
    if (amt >= ax && amt <= 130.999) {
      return 5;
    } else if (amt >= 131 && amt <= 500.999) {
      return 10;
    } else if (amt >= 501 && amt <= 800.999) {
      return 15;
    } else if (amt >= 801 && amt <= 1200.999) {
      return 20;
    } else if (amt >= 1201 && amt <= 3000.999) {
      return 30;
    } else if (amt >= 3001 && amt <= 5000.999) {
      return 40;
    } else if (amt >= 5001 && amt <= 8000.999) {
      return 60;
    } else if (amt >= 8001 && amt <= 9000.999) {
      return 80;
    } else if (amt >= 9001 && amt <= 10000.999) {
      return 100;
    } else if (amt >= 10001 && amt <= 100000.999) {
      return Math.ceil(amt * 0.015);
    } else if (amt >= 100001 && amt <= 150000.999) {
      return 1800;
    } else if (amt >= 150001 && amt <= 200000.999) {
      return Math.ceil(amt * 0.01);
    } else if (amt >= 200001 && amt <= 500000.999) {
      return 2500;
    } else if (amt >= 500001 && amt <= 1000000.999) {
      return 4000;
    } else if (amt >= 1000001 && amt <= 100000000) {
      return Math.ceil(amt * 0.005);
    }
  } else if (cfs === "GHANA" && cfr !== "GHANA" && cfr !== "TOGO") {
    if (amt >= ax && amt <= 130.999) {
      return 10;
    } else if (amt >= 131 && amt <= 500.999) {
      return 15;
    } else if (amt >= 501 && amt <= 800.999) {
      return 20;
    } else if (amt >= 801 && amt <= 1200.999) {
      return 30;
    } else if (amt >= 1201 && amt <= 3000.999) {
      return 40;
    } else if (amt >= 3001 && amt <= 5000.999) {
      return 50;
    } else if (amt >= 5001 && amt <= 8000.999) {
      return 80;
    } else if (amt >= 8001 && amt <= 9000.999) {
      return 100;
    } else if (amt >= 9001 && amt <= 10000.999) {
      return 120;
    } else if (amt >= 10001 && amt <= 100000.999) {
      return Math.ceil(amt * 0.02);
    } else if (amt >= 100001 && amt <= 150000.999) {
      return 2000;
    } else if (amt >= 150001 && amt <= 200000.999) {
      return Math.ceil(amt * 0.015);
    } else if (amt >= 200001 && amt <= 500000.999) {
      return 3500;
    } else if (amt >= 500001 && amt <= 1000000.999) {
      return 5000;
    } else if (amt >= 1000001 && amt <= 100000000) {
      return Math.ceil(amt * 0.005);
    }
  } else if (cfs !== "GHANA" && cfr === "GHANA") {
    if (amt >= 1000 && amt <= 6000.999) {
      return 500;
    } else if (amt >= 6001 && amt <= 20000.999) {
      return 1000;
    } else if (amt >= 20001 && amt <= 40000.999) {
      return 2000;
    } else if (amt >= 40001 && amt <= 60000.999) {
      return 3000;
    } else if (amt >= 60001 && amt <= 100000.999) {
      return 4000;
    } else if (amt >= 100001 && amt <= 300000.999) {
      return 5000;
    } else if (amt >= 300001 && amt <= 400000.999) {
      return 7000;
    } else if (amt >= 400001 && amt <= 500000.999) {
      return 8000;
    } else if (amt >= 500001 && amt <= 1000000.999) {
      return 12000;
    } else if (amt >= 1000001 && amt <= 2000000.999) {
      return Math.ceil(amt * 0.015);
    } else if (amt >= 2000001 && amt <= 3000000.999) {
      return 30000;
    } else if (amt >= 3000001 && amt <= 10000000.999) {
      return Math.ceil(amt * 0.01);
    } else if (amt >= 10000001 && amt <= 30000000.999) {
      return 150000;
    } else if (amt >= 3000001 && amt <= 500000000) {
      return Math.ceil(amt * 0.005);
    }
  }
}

export function calcW(amr, cs, cr) {
  if (cs === "GHANA" && cr === "TOGO") {
    if (amr >= 1000 && amr <= 5000) {
      return 150;
    } else if (amr >= 5001 && amr <= 13000) {
      return 400;
    } else if (amr >= 13001 && amr <= 15000) {
      return 450;
    } else if (amr >= 15001 && amr <= 16600) {
      return 500;
    } else if (amr >= 16601 && amr <= 20000) {
      return 600;
    } else if (amr >= 20001 && amr <= 47000) {
      return 850;
    } else if (amr >= 47001 && amr <= 50000) {
      return 900;
    } else if (amr >= 50001 && amr <= 94000) {
      return 1700;
    } else if (amr >= 94001 && amr <= 100000) {
      return 1800;
    } else if (amr >= 100001 && amr <= 188000) {
      return 3400;
    } else if (amr >= 188001 && amr <= 200000) {
      return 3600;
    } else if (amr >= 200001 && amr <= 283000) {
      return 4000;
    } else if (amr >= 283001 && amr <= 479000) {
      return 4500;
    } else if (amr >= 479001 && amr <= 500000) {
      return 4700;
    } else if (amr > 500000) {
      return 0;
    }
  } else if (cs === "GHANA" && cr === "BENIN") {
    if (amr >= 1000 && amr <= 5000) {
      return 100;
    } else if (amr >= 5001 && amr <= 10000) {
      return 200;
    } else if (amr >= 10001 && amr <= 20000) {
      return 350;
    } else if (amr >= 20001 && amr <= 50000) {
      return 700;
    } else if (amr >= 50001 && amr <= 100000) {
      return 1000;
    } else if (amr >= 100001 && amr <= 200000) {
      return 2000;
    } else if (amr >= 200001 && amr <= 300000) {
      return 3000;
    } else if (amr >= 300001 && amr <= 500000) {
      return 3500;
    } else if (amr > 500000) {
      return 0;
    }
  } else if (cs === "GHANA" && cr !== "TOGO" && cr !== "BENIN") {
    if (amr > 1000) {
      return Math.ceil(amr / 100);
    }
  } else if (cs !== "GHANA" && cr === "GHANA" && amr) {
    if (amr >= 1 && amr <= 50) {
      return 0.5;
    } else if (amr >= 50.5 && amr <= 2000) {
      return Math.ceil(amr / 100);
    } else if (amr > 2001) {
      return 20;
    }
  }
}

export function decP(n) {
  if (n % 1 === 0) {
    return n;
  } else if (n % 1 <= 0.1) {
    return Math.floor(n) + 0.1;
  } else if (n % 1 > 0.1 && n % 1 <= 0.2) {
    return Math.floor(n) + 0.2;
  } else if (n % 1 > 0.2 && n % 1 <= 0.3) {
    return Math.floor(n) + 0.3;
  } else if (n % 1 > 0.3 && n % 1 <= 0.4) {
    return Math.floor(n) + 0.4;
  } else if (n % 1 > 0.4 && n % 1 <= 0.5) {
    return Math.floor(n) + 0.5;
  } else if (n % 1 > 0.5 && n % 1 <= 0.6) {
    return Math.floor(n) + 0.6;
  } else if (n % 1 > 0.6 && n % 1 <= 0.7) {
    return Math.floor(n) + 0.7;
  } else if (n % 1 > 0.7 && n % 1 <= 0.8) {
    return Math.floor(n) + 0.8;
  } else if (n % 1 > 0.8 && n % 1 <= 0.9) {
    return Math.floor(n) + 0.9;
  } else if (n % 1 > 0.9) {
    return Math.ceil(n);
  } else {
    return Math.ceil(n);
  }
}

export function decD(n) {
  if (n % 1 === 0) {
    return n;
  } else if (n % 1 <= 0.1) {
    return Math.floor(n);
  } else if (n % 1 > 0.1 && n % 1 <= 0.2) {
    return Math.floor(n) + 0.1;
  } else if (n % 1 > 0.2 && n % 1 <= 0.3) {
    return Math.floor(n) + 0.2;
  } else if (n % 1 > 0.3 && n % 1 <= 0.4) {
    return Math.floor(n) + 0.3;
  } else if (n % 1 > 0.4 && n % 1 <= 0.5) {
    return Math.floor(n) + 0.4;
  } else if (n % 1 > 0.5 && n % 1 <= 0.6) {
    return Math.floor(n) + 0.5;
  } else if (n % 1 > 0.6 && n % 1 <= 0.7) {
    return Math.floor(n) + 0.6;
  } else if (n % 1 > 0.7 && n % 1 <= 0.8) {
    return Math.floor(n) + 0.7;
  } else if (n % 1 > 0.8 && n % 1 <= 0.9) {
    return Math.floor(n) + 0.8;
  } else if (n % 1 > 0.9) {
    return Math.floor(n) + 0.9;
  }
}

export function isTwoDec(num) {
  let numStr = num.toString();
  let parts = numStr.split(".");

  if (parts.length < 2) {
    return true;
  }

  let decPart = parts[1];

  if (decPart.length <= 2) {
    return true;
  } else {
    return false;
  }
}

export function sntzNum(fn) {
  fn = fn.replace(/\s/g, "");
  fn = fn.replace(/\+228|\+229|\+225|\+226|\+221|\+223|00228|00229|00225|00226|00221|00223/g, "");
  fn = fn.replace(/\+233|00233/g, "0");
  fn = fn.replace(/[-_=/.:;'")(+*~,|]/g, "");

  const invalidPrefixes = ["228", "229", "225", "226", "221", "223"];

  if (fn.length > 10) {
    for (let prefix of invalidPrefixes) {
      if (fn.startsWith(prefix)) {
        fn = fn.replace(prefix, "");
        break;
      }
    }

    if (fn.startsWith("233")) {
      fn = fn.replace("233", "0");
    }
  }

  return fn;
}

export const rtMngs = ["a1b2-c3d4-e5f6-7890-1234", "3f9d-1234-abcd-5678-90ef", "7890-abcd-1234-ef56-789a"];

export function escond(esc) {
  esc.forEach((e) => {
    e.style.display = "none";
  });
}

export function cache(ca) {
  ca.style.display = "none";
}

export function verstecken(ver) {
  ver.style.display = "none";
}

export function mostrar(i) {
  i.style.display = "flex";
}

export function zeigen(i, d) {
  i.style.display = d;
}

``;
export function vldtNum(ctr, sr, ap, pr, vp) {
  if (ctr === "GHANA") {
    pr = sr.slice(0, 3);
    vp = ["024", "025", "053", "054", "055", "059", "027", "057", "026", "056", "020", "050"];
    if (vp.includes(pr) && sr.length === 10) {
      return (ap = true);
    }
  } else if (ctr === "TOGO") {
    pr = sr.slice(0, 2);
    vp = ["99", "98", "97", "96", "79", "78", "93", "92", "91", "90", "72", "71", "70"];

    if (vp.includes(pr) && sr.length === 8) {
      return (ap = true);
    }
  } else if (ctr === "BENIN") {
    pr = sr.slice(0, 2);
    vp = ["52", "54", "55", "60", "61", "62", "64", "65", "66", "67", "68", "69", "90", "91", "94", "95", "96", "97", "98", "99"];

    if (vp.includes(pr) && sr.length === 8) {
      return (ap = true);
    }
  } else if (ctr === "IVORY COAST") {
    pr = sr.slice(0, 2);
    vp = ["05", "07", "01"];

    if (vp.includes(pr) && sr.length === 10) {
      return (ap = true);
    }
  } else if (ctr === "BURKINA FASO") {
    pr = sr.slice(0, 2);
    vp = ["05", "06", "07", "54", "55", "56", "57", "64", "65", "66", "77", "01", "02", "03", "51", "52", "53", "60", "61", "62", "63"];

    if (vp.includes(pr) && sr.length === 8) {
      return (ap = true);
    }
  } else if (ctr === "SENEGAL") {
    // pr = sr.slice(0, 2);
    // vp = ["05", "06", "07", "54", "55", "56", "57", "64", "65", "66", "77", "01", "02", "03", "51", "52", "53", "60", "61", "62", "63"];

    // if (vp.includes(pr) && sr.length === 8) {
    return (ap = true);
    // }
  } else if (ctr === "MALI") {
    // pr = sr.slice(0, 2);
    // vp = ["05", "06", "07", "54", "55", "56", "57", "64", "65", "66", "77", "01", "02", "03", "51", "52", "53", "60", "61", "62", "63"];

    // if (vp.includes(pr) && sr.length === 8) {
    return (ap = true);
    // }
  }
}
