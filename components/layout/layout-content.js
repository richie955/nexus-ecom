"use client";

import { usePathname } from "next/navigation";

export function LayoutContent({ children }) {
  const pathname = usePathname();

  return (
    <main
      className={`flex-1 pb-16 md:pb-0 ${
        pathname === "/" ? "" : "pt-16"
      }`}
    >
      {children}
    </main>
  );
}