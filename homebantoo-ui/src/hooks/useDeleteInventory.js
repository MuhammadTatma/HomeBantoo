import { doc, deleteDoc } from "firebase/firestore";
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