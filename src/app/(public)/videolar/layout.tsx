import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Videolar",
};

export default function VideolarLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
