const peaks = {

  "PEAK_001": {

    name: "Ачык-Таш | Achik Tash",

    elevation: "4066 m",

    photo: "images/achik-tash.jpg",

    congratulationKy:
      "Сиз Ачык-Таш чокусуна жеттиңиз.",

    congratulationEn:
      "You have reached Achik Tash Peak.",

    historyKy:
      "Пик Ачык-Таш (4066 м) — малоизвестная и сложная для восхождения в категории 1б. Название переводится как «открытый камень», что отражает её скальный характер и обнаженные гребни, привлекающие любителей гор.",

    historyEn:
      "Achik Tash Peak (4066 m) is a little-known and challenging peak, classified as 1Б in climbing difficulty. Its name translates as “open stone,” reflecting its rocky character and exposed ridges that attract mountain enthusiasts."

  }

};


const home = document.getElementById("home");

const scanner = document.getElementById("scanner");

const peakPage = document.getElementById("peak");

const scanButton = document.getElementById("scanButton");

const backButton = document.getElementById("backButton");

const video = document.getElementById("camera");

const scanStatus = document.getElementById("scanStatus");


scanButton.addEventListener("click", startScanner);


backButton.addEventListener("click", () => {

  stopScanner();

  scanner.classList.add("hidden");

  peakPage.classList.add("hidden");

  home.classList.remove("hidden");

});


let stream = null;


async function startScanner() {

  home.classList.add("hidden");

  peakPage.classList.add("hidden");

  scanner.classList.remove("hidden");

  scanStatus.textContent = "Opening camera...";


  try {

    stream = await navigator.mediaDevices.getUserMedia({

      video: {
        facingMode: "environment"
      }

    });

    video.srcObject = stream;

    scanStatus.textContent =
      "Point the camera at the QR code.";

  } catch (error) {

    scanStatus.textContent =
      "Camera access was not allowed.";

  }

}


function stopScanner() {

  if (stream) {

    stream.getTracks().forEach(track => {
      track.stop();
    });

    stream = null;
  }

}


function showPeak(id) {

  const peak = peaks[id];

  if (!peak) {

    scanStatus.textContent =
      "Peak not found.";

    return;

  }


  stopScanner();

  scanner.classList.add("hidden");

  peakPage.classList.remove("hidden");


  document.getElementById("peakPhoto").src =
    peak.photo;

  document.getElementById("peakName").textContent =
    peak.name;

  document.getElementById("elevation").textContent =
    peak.elevation;

  document.getElementById("congratulation").textContent =
    peak.congratulationKy;

  document.getElementById("historyKy").textContent =
    peak.historyKy;

  document.getElementById("historyEn").textContent =
    peak.historyEn;

}


/*
  TEST MODE

  Пока настоящий QR scanner не подключён,
  мы можем проверить саму систему:

  PEAK_001 → Ачык-Таш
*/

window.testPeak = function () {

  showPeak("PEAK_001");

};


/*
  Register offline service worker
*/

if ("serviceWorker" in navigator) {

  window.addEventListener("load", () => {

    navigator.serviceWorker.register(
      "service-worker.js"
    );

  });

}
