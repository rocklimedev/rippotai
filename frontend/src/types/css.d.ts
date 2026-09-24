import "react";

declare module "react" {
  interface CSSProperties {
    // allow CSS custom properties in style={{ "--i": 2 }}
    [key: `--${string}`]: string | number | undefined;
  }
}
