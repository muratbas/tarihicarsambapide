import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkımızda",
};

export default function HakkimizdaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
