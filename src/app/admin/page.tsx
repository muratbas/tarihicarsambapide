export default function AdminDashboard() {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-heading font-bold text-stone-800 mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Simple Stats Cards */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
          <h3 className="text-stone-500 font-medium mb-2">Toplam Kategori</h3>
          <p className="text-4xl font-heading font-bold text-stone-800">-</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
          <h3 className="text-stone-500 font-medium mb-2">Toplam Ürün</h3>
          <p className="text-4xl font-heading font-bold text-stone-800">-</p>
        </div>
      </div>
      
      <div className="mt-12 bg-white rounded-2xl p-8 shadow-sm border border-stone-100 text-center">
        <h2 className="text-xl font-heading font-bold text-stone-800 mb-2">Hoş Geldiniz</h2>
        <p className="text-stone-500">
          Sol menüyü kullanarak kategorilerinizi ve ürünlerinizi yönetmeye başlayabilirsiniz.
        </p>
      </div>
    </div>
  );
}
