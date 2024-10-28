// formatDate function will return dd-mm-yyyy for UI Indonesia
export const formatDate = (date) => {
  let tempDate = new Date(date);
  return `${tempDate.getDate().toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })}-${(tempDate.getMonth() + 1).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })}-${tempDate.getFullYear()}`;
};

export const formatTime = (datetime) => {
  let hours = String(datetime.getHours()).padStart(2, "0");
  let minutes = String(datetime.getMinutes()).padStart(2, "0");
  let seconds = String(datetime.getSeconds()).padStart(2, "0");

  let time = hours + ":" + minutes + ":" + seconds;

  return time;
};

export const findMonth = (monthNumber) => {
  if (monthNumber == 1) {
    return "Januari";
  } else if (monthNumber == 2) {
    return "Februari";
  } else if (monthNumber == 3) {
    return "Maret";
  } else if (monthNumber == 4) {
    return "April";
  } else if (monthNumber == 5) {
    return "Mei";
  } else if (monthNumber == 6) {
    return "Juni";
  } else if (monthNumber == 7) {
    return "Juli";
  } else if (monthNumber == 8) {
    return "Agustus";
  } else if (monthNumber == 9) {
    return "September";
  } else if (monthNumber == 10) {
    return "Oktober";
  } else if (monthNumber == 11) {
    return "November";
  } else if (monthNumber == 12) {
    return "Desember";
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

export const dasarPemotonganDokumenOptions = function () {
  let namaDokumenOptions = [
    {
      label: "Faktur Pajak",
    },
    {
      label: "Invoice",
    },
    {
      label: "Pengumuman",
    },
    {
      label: "Surat Perjanjian",
    },
    {
      label: "Bukti Pembayaran",
    },
    {
      label: "Akta Perikatan",
    },
    {
      label: "Akta RUPS",
    },
    {
      label: "Surat Pernyataan",
    },
  ];

  return namaDokumenOptions;
};

// Arrays of common Indonesian first names and last names
const firstNames = [
  "AGUS",
  "PUTRI",
  "RIZKY",
  "DEWI",
  "BUDI",
  "SITI",
  "AHMAD",
  "NUR",
  "SRI",
  "EKA",
  "HENDRA",
  "FIRMAN",
  "WATI",
  "JOKO",
  "ANDRI",
  "TIARA",
  "YUDI",
  "LINA",
  "IRFAN",
  "WIDYA",
];
const lastNames = [
  "SANTOSO",
  "SAPUTRA",
  "WIJAYA",
  "RAHMAN",
  "PRATAMA",
  "HARYANTO",
  "SUKARNO",
  "IRAWAN",
  "SUSANTI",
  "LESTARI",
  "CAHYONO",
  "PURNOMO",
  "SUHARTO",
  "HIDAYAT",
  "SETIAWAN",
  "KUSUMA",
  "FIRMANSYAH",
  "MULYANI",
  "ANGGRAINI",
  "BASTIAN",
];

// Function to generate a random name
export const getRandomIndonesianName = function () {
  const randomFirstName =
    firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomLastName =
    lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${randomFirstName} ${randomLastName}`;
};

// Arrays of common Indonesian street names (all uppercase)
const streetNames = [
  "JALAN SUDIRMAN",
  "JALAN THAMRIN",
  "JALAN MANGGA BESAR",
  "JALAN GAJAH MADA",
  "JALAN MH THAMRIN",
  "JALAN MEDAN MERDEKA",
  "JALAN DIPONEGORO",
  "JALAN AHMAD YANI",
  "JALAN PAHLAWAN",
  "JALAN PEMUDA",
  "JALAN MERDEKA",
  "JALAN KENANGA",
  "JALAN MELATI",
  "JALAN MAWAR",
  "JALAN KUSUMA BANGSA",
  "JALAN JENDERAL SOEDIRMAN",
  "JALAN LETJEN S. PARMAN",
  "JALAN LETJEN SUPRAPTO",
  "JALAN SUTOMO",
  "JALAN SISINGAMANGARAJA",
];

// Function to generate a random street name
export const getRandomIndonesianStreetName = function () {
  const randomStreet =
    streetNames[Math.floor(Math.random() * streetNames.length)];
  return randomStreet;
};

let masaPajakList = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export const getMonthIndex = function (month) {
  let index = masaPajakList.indexOf(month);
  if (index !== -1) {
    // Add 1 to the index and pad the result to 2 digits
    return String(index + 1).padStart(2, "0");
  } else {
    return "Month not found";
  }
};

export const getLastDateOfMonth = function (year, month) {
  return new Date(year, month, 0);
};
