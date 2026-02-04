// export const initialProducts = [
//   // Rings
//   {
//     id: 1,
//     name: "Eternal Diamond Solitaire",
//     slug: "eternal-diamond-solitaire",
//     category: "rings",
//     categoryId: 1,
//     price: 4999,
//     description: "A timeless solitaire ring featuring a brilliant-cut diamond set in 18k white gold. Perfect for engagements or as a statement piece.",
//     details: ["18k White Gold", "1.5 Carat Diamond", "VS1 Clarity", "Handcrafted"],
//     image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80",
//     featured: true,
//     inStock: true
//   },
//   {
//     id: 2,
//     name: "Rose Gold Infinity Band",
//     slug: "rose-gold-infinity-band",
//     category: "rings",
//     categoryId: 1,
//     price: 1299,
//     description: "An elegant infinity band crafted in rose gold with delicate pavé diamonds wrapping around the band.",
//     details: ["14k Rose Gold", "0.5 Carat Total", "SI1 Clarity", "Comfort Fit"],
//     image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&q=80",
//     featured: false,
//     inStock: true
//   },
//   {
//     id: 3,
//     name: "Sapphire Halo Ring",
//     slug: "sapphire-halo-ring",
//     category: "rings",
//     categoryId: 1,
//     price: 3499,
//     description: "A stunning sapphire surrounded by a halo of brilliant diamonds, set in platinum for lasting beauty.",
//     details: ["Platinum", "2 Carat Sapphire", "Diamond Halo", "Certificate Included"],
//     image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&q=80",
//     featured: true,
//     inStock: true
//   },
  
//   // Bracelets
//   {
//     id: 4,
//     name: "Tennis Diamond Bracelet",
//     slug: "tennis-diamond-bracelet",
//     category: "bracelets",
//     categoryId: 2,
//     price: 7999,
//     description: "Classic tennis bracelet featuring a continuous line of round brilliant diamonds in a four-prong setting.",
//     details: ["18k White Gold", "5 Carats Total", "VS2 Clarity", "Box Clasp"],
//     image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80",
//     featured: true,
//     inStock: true
//   },
//   {
//     id: 5,
//     name: "Gold Chain Link Bracelet",
//     slug: "gold-chain-link-bracelet",
//     category: "bracelets",
//     categoryId: 2,
//     price: 2199,
//     description: "A bold chain link bracelet in polished yellow gold, perfect for everyday luxury.",
//     details: ["18k Yellow Gold", "7.5 inches", "Lobster Clasp", "Italian Craftsmanship"],
//     image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80",
//     featured: false,
//     inStock: true
//   },
//   {
//     id: 6,
//     name: "Pearl & Diamond Bangle",
//     slug: "pearl-diamond-bangle",
//     category: "bracelets",
//     categoryId: 2,
//     price: 3299,
//     description: "An elegant bangle featuring cultured pearls and diamond accents in white gold.",
//     details: ["14k White Gold", "Akoya Pearls", "Diamond Accents", "Hinged Design"],
//     image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
//     featured: false,
//     inStock: true
//   },
  
//   // Earrings
//   {
//     id: 7,
//     name: "Diamond Drop Earrings",
//     slug: "diamond-drop-earrings",
//     category: "earrings",
//     categoryId: 3,
//     price: 2899,
//     description: "Sophisticated drop earrings featuring pear-shaped diamonds that catch the light beautifully.",
//     details: ["18k White Gold", "1.5 Carats Total", "VS1 Clarity", "Secure Backs"],
//     image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
//     featured: true,
//     inStock: true
//   },
//   {
//     id: 8,
//     name: "Gold Hoop Earrings",
//     slug: "gold-hoop-earrings",
//     category: "earrings",
//     categoryId: 3,
//     price: 899,
//     description: "Classic gold hoops with a modern twist, featuring a textured finish.",
//     details: ["14k Yellow Gold", "30mm Diameter", "Lightweight", "Click-Top Closure"],
//     image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&q=80",
//     featured: false,
//     inStock: true
//   },
//   {
//     id: 9,
//     name: "Emerald Stud Earrings",
//     slug: "emerald-stud-earrings",
//     category: "earrings",
//     categoryId: 3,
//     price: 1999,
//     description: "Vibrant Colombian emeralds set in yellow gold, perfect for adding color to any outfit.",
//     details: ["18k Yellow Gold", "1 Carat Total", "Natural Emeralds", "Push Backs"],
//     image: "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=800&q=80",
//     featured: false,
//     inStock: true
//   },
  
//   // Necklaces
//   {
//     id: 10,
//     name: "Diamond Pendant Necklace",
//     slug: "diamond-pendant-necklace",
//     category: "necklaces",
//     categoryId: 4,
//     price: 3599,
//     description: "A stunning solitaire diamond pendant on a delicate chain, perfect for any occasion.",
//     details: ["18k White Gold", "1 Carat Diamond", "18-inch Chain", "Adjustable"],
//     image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
//     featured: true,
//     inStock: true
//   },
//   {
//     id: 11,
//     name: "Pearl Strand Necklace",
//     slug: "pearl-strand-necklace",
//     category: "necklaces",
//     categoryId: 4,
//     price: 1899,
//     description: "A timeless strand of hand-selected Akoya pearls with a gold clasp.",
//     details: ["14k Gold Clasp", "7-8mm Pearls", "18 inches", "Hand-Knotted"],
//     image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
//     featured: false,
//     inStock: true
//   },
//   {
//     id: 12,
//     name: "Layered Gold Necklace Set",
//     slug: "layered-gold-necklace-set",
//     category: "necklaces",
//     categoryId: 4,
//     price: 1599,
//     description: "A set of three layered necklaces in varying lengths, designed to be worn together or separately.",
//     details: ["14k Yellow Gold", "16/18/20 inches", "Set of 3", "Italian Design"],
//     image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80",
//     featured: true,
//     inStock: true
//   }
// ];
