import React from 'react';
import {
  Box,
  Button,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { InventoryItem } from './InventoryItem';
import { useGetInventory } from '../hooks/useGetInventory';
import { useDeleteInventory } from '../hooks/useDeleteInventory';
import { daysUntillExpired } from '../utils/utils';
import { useRef, useState } from 'react';

const InventoryList = () => {
  const { inventory } = useGetInventory();
  const { deleteInventoryItem } = useDeleteInventory();
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const onCloseAlert = () => {
    setIsAlertOpen(false);
  };

  const onDeleteConfirmed = () => {
    if (deleteItemId) {
      deleteInventoryItem(deleteItemId);
      setIsAlertOpen(false);
    }
  };

  const handleDelete = (id) => {
    setDeleteItemId(id);
    setIsAlertOpen(true);
  };

  const handleUpdate = (id) => {
    // Implement your update logic here
    console.log(`Update item with ID: ${id}`);
  };

  const cancelRef = useRef();

  return (
    <Box>
      <Heading as="h2" size="lg" mb={4}>
        Inventory List
      </Heading>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Item Name</Th>
            <Th>Quantity</Th>
            <Th>Expiration Date</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {inventory.map((item) => (
            <Tr key={item.id}>
              <Td>{item.name}</Td>
              <Td>{item.quantity}</Td>
              <Td>{item.expired}</Td>
              <Td>
                <IconButton
                  icon={<FaEdit />}
                  colorScheme="teal"
                  onClick={() => handleUpdate(item.id)}
                  aria-label="Edit"
                  mr={2}
                />
                <IconButton
                  icon={<FaTrash />}
                  colorScheme="red"
                  onClick={() => handleDelete(item.id)}
                  aria-label="Delete"
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Delete Confirmation Alert */}
      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={onCloseAlert}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Item
            </AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              Are you sure you want to delete this item?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseAlert}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onDeleteConfirmed} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default InventoryList;
