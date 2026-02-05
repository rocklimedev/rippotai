import React from "react";

const Error403 = () => {
  return (
    <div class="error-page error-403">
      <div class="error-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="900"
          height="360"
          viewBox="0 0 900 360"
          role="img"
          aria-labelledby="title403 desc403"
        >
          <title id="title403">403 — Forbidden</title>
          <desc id="desc403">
            An illustrated 403: a secure door with a padlock
          </desc>
          <defs>
            <linearGradient id="bg403" x1="0" x2="1">
              <stop offset="0" stop-color="#f9f9f9" />
              <stop offset="1" stop-color="#ffffff" />
            </linearGradient>
            <filter
              id="softShadow"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feDropShadow
                dx="0"
                dy="8"
                stdDeviation="14"
                flood-color="#000"
                flood-opacity="0.10"
              />
            </filter>
          </defs>

          <rect width="100%" height="100%" rx="12" fill="url(#bg403)" />

          <g transform="translate(60,40)">
            <text
              x="0"
              y="120"
              font-family="Inter, Arial, sans-serif"
              font-size="120"
              font-weight="700"
              fill="#1a3c34"
            >
              403
            </text>
            <text
              x="0"
              y="170"
              font-family="Inter, Arial, sans-serif"
              font-size="20"
              fill="#333"
            >
              Access denied
            </text>
          </g>

          <g transform="translate(420,20)" filter="url(#softShadow)">
            <rect
              x="0"
              y="0"
              width="300"
              height="240"
              rx="12"
              fill="#fff"
              stroke="#e6e6e6"
            />
            <rect
              x="40"
              y="30"
              width="220"
              height="170"
              rx="8"
              fill="#f0f0f0"
            />

            <rect
              x="220"
              y="110"
              width="36"
              height="12"
              rx="6"
              fill="#1a3c34"
            />

            <g transform="translate(120,70)">
              <rect
                x="-36"
                y="46"
                width="72"
                height="54"
                rx="8"
                fill="#d4a017"
              />
              <rect x="-22" y="62" width="44" height="30" rx="4" fill="#fff" />
              <path
                d="M-20 46 a20 20 0 0 1 40 0"
                fill="none"
                stroke="#fff"
                stroke-width="6"
                stroke-linecap="round"
              />
            </g>
            <text
              x="150"
              y="220"
              font-family="Inter, Arial, sans-serif"
              font-size="14"
              fill="#333"
              text-anchor="middle"
            >
              You don't have permission to view this resource.
            </text>
          </g>

          <g transform="translate(60,220)">
            <rect
              x="0"
              y="0"
              rx="10"
              width="560"
              height="80"
              fill="#fff"
              stroke="#eaeaea"
            />
            <text
              x="24"
              y="36"
              font-family="Inter, Arial, sans-serif"
              font-size="16"
              fill="#333"
            >
              If you believe this is an error, contact the site administrator.
            </text>
          </g>
        </svg>

        <a href="/contact" class="error-cta">
          Contact Support
        </a>
      </div>
    </div>
  );
};

export default Error403;
