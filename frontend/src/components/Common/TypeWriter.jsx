import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Typewriter = ({ showContactUs = true }) => {
  const phrases = showContactUs
    ? ["DISCUSS A PROJECT?", "CONTACT US", "STEP INSIDE"]
    : ["DISCUSS A PROJECT?"];

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // speeds (ms) - tweak these to taste
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

  useEffect(() => {
    if (currentPhraseIndex >= phrases.length) {
      setCurrentPhraseIndex(0);
      setCharIndex(0);
      setIsDeleting(false);
    }
  }, [phrases.length, currentPhraseIndex]);

  const displayText = phrases[currentPhraseIndex].substring(0, charIndex);

  // determine what link to render
  const renderLinkedText = () => {
    const phrase = phrases[currentPhraseIndex];

    if (phrase === "DISCUSS A PROJECT?") {
      return (
        <a
          href="https://wa.me/919999999999" // replace with your WhatsApp number
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          {displayText}
        </a>
      );
    } else if (phrase === "CONTACT US") {
      return (
        <Link to="/contact-us" className="hover:underline">
          {displayText}
        </Link>
      );
    } else if (phrase === "STEP INSIDE") {
      return (
        <Link to="/careers" className="hover:underline">
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
