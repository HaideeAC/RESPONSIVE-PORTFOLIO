// Page loading
window.addEventListener("load", function () {
  const loader = document.querySelector(".loader");
  loader.className += " hidden"; // add hidden as a class
});

// Circulating text
const textContainer = document.getElementById("circular-text");
const textMap = [
  { text: "• HAIDEE ALVAREZ ", className: "name-link" },
  { text: "• PROJECT ", className: "project-link" },
  { text: "• CONTACT ", className: "contact-link" },
];
const radius = 175;
let rotationPaused = false;
let currentRotation = 0;
let animationFrame;

function createCircularText(textMap) {
  let totalChars = textMap.reduce((sum, item) => sum + item.text.length, 0);
  let angleOffset = 360 / totalChars;
  let angle = -90;

  textMap.forEach(({ text, className }) => {
    for (let i = 0; i < text.length; i++) {
      let span = document.createElement("span");
      span.innerText = text[i];
      span.classList.add(className);
      let radian = angle * (Math.PI / 180);
      let x = radius * Math.cos(radian);
      let y = radius * Math.sin(radian);
      span.style.transform = `translate(${x}px, ${y}px) rotate(${
        angle + 90
      }deg)`;
      textContainer.appendChild(span);
      angle += angleOffset;
    }
  });
}

function rotateText() {
  if (!rotationPaused) {
    currentRotation = (currentRotation + 0.2) % 360;
    textContainer.style.transform = `translate(-50%, -50%) rotate(${currentRotation}deg)`;
  }
  animationFrame = requestAnimationFrame(rotateText);
}

createCircularText(textMap);
rotateText();

textContainer.addEventListener("mouseenter", () => {
  rotationPaused = true;
  cancelAnimationFrame(animationFrame);
});

textContainer.addEventListener("mouseleave", () => {
  rotationPaused = false;
  rotateText();
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
