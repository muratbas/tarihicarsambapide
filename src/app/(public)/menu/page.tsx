"use client";

import { useState, useEffect } from "react";
import { getCategories, Category } from "@/lib/services/categories";
import { getProducts, Product } from "@/lib/services/products";
import { Loader2, AlertCircle } from "lucide-react";

export default function MenuPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  useEffect(() => {
    async function loadMenu() {
      try {
        const [cats, prods] = await Promise.all([
          getCategories(),
          getProducts()
        ]);
        
        // Sadece aktif olanları göster
        setCategories(cats.filter(c => c.isActive).sort((a, b) => a.order - b.order));
        setProducts(prods.filter(p => p.isAvailable).sort((a, b) => a.order - b.order));
      } catch (error) {
        console.error("Menü yüklenirken hata:", error);
      } finally {
        setLoading(false);
      }
    }
    loadMenu();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
        <p className="text-stone-500 font-medium animate-pulse">Menü Hazırlanıyor...</p>
      </div>
    );
  }

  // Aktif kategoriye göre gösterilecek kategorileri belirle
  const displayCategories = activeCategory === "all" 
    ? categories 
    : categories.filter(c => c.id === activeCategory);

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Menu Header */}
      <div className="bg-stone-900 pt-12 pb-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-4">Lezzet Menümüz</h1>
          <p className="text-stone-400 max-w-xl mx-auto font-medium">Odun ateşinde pişen nefis pidelerimiz ve birbirinden lezzetli seçeneklerimiz.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        {/* Categories Navigation - Sticky for mobile */}
        <div className="bg-white rounded-2xl shadow-lg border border-black/5 p-2 mb-12 overflow-x-auto sticky top-24 z-30 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex space-x-2 min-w-max">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-6 py-3 rounded-xl font-heading font-bold text-sm sm:text-base transition-all ${
                activeCategory === "all" 
                  ? "bg-primary text-white shadow-md" 
                  : "bg-transparent text-stone-600 hover:bg-stone-50"
              }`}
            >
              Tümü
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-3 rounded-xl font-heading font-bold text-sm sm:text-base transition-all ${
                  activeCategory === cat.id 
                    ? "bg-primary text-white shadow-md" 
                    : "bg-transparent text-stone-600 hover:bg-stone-50"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Categories and Products List */}
        <div className="space-y-16">
          {displayCategories.map(category => {
            // Get products for this category
            const categoryProducts = products.filter(p => p.categoryIds.includes(category.id));

            // İçinde ürün olmayan kategorileri gizle
            if (categoryProducts.length === 0) return null;

            return (
              <div key={category.id} className="scroll-mt-32">
                {/* Category Header */}
                <div className="mb-8 flex items-center gap-4">
                  <h2 className="text-3xl font-heading font-bold text-stone-800 tracking-tight">{category.name}</h2>
                  <div className="h-[2px] bg-stone-200 flex-grow mt-2 rounded-full"></div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {categoryProducts.map(prod => (
                    <div key={prod.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-black/5 flex flex-col sm:flex-row group">
                      {prod.imageUrl && (
                        <div className="sm:w-48 h-48 sm:h-auto shrink-0 overflow-hidden relative">
                          <img 
                            src={prod.imageUrl} 
                            alt={prod.name} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                            onError={(e) => e.currentTarget.style.display = 'none'}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent sm:hidden" />
                        </div>
                      )}
                      
                      <div className="p-6 flex-1 flex flex-col justify-center relative">
                        <div className="flex justify-between items-start gap-4 mb-2">
                          <h3 className="text-xl font-heading font-bold text-stone-800">{prod.name}</h3>
                          <span className="text-lg font-bold text-primary whitespace-nowrap bg-orange-50 px-3 py-1 rounded-lg">
                            {prod.price} ₺
                          </span>
                        </div>
                        {prod.description && (
                          <p className="text-stone-500 text-sm leading-relaxed">{prod.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Eğer seçili kategoride/menüde hiç ürün yoksa */}
          {displayCategories.every(cat => products.filter(p => p.categoryIds.includes(cat.id)).length === 0) && (
             <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-black/5">
               <AlertCircle className="h-12 w-12 text-stone-300 mx-auto mb-4" />
               <h3 className="text-xl font-heading font-bold text-stone-700 mb-2">Ürün Bulunamadı</h3>
               <p className="text-stone-500">Şu anda bu kriterlerde listelenecek bir ürün bulunmuyor.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
