const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');
const dataDir = path.join(__dirname, '..', 'data');
const distDir = path.join(__dirname, '..', 'dist');

console.log('🧹 Nettoyage et création du dossier de build statique (dist)...');

if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir);

const productsJsonPath = path.join(dataDir, 'products.json');
if (!fs.existsSync(productsJsonPath)) {
  console.error('❌ Erreur : data/products.json est introuvable.');
  process.exit(1);
}
const productsRaw = fs.readFileSync(productsJsonPath, 'utf8');
const productsList = JSON.parse(productsRaw);

const staticResponse = {
  data: productsList,
  pagination: {
    page: 1,
    limit: productsList.length,
    total: productsList.length,
    totalPages: 1
  }
};

const finalJsonString = JSON.stringify(staticResponse, null, 2);

// Endpoint principal
fs.writeFileSync(path.join(distDir, 'products.json'), finalJsonString);
console.log('✅ Fichier dist/products.json généré.');

// Endpoint alternatif sous forme de sous-dossier
const productsSubDir = path.join(distDir, 'products');
fs.mkdirSync(productsSubDir, { recursive: true });
fs.writeFileSync(path.join(productsSubDir, 'index.json'), finalJsonString);
console.log('✅ Fichier dist/products/index.json généré.');

const indexHtmlPath = path.join(srcDir, 'public', 'index.html');
if (fs.existsSync(indexHtmlPath)) {
  fs.copyFileSync(indexHtmlPath, path.join(distDir, 'index.html'));
  console.log('✅ Fichier dist/index.html copié.');
} else {
  console.error('⚠️ Warning: src/public/index.html non trouvé.');
}

fs.writeFileSync(path.join(distDir, '.nojekyll'), '');
console.log('✅ Fichier dist/.nojekyll créé.');

console.log('\n✨ Build statique terminé avec succès dans le dossier /dist !');
console.log('🚀 Prêt à être déployé sur GitHub Pages.');
