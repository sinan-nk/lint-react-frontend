import React, { useEffect, useRef, useState } from "react";

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
const easeOutCubic = (p) => 1 - Math.pow(1 - p, 3);

const Shop = () => {
  const wrapperRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [mountT, setMountT] = useState(0);
  const [vh, setVh] = useState(
    typeof window !== "undefined" ? window.innerHeight : 800,
  );

  // Slow entrance timer for title 1, plays once on mount.
  useEffect(() => {
    let raf;
    let start = null;
    const duration = 1800; // ms

    const tick = (ts) => {
      if (start === null) start = ts;
      const p = clamp((ts - start) / duration, 0, 1);
      setMountT(easeOutCubic(p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Track scroll position relative to the wrapper's top.
  useEffect(() => {
    let ticking = false;

    const measure = () => {
      if (wrapperRef.current) {
        const rect = wrapperRef.current.getBoundingClientRect();
        setScrollY(clamp(-rect.top, 0, rect.height));
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(measure);
        ticking = true;
      }
    };

    const onResize = () => {
      setVh(window.innerHeight);
      measure();
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Phase progress, 0 → 1 each.
  const tA = clamp(scrollY / vh, 0, 1); // title1 out / title2 in
  const tB = clamp((scrollY - vh) / vh, 0, 1); // title2 out / title3 in

  // --- Title 1: "Level up your look" ---
  const title1Opacity = mountT * (1 - tA);
  const title1Y = (1 - mountT) * 36 - tA * 90;

  // --- Title 2: "Designed for life / Built for you" ---
  const title2Opacity = clamp(tA - tB, 0, 1);
  const title2Y = (1 - tA) * 140 - tB * 90;

  // --- Title 3: "new / collections / for you" tag ---
  const title3Opacity = tB;
  const title3X = (1 - tB) * 220;
  const title3Rotate = (1 - tB) * -12;

  return (
    <div className="shop-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@400;500;600&display=swap');

        .shop-root {
          --bg: #0b0b0c;
          --ink: #f5f3ee;
          --muted: #8a8a8e;
          --accent: #c8ff3d;
          --accent-ink: #0b0b0c;
          background: var(--bg);
          color: var(--ink);
          font-family: "Space Grotesk", sans-serif;
        }

        .shop-scroll-track {
          position: relative;
          height: 300vh;
        }

        .shop-stage {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100%;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background:
            radial-gradient(circle at 50% 20%, rgba(200, 255, 61, 0.08), transparent 55%),
            var(--bg);
        }

        .shop-scrim {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image:
            linear-gradient(rgba(245, 243, 238, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245, 243, 238, 0.05) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(circle at 50% 50%, black, transparent 75%);
        }

        .shop-layer {
          position: absolute;
          left: 50%;
          top: 50%;
          text-align: center;
          will-change: transform, opacity;
        }

        .shop-eyebrow {
          display: block;
          font-size: 0.75rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .shop-title1 h1 {
          font-family: "Bebas Neue", sans-serif;
          font-size: clamp(3rem, 10vw, 7.5rem);
          line-height: 0.95;
          letter-spacing: 0.01em;
          margin: 0;
        }

        .shop-title2 h1 {
          font-family: "Bebas Neue", sans-serif;
          font-size: clamp(2.6rem, 8vw, 6rem);
          line-height: 1.02;
          margin: 0;
        }

        .shop-title2 h1:last-child {
          color: var(--accent);
        }

        .shop-tag {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          gap: 0.15rem;
          padding: 2.5rem 3rem;
          backdrop-filter: blur(6px);
        }

        .shop-tag-badge {
          width: 300px;
          height: 50px;
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: "Bebas Neue", sans-serif;
          font-size: 3.3rem;
          letter-spacing: 0.03em;
          margin-bottom: 0.1rem;
        }

        .shop-tag p {
          margin: 0;
          font-family: "Bebas Neue", sans-serif;
          font-size: 2.9rem;
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }

        .:first-of-type {
          color: var(--accent);
          font-size: 2.5rem;
          font-family: "Space Grotesk", sans-serif;
          letter-spacing: 0.03em;
          text-transform: uppercase;
        }

        .shop-hint {
          position: absolute;
          bottom: 2.5rem;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.7rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--muted);
          opacity: ${1 - clamp(scrollY / (vh * 0.3), 0, 1)};
        }

        .shop-hint::after {
          content: "";
          display: block;
          margin: 0.6rem auto 0;
          width: 1px;
          height: 28px;
          background: linear-gradient(var(--muted), transparent);
        }

        @media (prefers-reduced-motion: reduce) {
          .shop-layer {
            transition: none !important;
          }
        }
      `}</style>

      <div className="shop-scroll-track" ref={wrapperRef}>
        <div className="shop-stage">
          <div className="shop-scrim" />

          {/* Title 1 — Level up your look */}
          <div
            className="shop-layer shop-title1"
            style={{
              opacity: title1Opacity,
              transform: `translate(-50%, calc(-50% + ${title1Y}px))`,
            }}>
            {/* <span className="shop-eyebrow">Season 01</span> */}
            <h1>Level up your look</h1>
          </div>

          <div
            className="shop-layer shop-title2"
            style={{
              opacity: title2Opacity,
              transform: `translate(-50%, calc(-50% + ${title2Y}px))`,
            }}>
            <h1>Designed for life</h1>
            <h1>Built for you</h1>
          </div>

          {/* Title 3 — new / collections / for you */}
          <div
            className="shop-layer"
            style={{
              opacity: title3Opacity,
              transform: `translate(calc(-50% + ${title3X}px), -50%) rotate(${title3Rotate}deg)`,
            }}>
            <div className="shop-tag">
              <div className="shop-tag-badge">Just dropped</div>
              <p>Collections</p>
              <p>for you</p>
            </div>
          </div>

          <span className="shop-hint">Scroll</span>
        </div>
      </div>
    </div>
  );
};

export default Shop;
