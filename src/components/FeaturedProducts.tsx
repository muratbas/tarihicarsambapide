"use client";
import { useState, useEffect } from "react";
import { getProducts, Product } from "@/lib/services/products";
import { Loader2 } from "lucide-react";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const prods = await getProducts();
        // Sadece resmi olan ve stokta olan ilk 4 ürünü alalım
        const featured = prods.filter(p => p.isAvailable && p.imageUrl).slice(0, 4);
        if (featured.length === 0) {
          // Eğer resmi olan yoksa rastgele stokta olan 4 ürün
          setProducts(prods.filter(p => p.isAvailable).slice(0, 4));
        } else {
          setProducts(featured);
        }
      } catch (error) {
        console.error("Hata:", error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map(prod => (
        <div key={prod.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-black/5 group flex flex-col">
          {prod.imageUrl ? (
            <div className="h-48 overflow-hidden relative">
              <img 
                src={prod.imageUrl} 
                alt={prod.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                onError={(e) => e.currentTarget.style.display = 'none'}
              />
            </div>
          ) : (
            <div className="h-48 bg-stone-100 flex items-center justify-center">
              <span className="text-stone-300 font-medium text-sm">Görsel Yok</span>
            </div>
          )}
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start gap-2 mb-2">
                <h3 className="text-lg font-heading font-bold text-stone-800 line-clamp-1">{prod.name}</h3>
                <span className="font-bold text-primary whitespace-nowrap bg-orange-50 px-2 py-1 rounded-md text-sm">{prod.price} ₺</span>
              </div>
              <p className="text-stone-500 text-xs sm:text-sm line-clamp-2 leading-relaxed">{prod.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
