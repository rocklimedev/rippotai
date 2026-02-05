// src/components/Common/Typewriter.jsx
"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";

const Typewriter = ({ showContactUs = true }) => {
  const phrases = useMemo(
    () =>
      showContactUs
        ? ["DISCUSS A PROJECT?", "CONTACT US", "STEP INSIDE"]
        : ["DISCUSS A PROJECT?"],
    [showContactUs],
  );

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Animation timing constants (in milliseconds)
  const TYPING_SPEED = 100;
  const DELETING_SPEED = 50;
  const PAUSE_AFTER_FULL = 1500;
  const PAUSE_AFTER_DELETE = 500;

  useEffect(() => {
    let timeoutId;

    const currentPhrase = phrases[currentPhraseIndex];

    if (!isDeleting && charIndex < currentPhrase.length) {
      // Typing next character
      timeoutId = setTimeout(() => {
        setCharIndex((prev) => prev + 1);
      }, TYPING_SPEED);
    } else if (!isDeleting && charIndex === currentPhrase.length) {
      // Pause at end of phrase before deleting
      timeoutId = setTimeout(() => {
        setIsDeleting(true);
      }, PAUSE_AFTER_FULL);
    } else if (isDeleting && charIndex > 0) {
      // Deleting character
      timeoutId = setTimeout(() => {
        setCharIndex((prev) => prev - 1);
      }, DELETING_SPEED);
    } else if (isDeleting && charIndex === 0) {
      // Pause after deletion, then move to next phrase
      timeoutId = setTimeout(() => {
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      }, PAUSE_AFTER_DELETE);
    }

    // Cleanup timeout on unmount or dependency change
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [charIndex, isDeleting, currentPhraseIndex, phrases]);

  const displayText = phrases[currentPhraseIndex].substring(0, charIndex);

  const renderLinkedText = () => {
    const currentPhrase = phrases[currentPhraseIndex];

    if (currentPhrase === "DISCUSS A PROJECT?") {
      return (
        <a
          href="https://wa.me/+919711169727"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
          aria-label="Discuss a project via WhatsApp"
        >
          {displayText}
        </a>
      );
    }

    if (currentPhrase === "CONTACT US") {
      return (
        <Link
          href="/contact"
          className="hover:underline"
          aria-label="Go to contact page"
        >
          {displayText}
        </Link>
      );
    }

    if (currentPhrase === "STEP INSIDE") {
      return (
        <Link
          href="/career"
          className="hover:underline"
          aria-label="Go to careers page"
        >
          {displayText}
        </Link>
      );
    }

    // Fallback
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
