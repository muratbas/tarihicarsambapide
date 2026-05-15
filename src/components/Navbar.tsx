"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, MapPin, Phone, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-background/90 backdrop-blur-md sticky top-0 z-50 border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24 sm:h-28">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center py-2">
            <Link href="/" className="flex items-center group">
              <img src="/logo.svg" alt="Tarihi Çarşamba Pide Logo" className="h-20 sm:h-24 w-auto object-contain transition-transform group-hover:scale-105" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground/80 hover:text-primary transition-colors font-medium">Ana Sayfa</Link>
            
            {/* Dropdown */}
            <div className="relative" 
                 onMouseEnter={() => setIsDropdownOpen(true)}
                 onMouseLeave={() => setIsDropdownOpen(false)}>
              <button className="flex items-center text-foreground/80 hover:text-primary transition-colors font-medium py-2">
                Kurumsal <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute top-full left-0 w-48 pt-2">
                  <div className="bg-white rounded-2xl shadow-xl border border-black/5 py-2 overflow-hidden flex flex-col">
                    <Link href="/hakkimizda" className="px-5 py-2.5 hover:bg-orange-50 hover:text-primary transition-colors">Hakkımızda</Link>
                    <Link href="/galeri" className="px-5 py-2.5 hover:bg-orange-50 hover:text-primary transition-colors">Galeri</Link>
                    <Link href="/videolar" className="px-5 py-2.5 hover:bg-orange-50 hover:text-primary transition-colors">Videolar</Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/menu" className="text-foreground/80 hover:text-primary transition-colors font-medium">Menü</Link>
            <Link href="/iletisim" className="text-foreground/80 hover:text-primary transition-colors font-medium">İletişim</Link>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="tel:03628542626" className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-full font-heading font-bold hover:brightness-110 transition-all shadow-[0_4px_14px_0_rgba(234,88,12,0.39)] hover:shadow-[0_6px_20px_rgba(234,88,12,0.23)] transform hover:-translate-y-0.5">
              <Phone className="h-4 w-4" />
              Sipariş Ver
            </a>
            <a href="https://maps.app.goo.gl/tYd7tuxftZAVmZ189" target="_blank" rel="noreferrer" className="p-3 bg-black/5 text-foreground rounded-full hover:bg-primary hover:text-white transition-all shadow-sm hover:shadow-md" title="Yol Tarifi Al">
              <MapPin className="h-5 w-5" />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden gap-3">
            <a href="tel:03628542626" className="p-2.5 bg-primary text-white rounded-full shadow-md active:scale-95 transition-transform">
              <Phone className="h-5 w-5 fill-current" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-primary p-2 active:scale-95 transition-transform bg-black/5 rounded-full"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute w-full bg-white border-t border-black/5 shadow-2xl transition-all duration-300 ease-in-out origin-top ${isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}`}>
        <div className="px-4 pt-4 pb-8 space-y-2 flex flex-col">
          <Link href="/" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-lg font-medium text-foreground hover:bg-orange-50 hover:text-primary rounded-xl transition-colors">Ana Sayfa</Link>
          
          <div className="px-4 py-2 bg-stone-50 rounded-xl">
            <div className="text-xs font-bold text-stone-400 mb-3 uppercase tracking-widest">Kurumsal</div>
            <div className="flex flex-col space-y-1">
              <Link href="/hakkimizda" onClick={() => setIsOpen(false)} className="block px-3 py-2.5 font-medium text-foreground hover:text-primary transition-colors">Hakkımızda</Link>
              <Link href="/galeri" onClick={() => setIsOpen(false)} className="block px-3 py-2.5 font-medium text-foreground hover:text-primary transition-colors">Galeri</Link>
              <Link href="/videolar" onClick={() => setIsOpen(false)} className="block px-3 py-2.5 font-medium text-foreground hover:text-primary transition-colors">Videolar</Link>
            </div>
          </div>

          <Link href="/menu" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-lg font-medium text-foreground hover:bg-orange-50 hover:text-primary rounded-xl transition-colors">Menü</Link>
          <Link href="/iletisim" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-lg font-medium text-foreground hover:bg-orange-50 hover:text-primary rounded-xl transition-colors">İletişim</Link>
          
          <div className="pt-6 flex gap-4 px-2">
            <a href="https://maps.app.goo.gl/tYd7tuxftZAVmZ189" target="_blank" rel="noreferrer" className="flex-1 flex justify-center items-center gap-2 bg-stone-100 text-foreground px-4 py-3.5 rounded-2xl font-semibold hover:bg-stone-200 transition-colors">
              <MapPin className="h-5 w-5" />
              Konum
            </a>
            <a href="tel:03628542626" className="flex-1 flex justify-center items-center gap-2 bg-primary text-white px-4 py-3.5 rounded-2xl font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-shadow">
              <Phone className="h-5 w-5 fill-current" />
              Hemen Ara
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

