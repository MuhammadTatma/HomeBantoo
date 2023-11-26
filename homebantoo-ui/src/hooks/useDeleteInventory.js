import { doc, deleteDoc, updateDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useDeleteInventory = () => {
  const { userID } = useGetUserInfo();
  
  const deleteInventoryItem = async(docID) => {
    const InventoryDocumentRef = doc(db, 'users',userID, 'inventory', docID);
    await deleteDoc(InventoryDocumentRef);
  };
  return { deleteInventoryItem };
}

export const useUpdateItem = () => {
  const { userID } = useGetUserInfo();

  const updateItem = async (docId, name, quantity, expired) => {
    const InventoryDocumentRef = doc(db, 'users',userID, 'inventory', docId);
    await updateDoc(InventoryDocumentRef, {name: name, quantity: quantity,  expired : Timestamp.fromDate(new Date(expired))} );
  };

  return { updateItem };
}