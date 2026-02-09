// StackingSlider.jsx
import { motion } from "framer-motion";
import { Children, useState, useRef, useEffect } from "react";

export default function StackingSlider(props) {
  const {
    children,
    cardGap = "var(--spacing-lg)", // 24px
    stackOffset = 32, // still px value – feel free to make it var if you define one
    mobileStackOffset = 16,
    leftArrowIcon,
    rightArrowIcon,
    arrowSize = 48,
    arrowColor = "var(--primary-color)", // #fff
    arrowBackgroundColor = "rgba(26, 60, 52, 0.7)", // --light-bg with opacity
    arrowHoverColor = "var(--light-bg)", // #1a3c34
    arrowBorderRadius = "var(--border-radius)", // 8px or whatever you set
    arrowGap = "var(--spacing-md)", // 16px
    buttonPosition = "center",
    transition,
    disabledArrowOpacity = 0.4,
  } = props;

  const childrenArray = Children.toArray(children);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const [cardWidth, setCardWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (cardRefs.current[0]) {
        setCardWidth(cardRefs.current[0].offsetWidth);
      }
      setIsMobile(window.innerWidth < 992);
    };

    updateDimensions();
    const timer = setTimeout(updateDimensions, 120);

    window.addEventListener("resize", updateDimensions);
    return () => {
      window.removeEventListener("resize", updateDimensions);
      clearTimeout(timer);
    };
  }, [childrenArray.length]);

  const activeOffset = isMobile ? mobileStackOffset : stackOffset;

  const goToNext = () => {
    if (currentIndex < childrenArray.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const getCardTransform = (index) => {
    if (index < currentIndex) {
      const slideMove = (cardWidth + parseInt(cardGap) - activeOffset) * index;
      return -slideMove;
    } else {
      const slideMove =
        (cardWidth + parseInt(cardGap) - activeOffset) * currentIndex;
      return -slideMove;
    }
  };

  const transitionSettings = {
    duration: transition?.duration ?? 0.45,
    ease: transition?.ease ?? "easeOut",
    type: transition?.type ?? "tween",
  };

  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex === childrenArray.length - 1;

  const getButtonAlignment = () => {
    switch (buttonPosition) {
      case "center":
        return "center";
      case "right":
        return "flex-end";
      default:
        return "flex-start";
    }
  };

  return (
    <div
      className="stacking-slider-wrapper"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: arrowGap,
      }}
    >
      {/* Slider Container */}
      <div
        ref={containerRef}
        style={{
          flex: 1,
          height: "100%",
          position: "relative",
          overflow: "visible",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            height: "fit-content",
            position: "relative",
            gap: cardGap,
          }}
        >
          {childrenArray.map((child, index) => (
            <motion.div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              animate={{
                x: getCardTransform(index),
                boxShadow: index === currentIndex ? "var(--shadow)" : "none",
                scale: index === currentIndex ? 1.02 : 0.96,
              }}
              transition={transitionSettings}
              style={{
                flexShrink: 0,
                position: "relative",
                zIndex: childrenArray.length - index,
                borderRadius: "var(--border-radius)",
                overflow: "hidden",
                background: "var(--white)",
              }}
            >
              {child}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {childrenArray.length > 1 && (
        <div
          style={{
            display: "flex",
            gap: "var(--spacing-md)",
            alignItems: "center",
            justifyContent: getButtonAlignment(),
            padding: "var(--spacing-sm) 0",
          }}
        >
          <button
            onClick={goToPrev}
            disabled={isAtStart}
            onMouseEnter={() => setHoveredButton("left")}
            onMouseLeave={() => setHoveredButton(null)}
            style={{
              width: `${arrowSize}px`,
              height: `${arrowSize}px`,
              minWidth: `${arrowSize}px`,
              minHeight: `${arrowSize}px`,
              flexShrink: 0,
              background:
                hoveredButton === "left" && !isAtStart
                  ? arrowHoverColor
                  : arrowBackgroundColor,
              border: "none",
              borderRadius: arrowBorderRadius,
              cursor: isAtStart ? "not-allowed" : "pointer",
              opacity: isAtStart ? disabledArrowOpacity : 1,
              transition: "all 0.2s ease",
              boxShadow: "var(--shadow)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {leftArrowIcon ? (
              <img
                src={leftArrowIcon}
                alt="Previous"
                style={{ width: "60%", height: "60%", objectFit: "contain" }}
              />
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke={arrowColor}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            )}
          </button>

          <button
            onClick={goToNext}
            disabled={isAtEnd}
            onMouseEnter={() => setHoveredButton("right")}
            onMouseLeave={() => setHoveredButton(null)}
            style={{
              width: `${arrowSize}px`,
              height: `${arrowSize}px`,
              minWidth: `${arrowSize}px`,
              minHeight: `${arrowSize}px`,
              flexShrink: 0,
              background:
                hoveredButton === "right" && !isAtEnd
                  ? arrowHoverColor
                  : arrowBackgroundColor,
              border: "none",
              borderRadius: arrowBorderRadius,
              cursor: isAtEnd ? "not-allowed" : "pointer",
              opacity: isAtEnd ? disabledArrowOpacity : 1,
              transition: "all 0.2s ease",
              boxShadow: "var(--shadow)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {rightArrowIcon ? (
              <img
                src={rightArrowIcon}
                alt="Next"
                style={{ width: "60%", height: "60%", objectFit: "contain" }}
              />
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke={arrowColor}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

StackingSlider.displayName = "Stacking Slider";
