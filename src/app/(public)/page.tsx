import Link from "next/link";
import { ArrowRight, Utensils, Clock, MapPin, ChefHat, PhoneCall } from "lucide-react";
import FeaturedProducts from "@/components/FeaturedProducts";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-stone-900 text-white pb-20 pt-24 sm:pt-32 sm:pb-28">
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
            <a href="tel:+905424602564" className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white backdrop-blur-md rounded-full font-heading font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2 border border-white/10">
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

      {/* About Us Teaser Section */}
      <section className="py-24 bg-stone-50 border-y border-stone-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative">
              <div className="absolute inset-0 bg-primary/10 rounded-[3rem] transform rotate-3 scale-105"></div>
              <img 
                src="/images/hikaye.webp" 
                alt="Pide Ustası" 
                className="relative rounded-[3rem] shadow-2xl object-cover h-[500px] w-full"
              />
              <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-3xl shadow-xl border border-stone-100 hidden sm:block">
                <div className="flex items-center gap-4">
                  <div className="bg-orange-50 p-3 rounded-2xl text-primary">
                    <ChefHat className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-2xl text-stone-800">Usta İşi</p>
                    <p className="text-stone-500 font-medium">Gerçek Lezzet</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 space-y-6">
              <h2 className="text-primary font-bold tracking-wider uppercase text-sm">Bizim Hikayemiz</h2>
              <h3 className="text-4xl sm:text-5xl font-heading font-bold text-stone-800 leading-tight">Yılların Eskitemediği <br /> Eşsiz Lezzet Durağı</h3>
              <p className="text-stone-500 text-lg leading-relaxed">
                Hamurunun inceliği, malzemesinin bolluğu ve odun ateşinde pişmesinin verdiği o tarifsiz çıtırlık... Tarihi Çarşamba Pide'si olarak yıllardır aynı özen ve ustalıkla çalışıyoruz. 
              </p>
              <p className="text-stone-500 text-lg leading-relaxed pb-4">
                En taze yöresel malzemeleri taş fırınımızın sıcağıyla buluşturuyor, ailenizle ve dostlarınızla unutulmaz anlar yaşamanız için sofralarınıza taşıyoruz.
              </p>
              <Link href="/hakkimizda" className="inline-flex items-center gap-2 bg-stone-900 text-white px-8 py-4 rounded-xl font-heading font-bold text-lg hover:bg-stone-800 transition-all">
                Hakkımızda Daha Fazlası
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-2">Öne Çıkanlar</h2>
            <h3 className="text-4xl font-heading font-bold text-stone-800 mb-4">En Çok Tercih Edilenler</h3>
            <p className="text-stone-500 font-medium">Müşterilerimizin vazgeçemediği, ustalarımızın gururla hazırladığı imza lezzetlerimiz.</p>
          </div>
          
          <FeaturedProducts />

          <div className="mt-16 text-center">
            <Link href="/menu" className="inline-flex items-center gap-2 bg-stone-100 text-stone-800 px-8 py-4 rounded-xl font-heading font-bold text-lg hover:bg-stone-200 transition-all border border-stone-200">
              Tüm Menüyü Gör
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/cta-bg.webp')] bg-cover bg-center opacity-10 mix-blend-multiply" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6">Acıktınız Mı?</h2>
          <p className="text-orange-100 text-lg sm:text-xl mb-10 max-w-2xl mx-auto font-medium">
            Hemen bizi arayın, siparişinizi hazırlayalım veya masanızı rezerve edelim. Sıcak sıcak kapınıza veya masanıza gelsin.
          </p>
          <a href="tel:+905424602564" className="inline-flex flex-col sm:flex-row items-center justify-center gap-4 bg-white text-stone-900 px-10 py-5 rounded-2xl font-heading font-bold text-xl sm:text-2xl hover:scale-105 transition-transform shadow-2xl">
            <div className="flex items-center gap-3">
              <PhoneCall className="h-6 w-6 text-primary" />
              <span>+90 542 460 25 64</span>
            </div>
            <span className="text-sm sm:text-base font-normal text-stone-500 sm:border-l sm:border-stone-300 sm:pl-4">Şimdi Ara</span>
          </a>
        </div>
      </section>
    </div>
  );
}
