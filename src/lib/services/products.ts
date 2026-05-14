import { db, storage } from "@/lib/firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

export interface Product {
  id: string;
  categoryIds: string[];
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isAvailable: boolean;
  order: number;
}

const COLLECTION_NAME = "products";

export const getProducts = async (): Promise<Product[]> => {
  const q = query(collection(db, COLLECTION_NAME), orderBy("order", "asc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
};

export const addProduct = async (product: Omit<Product, "id" | "imageUrl">, imageFile?: File) => {
  let imageUrl = "";
  if (imageFile) {
    imageUrl = await uploadImage(imageFile);
  }
  return await addDoc(collection(db, COLLECTION_NAME), { ...product, imageUrl });
};

export const updateProduct = async (id: string, data: Partial<Omit<Product, "id" | "imageUrl">>, imageFile?: File, oldImageUrl?: string) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  let imageUrl = oldImageUrl || "";
  
  if (imageFile) {
    if (oldImageUrl) {
      await deleteImage(oldImageUrl);
    }
    imageUrl = await uploadImage(imageFile);
  }
  
  return await updateDoc(docRef, { ...data, imageUrl });
};

export const deleteProduct = async (id: string, imageUrl?: string) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  if (imageUrl) {
    await deleteImage(imageUrl);
  }
  return await deleteDoc(docRef);
};

export const uploadImage = async (file: File): Promise<string> => {
  const fileRef = ref(storage, `products/${Date.now()}_${file.name}`);
  await uploadBytes(fileRef, file);
  return await getDownloadURL(fileRef);
};

export const deleteImage = async (imageUrl: string) => {
  if (!imageUrl.includes("firebase")) return; // Only delete if it's a firebase storage url
  try {
    const fileRef = ref(storage, imageUrl);
    await deleteObject(fileRef);
  } catch (error) {
    console.error("Görsel silinirken hata:", error);
  }
};
