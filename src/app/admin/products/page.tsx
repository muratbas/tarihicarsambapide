"use client";

import { useState, useEffect } from "react";
import { Product, getProducts, addProduct, updateProduct, deleteProduct } from "@/lib/services/products";
import { Category, getCategories } from "@/lib/services/categories";
import { Plus, Edit2, Trash2, X, Loader2, Image as ImageIcon } from "lucide-react";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Form state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [order, setOrder] = useState(0);
  const [isAvailable, setIsAvailable] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [productsData, categoriesData] = await Promise.all([
        getProducts(),
        getCategories()
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error("Veriler çekilirken hata:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryNames = (categoryIds: string[]) => {
    return categoryIds
      .map(id => categories.find(c => c.id === id)?.name)
      .filter(Boolean)
      .join(", ");
  };

  const openAddModal = () => {
    setEditingId(null);
    setName("");
    setDescription("");
    setPrice(0);
    setOrder(products.length > 0 ? products[products.length - 1].order + 1 : 1);
    setIsAvailable(true);
    setSelectedCategories([]);
    setImageUrl("");
    setIsModalOpen(true);
  };

  const openEditModal = (prod: Product) => {
    setEditingId(prod.id);
    setName(prod.name);
    setDescription(prod.description);
    setPrice(prod.price);
    setOrder(prod.order);
    setIsAvailable(prod.isAvailable);
    setSelectedCategories(prod.categoryIds || []);
    setImageUrl(prod.imageUrl || "");
    setIsModalOpen(true);
  };

  const handleDelete = async (prod: Product) => {
    if (confirm(`"${prod.name}" ürününü silmek istediğinize emin misiniz?`)) {
      try {
        await deleteProduct(prod.id);
        fetchData();
      } catch (error) {
        console.error("Hata:", error);
      }
    }
  };

  const handleCategoryToggle = (catId: string) => {
    setSelectedCategories(prev => 
      prev.includes(catId) 
        ? prev.filter(id => id !== catId)
        : [...prev, catId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    if (selectedCategories.length === 0) {
      alert("Lütfen en az bir kategori seçin.");
      setSaving(false);
      return;
    }

    try {
      const productData = {
        name,
        description,
        price,
        order,
        isAvailable,
        categoryIds: selectedCategories,
        imageUrl
      };

      if (editingId) {
        await updateProduct(editingId, productData);
      } else {
        await addProduct(productData);
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      console.error("Kaydetme hatası:", error);
      alert("Bir hata oluştu, lütfen tekrar deneyin.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-heading font-bold text-stone-800">Ürünler</h1>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-medium hover:bg-orange-600 transition-colors shadow-sm"
        >
          <Plus className="h-5 w-5" />
          Yeni Ürün Ekle
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
        {loading ? (
          <div className="p-12 flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : products.length === 0 ? (
          <div className="p-12 text-center text-stone-500">
            Henüz ürün eklenmemiş. "Yeni Ürün Ekle" butonuyla ilk ürününüzü oluşturun.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-100">
                  <th className="px-6 py-4 font-semibold text-sm text-stone-600 w-20">Görsel</th>
                  <th className="px-6 py-4 font-semibold text-sm text-stone-600">Ürün Adı</th>
                  <th className="px-6 py-4 font-semibold text-sm text-stone-600">Kategoriler</th>
                  <th className="px-6 py-4 font-semibold text-sm text-stone-600">Fiyat</th>
                  <th className="px-6 py-4 font-semibold text-sm text-stone-600 w-32">Durum</th>
                  <th className="px-6 py-4 font-semibold text-sm text-stone-600 text-right w-32">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {products.map((prod) => (
                  <tr key={prod.id} className="border-b border-stone-50 hover:bg-stone-50/50 transition-colors">
                    <td className="px-6 py-4">
                      {prod.imageUrl ? (
                        <div className="w-12 h-12 rounded-lg bg-stone-100 overflow-hidden relative">
                          <img src={prod.imageUrl} alt={prod.name} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-stone-100 flex items-center justify-center text-stone-400">
                          <ImageIcon className="h-5 w-5" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-stone-900">{prod.name}</div>
                      <div className="text-xs text-stone-500 line-clamp-1">{prod.description}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-stone-600">
                      {getCategoryNames(prod.categoryIds) || "-"}
                    </td>
                    <td className="px-6 py-4 font-bold text-stone-900">
                      {prod.price} ₺
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${prod.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {prod.isAvailable ? 'Stokta' : 'Tükendi'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => openEditModal(prod)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Düzenle">
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDelete(prod)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Sil">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm overflow-y-auto pt-20 pb-20">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden transform transition-all my-auto">
            <div className="px-6 py-4 border-b border-stone-100 flex justify-between items-center bg-stone-50/50 sticky top-0 z-10">
              <h3 className="font-heading font-bold text-xl text-stone-800">{editingId ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-600 transition-colors bg-white rounded-full p-1 shadow-sm">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-1.5">Ürün Adı</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-1.5">Fiyat (₺)</label>
                    <input
                      type="number"
                      required
                      step="0.01"
                      min="0"
                      value={price || ""}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-1.5">Sıralama</label>
                    <input
                      type="number"
                      required
                      value={order}
                      onChange={(e) => setOrder(Number(e.target.value))}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-stone-900"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-1.5">Kategoriler (En az 1 tane)</label>
                    <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 max-h-48 overflow-y-auto space-y-2">
                      {categories.map(cat => (
                        <label key={cat.id} className="flex items-center gap-3 p-2 hover:bg-white rounded-lg cursor-pointer transition-colors">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(cat.id)}
                            onChange={() => handleCategoryToggle(cat.id)}
                            className="w-4 h-4 text-primary rounded border-stone-300 focus:ring-primary"
                          />
                          <span className="text-sm font-medium text-stone-700">{cat.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-1.5">Görsel URL (İsteğe Bağlı)</label>
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://ornek.com/resim.jpg"
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-stone-900"
                    />
                    {imageUrl && (
                      <div className="mt-3 flex items-start gap-2">
                        <img src={imageUrl} alt="Preview" className="h-16 w-16 object-cover rounded-lg border border-stone-200 bg-stone-100" onError={(e) => e.currentTarget.style.display = 'none'} />
                        <span className="text-xs text-stone-500 mt-1">Önizleme</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1.5">Açıklama (İçerik, porsiyon vb.)</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-stone-900 resize-none"
                />
              </div>

              <div className="flex items-center gap-3 p-4 bg-stone-50 rounded-xl border border-stone-100">
                <input
                  type="checkbox"
                  id="isAvailable"
                  checked={isAvailable}
                  onChange={(e) => setIsAvailable(e.target.checked)}
                  className="w-5 h-5 text-primary rounded border-stone-300 focus:ring-primary"
                />
                <label htmlFor="isAvailable" className="font-semibold text-stone-700 cursor-pointer select-none">
                  Stokta Var (Menüde Görünür)
                </label>
              </div>

              <div className="pt-4 flex gap-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-3 text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-xl font-semibold transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 px-4 py-3 text-white bg-primary hover:bg-orange-600 rounded-xl font-semibold transition-colors disabled:opacity-70 flex justify-center items-center gap-2 shadow-md shadow-orange-500/20"
                >
                  {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : (editingId ? 'Güncelle' : 'Kaydet')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
