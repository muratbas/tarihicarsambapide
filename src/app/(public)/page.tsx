import Link from "next/link";
import { ArrowRight, Utensils, Clock, MapPin } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-stone-900 text-white pb-20 pt-24 sm:pt-32 sm:pb-28">
        {/* Placeholder background - you can replace URL with your real image */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/60 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-orange-400 font-semibold text-sm mb-6 border border-primary/30 backdrop-blur-sm shadow-lg">
            Tarihi Lezzet
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-bold mb-6 tracking-tight">
            Gerçek Odun Ateşinde <br className="hidden sm:block"/> 
            <span className="text-primary drop-shadow-md">Çarşamba Pidesi</span>
          </h1>
          <p className="text-lg sm:text-xl text-stone-300 max-w-2xl mx-auto mb-10 font-medium">
            Yılların ustalık tecrübesiyle hazırlanan, enfes malzemelerle taş fırında pişen çıtır pidelerimizle tanışın.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/menu" className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-full font-heading font-bold text-lg hover:bg-orange-600 transition-all shadow-[0_0_20px_rgba(234,88,12,0.4)] hover:shadow-[0_0_30px_rgba(234,88,12,0.6)] flex items-center justify-center gap-2 transform hover:-translate-y-1">
              Menüyü İncele
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a href="tel:+905555555555" className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white backdrop-blur-md rounded-full font-heading font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2 border border-white/10">
              Hemen Sipariş Ver
            </a>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 bg-background relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-32">
            
            <div className="bg-white p-8 rounded-3xl shadow-xl shadow-black/5 border border-black/5 text-center group hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-orange-50 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Utensils className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-heading font-bold text-stone-800 mb-3">Taze Malzemeler</h3>
              <p className="text-stone-500 font-medium leading-relaxed">Her gün özenle seçilen en taze ve kaliteli yerel malzemeleri kullanıyoruz.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl shadow-black/5 border border-black/5 text-center group hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-orange-50 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-heading font-bold text-stone-800 mb-3">Hızlı Servis</h3>
              <p className="text-stone-500 font-medium leading-relaxed">Siparişleriniz odun ateşinde anında pişirilip sıcacık ve çıtır çıtır servis edilir.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl shadow-black/5 border border-black/5 text-center group hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-orange-50 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-heading font-bold text-stone-800 mb-3">Merkezi Konum</h3>
              <p className="text-stone-500 font-medium leading-relaxed">Bize kolayca ulaşabilir, ailenizle nezih bir ortamda keyifli vakit geçirebilirsiniz.</p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
