import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-stone-900 pt-16 pb-24 px-4 text-center">
        <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-4">İletişim</h1>
        <p className="text-stone-400 max-w-xl mx-auto font-medium">Bize aşağıdaki bilgilerden ulaşabilir veya hemen sipariş verebilirsiniz.</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-black/5 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-orange-50 text-primary rounded-2xl flex items-center justify-center mb-6">
              <Phone className="h-8 w-8" />
            </div>
            <h3 className="font-heading font-bold text-xl text-stone-800 mb-2">Telefon</h3>
            <a href="tel:+905424602564" className="text-stone-600 hover:text-primary transition-colors font-medium">+90 542 460 25 64</a>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg border border-black/5 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-orange-50 text-primary rounded-2xl flex items-center justify-center mb-6">
              <MapPin className="h-8 w-8" />
            </div>
            <h3 className="font-heading font-bold text-xl text-stone-800 mb-2">Adres</h3>
            <p className="text-stone-600 font-medium">Güzpınar, Samsun-Ordu Yolu, Çarşamba/Samsun</p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg border border-black/5 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-orange-50 text-primary rounded-2xl flex items-center justify-center mb-6">
              <Mail className="h-8 w-8" />
            </div>
            <h3 className="font-heading font-bold text-xl text-stone-800 mb-2">E-Posta</h3>
            <a href="mailto:yardim@tarihicarsambapide.com" className="text-stone-600 hover:text-primary transition-colors font-medium">yardim@tarihicarsambapide.com</a>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-lg border border-black/5 overflow-hidden">
          <h2 className="text-2xl font-heading font-bold text-stone-800 mb-6 pl-2">Haritada Biz</h2>
          <div className="w-full h-[400px] sm:h-[500px] rounded-2xl overflow-hidden bg-stone-100">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001.174115770509!2d36.62798407666888!3d41.217975971322005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40880976ead5fd45%3A0x91f3299ec608b59a!2sTarihi%20%C3%87ar%C5%9Famba%20Pide!5e0!3m2!1str!2str!4v1778791829754!5m2!1str!2str" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
