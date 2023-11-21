const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios'); // Pindahkan impor ini ke atas
const InventoryItem = require('./models/InventoryItem');
const app = express();
const port = process.env.PORT || 4000
const cors = require('cors');


mongoose.connect('mongodb://localhost/homebantoo', { useNewUrlParser: true, useUnifiedTopology: true });
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, 
};
app.use(cors());

app.use(express.json());

// Endpoint untuk menambahkan item inventaris
app.post('/api/inventory', async (req, res) => {
  try {
    const { name, quantity, expirationDate } = req.body;
    const inventoryItem = new InventoryItem({ name, quantity, expirationDate });
    await inventoryItem.save();
    res.status(201).json(inventoryItem);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint untuk mendapatkan semua item inventaris
app.get('/api/inventory', async (req, res) => {
  try {
    const inventoryItems = await InventoryItem.find();
    res.json(inventoryItems);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint untuk menghapus item inventaris berdasarkan id

app.delete('/api/inventory/:id', async (req, res) => {
  const itemId = req.params.id;

  console.log('Deleting item with ID:', itemId); // Add this line

  try {
    const deletedItem = await InventoryItem.findByIdAndDelete(itemId);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json({ message: 'Item deleted successfully', deletedItem });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint untuk mengupdate item inventaris berdasarkan id
// Example route for updating an inventory item
app.put('/api/inventory/:id', async (req, res) => {
  const itemId = req.params.id;
  const { name, expirationDate } = req.body;

  try {
    // Find the inventory item by ID and update it
    const updatedItem = await InventoryItem.findByIdAndUpdate(
      itemId,
      { name, expirationDate },
      { new: true } // Return the updated item
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json({ message: 'Item updated successfully', updatedItem });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


// Endpoint untuk mendapatkan pemberitahuan bahan makanan yang hampir kadaluarsa
app.get('/api/expiring-soon', async (req, res) => {
  try {
    // Tampilkan bahan makanan yang akan kadaluarsa dalam 3 hari ke depan
    const currentDate = new Date();
    const thresholdDate = new Date(currentDate);
    thresholdDate.setDate(currentDate.getDate() + 3);

    const expiringSoonItems = await InventoryItem.find({
      expirationDate: { $lte: thresholdDate }
    });

    res.json(expiringSoonItems);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint untuk mencari resep berdasarkan bahan-bahan yang dimiliki pengguna

app.get('/api/search-recipes', async (req, res) => {
  try {
    // Ambil bahan makanan dari inventaris pengguna
    const allItems = await InventoryItem.find();
    const ingredients = allItems.map(item => item.name).join(',');

    // Gunakan Spoonacular API untuk mencari resep berdasarkan bahan
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=5&apiKey=f74cd035d91a4a079f88b50e5e0716aa`
    );

    const recipes = response.data;
    res.json(recipes);
  } catch (error) {
    console.error(error);

    // Tambahkan kode untuk menangani kesalahan Spoonacular API
    if (error.response) {
      // Kesalahan dari server Spoonacular (non-2xx response)
      console.error('Spoonacular API Error:', error.response.status, error.response.data);
      res.status(error.response.status).json({ message: 'Spoonacular API Error' });
    } else if (error.request) {
      // Tidak ada respons dari server Spoonacular
      console.error('No response from Spoonacular API');
      res.status(500).send('Internal Server Error');
    } else {
      // Kesalahan lainnya
      console.error('Other error', error.message);
      res.status(500).send('Internal Server Error');
    }
  }
});


// Add a simple route handler for the root path
app.get('/', (req, res) => {
  res.send('Welcome to the Homebantoo API!');
});











app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
