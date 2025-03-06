// Page loading animation
window.addEventListener("load", function () {
  const loader = document.querySelector(".loader");
  if (loader) {
    // Add the hidden class first
    loader.classList.add("hidden");

    // Then remove the loader from DOM after animation completes
    setTimeout(() => {
      loader.style.display = "none";
    }, 500); // Match this to your CSS fadeOut animation duration
  }
});

// Navbar scroll effect
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Circulating text
const textContainers = [
  document.getElementById("circular-text1"),
  document.getElementById("circular-text2"),
  document.getElementById("circular-text3"),
];

if (textContainers[0]) {
  // Check if circular text containers exist
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
      if (!container) return; // Skip if container doesn't exist

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
        if (container) {
          container.style.transform = `translate(-50%, -50%) rotate(${currentRotation}deg)`;
        }
      });
    }
    animationFrame = requestAnimationFrame(rotateText);
  }

  createCircularText();
  rotateText();

  textContainers.forEach((container) => {
    if (container) {
      container.addEventListener("mouseenter", () => {
        rotationPaused = true;
        cancelAnimationFrame(animationFrame);
      });

      container.addEventListener("mouseleave", () => {
        rotationPaused = false;
        rotateText();
      });
    }
  });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Animation for elements when they come into view
const animateOnScroll = () => {
  const elements = document.querySelectorAll(".animate-on-scroll");

  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (elementPosition < screenPosition) {
      element.classList.add("animated");
    }
  });
};

// Add animate-on-scroll class to elements we want to animate
document.addEventListener("DOMContentLoaded", function () {
  const elementsToAnimate = [
    ".featured-card",
    ".skill-item",
    ".section-title",
    ".cta-content",
  ];

  elementsToAnimate.forEach((selector) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      element.classList.add("animate-on-scroll");
      // Add delay for staggered animation
      element.style.transitionDelay = `${index * 0.1}s`;
    });
  });

  // Initial check for elements in view
  animateOnScroll();

  // Listen for scroll events
  window.addEventListener("scroll", animateOnScroll);
});

// Projects Carousel (if exists on the page)
const initProjectsCarousel = () => {
  let nextDom = document.getElementById("next");
  let prevDom = document.getElementById("prev");
  let carouselDom = document.querySelector(".carousel");

  if (!carouselDom) return; // Exit if carousel doesn't exist on this page

  let SliderDom = carouselDom.querySelector(".carousel .list");
  let thumbnailBorderDom = document.querySelector(".carousel .thumbnail");
  let thumbnailItemsDom = thumbnailBorderDom?.querySelectorAll(".item");

  if (!SliderDom || !thumbnailBorderDom || !thumbnailItemsDom) return;

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
    if (nextDom) nextDom.click();
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
      thumbnailBorderDom.prepend(
        thumbnailItemsDom[thumbnailItemsDom.length - 1]
      );
      carouselDom.classList.add("prev");
    }

    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
      carouselDom.classList.remove("next");
      carouselDom.classList.remove("prev");
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
      if (nextDom) nextDom.click();
    }, timeAutoNext);
  }
};

// Initialize the projects carousel if it exists
document.addEventListener("DOMContentLoaded", initProjectsCarousel);
// Project filtering functionality
      document.addEventListener('DOMContentLoaded', function() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectItems = document.querySelectorAll('.project-item');
        
        // Filter projects
        filterButtons.forEach(button => {
          button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            projectItems.forEach(item => {
              if (filter === 'all') {
                item.style.display = 'block';
              } else {
                const categories = item.getAttribute('data-category').split(' ');
                if (categories.includes(filter)) {
                  item.style.display = 'block';
                } else {
                  item.style.display = 'none';
                }
              }
            });
            
            // Trigger layout recalculation
            setTimeout(() => {
              window.dispatchEvent(new Event('resize'));
            }, 200);
          });
        });
        
        // Initialize Isotope-like layout (simplified version)
        function arrangeItems() {
          const visibleItems = Array.from(projectItems).filter(item => 
            item.style.display !== 'none'
          );
          
          if (window.innerWidth <= 767) {
            // Mobile: stack vertically
            visibleItems.forEach(item => {
              item.style.width = '100%';
            });
          } else if (window.innerWidth <= 991) {
            // Tablet: 2 columns
            visibleItems.forEach((item, index) => {
              item.style.width = 'calc(50% - 10px)';
            });
          } else {
            // Desktop: dynamic grid
            visibleItems.forEach((item, index) => {
              if (visibleItems.length <= 3) {
                item.style.width = 'calc(33.333% - 10px)';
              } else if (visibleItems.length === 4) {
                item.style.width = 'calc(50% - 10px)';
              } else {
                const isFirstOrLast = index === 0 || index === visibleItems.length - 1;
                item.style.width = isFirstOrLast ? 'calc(50% - 10px)' : 'calc(33.333% - 10px)';
              }
            });
          }
        }
        
        // Initial arrangement
        arrangeItems();
        
        // Rearrange on window resize
        window.addEventListener('resize', arrangeItems);
      });