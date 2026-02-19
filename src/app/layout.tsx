import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

// Since we have a `[locale]` dynamic segment, this layout
// just renders children - the locale layout handles the HTML structure
export default function RootLayout({ children }: Props) {
  return children;
}
