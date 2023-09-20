import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import firebase_app from "./config";

export const db = getFirestore(firebase_app);
const orderCollection = collection(db, "orders");
const productCollection = collection(db, "products");

const getAllOrders = async () => {
  try {
    const readOrderCollection = await getDocs(orderCollection);
    if (readOrderCollection.docs.length > 0) {
      return readOrderCollection;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
  }
};

const getOrdersByStatus = async (status: string) => {
  try {
    const orderQuery = query(orderCollection, where("status", "==", status));
    const fetchOrderQuery = await getDocs(orderQuery);
    if (fetchOrderQuery.docs.length > 0) {
      return fetchOrderQuery;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
  }
};

const getOrderById = async (id: string) => {
  try {
    const getOrderDoc = await getDoc(doc(db, "orders", id));
    if (getOrderDoc.exists()) {
      return getOrderDoc.data();
    } else {
      return {};
    }
  } catch (error) {
    console.error(error);
  }
};

const createOrder = async (payload: any) => {
  try {
    const request = { ...payload, created_at: serverTimestamp() };
    const createOrderDoc = await addDoc(orderCollection, request);
    const docId = createOrderDoc.id;
    await updateDoc(doc(orderCollection, docId), {
      id: docId,
    });
  } catch (error) {
    console.error(error);
  }
};

const updateOrderById = async (payload: any) => {
  try {
    const updateOrderDoc = await updateDoc(
      doc(orderCollection, payload.id),
      payload
    );
    return updateOrderDoc;
  } catch (error) {
    console.error(error);
  }
};

const getAllProducts = async () => {
  try {
    const readProductCollection = await getDocs(productCollection);
    if (readProductCollection.docs.length > 0) {
      return readProductCollection;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
  }
};

const createProduct = async (payload: any) => {
  try {
    const createProductDoc = await addDoc(productCollection, payload);
    const docId = createProductDoc.id;
    await updateDoc(doc(productCollection, docId), {
      id: docId,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error(error);
  }
};

const updateProductById = async (payload: any) => {
  try {
    const updateProductDoc = await updateDoc(
      doc(productCollection, payload.id),
      payload
    );
    return updateProductDoc;
  } catch (error) {
    console.error(error);
  }
};

const deleteProductById = async (payload: any) => {
  try {
    await deleteDoc(doc(productCollection, payload.id));
  } catch (error) {
    console.error(error);
  }
};

export {
  getAllOrders,
  getOrdersByStatus,
  getOrderById,
  createOrder,
  updateOrderById,
  getAllProducts,
  createProduct,
  updateProductById,
  deleteProductById,
};
