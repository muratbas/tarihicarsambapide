import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore";

export interface Category {
  id: string;
  name: string;
  order: number;
  isActive: boolean;
}

const COLLECTION_NAME = "categories";

export const getCategories = async (): Promise<Category[]> => {
  const q = query(collection(db, COLLECTION_NAME), orderBy("order", "asc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Category));
};

export const addCategory = async (category: Omit<Category, "id">) => {
  return await addDoc(collection(db, COLLECTION_NAME), category);
};

export const updateCategory = async (id: string, data: Partial<Omit<Category, "id">>) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  return await updateDoc(docRef, data);
};

export const deleteCategory = async (id: string) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  return await deleteDoc(docRef);
};
