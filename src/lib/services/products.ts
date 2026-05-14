import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore";

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

export const addProduct = async (product: Omit<Product, "id">) => {
  return await addDoc(collection(db, COLLECTION_NAME), product);
};

export const updateProduct = async (id: string, data: Partial<Omit<Product, "id">>) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  return await updateDoc(docRef, data);
};

export const deleteProduct = async (id: string) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  return await deleteDoc(docRef);
};
