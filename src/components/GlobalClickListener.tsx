"use client";
import { useEffect } from "react";
import { transitionState } from "@/lib/transitionState";

export default function GlobalClickListener() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      // Sadece aynı domain'deki linklere tıklandığında koordinat kaydet
      if (link && link.href && link.href.startsWith(window.location.origin)) {
        transitionState.x = e.clientX;
        transitionState.y = e.clientY;
      }
    };
    
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return null;
}
