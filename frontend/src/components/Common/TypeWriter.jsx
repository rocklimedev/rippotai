import React, { useEffect, useState } from "react";

const Typewriter = ({ showContactUs = true }) => {
  const phrases = showContactUs
    ? ["DISCUSS A PROJECT?", "CONTACT US"]
    : ["DISCUSS A PROJECT?"];

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // speeds (ms) - tweak these to taste
  const TYPING_SPEED = 100;
  const DELETING_SPEED = 50;
  const PAUSE_AFTER_FULL = 1500; // pause after typing full phrase
  const PAUSE_AFTER_DELETE = 500; // pause after fully deleted

  useEffect(() => {
    let timeoutId = null;
    const currentPhrase = phrases[currentPhraseIndex];

    if (!isDeleting && charIndex < currentPhrase.length) {
      // type next character
      timeoutId = setTimeout(
        () => setCharIndex((prev) => prev + 1),
        TYPING_SPEED
      );
    } else if (!isDeleting && charIndex === currentPhrase.length) {
      // finished typing -> wait then start deleting
      timeoutId = setTimeout(() => setIsDeleting(true), PAUSE_AFTER_FULL);
    } else if (isDeleting && charIndex > 0) {
      // delete characters
      timeoutId = setTimeout(
        () => setCharIndex((prev) => prev - 1),
        DELETING_SPEED
      );
    } else if (isDeleting && charIndex === 0) {
      // finished deleting -> move to next phrase and start typing
      timeoutId = setTimeout(() => {
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      }, PAUSE_AFTER_DELETE);
    }

    return () => clearTimeout(timeoutId);
  }, [charIndex, isDeleting, currentPhraseIndex, phrases]);

  // protect against phrase-array length changes (rare but safe)
  useEffect(() => {
    if (currentPhraseIndex >= phrases.length) {
      setCurrentPhraseIndex(0);
      setCharIndex(0);
      setIsDeleting(false);
    }
  }, [phrases.length, currentPhraseIndex]);

  const displayText = phrases[currentPhraseIndex].substring(0, charIndex);

  return (
    <section className="typewriter-container">
      <div className="typewriter-text" aria-live="polite">
        {displayText}
      </div>
    </section>
  );
};

export default Typewriter;
