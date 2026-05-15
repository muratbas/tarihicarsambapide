import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Admin Paneli",
    default: "Yönetim Paneli",
  },
};

export default function AdminMetadataLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
