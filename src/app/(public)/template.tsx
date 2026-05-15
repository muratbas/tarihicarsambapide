"use client";

import { useEffect, useState } from "react";
import { transitionState } from "@/lib/transitionState";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [clipPath, setClipPath] = useState("");
  const [transition, setTransition] = useState("");

  useEffect(() => {
    // Tıklama koordinatlarını al
    const startX = transitionState.x !== null ? transitionState.x : window.innerWidth / 2;
    const startY = transitionState.y !== null ? transitionState.y : window.innerHeight / 2;

    // 1. Adım: Küçücük bir noktadan başlat (Gizli)
    setClipPath(`circle(0px at ${startX}px ${startY}px)`);
    setTransition("none");

    // 2. Adım: Animasyonu tetikle (Sayfayı ortaya çıkar)
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // En uzak noktaya göre yarıçapı devasa tutalım (Mobil uzun sayfalarda kesilmesin diye)
        const maxRadius = Math.max(window.innerWidth, document.documentElement.scrollHeight) * 2;
        setClipPath(`circle(${maxRadius}px at ${startX}px ${startY}px)`);
        setTransition("clip-path 0.8s cubic-bezier(0.7, 0, 0.3, 1)");
        
        transitionState.x = null;
        transitionState.y = null;

        // 3. Adım: Animasyon tamamen bitince clip-path kısıtlamasını tamamen kaldır.
        // Bu sayede uzun sayfalarda alt kısımların gizli kalması (bug) önlenir.
        setTimeout(() => {
          setClipPath("");
          setTransition("");
        }, 850);
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return (
    <div style={{ clipPath, transition }} className="w-full animate-in">
      {children}
    </div>
  );
}
