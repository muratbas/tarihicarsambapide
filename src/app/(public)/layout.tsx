import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalClickListener from "@/components/GlobalClickListener";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <GlobalClickListener />
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
