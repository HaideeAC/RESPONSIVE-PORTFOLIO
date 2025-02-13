// Page loading
window.addEventListener("load", function () {
  const loader = document.querySelector(".loader");
  loader.className += " hidden"; // add hidden as a class
});

// Circulating text
const textContainers = [
  document.getElementById("circular-text1"),
  document.getElementById("circular-text2"),
  document.getElementById("circular-text3"),
];

const words = ["• HAIDEE ALVAREZ ", "• DEVELOPER ", "• BASED IN LONDON "];
const radius = 110;
let rotationPaused = false;
let currentRotation = 0;
let animationFrame;

function createCircularText() {
  let fullText = words.join(""); // Combine all words into one continuous string
  let totalChars = fullText.length;
  let angleOffset = 360 / totalChars; // Distribute characters evenly
  let angle = -90;
  let charIndex = 0;

  // Loop through each text container and distribute letters sequentially
  textContainers.forEach((container, index) => {
    for (let i = 0; i < words[index].length; i++) {
      let span = document.createElement("span");
      span.innerText = fullText[charIndex]; // Get letter from fullText sequence
      let radian = angle * (Math.PI / 180);
      let x = radius * Math.cos(radian);
      let y = radius * Math.sin(radian);
      span.style.transform = `translate(${x}px, ${y}px) rotate(${
        angle + 90
      }deg)`;
      container.appendChild(span);
      angle += angleOffset;
      charIndex++;
    }
  });
}

function rotateText() {
  if (!rotationPaused) {
    currentRotation = (currentRotation + 0.2) % 360;
    textContainers.forEach((container) => {
      container.style.transform = `translate(-50%, -50%) rotate(${currentRotation}deg)`;
    });
  }
  animationFrame = requestAnimationFrame(rotateText);
}

createCircularText();
rotateText();

textContainers.forEach((container) => {
  container.addEventListener("mouseenter", () => {
    rotationPaused = true;
    cancelAnimationFrame(animationFrame);
  });

  container.addEventListener("mouseleave", () => {
    rotationPaused = false;
    rotateText();
  });
});

// Projects Carousel
let nextDom = document.getElementById("next");
let prevDom = document.getElementById("prev");

let carouselDom = document.querySelector(".carousel");
let SliderDom = carouselDom.querySelector(".carousel .list");
let thumbnailBorderDom = document.querySelector(".carousel .thumbnail");
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll(".item");
let timeDom = document.querySelector(".carousel .time");

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000;
let timeAutoNext = 10000;

nextDom.onclick = function () {
  showSlider("next");
};

prevDom.onclick = function () {
  showSlider("prev");
};
let runTimeOut;
let runNextAuto = setTimeout(() => {
  next.click();
}, timeAutoNext);
function showSlider(type) {
  let SliderItemsDom = SliderDom.querySelectorAll(".carousel .list .item");
  let thumbnailItemsDom = document.querySelectorAll(
    ".carousel .thumbnail .item"
  );

  if (type === "next") {
    SliderDom.appendChild(SliderItemsDom[0]);
    thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
    carouselDom.classList.add("next");
  } else {
    SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
    thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
    carouselDom.classList.add("prev");
  }
  clearTimeout(runTimeOut);
  runTimeOut = setTimeout(() => {
    carouselDom.classList.remove("next");
    carouselDom.classList.remove("prev");
  }, timeRunning);

  clearTimeout(runNextAuto);
  runNextAuto = setTimeout(() => {
    next.click();
  }, timeAutoNext);
}
