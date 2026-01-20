// script.js
document.addEventListener("DOMContentLoaded", function () {
  // --- Scroll animation ---
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1
  };

  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  const elementsToAnimate = document.querySelectorAll(".animate-on-scroll");
  elementsToAnimate.forEach(el => observer.observe(el));

  // --- Typing effect (faster) ---
  const taglineContainer = document.querySelector("h2.hero-tagline");
  const taglineCursorElement = document.querySelector(".tagline-cursor");
  const ignitionTypingElement = document.getElementById("ignition-typing-text");
  const ignitionCursorElement = document.querySelector(".ignition-cursor");
  const armTypingElement = document.getElementById("arm-typing-text");
  const armCursorElement = document.querySelector(".arm-cursor");

  const taglineLines = [
    "Autonomous systems change accountability.",
    "Not performance. Ownership.",
    "Over time — not at deployment."
  ];

  const ignitionText =
    "Graventure defines and diagnoses Autonomous Accountability Risk so organisations can evidence who authorised objectives and who owned system behaviour over time — in language that survives audit, litigation, and underwriting scrutiny.";

  const armText =
    "If you can't name the owner, you don't have governance. You have hope.";

  const typingSpeed = 18; // Faster (was 34)
  const lineDelay = 400;  // Slightly faster (was 520)
  const initialDelay = 300;

  let lineIndex = 0;
  let charIndex = 0;
  let currentLineElement = null;

  function typeTagline() {
    if (!taglineContainer || !taglineCursorElement) return;

    taglineContainer.appendChild(taglineCursorElement);

    if (lineIndex < taglineLines.length) {
      if (charIndex === 0) {
        currentLineElement = document.createElement("span");
        currentLineElement.classList.add("tagline-line");
        taglineContainer.insertBefore(currentLineElement, taglineCursorElement);
      }

      if (currentLineElement && charIndex < taglineLines[lineIndex].length) {
        currentLineElement.textContent += taglineLines[lineIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeTagline, typingSpeed);
      } else {
        lineIndex++;
        charIndex = 0;
        currentLineElement = null;
        setTimeout(typeTagline, lineDelay);
      }
    } else {
      taglineCursorElement.style.display = "none";
      if (ignitionCursorElement) ignitionCursorElement.style.display = "inline-block";
      setTimeout(typeIgnitionText, lineDelay / 2);
    }
  }

  let ignitionCharIndex = 0;
  function typeIgnitionText() {
    if (!ignitionTypingElement || !ignitionCursorElement) return;

    if (ignitionCharIndex < ignitionText.length) {
      ignitionTypingElement.textContent += ignitionText.charAt(ignitionCharIndex);
      ignitionCharIndex++;
      setTimeout(typeIgnitionText, typingSpeed);
    } else {
      ignitionCursorElement.style.display = "none";
      if (armCursorElement) armCursorElement.style.display = "inline-block";
      setTimeout(typeArmText, lineDelay / 2);
    }
  }

  let armCharIndex = 0;
  function typeArmText() {
    if (!armTypingElement || !armCursorElement) return;

    if (armCharIndex < armText.length) {
      armTypingElement.textContent += armText.charAt(armCharIndex);
      armCharIndex++;
      setTimeout(typeArmText, typingSpeed);
    } else {
      armCursorElement.style.animation = "none";
      armCursorElement.style.backgroundColor = "transparent";
    }
  }

  if (taglineContainer) {
    setTimeout(typeTagline, initialDelay);
  }
});
