import React from "react";

const Error500 = () => {
  return (
    <div class="error-page error-500">
      <div class="error-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="900"
          height="360"
          viewBox="0 0 900 360"
          role="img"
          aria-labelledby="title500 desc500"
        >
          <title id="title500">500 — Server error</title>
          <desc id="desc500">
            An illustrated 500: broken gear / server malfunction
          </desc>
          <defs>
            <linearGradient id="bg500" x1="0" x2="1">
              <stop offset="0" stop-color="#ffffff" />
              <stop offset="1" stop-color="#f9f9f9" />
            </linearGradient>
            <filter id="lift" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow
                dx="0"
                dy="10"
                stdDeviation="18"
                flood-color="#000"
                flood-opacity="0.08"
              />
            </filter>
          </defs>

          <rect width="100%" height="100%" rx="12" fill="url(#bg500)" />

          <g transform="translate(60,50)">
            <text
              x="0"
              y="120"
              font-family="Inter, Arial, sans-serif"
              font-size="120"
              font-weight="700"
              fill="#1a3c34"
            >
              500
            </text>
            <text
              x="0"
              y="170"
              font-family="Inter, Arial, sans-serif"
              font-size="20"
              fill="#333"
            >
              Internal server error
            </text>
          </g>

          <g transform="translate(420,20)" filter="url(#lift)">
            <rect
              x="10"
              y="10"
              width="260"
              height="92"
              rx="8"
              fill="#fff"
              stroke="#e9e9e9"
            />
            <rect
              x="10"
              y="118"
              width="260"
              height="92"
              rx="8"
              fill="#fff"
              stroke="#e9e9e9"
            />
            <rect
              x="10"
              y="226"
              width="260"
              height="92"
              rx="8"
              fill="#fff"
              stroke="#e9e9e9"
            />

            <circle cx="40" cy="56" r="6" fill="#d4a017" />
            <circle cx="40" cy="164" r="6" fill="#1a3c34" />
            <circle cx="40" cy="272" r="6" fill="#d4a017" />

            <g transform="translate(330,120) rotate(-18)">
              <path
                d="M0 0 m-72 0 a72 72 0 1 0 144 0 a72 72 0 1 0 -144 0"
                fill="#fff"
                stroke="#1a3c34"
                stroke-width="6"
              />
              <g transform="translate(-12,-12)">
                <path
                  d="M-40 0 L-10 -30 M-18 38 L 14 70"
                  stroke="#d4a017"
                  stroke-width="6"
                  stroke-linecap="round"
                />
              </g>
              <line
                x1="-10"
                y1="-46"
                x2="42"
                y2="46"
                stroke="#1a3c34"
                stroke-width="6"
                stroke-linecap="round"
              />

              <path
                d="M-18 -22 L 6 4 L 14 12"
                stroke="#d4a017"
                stroke-width="6"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>

            <text
              x="65"
              y="330"
              font-family="Inter, Arial, sans-serif"
              font-size="14"
              fill="#333"
            >
              We're working on it — try again in a minute.
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Error500;
