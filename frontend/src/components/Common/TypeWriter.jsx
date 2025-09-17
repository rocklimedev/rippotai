import React, { useEffect, useRef, useState } from "react";

const Typewriter = ({ showContactUs = true }) => {
  const typewriterRef = useRef(null);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  // Phrases to display, conditionally include "CONTACT US"
  const phrases = showContactUs
    ? ["DISCUSS A PROJECT?", "CONTACT US"]
    : ["DISCUSS A PROJECT?"];

  useEffect(() => {
    const typewriterElement = typewriterRef.current;
    const currentPhrase = phrases[currentPhraseIndex];

    let timeout;

    const type = () => {
      typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
      typewriterElement.style.animation =
        "typing 2s steps(20, end), blink-cursor 0.75s step-end infinite";

      if (charIndex < currentPhrase.length) {
        setCharIndex(charIndex + 1);
        timeout = setTimeout(type, 100); // Typing speed: 100ms per character
      } else {
        setIsTyping(false);
        typewriterElement.style.animation =
          "blink-cursor 0.75s step-end infinite";
        timeout = setTimeout(() => {
          typewriterElement.style.animation =
            "erasing 1s steps(20, end), blink-cursor 0.75s step-end infinite";
          setTimeout(erase, 1000); // Wait 1s before erasing
        }, 1500); // Pause 1.5s after typing
      }
    };

    const erase = () => {
      typewriterElement.textContent = currentPhrase.substring(0, charIndex);
      if (charIndex > 0) {
        setCharIndex(charIndex - 1);
        timeout = setTimeout(erase, 50); // Erasing speed: 50ms per character
      } else {
        setIsTyping(true);
        setCurrentPhraseIndex((currentPhraseIndex + 1) % phrases.length);
        typewriterElement.style.animation =
          "blink-cursor 0.75s step-end infinite";
        timeout = setTimeout(type, 500); // Pause 0.5s before typing next phrase
      }
    };

    if (isTyping) {
      type();
    }

    // Cleanup timeout on unmount
    return () => clearTimeout(timeout);
  }, [charIndex, isTyping, currentPhraseIndex, phrases]);

  return (
    <section className="typewriter-container">
      <div className="typewriter-text" ref={typewriterRef}></div>
    </section>
  );
};

export default Typewriter;
