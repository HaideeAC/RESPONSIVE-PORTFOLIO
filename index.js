// DOM Elements
const loader = document.querySelector(".loader");
const navbar = document.querySelector(".navbar");
const textContainers = [
  document.getElementById("circular-text1"),
  document.getElementById("circular-text2"),
  document.getElementById("circular-text3"),
];

// Page loading animation
window.addEventListener("load", function () {
  if (loader) {
    loader.classList.add("hidden");
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }
});

// Navbar scroll effect
window.addEventListener("scroll", function () {
  if (navbar) {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  }
});

// Animate elements when they come into view
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

// Setup animation targets and scroll listener
document.addEventListener("DOMContentLoaded", function () {
  // Add animation classes to elements
  const elementsToAnimate = [
    ".featured-card",
    ".skill-item",
    ".section-title",
    ".cta-content",
  ];

  elementsToAnimate.forEach((selector) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      element.classList.add("animate-on-scroll");
      element.style.transitionDelay = `${index * 0.1}s`;
    });
  });

  // Circulating text setup (only if present)
  if (textContainers[0]) {
    initCircularText();
  }
  
  // Project filters setup (only if present)
  if (document.querySelector('.filter-btn')) {
    initProjectFilters();
  }
  
  // Initial animation check
  animateOnScroll();
  
  // Listen for scroll events
  window.addEventListener("scroll", animateOnScroll);
  
  // Smooth scroll for anchor links
  initSmoothScroll();
});

// Initialize circular text animation
function initCircularText() {
  const words = ["• HAIDEE ALVAREZ ", "• DEVELOPER ", "• BASED IN LONDON "];
  const radius = 110;
  let rotationPaused = false;
  let currentRotation = 0;
  let animationFrame;

  function createCircularText() {
    let fullText = words.join(""); // Combine all words
    let totalChars = fullText.length;
    let angleOffset = 360 / totalChars;
    let angle = -90;
    let charIndex = 0;

    textContainers.forEach((container, index) => {
      if (!container) return;

      for (let i = 0; i < words[index].length; i++) {
        let span = document.createElement("span");
        span.innerText = fullText[charIndex];
        let radian = angle * (Math.PI / 180);
        let x = radius * Math.cos(radian);
        let y = radius * Math.sin(radian);
        span.style.transform = `translate(${x}px, ${y}px) rotate(${angle + 90}deg)`;
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

  // Initialize circular text
  createCircularText();
  rotateText();

  // Add hover pause functionality
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

// Initialize smooth scrolling for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Initialize project filtering
function initProjectFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectItems = document.querySelectorAll(".project-item");

  // Filter projects
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.getAttribute("data-filter");

      projectItems.forEach((item) => {
        if (filter === "all") {
          item.style.display = "block";
        } else {
          const categories = item.getAttribute("data-category").split(" ");
          item.style.display = categories.includes(filter) ? "block" : "none";
        }
      });

      // Trigger layout recalculation
      if (window.ResizeObserver) {
        requestAnimationFrame(() => {
          window.dispatchEvent(new Event("resize"));
        });
      } else {
        setTimeout(() => {
          window.dispatchEvent(new Event("resize"));
        }, 200);
      }
    });
  });

  // Handle responsive layout
  function arrangeItems() {
    const visibleItems = Array.from(projectItems).filter(
      (item) => item.style.display !== "none"
    );

    // Responsive layout with cleaner breakpoints
    if (window.innerWidth <= 767) {
      // Mobile: stack vertically
      visibleItems.forEach((item) => {
        item.style.width = "100%";
      });
    } else if (window.innerWidth <= 991) {
      // Tablet: 2 columns
      visibleItems.forEach((item) => {
        item.style.width = "calc(50% - 10px)";
      });
    } else {
      // Desktop: dynamic grid
      visibleItems.forEach((item, index) => {
        const itemCount = visibleItems.length;
        if (itemCount <= 3) {
          item.style.width = "calc(33.333% - 10px)";
        } else if (itemCount === 4) {
          item.style.width = "calc(50% - 10px)";
        } else {
          const isFirstOrLast = index === 0 || index === itemCount - 1;
          item.style.width = isFirstOrLast
            ? "calc(50% - 10px)"
            : "calc(33.333% - 10px)";
        }
      });
    }
  }

  // Initial arrangement and resize handler with debounce
  arrangeItems();

  // Debounce resize handler for better performance
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(arrangeItems, 100);
  });
}

