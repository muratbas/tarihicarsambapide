import Link from "next/link";
import { Utensils } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 text-stone-300 py-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
          {/* Brand & Description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center group inline-block">
              <img src="/logo.svg" alt="Tarihi Çarşamba Pide Logo" className="h-40 sm:h-48 w-auto object-contain bg-white rounded-[2.5rem] p-4 shadow-lg transition-transform group-hover:scale-105" />
            </Link>
            <p className="text-stone-400 text-sm leading-relaxed max-w-sm">
              Yılların getirdiği tecrübe ile en lezzetli pideleri odun ateşinde pişirerek sizlere sunuyoruz. Lezzet dolu anlar için doğru adrestesiniz.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-heading font-bold text-lg mb-4">Hızlı Menü</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-stone-400 hover:text-primary transition-colors text-sm">Ana Sayfa</Link>
              </li>
              <li>
                <Link href="/menu" className="text-stone-400 hover:text-primary transition-colors text-sm">Menü</Link>
              </li>
              <li>
                <Link href="/hakkimizda" className="text-stone-400 hover:text-primary transition-colors text-sm">Hakkımızda</Link>
              </li>
              <li>
                <Link href="/iletisim" className="text-stone-400 hover:text-primary transition-colors text-sm">İletişim</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-heading font-bold text-lg mb-4">İletişim</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex flex-col">
                <span className="text-stone-500 mb-1">Adres:</span>
                <span className="text-stone-400">Güzpınar, Samsun-Ordu Yolu, Çarşamba/Samsun</span>
              </li>
              <li className="flex flex-col">
                <span className="text-stone-500 mb-1">Telefon:</span>
                <a href="tel:03628542626" className="text-stone-400 hover:text-primary transition-colors">0 362 854 26 26</a>
              </li>
              <li className="flex flex-col">
                <span className="text-stone-500 mb-1">E-Posta:</span>
                <a href="mailto:yardim@tarihicarsambapide.com" className="text-stone-400 hover:text-primary transition-colors">yardim@tarihicarsambapide.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Credits */}
        <div className="pt-8 border-t border-stone-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-stone-500 text-sm">
            &copy; {currentYear} Tarihi Çarşamba Pide. Tüm hakları saklıdır.
          </p>
          <p className="text-stone-500 text-sm">
            <a href="https://muratbas.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-orange-400 font-bold transition-colors">muratbas.com</a> tarafından geliştirildi.
          </p>
        </div>
      </div>
    </footer>
  );
}
