"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin");
    } catch (err: any) {
      setError("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-black/5 p-8 relative overflow-hidden">
        {/* Decorative background circle */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
        
        <div className="text-center mb-8 relative z-10">
          <Link href="/" className="inline-block mb-6">
            <div className="bg-primary text-white p-3 rounded-2xl text-2xl font-heading font-bold shadow-md transform hover:scale-105 transition-transform">
              TÇ
            </div>
          </Link>
          <h1 className="text-3xl font-heading font-bold text-stone-900 mb-2">Yönetici Girişi</h1>
          <p className="text-stone-500">Admin paneline erişmek için giriş yapın</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5 relative z-10">
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1.5">E-posta Adresi</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <Mail className="h-5 w-5" />
              </div>
              <input
                type="email"
                required
                className="block w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="ornek@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1.5">Şifre</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <Lock className="h-5 w-5" />
              </div>
              <input
                type="password"
                required
                className="block w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3.5 rounded-xl font-semibold hover:bg-orange-600 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-orange-500/20"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                Giriş Yap
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>
        </form>
        
        <div className="mt-8 text-center relative z-10">
          <Link href="/" className="text-sm text-stone-500 hover:text-primary font-medium transition-colors">
            ← Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
}
