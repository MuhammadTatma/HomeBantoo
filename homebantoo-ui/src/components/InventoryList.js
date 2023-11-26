import React, { useState, useEffect } from 'react';
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
  AlertDialogFooter, useDisclosure, Modal, ModalOverlay, FormControl, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Input, FormLabel, ModalFooter,
  Flex,
  Spinner, // Import Spinner from Chakra UI
} from '@chakra-ui/react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useGetInventory } from '../hooks/useGetInventory';
import { useDeleteInventory, useUpdateItem } from '../hooks/useDeleteInventory';
import { useRef } from 'react';
import { RecommendationList } from './RecommendationList';
import { updateDoc, Doc } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';


const InventoryList = () => {
  const { inventory } = useGetInventory();
  const { deleteInventoryItem } = useDeleteInventory();
  const { updateItem } = useUpdateItem();
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editItem, setEditItem]= useState({});
  const [isLoading, setIsLoading] = useState(true); // New state for loading
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expired, setExpired] = useState('');


  useEffect(() => {
    // Simulating an asynchronous operation (e.g., fetching recommendations)
    const fetchData = async () => {
      // Assume your fetch operation here
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating a delay
      setIsLoading(false);
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect runs once on mount



  const onCloseAlert = () => {
    setIsAlertOpen(false);
  };

  const onDeleteConfirmed = () => {
    if (deleteItemId) {
      deleteInventoryItem(deleteItemId);
      setIsAlertOpen(false);
    }
  };

const onEditConfirmed = () => {
  try{
    updateItem(editItem.id, itemName, quantity, expired)
    alert('berhasil')
  }catch(e){
    alert(e);
  }
  onClose();
}



  const handleDelete = (id) => {
    setDeleteItemId(id);
    setIsAlertOpen(true);
  };

  const handleUpdate = (item) => {
    setEditItem(item);
    console.log(editItem);
    onOpen();
  };

  const cancelRef = useRef();

  return (
    <Flex direction={['column', 'row']} wrap="wrap" gap={4}>
      <Box flex="1" minW={['100%', '60%']} mb={[4, 0]}>
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
            {isLoading ? ( // Display loading spinner when isLoading is true
              <Tr>
                <Td colSpan="4" textAlign="center">
                  <Spinner size="lg" />
                </Td>
              </Tr>
            ) : (
              // Display inventory items when isLoading is false
              inventory.map((item) => (
                <Tr key={item.id}>
                  <Td>{item.name}</Td>
                  <Td>{item.quantity}</Td>
                  <Td>{item.expired}</Td>
                  <Td>
                    <IconButton
                      icon={<FaEdit />}
                      colorScheme="teal"
                      onClick={() => handleUpdate(item)}
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
              ))
            )}
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

        {/* Edit Modal */}
        <Modal
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Item</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input onChange={(e) => {setItemName(e.target.value)}} placeholder='First name' defaultValue={editItem?.name} />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Quantity</FormLabel>
                <Input onChange={(e) => {setQuantity(e.target.value)}} type="number" placeholder={0} defaultValue={editItem?.quantity} />
              </FormControl>

              <FormControl>
                <FormLabel width={'110px'}>Expired Date:</FormLabel>
                <Input                 
                  onChange={(e) => {setExpired(e.target.value)}} 
                  placeholder="Select Date and Time"
                  type="date"
                />
              </FormControl>

            </ModalBody>

            <ModalFooter>
              <Button onClick={onEditConfirmed} colorScheme='blue' mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
      <RecommendationList />
    </Flex>
  );
};

export default InventoryList;
