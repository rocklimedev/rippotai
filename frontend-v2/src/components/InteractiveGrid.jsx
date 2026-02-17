import { useEffect, useRef, useCallback } from "react";

export const InteractiveGrid = ({ cellSize = 60 }) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef(null);
  const dimRef = useRef({ w: 0, h: 0 });

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const w = dimRef.current.w;
    const h = dimRef.current.h;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const radius = 300;

    ctx.clearRect(0, 0, w * dpr, h * dpr);
    ctx.save();
    ctx.scale(dpr, dpr);

    const scrollY = window.scrollY;
    const startRow = Math.floor(scrollY / cellSize);
    const visibleRows = Math.ceil(h / cellSize) + 2;

    for (let i = 0; i <= Math.ceil(w / cellSize); i++) {
      const x = i * cellSize;
      for (let j = startRow; j <= startRow + visibleRows; j++) {
        const y = j * cellSize - scrollY;
        const dx = x - mx;
        const dy = y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const proximity = Math.max(0, 1 - dist / radius);

        // Horizontal line
        if (i < Math.ceil(w / cellSize)) {
          const midDist = Math.sqrt((x + cellSize / 2 - mx) ** 2 + (y - my) ** 2);
          const lp = Math.max(0, 1 - midDist / radius);
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + cellSize, y);
          ctx.strokeStyle = lp > 0
            ? `rgba(217, 175, 97, ${0.07 + lp * 0.15})`
            : `rgba(26, 60, 52, 0.07)`;
          ctx.lineWidth = lp > 0 ? 0.4 + lp * 0.5 : 0.4;
          ctx.stroke();
        }

        // Vertical line
        if (j < startRow + visibleRows) {
          const midDist2 = Math.sqrt((x - mx) ** 2 + (y + cellSize / 2 - my) ** 2);
          const lp2 = Math.max(0, 1 - midDist2 / radius);
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x, y + cellSize);
          ctx.strokeStyle = lp2 > 0
            ? `rgba(217, 175, 97, ${0.07 + lp2 * 0.15})`
            : `rgba(26, 60, 52, 0.07)`;
          ctx.lineWidth = lp2 > 0 ? 0.4 + lp2 * 0.5 : 0.4;
          ctx.stroke();
        }

        // Intersection dot
        if (proximity > 0.05) {
          ctx.beginPath();
          ctx.arc(x, y, 1 + proximity * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(217, 175, 97, ${proximity * 0.25})`;
          ctx.fill();
        }
      }
    }

    ctx.restore();
    rafRef.current = requestAnimationFrame(draw);
  }, [cellSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      dimRef.current = { w, h };
    };

    const handleMouse = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouse);
    document.addEventListener("mouseleave", handleLeave);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      document.removeEventListener("mouseleave", handleLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9,
        mixBlendMode: "darken",
      }}
    />
  );
};
