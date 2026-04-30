// app/landing/layout.jsx
import { Toaster } from "sonner";

export const metadata = {
  title: "Rippotai Architecture - Premium Homes & Interiors | New Delhi",
  description:
    "Discover exceptional architecture and interior design services. Book your consultation today.",
  openGraph: {
    title: "Rippotai Architecture | Luxury Residential & Institutional Design",
    description: "Transform your space with award-winning architects in Delhi",
    images: [{ url: "https://rippotaiarchitecture.com/og-landing.jpg" }],
  },
};

export default function LandingLayout({ children }) {
  return (
    <div className="bg-white text-[#1A3C34]">
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: 0,
            background: "#1A3C34",
            color: "#fff",
            border: "1px solid #D9AF61",
            fontFamily: "Lato, sans-serif",
          },
        }}
      />
    </div>
  );
}
