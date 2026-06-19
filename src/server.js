const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const productsPath = path.join(__dirname, '..', 'data', 'products.json');

const getProducts = () => {
  try {
    const data = fs.readFileSync(productsPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erreur lors de la lecture des produits:', error);
    return [];
  }
};

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

const getPaginatedResponse = (products, req) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.max(1, parseInt(req.query.limit) || 10);
  
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  
  const paginatedData = products.slice(startIndex, endIndex);
  
  return {
    data: paginatedData,
    pagination: {
      page: page,
      limit: limit,
      total: products.length,
      totalPages: Math.ceil(products.length / limit)
    }
  };
};

app.get('/products', (req, res) => {
  const products = getProducts();
  const responsePayload = getPaginatedResponse(products, req);
  res.setHeader('Content-Type', 'application/json');
  res.json(responsePayload);
});

app.get('/products.json', (req, res) => {
  const products = getProducts();
  const responsePayload = getPaginatedResponse(products, req);
  res.setHeader('Content-Type', 'application/json');
  res.json(responsePayload);
});

app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`🚀 Serveur Fake Production démarré avec succès !`);
  console.log(`📡 URL Locale : http://localhost:${PORT}`);
  console.log(`📦 Endpoint API : http://localhost:${PORT}/products`);
  console.log(`=================================================`);
});
