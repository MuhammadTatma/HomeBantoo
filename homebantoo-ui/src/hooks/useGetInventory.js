
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";
import { collection, orderBy, query, onSnapshot } from "firebase/firestore";

export const useGetInventory = () => {
  const [inventory, setInventory] = useState([]);


  const { userID } = useGetUserInfo();
  const inventoryCollectionRef = collection(db, 'users', userID, 'inventory');

  const getInventory = async () => {
    let unsubscribe;
    try {
      const queryInventory = query(inventoryCollectionRef, orderBy('expired'));

      unsubscribe = onSnapshot(queryInventory, (snapshot) => {
        let docs = [];
        let ingredients = '';

        snapshot.forEach((doc)=>{
          const data = doc.data();
          const id = doc.id;
          docs.push({ ...data, id, expired : data.expired.toDate().toDateString() });

          ingredients = ingredients + `${data.name}, `;
          // console.log(ingredients);

          //data bisa tambah property isExpiredTomoro disini
          //data.expiredTomorrow = isExpiredTomorrow(data.expired);

        })
        setInventory(docs);
      })
    }catch(e){
      alert(e.message)
    }

    return () => unsubscribe();
  };

  useEffect(() => {
    getInventory();
  })

  return {inventory};
}