import React from "react";

const Error404 = () => {
  return (
    <div class="error-page error-404">
      <div class="error-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="900"
          height="360"
          viewBox="0 0 900 360"
          role="img"
          aria-labelledby="title404 desc404"
        >
          <title id="title404">404 — Page not found</title>
          <desc id="desc404">
            An illustrated 404: magnifying glass looking at missing page
          </desc>
          <defs>
            <linearGradient id="g1" x1="0" x2="1">
              <stop offset="0" stop-color="#f9f9f9" />
              <stop offset="1" stop-color="#f0f0f0" />
            </linearGradient>
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow
                dx="0"
                dy="6"
                stdDeviation="10"
                flood-color="#000"
                flood-opacity="0.12"
              />
            </filter>
          </defs>

          <rect width="100%" height="100%" rx="12" fill="url(#g1)" />

          <g transform="translate(60,40)">
            <text
              x="0"
              y="120"
              font-family="Inter, Arial, sans-serif"
              font-size="120"
              font-weight="700"
              fill="#1a3c34"
            >
              404
            </text>
            <text
              x="0"
              y="170"
              font-family="Inter, Arial, sans-serif"
              font-size="20"
              fill="#333"
            >
              Page not found
            </text>
          </g>

          <g transform="translate(420,30)" filter="url(#shadow)">
            <circle
              cx="140"
              cy="140"
              r="90"
              fill="#fff"
              stroke="#d4a017"
              stroke-width="8"
            />
            <circle cx="140" cy="120" r="70" fill="#f9f9f9" />
            <rect
              x="230"
              y="230"
              width="110"
              height="18"
              rx="9"
              transform="rotate(40 285 239)"
              fill="#1a3c34"
            />
            <text
              x="70"
              y="160"
              font-family="Inter, Arial, sans-serif"
              font-size="22"
              fill="#333"
              text-anchor="middle"
            >
              Where did it go?
            </text>
            <line
              x1="60"
              y1="90"
              x2="220"
              y2="90"
              stroke="#d4a017"
              stroke-width="4"
              stroke-linecap="round"
              opacity="0.2"
            />
          </g>

          <g transform="translate(60,220)">
            <rect
              x="0"
              y="0"
              rx="10"
              width="560"
              height="80"
              fill="#fff"
              stroke="#e9e9e9"
            />
            <text
              x="24"
              y="36"
              font-family="Inter, Arial, sans-serif"
              font-size="16"
              fill="#333"
            >
              Try returning to the homepage or check the URL for typos.
            </text>
            <a href="/" transform="translate(24,48)">
              <text
                x="0"
                y="60"
                font-family="Inter, Arial, sans-serif"
                font-size="16"
                font-weight="600"
                fill="#1a3c34"
              >
                ← Go to homepage
              </text>
            </a>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Error404;
