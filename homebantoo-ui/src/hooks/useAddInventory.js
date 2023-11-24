import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useAddInventory = () => {
  const { userID } = useGetUserInfo();
  const InventoryCollectionRef = collection(db, 'users',userID, 'inventory');
  
  const addInventory = async({name, quantity, expired}) => {
    console.log('expired : ' +expired);
    expired = Timestamp.fromDate(new Date(expired));
    console.log('after : ' +expired);
    await addDoc(InventoryCollectionRef, {name, quantity, expired });
  };
  return { addInventory };
}