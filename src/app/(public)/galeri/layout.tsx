import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galeri",
};

export default function GaleriLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
