const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const listingsRouter = require('./src/routes/listings');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Monster High Finder API is running' });
});

// Use the listings router for all routes starting with /api/listings
app.use('/api/listings', listingsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 