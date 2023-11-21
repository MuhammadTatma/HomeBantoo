const mongoose = require('mongoose');

const inventoryItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
});

const InventoryItem = mongoose.model('InventoryItem', inventoryItemSchema);

module.exports = InventoryItem;
