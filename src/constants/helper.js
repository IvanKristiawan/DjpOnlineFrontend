// formatDate function will return dd-mm-yyyy for UI Indonesia
export const formatDate = (date) => {
  let tempDate = new Date(date);
  return `${tempDate.getDate().toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })}/${(tempDate.getMonth() + 1).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })}/${tempDate.getFullYear()}`;
};

export const formatTime = (datetime) => {
  let hours = String(datetime.getHours()).padStart(2, "0");
  let minutes = String(datetime.getMinutes()).padStart(2, "0");
  let seconds = String(datetime.getSeconds()).padStart(2, "0");

  let time = hours + ":" + minutes + ":" + seconds;

  return time;
};

export const findMonth = (monthNumber) => {
  if (monthNumber === 1) {
    return "JANUARI";
  } else if (monthNumber === 2) {
    return "FEBRUARI";
  } else if (monthNumber === 3) {
    return "MARET";
  } else if (monthNumber === 4) {
    return "APRIL";
  } else if (monthNumber === 5) {
    return "MEI";
  } else if (monthNumber === 6) {
    return "JUNI";
  } else if (monthNumber === 7) {
    return "JULI";
  } else if (monthNumber === 8) {
    return "AGUSTUS";
  } else if (monthNumber === 9) {
    return "SEPTEMBER";
  } else if (monthNumber === 10) {
    return "OKTOBER";
  } else if (monthNumber === 11) {
    return "NOVEMBER";
  } else if (monthNumber === 12) {
    return "DESEMBER";
  }
};

function countDays(t) {
  var cd = 24 * 60 * 60 * 1000,
    ch = 60 * 60 * 1000,
    d = Math.floor(t / cd),
    h = Math.floor((t - d * cd) / ch),
    m = Math.round((t - d * cd - h * ch) / 60000),
    pad = function (n) {
      return n < 10 ? "0" + n : n;
    };
  if (m === 60) {
    h++;
    m = 0;
  }
  if (h === 24) {
    d++;
    h = 0;
  }
  return d;
}

export const findTotalDays = (perTanggal, tglJatuhTempo) => {
  let d1 = new Date(perTanggal); //"now"
  let d2 = new Date(tglJatuhTempo); // some date
  let diff = Math.abs(d1 - d2);
  if (d1 > d2) {
    return countDays(diff);
  } else if (d1 < d2) {
    return -countDays(diff);
  } else {
    return "0";
  }
};

export const lastday = function (year, month) {
  let date = new Date(year, month + 1, 0);
  return date.getDate();
};

// Define a JavaScript function called isLeapYear with parameter year
function isLeapYear(year) {
  // Return true if the given year is divisible by 400 or divisible by 4 but not divisible by 100
  return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
}

// Define a JavaScript function called days_of_a_year with parameter year
export const days_of_a_year = function (year) {
  // Return 366 if the given year is a leap year, otherwise return 365
  return isLeapYear(year) ? 366 : 365;
};

export const generateRandomString = function (length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // Uppercase letters and numbers
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length); // Pick a random index
    result += characters[randomIndex]; // Append the character at that index
  }

  return result;
};
