document.addEventListener("DOMContentLoaded", function() {
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Stop observing once visible
            } else {
                // Optional: Remove class if you want animation to repeat
                // entry.target.classList.remove("visible");
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Select elements to animate
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => observer.observe(el));

    // --- Typing Effect Logic --- 
    const taglineContainer = document.querySelector("h2.hero-tagline");
    const taglineCursorElement = document.querySelector(".tagline-cursor");
    const ignitionTypingElement = document.getElementById("ignition-typing-text");
    const ignitionCursorElement = document.querySelector(".ignition-cursor");
    const armTypingElement = document.getElementById("arm-typing-text");
    const armCursorElement = document.querySelector(".arm-cursor");

    const taglineLines = [
        "Build What Can't Be Ignored.",
        "Become What Can't Be Stopped.",
        "Move Like You Were Always Meant To."
    ];
    const ignitionText = "Graventure is the ignition force for underestimated founders, brands, and teams ready to leverage AI Agents, launch with precision, and dominate without apology.";
    const armText = "We don't \"help.\" We arm. We amplify. We unleash.";
    
    const typingSpeed = 50; // Slightly faster typing
    const lineDelay = 600; // Delay between sections
    const initialDelay = 500; // Initial delay

    let lineIndex = 0;
    let charIndex = 0;
    let currentLineElement = null; // To hold the span for the current line

    function typeTagline() {
        if (!taglineContainer || !taglineCursorElement) return;

        // Ensure cursor is appended at the end of the container
        taglineContainer.appendChild(taglineCursorElement);

        if (lineIndex < taglineLines.length) {
            // If starting a new line, create its element
            if (charIndex === 0) {
                currentLineElement = document.createElement('span');
                currentLineElement.classList.add('tagline-line');
                // Insert the new line element *before* the cursor
                taglineContainer.insertBefore(currentLineElement, taglineCursorElement);
            }

            // Type into the current line's element
            if (currentLineElement && charIndex < taglineLines[lineIndex].length) {
                currentLineElement.textContent += taglineLines[lineIndex].charAt(charIndex);
                charIndex++;
                setTimeout(typeTagline, typingSpeed);
            } else {
                // Line finished, move to the next line
                lineIndex++;
                charIndex = 0;
                currentLineElement = null; // Reset for the next line
                setTimeout(typeTagline, lineDelay);
            }
        } else {
            // Tagline finished, start ignition text
            taglineCursorElement.style.display = 'none';
            if (ignitionCursorElement) ignitionCursorElement.style.display = 'inline-block';
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
            ignitionCursorElement.style.display = 'none';
            if (armCursorElement) armCursorElement.style.display = 'inline-block';
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
             armCursorElement.style.animation = 'none'; 
             armCursorElement.style.backgroundColor = 'transparent'; 
        }
    }

    // Start the first typing sequence
    if (taglineContainer) { // Check if container exists
        setTimeout(typeTagline, initialDelay);
    }
    // --- End Typing Effect Logic ---
}); 
