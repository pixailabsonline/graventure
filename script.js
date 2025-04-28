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
    const taglineTypingElement = document.getElementById("typing-text");
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

    function typeTagline() {
        if (!taglineTypingElement || !taglineCursorElement) return;

        if (lineIndex < taglineLines.length) {
            // Get the current line's target text
            const targetLineText = taglineLines[lineIndex];

            if (charIndex < targetLineText.length) {
                // Get the current HTML, preserving existing breaks
                let currentHTML = taglineTypingElement.innerHTML;
                // Remove trailing <br> if it exists from previous line completion
                if (currentHTML.endsWith('<br>')) {
                    currentHTML = currentHTML.slice(0, -4);
                }
                // Add the next character
                currentHTML += targetLineText.charAt(charIndex);
                taglineTypingElement.innerHTML = currentHTML;
                
                charIndex++;
                setTimeout(typeTagline, typingSpeed);
            } else {
                // Line finished, add a line break if not the last line
                if (lineIndex < taglineLines.length - 1) {
                    taglineTypingElement.innerHTML += '<br>';
                }
                // Move to the next line
                lineIndex++;
                charIndex = 0;
                setTimeout(typeTagline, lineDelay);
            }
        } else {
            // Tagline finished, start typing ignition text
            taglineCursorElement.style.display = 'none';
            if (ignitionCursorElement) ignitionCursorElement.style.display = 'inline-block';
            setTimeout(typeIgnitionText, lineDelay / 2);
        }
    }

    let ignitionCharIndex = 0;
    let armCharIndex = 0;

    function typeIgnitionText() {
        if (!ignitionTypingElement || !ignitionCursorElement) return;

        if (ignitionCharIndex < ignitionText.length) {
            ignitionTypingElement.textContent += ignitionText.charAt(ignitionCharIndex);
            ignitionCharIndex++;
            setTimeout(typeIgnitionText, typingSpeed);
        } else {
            // Ignition text finished, start typing arm text
            ignitionCursorElement.style.display = 'none';
            if (armCursorElement) armCursorElement.style.display = 'inline-block';
            setTimeout(typeArmText, lineDelay / 2);
        }
    }

    function typeArmText() {
        if (!armTypingElement || !armCursorElement) return;

        if (armCharIndex < armText.length) {
            armTypingElement.textContent += armText.charAt(armCharIndex);
            armCharIndex++;
            setTimeout(typeArmText, typingSpeed);
        } else {
            // Everything finished
             armCursorElement.style.animation = 'none'; // Stop blinking
             armCursorElement.style.backgroundColor = 'transparent'; 
        }
    }

    // Start the first typing sequence
    if (taglineTypingElement) {
        setTimeout(typeTagline, initialDelay);
    }
    // --- End Typing Effect Logic ---
}); 
