import { ListItem, Button,  } from "@chakra-ui/react";
import { daysUntillExpired } from "../utils/utils";
import { useState } from "react";
import { useDeleteInventory } from "../hooks/useDeleteInventory";

export function InventoryItem ({name, quantity, expired, id}) {
  const [deleteLoading, setDeleteIsLoading] = useState(false);
  const { deleteInventoryItem } = useDeleteInventory();

  const onDeleteItem = async (itemId) => {
    setDeleteIsLoading(true);
    try {
      await deleteInventoryItem(itemId)
      alert('success delete item');
    } catch (error) {
      setDeleteIsLoading(false);
      console.error('Error deleting inventory item:', error);
      alert(error.message);
    }
  };

  const onUpdateItem = async (itemId, newName, newExpirationDate) => {
    try {
      // await axios.put(`/api/inventory/${itemId}`, {
      //   name: newName,
      //   expirationDate: newExpirationDate,
      // });
      // // Fetch inventory items after updating item
      // const response = await axios.get('/api/inventory');
      // setInventoryItems(response.data);
    } catch (error) {
      console.error('Error updating inventory item:', error);
    }
  };

  return(
    <ListItem key={id} mb={2}>
            {name} - Expiration Date: {expired}{' expired in '} {daysUntillExpired(expired)} days
            <Button isLoading={deleteLoading} colorScheme="red" size="sm" onClick={() => onDeleteItem(id)}>
              Delete
            </Button>{' '}
            <Button
              colorScheme="teal"
              size="sm"
              onClick={() => {
                const newName = prompt('Enter the new name:');
                const newExpirationDate = prompt('Enter the new expiration date:');
                onUpdateItem(id, newName, newExpirationDate);
              }}
            >
              Update
            </Button>
          </ListItem>
  )
}