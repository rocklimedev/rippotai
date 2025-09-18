import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Typewriter = ({ showContactUs = true }) => {
  const phrases = showContactUs
    ? ["DISCUSS A PROJECT?", "CONTACT US", "STEP INSIDE"]
    : ["DISCUSS A PROJECT?"];

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Speeds (ms)
  const TYPING_SPEED = 100;
  const DELETING_SPEED = 50;
  const PAUSE_AFTER_FULL = 1500;
  const PAUSE_AFTER_DELETE = 500;

  useEffect(() => {
    let timeoutId = null;
    const currentPhrase = phrases[currentPhraseIndex];

    if (!isDeleting && charIndex < currentPhrase.length) {
      timeoutId = setTimeout(
        () => setCharIndex((prev) => prev + 1),
        TYPING_SPEED
      );
    } else if (!isDeleting && charIndex === currentPhrase.length) {
      timeoutId = setTimeout(() => setIsDeleting(true), PAUSE_AFTER_FULL);
    } else if (isDeleting && charIndex > 0) {
      timeoutId = setTimeout(
        () => setCharIndex((prev) => prev - 1),
        DELETING_SPEED
      );
    } else if (isDeleting && charIndex === 0) {
      timeoutId = setTimeout(() => {
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      }, PAUSE_AFTER_DELETE);
    }

    return () => clearTimeout(timeoutId);
  }, [charIndex, isDeleting, currentPhraseIndex, phrases]);

  // This useEffect seems redundant since currentPhraseIndex is already managed in the modulo operation
  // Removed to simplify logic, as (prev + 1) % phrases.length handles the cycling correctly

  const displayText = phrases[currentPhraseIndex].substring(0, charIndex);

  // Determine what link to render
  const renderLinkedText = () => {
    const phrase = phrases[currentPhraseIndex];

    if (phrase === "DISCUSS A PROJECT?") {
      return (
        <a
          href="https://wa.me/+919711169727" // Updated with a valid WhatsApp number from footer
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
          aria-label="Discuss a project via WhatsApp"
        >
          {displayText}
        </a>
      );
    } else if (phrase === "CONTACT US") {
      return (
        <Link
          to="/contact"
          className="hover:underline"
          aria-label="Go to contact page"
        >
          {displayText}
        </Link>
      );
    } else if (phrase === "STEP INSIDE") {
      return (
        <Link
          to="/career"
          className="hover:underline"
          aria-label="Go to careers page"
        >
          {displayText}
        </Link>
      );
    }
    return displayText;
  };

  return (
    <section className="typewriter-container">
      <div className="typewriter-text" aria-live="polite">
        {renderLinkedText()}
      </div>
    </section>
  );
};

export default Typewriter;
