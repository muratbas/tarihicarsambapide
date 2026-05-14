import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-[70vh] max-w-4xl mx-auto p-4 py-16">
      <h1 className="text-4xl font-heading font-bold text-stone-800 mb-4 text-center">İletişim</h1>
      <p className="text-stone-500 max-w-2xl mx-auto text-center mb-12">Bize aşağıdaki bilgilerden ulaşabilir veya hemen sipariş verebilirsiniz.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5 text-center flex flex-col items-center">
          <div className="w-12 h-12 bg-orange-50 text-primary rounded-xl flex items-center justify-center mb-4">
            <Phone className="h-6 w-6" />
          </div>
          <h3 className="font-heading font-bold text-lg mb-2">Telefon</h3>
          <a href="tel:+905555555555" className="text-stone-600 hover:text-primary transition-colors">+90 555 555 55 55</a>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5 text-center flex flex-col items-center">
          <div className="w-12 h-12 bg-orange-50 text-primary rounded-xl flex items-center justify-center mb-4">
            <MapPin className="h-6 w-6" />
          </div>
          <h3 className="font-heading font-bold text-lg mb-2">Adres</h3>
          <p className="text-stone-600">Örnek Mahallesi, Lezzet Sokak No:1 Merkez/Türkiye</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5 text-center flex flex-col items-center">
          <div className="w-12 h-12 bg-orange-50 text-primary rounded-xl flex items-center justify-center mb-4">
            <Mail className="h-6 w-6" />
          </div>
          <h3 className="font-heading font-bold text-lg mb-2">E-Posta</h3>
          <a href="mailto:info@tarihicarsambapide.com" className="text-stone-600 hover:text-primary transition-colors">info@tarihicarsambapide.com</a>
        </div>
      </div>
    </div>
  );
}
