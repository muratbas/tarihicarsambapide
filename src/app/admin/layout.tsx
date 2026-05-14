"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { LayoutDashboard, LogOut, Menu as MenuIcon, Tags, Coffee, Loader2 } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Kategoriler", href: "/admin/categories", icon: Tags },
    { name: "Ürünler", href: "/admin/products", icon: Coffee },
  ];

  return (
    <div className="min-h-screen bg-stone-50 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 bg-white shadow-xl w-64 transform transition-transform duration-300 ease-in-out z-30 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 flex flex-col`}>
        <div className="p-6 border-b border-stone-100 flex items-center justify-between">
          <div className="font-heading font-bold text-xl text-stone-800">TÇ Admin</div>
          <button className="md:hidden text-stone-500" onClick={() => setSidebarOpen(false)}>
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-3">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${isActive ? "bg-orange-50 text-primary" : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"}`}
                >
                  <item.icon className={`h-5 w-5 ${isActive ? "text-primary" : "text-stone-400"}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="p-4 border-t border-stone-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-stone-600 hover:bg-red-50 hover:text-red-600 rounded-xl font-medium transition-colors"
          >
            <LogOut className="h-5 w-5 text-stone-400" />
            Çıkış Yap
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white shadow-sm border-b border-stone-200 sticky top-0 z-20">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between md:justify-end">
            <button className="md:hidden text-stone-500" onClick={() => setSidebarOpen(true)}>
              <MenuIcon className="h-6 w-6" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-sm">A</span>
              </div>
              <span className="text-sm font-medium text-stone-700 hidden sm:block">{user.email}</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
      
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/20 z-20 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
}
