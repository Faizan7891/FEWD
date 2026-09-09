const fs = require('fs');
const path = require('path');

const filesToCheck = [
    'src/pages/Products.jsx',
    'src/pages/ProductDetails.jsx',
    'src/pages/Orders.jsx',
    'src/pages/OrderDetails.jsx',
    'src/pages/Home.jsx',
    'src/pages/Checkout.jsx',
    'src/pages/Cart.jsx',
    'src/components/ProductCard.jsx'
];

for (const filepath of filesToCheck) {
    const fullPath = path.join(__dirname, filepath);
    if (!fs.existsSync(fullPath)) continue;
    
    let content = fs.readFileSync(fullPath, 'utf-8');
    
    // Replace $ followed by numbers
    content = content.replace(/\$([0-9]+)/g, '₹$1');
    
    // Replace ${} for specific variables, converting \$ to ₹
    content = content.replace(/\$\{((?:product|item|order)\.(?:price|originalPrice)[^}]*)\}/g, '₹{$1}');
    content = content.replace(/\$\{(subtotal|tax|total|shipping)[^}]*\}/g, '₹{$1}');
    
    // Edge cases like in Cart
    content = content.replace(/\>\$\</g, '>₹<');
    content = content.replace(/\\?\$\$\{/g, '₹${');
    content = content.replace(/\\?\$\{\(/g, '₹{(');
    content = content.replace(/\$\{([^}]*(?:price|total|tax|subtotal|shipping)[^}]*)\}/g, '₹{$1}');
    content = content.replace(/\$\{([0-9.]+)\}/g, '₹{$1}');
    content = content.replace(/\$\{(500 - subtotal)[^}]*\}/g, '₹{$1}'); // Free shipping calc
    
    fs.writeFileSync(fullPath, content);
}

// Update prices in products.js
const productsPath = path.join(__dirname, 'src/data/products.js');
let productsContent = fs.readFileSync(productsPath, 'utf-8');
productsContent = productsContent.replace(/(price:\s*)([0-9.]+)(,)/g, (match, p1, p2, p3) => {
    return p1 + Math.round(parseFloat(p2) * 80) + p3;
});
productsContent = productsContent.replace(/(originalPrice:\s*)([0-9.]+)(,)/g, (match, p1, p2, p3) => {
    return p1 + Math.round(parseFloat(p2) * 80) + p3;
});
fs.writeFileSync(productsPath, productsContent);

console.log("Currency updated!");
