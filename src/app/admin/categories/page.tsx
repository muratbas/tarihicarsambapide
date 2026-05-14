"use client";

import { useState, useEffect } from "react";
import { Category, getCategories, addCategory, updateCategory, deleteCategory } from "@/lib/services/categories";
import { Plus, Edit2, Trash2, X, Loader2 } from "lucide-react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Form state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [order, setOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Kategoriler çekilirken hata:", error);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setName("");
    setOrder(categories.length > 0 ? categories[categories.length - 1].order + 1 : 1);
    setIsActive(true);
    setIsModalOpen(true);
  };

  const openEditModal = (cat: Category) => {
    setEditingId(cat.id);
    setName(cat.name);
    setOrder(cat.order);
    setIsActive(cat.isActive);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Bu kategoriyi silmek istediğinize emin misiniz?")) {
      try {
        await deleteCategory(id);
        fetchCategories();
      } catch (error) {
        console.error("Hata:", error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      if (editingId) {
        await updateCategory(editingId, { name, order, isActive });
      } else {
        await addCategory({ name, order, isActive });
      }
      setIsModalOpen(false);
      fetchCategories();
    } catch (error) {
      console.error("Kaydetme hatası:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-heading font-bold text-stone-800">Kategoriler</h1>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-medium hover:bg-orange-600 transition-colors shadow-sm"
        >
          <Plus className="h-5 w-5" />
          Yeni Ekle
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
        {loading ? (
          <div className="p-12 flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : categories.length === 0 ? (
          <div className="p-12 text-center text-stone-500">
            Henüz kategori eklenmemiş. "Yeni Ekle" butonuyla ilk kategorinizi oluşturun.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-100">
                  <th className="px-6 py-4 font-semibold text-sm text-stone-600 w-24">Sıra</th>
                  <th className="px-6 py-4 font-semibold text-sm text-stone-600">Kategori Adı</th>
                  <th className="px-6 py-4 font-semibold text-sm text-stone-600 w-32">Durum</th>
                  <th className="px-6 py-4 font-semibold text-sm text-stone-600 text-right w-32">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat.id} className="border-b border-stone-50 hover:bg-stone-50/50 transition-colors">
                    <td className="px-6 py-4 text-stone-600 font-medium">{cat.order}</td>
                    <td className="px-6 py-4 font-semibold text-stone-900">{cat.name}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${cat.isActive ? 'bg-green-100 text-green-700' : 'bg-stone-100 text-stone-600'}`}>
                        {cat.isActive ? 'Aktif' : 'Pasif'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => openEditModal(cat)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Düzenle">
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDelete(cat.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Sil">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
            <div className="px-6 py-4 border-b border-stone-100 flex justify-between items-center bg-stone-50/50">
              <h3 className="font-heading font-bold text-xl text-stone-800">{editingId ? 'Kategori Düzenle' : 'Yeni Kategori Ekle'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-600 transition-colors bg-white rounded-full p-1 shadow-sm">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1.5">Kategori Adı</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-stone-900"
                  placeholder="Örn: İçecekler, Tatlılar..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1.5">Sıralama (Küçükten Büyüğe)</label>
                <input
                  type="number"
                  required
                  value={order}
                  onChange={(e) => setOrder(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-stone-900"
                />
                <p className="text-xs text-stone-500 mt-1.5">Kategorilerin menüde hangi sırayla görüneceğini belirler (1, 2, 3...)</p>
              </div>

              <div className="flex items-center gap-3 pt-2 p-4 bg-stone-50 rounded-xl border border-stone-100">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-5 h-5 text-primary rounded border-stone-300 focus:ring-primary"
                />
                <label htmlFor="isActive" className="font-semibold text-stone-700 cursor-pointer select-none">
                  Kategoriyi Menüde Göster (Aktif)
                </label>
              </div>

              <div className="pt-4 flex gap-3">
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
