export const categories = [
  "Electronics",
  "Fashion",
  "Shoes",
  "Accessories",
  "Beauty",
  "Home"
];

export const products = [
  // Electronics
  {
    id: "elec-1",
    name: "AeroNoise Pro Noise Cancelling Headphones",
    category: "Electronics",
    brand: "Aero",
    price: 299.99,
    originalPrice: 349.99,
    discount: 14,
    rating: 4.8,
    reviewCount: 1245,
    stock: 45,
    description: "Experience pure audio with our industry-leading noise cancellation technology. Features 30-hour battery life and supreme comfort for all-day wear.",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: ["Black", "Silver", "Midnight Blue"],
    sizes: [],
    specifications: {
      "Battery Life": "30 Hours",
      "Connectivity": "Bluetooth 5.2",
      "Weight": "250g",
      "Water Resistance": "IPX4"
    },
    featured: true,
    bestSeller: true
  },
  {
    id: "elec-2",
    name: "Lumina 4K Smart Watch",
    category: "Electronics",
    brand: "Lumina",
    price: 199.5,
    originalPrice: 249,
    discount: 20,
    rating: 4.5,
    reviewCount: 856,
    stock: 120,
    description: "Track your fitness, receive notifications, and look stylish with the Lumina Smart Watch. Features a brilliant AMOLED display and comprehensive health sensors.",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: ["Space Gray", "Rose Gold"],
    sizes: [],
    specifications: {
      "Display": "1.4 inch AMOLED",
      "Battery Life": "7 Days",
      "Water Resistance": "5 ATM"
    },
    featured: false,
    bestSeller: false
  },
  {
    id: "elec-3",
    name: "Nexus Ultra-Slim Laptop",
    category: "Electronics",
    brand: "Nexus",
    price: 1299,
    originalPrice: 1299,
    discount: 0,
    rating: 4.9,
    reviewCount: 342,
    stock: 15,
    description: "Power meets portability. The Nexus Ultra-Slim features the latest M-series chip, a stunning Retina display, and an all-day battery in a chassis under 3 lbs.",
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: ["Silver", "Space Gray"],
    sizes: [],
    specifications: {
      "Processor": "Nexus M2",
      "RAM": "16GB Unified",
      "Storage": "512GB SSD",
      "Display": "13.6-inch Liquid Retina"
    },
    featured: true,
    bestSeller: false
  },
  {
    id: "elec-4",
    name: "SoundWave Portable Bluetooth Speaker",
    category: "Electronics",
    brand: "SoundWave",
    price: 89.99,
    originalPrice: 129.99,
    discount: 30,
    rating: 4.6,
    reviewCount: 2104,
    stock: 200,
    description: "Take your music anywhere with this rugged, waterproof portable speaker. Delivers deep bass and 360-degree sound.",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: ["Black", "Red", "Blue"],
    sizes: [],
    specifications: {
      "Battery Life": "20 Hours",
      "Waterproof": "IP67",
      "Output": "30W"
    },
    featured: false,
    bestSeller: true
  },
  {
    id: "elec-5",
    name: "VisionPro 4K Mirrorless Camera",
    category: "Electronics",
    brand: "Vision",
    price: 899,
    originalPrice: 1099,
    discount: 18,
    rating: 4.7,
    reviewCount: 432,
    stock: 8,
    description: "Capture life's moments in stunning detail with this compact mirrorless camera featuring a 24.2MP APS-C sensor and advanced autofocus.",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: ["Black"],
    sizes: [],
    specifications: {
      "Sensor": "24.2MP APS-C",
      "Video": "4K at 30fps",
      "Lens Mount": "E-Mount"
    },
    featured: false,
    bestSeller: false
  },

  // Fashion
  {
    id: "fash-1",
    name: "Essential Cotton Crewneck T-Shirt",
    category: "Fashion",
    brand: "Basics",
    price: 24.99,
    originalPrice: 24.99,
    discount: 0,
    rating: 4.4,
    reviewCount: 890,
    stock: 350,
    description: "Our signature crewneck is crafted from 100% organic cotton for a remarkably soft feel and durable wear. Pre-shrunk and garment-dyed.",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: ["White", "Black", "Navy", "Olive"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    specifications: {
      "Material": "100% Organic Cotton",
      "Fit": "Regular",
      "Care": "Machine wash cold"
    },
    featured: false,
    bestSeller: true
  },
  {
    id: "fash-2",
    name: "Classic Denim Jacket",
    category: "Fashion",
    brand: "Heritage",
    price: 89.5,
    originalPrice: 110,
    discount: 18,
    rating: 4.8,
    reviewCount: 512,
    stock: 40,
    description: "A timeless layering piece. Made with premium rigid denim that breaks in beautifully over time, featuring classic flap pockets and metallic hardware.",
    images: [
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: ["Light Wash", "Medium Wash"],
    sizes: ["S", "M", "L", "XL"],
    specifications: {
      "Material": "100% Cotton Denim",
      "Fit": "Relaxed",
      "Closure": "Button front"
    },
    featured: true,
    bestSeller: false
  },
  {
    id: "fash-3",
    name: "Merino Wool V-Neck Sweater",
    category: "Fashion",
    brand: "Luxe",
    price: 115,
    originalPrice: 150,
    discount: 23,
    rating: 4.7,
    reviewCount: 234,
    stock: 65,
    description: "Ultra-soft and lightweight, this Merino wool sweater offers perfect temperature regulation and a sophisticated drape for any occasion.",
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: ["Charcoal", "Burgundy", "Camel"],
    sizes: ["M", "L", "XL"],
    specifications: {
      "Material": "100% Extrafine Merino Wool",
      "Care": "Dry clean or hand wash"
    },
    featured: false,
    bestSeller: false
  },
  {
    id: "fash-4",
    name: "High-Waisted Yoga Leggings",
    category: "Fashion",
    brand: "AuraActive",
    price: 55,
    originalPrice: 55,
    discount: 0,
    rating: 4.9,
    reviewCount: 3102,
    stock: 120,
    description: "Designed for movement. These buttery-soft leggings feature a high, slip-free waistband and moisture-wicking four-way stretch fabric.",
    images: [
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: ["Black", "Slate", "Plum"],
    sizes: ["XS", "S", "M", "L", "XL"],
    specifications: {
      "Material": "75% Nylon, 25% Spandex",
      "Inseam": "28 inches",
      "Pockets": "Hidden waistband pocket"
    },
    featured: true,
    bestSeller: true
  },
  {
    id: "fash-5",
    name: "Tailored Linen Blazer",
    category: "Fashion",
    brand: "Sartorial",
    price: 185,
    originalPrice: 220,
    discount: 15,
    rating: 4.5,
    reviewCount: 112,
    stock: 25,
    description: "Elevate your warm-weather wardrobe with this breathable linen blazer. Features a modern unstructured fit and patch pockets.",
    images: [
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: ["Navy", "Sand"],
    sizes: ["38R", "40R", "42R", "44R"],
    specifications: {
      "Material": "100% Linen",
      "Lining": "Quarter-lined back",
      "Vents": "Double back vents"
    },
    featured: false,
    bestSeller: false
  },

  // Shoes
  {
    id: "shoe-1",
    name: "Nova Cloud Running Shoes",
    category: "Shoes",
    brand: "NovaRunner",
    price: 129.99,
    originalPrice: 149.99,
    discount: 13,
    rating: 4.6,
    reviewCount: 845,
    stock: 75,
    description: "Experience zero-gravity running with our proprietary CloudFoam midsole. Lightweight, breathable engineered mesh upper adapts to your foot.",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: ["Neon Red", "Black/White", "Volt Green"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    specifications: {
      "Type": "Neutral Running",
      "Drop": "8mm",
      "Weight": "9.2 oz"
    },
    featured: true,
    bestSeller: true
  },
  {
    id: "shoe-2",
    name: "Classic Leather Sneakers",
    category: "Shoes",
    brand: "Minimalist",
    price: 95,
    originalPrice: 95,
    discount: 0,
    rating: 4.8,
    reviewCount: 1205,
    stock: 150,
    description: "A versatile wardrobe staple. Handcrafted from premium full-grain Italian leather with a durable rubber cupsole and comfortable ortholite insole.",
    images: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: ["White", "Black"],
    sizes: ["7", "8", "8.5", "9", "9.5", "10", "11"],
    specifications: {
      "Upper": "Full-grain leather",
      "Lining": "Calfskin",
      "Sole": "Margom rubber"
    },
    featured: false,
    bestSeller: true
  },
  {
    id: "shoe-3",
    name: "Chelsea Suede Boots",
    category: "Shoes",
    brand: "Artisan",
    price: 180,
    originalPrice: 210,
    discount: 14,
    rating: 4.7,
    reviewCount: 320,
    stock: 45,
    description: "Classic British styling meets modern comfort. Featuring water-resistant suede, elastic side panels, and a Goodyear welt construction for longevity.",
    images: [
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: ["Tan", "Chocolate", "Black"],
    sizes: ["8", "9", "10", "11"],
    specifications: {
      "Material": "Water-repellent Suede",
      "Construction": "Goodyear Welt",
      "Sole": "Dainite rubber"
    },
    featured: false,
    bestSeller: false
  },
  {
    id: "shoe-4",
    name: "Pro Court Basketball Shoes",
    category: "Shoes",
    brand: "Jump",
    price: 145,
    originalPrice: 175,
    discount: 17,
    rating: 4.5,
    reviewCount: 450,
    stock: 60,
    description: "Dominate the court with explosive responsiveness and multi-directional traction. Features a lockdown fit system and ankle support.",
    images: [
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: ["Bred", "Royal Blue", "White/Gold"],
    sizes: ["8", "9", "10", "10.5", "11", "12", "13"],
    specifications: {
      "Type": "Basketball/Court",
      "Cushioning": "Air Zoom",
      "Traction": "Herringbone"
    },
    featured: false,
    bestSeller: false
  },
  {
    id: "shoe-5",
    name: "Comfort Slip-On Loafers",
    category: "Shoes",
    brand: "Lounge",
    price: 65,
    originalPrice: 80,
    discount: 18,
    rating: 4.3,
    reviewCount: 670,
    stock: 110,
    description: "Your go-to shoes for weekend errands or casual Fridays. Features a memory foam footbed and a flexible, lightweight EVA outsole.",
    images: [
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: ["Navy", "Grey", "Tan"],
    sizes: ["7", "8", "9", "10", "11"],
    specifications: {
      "Upper": "Breathable Canvas",
      "Insole": "Memory Foam",
      "Weight": "6.5 oz"
    },
    featured: false,
    bestSeller: true
  },

  // Accessories
  {
    id: "acc-1",
    name: "Classic Chronograph Watch",
    category: "Accessories",
    brand: "Chronos",
    price: 145,
    originalPrice: 195,
    discount: 25,
    rating: 4.7,
    reviewCount: 312,
    stock: 30,
    description: "A timeless timepiece featuring a precision Japanese quartz movement, genuine leather strap, and a brushed stainless steel case with stopwatch functionality.",
    images: [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: ["Brown/Silver", "Black/Gold"],
    sizes: [],
    specifications: {
      "Movement": "Japanese Quartz",
      "Case": "40mm Stainless Steel",
      "Water Resistance": "3 ATM"
    },
    featured: true,
    bestSeller: false
  },
  {
    id: "acc-2",
    name: "Polarized Aviator Sunglasses",
    category: "Accessories",
    brand: "Optima",
    price: 85,
    originalPrice: 110,
    discount: 22,
    rating: 4.8,
    reviewCount: 520,
    stock: 80,
    description: "Protect your eyes in style. These aviators feature polarized lenses to reduce glare, UV400 protection, and a lightweight alloy frame.",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: ["Gold/Green", "Silver/Blue", "Black/Grey"],
    sizes: ["Standard"],
    specifications: {
      "Lenses": "Polarized, UV400",
      "Frame Material": "Metal Alloy",
      "Lens Width": "58mm"
    },
    featured: false,
    bestSeller: true
  },
  {
    id: "acc-3",
    name: "Minimalist Leather Wallet",
    category: "Accessories",
    brand: "Hide & Co",
    price: 45,
    originalPrice: 45,
    discount: 0,
    rating: 4.9,
    reviewCount: 1105,
    stock: 150,
    description: "Ditch the bulk. This slim bifold holds up to 8 cards and cash while maintaining a low profile. RFID blocking technology keeps your data safe.",
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: ["Cognac", "Black", "Navy"],
    sizes: [],
    specifications: {
      "Material": "Full-grain Leather",
      "Capacity": "8 Cards + Bills",
      "Features": "RFID Blocking"
    },
    featured: false,
    bestSeller: true
  },
  {
    id: "acc-4",
    name: "Canvas Weekender Duffle Bag",
    category: "Accessories",
    brand: "Wanderlust",
    price: 110,
    originalPrice: 140,
    discount: 21,
    rating: 4.6,
    reviewCount: 285,
    stock: 40,
    description: "The perfect companion for short trips. Made from heavy-duty waxed canvas with leather accents, featuring a shoe compartment and padded shoulder strap.",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: ["Olive", "Charcoal", "Navy"],
    sizes: [],
    specifications: {
      "Material": "Waxed Canvas & Leather",
      "Dimensions": "22\" x 12\" x 11\"",
      "Capacity": "45L"
    },
    featured: true,
    bestSeller: false
  },
  {
    id: "acc-5",
    name: "Braided Leather Belt",
    category: "Accessories",
    brand: "Heritage",
    price: 35,
    originalPrice: 45,
    discount: 22,
    rating: 4.4,
    reviewCount: 150,
    stock: 100,
    description: "A versatile belt that pairs perfectly with denim or chinos. The woven design allows for micro-adjustments for the perfect fit.",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop" // Intentionally reusing image for demo, in reality should be different
    ],
    colors: ["Brown", "Black"],
    sizes: ["32", "34", "36", "38", "40"],
    specifications: {
      "Material": "Genuine Leather",
      "Width": "1.25 inches",
      "Buckle": "Solid Brass"
    },
    featured: false,
    bestSeller: false
  },

  // Beauty
  {
    id: "beau-1",
    name: "Hydrating Hyaluronic Acid Serum",
    category: "Beauty",
    brand: "Glow",
    price: 28,
    originalPrice: 28,
    discount: 0,
    rating: 4.8,
    reviewCount: 2340,
    stock: 300,
    description: "Plump and hydrate your skin with our pure 2% Hyaluronic Acid plus Vitamin B5. Draws moisture into the skin for a dewy, youthful glow.",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: [],
    sizes: ["30ml"],
    specifications: {
      "Skin Type": "All Skin Types",
      "Key Ingredients": "Hyaluronic Acid, Vitamin B5",
      "Formulation": "Lightweight Serum"
    },
    featured: true,
    bestSeller: true
  },
  {
    id: "beau-2",
    name: "Botanical Cleansing Oil",
    category: "Beauty",
    brand: "Naturals",
    price: 34,
    originalPrice: 40,
    discount: 15,
    rating: 4.6,
    reviewCount: 856,
    stock: 120,
    description: "Melt away makeup, sunscreen, and impurities without stripping your skin. Formulated with rosehip, jojoba, and camellia oils.",
    images: [
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: [],
    sizes: ["150ml"],
    specifications: {
      "Skin Type": "Dry to Combination",
      "Key Ingredients": "Rosehip Oil, Jojoba Oil",
      "Cruelty-Free": "Yes"
    },
    featured: false,
    bestSeller: false
  },
  {
    id: "beau-3",
    name: "Velvet Matte Lipstick",
    category: "Beauty",
    brand: "Luxe Color",
    price: 22,
    originalPrice: 22,
    discount: 0,
    rating: 4.5,
    reviewCount: 1540,
    stock: 200,
    description: "Intense color payoff with a comfortable, non-drying matte finish. Lasts up to 12 hours without feathering.",
    images: [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: ["Ruby Red", "Dusty Rose", "Peachy Nude"],
    sizes: [],
    specifications: {
      "Finish": "Matte",
      "Longevity": "12 Hours",
      "Features": "Hydrating core"
    },
    featured: false,
    bestSeller: true
  },
  {
    id: "beau-4",
    name: "Nourishing Hair Mask",
    category: "Beauty",
    brand: "Strands",
    price: 38,
    originalPrice: 45,
    discount: 15,
    rating: 4.9,
    reviewCount: 670,
    stock: 85,
    description: "Rescue damaged, dry hair. This intensive weekly treatment restores moisture, repairs bonds, and adds incredible shine with argan oil and keratin.",
    images: [
      "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: [],
    sizes: ["200ml"],
    specifications: {
      "Hair Type": "Dry, Damaged, Color-Treated",
      "Key Ingredients": "Argan Oil, Keratin",
      "Free From": "Sulfates, Parabens"
    },
    featured: true,
    bestSeller: false
  },
  {
    id: "beau-5",
    name: "Eau de Parfum - Midnight Orchid",
    category: "Beauty",
    brand: "Essence",
    price: 85,
    originalPrice: 105,
    discount: 19,
    rating: 4.7,
    reviewCount: 340,
    stock: 45,
    description: "A mysterious and seductive fragrance blending dark orchid, spicy notes, and rich woods. Perfect for evening wear.",
    images: [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: [],
    sizes: ["50ml", "100ml"],
    specifications: {
      "Fragrance Family": "Floral Oriental",
      "Top Notes": "Black Truffle, Ylang Ylang",
      "Base Notes": "Patchouli, Sandalwood"
    },
    featured: false,
    bestSeller: false
  },

  // Home
  {
    id: "home-1",
    name: "Ceramic Essential Oil Diffuser",
    category: "Home",
    brand: "ZenHome",
    price: 45,
    originalPrice: 55,
    discount: 18,
    rating: 4.6,
    reviewCount: 890,
    stock: 120,
    description: "Elevate your space with this elegant stone-finished ultrasonic diffuser. Runs up to 8 hours continuously and features a warm ambient light.",
    images: [
      "https://images.unsplash.com/photo-1608528577891-eb055944f2e7?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: ["White", "Charcoal", "Terracotta"],
    sizes: [],
    specifications: {
      "Capacity": "120ml",
      "Runtime": "4-8 Hours",
      "Material": "Matte Ceramic & BPA-free plastic"
    },
    featured: true,
    bestSeller: true
  },
  {
    id: "home-2",
    name: "Luxury Egyptian Cotton Sheets",
    category: "Home",
    brand: "Slumber",
    price: 120,
    originalPrice: 160,
    discount: 25,
    rating: 4.9,
    reviewCount: 1540,
    stock: 65,
    description: "Experience hotel-quality sleep. Made from 100% long-staple Egyptian cotton with a crisp, cool 400 thread count percale weave.",
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: ["White", "Sand", "Slate Blue"],
    sizes: ["Queen", "King", "California King"],
    specifications: {
      "Material": "100% Egyptian Cotton",
      "Weave": "Percale",
      "Thread Count": "400"
    },
    featured: false,
    bestSeller: true
  },
  {
    id: "home-3",
    name: "Cast Iron Dutch Oven",
    category: "Home",
    brand: "Culinary",
    price: 89.99,
    originalPrice: 110,
    discount: 18,
    rating: 4.8,
    reviewCount: 430,
    stock: 40,
    description: "The ultimate kitchen workhorse. Enameled cast iron delivers superior heat distribution and retention for baking, braising, and roasting.",
    images: [
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: ["Cherry Red", "Matte Black", "Cobalt Blue"],
    sizes: ["5.5 Quart", "7 Quart"],
    specifications: {
      "Material": "Enameled Cast Iron",
      "Oven Safe": "Up to 500°F",
      "Care": "Hand wash recommended"
    },
    featured: true,
    bestSeller: false
  },
  {
    id: "home-4",
    name: "Handwoven Jute Area Rug",
    category: "Home",
    brand: "Artisan Living",
    price: 195,
    originalPrice: 250,
    discount: 22,
    rating: 4.5,
    reviewCount: 210,
    stock: 25,
    description: "Add organic texture to any room. This eco-friendly, hand-braided jute rug is durable enough for high-traffic areas while remaining soft underfoot.",
    images: [
      "https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: ["Natural"],
    sizes: ["5x8 ft", "8x10 ft", "9x12 ft"],
    specifications: {
      "Material": "100% Natural Jute",
      "Construction": "Hand-braided",
      "Pile Height": "0.5 inches"
    },
    featured: false,
    bestSeller: false
  },
  {
    id: "home-5",
    name: "Smart LED Desk Lamp",
    category: "Home",
    brand: "Lumina",
    price: 65,
    originalPrice: 65,
    discount: 0,
    rating: 4.7,
    reviewCount: 540,
    stock: 85,
    description: "Reduce eye strain with adjustable color temperature and brightness. Features a built-in wireless charging pad for your phone and smart home compatibility.",
    images: [
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: ["White", "Black"],
    sizes: [],
    specifications: {
      "Brightness": "800 Lumens",
      "Color Temp": "2700K - 6500K",
      "Features": "Wireless Qi Charger, App Control"
    },
    featured: false,
    bestSeller: true
  }
];
