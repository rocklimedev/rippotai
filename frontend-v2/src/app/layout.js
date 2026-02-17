// app/layout.tsx
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Providers from "./Providers";
import ClientLayout from "./ClientLayout"; // ← new file we'll create

export const metadata = {
  title: "Rippotai Architecture | Best Architecture Firm in New Delhi, India",
  description:
    "Rippotai Architecture is a leading architecture and interior design firm in New Delhi, specializing in residential, institutional, and innovative projects. Explore our portfolio of modern, sustainable designs.",
  keywords:
    "architecture firm New Delhi, interior designers Delhi, residential architects India, institutional architecture, modern home design Delhi, Rippotai Architecture",
  robots: "index, follow",
  authors: [{ name: "Rippotai Architecture" }],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title:
      "Rippotai Architecture | Innovative Architecture & Interior Design in New Delhi",
    description:
      "Discover award-winning residential and institutional projects by Rippotai Architecture, a premier design firm in New Delhi, India.",
    url: "https://rippotaiarchitecture.com/",
    siteName: "Rippotai Architecture",
    images: [
      {
        url: "https://rippotaiarchitecture.com/logo.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Rippotai Architecture | Innovative Architecture & Interior Design in New Delhi",
    description:
      "Discover award-winning residential and institutional projects by Rippotai Architecture, a premier design firm in New Delhi, India.",
    images: ["https://rippotaiarchitecture.com/logo.png"],
  },
  alternates: {
    canonical: "https://rippotaiarchitecture.com/",
  },
  manifest: "/manifest.json",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="theme-color" content="#000000" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        <Providers>
          <ClientLayout>{children}</ClientLayout>
        </Providers>

        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
          crossOrigin="anonymous"
          async
        />
        <noscript>You need to enable JavaScript to run this app.</noscript>
      </body>
    </html>
  );
}
