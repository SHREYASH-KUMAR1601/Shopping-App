const mongoose = require('mongoose');
const Product = require('./models/product');

const products = [
  {
    name: "iPhone 15 Pro",
    img: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-max-blacktitanium-select?wid=940&hei=1112&fmt=png-alpha&.v=1693346851387",
    price: 135000,
    desc: "Apple iPhone 15 Pro with A17 Pro chip, 6.1-inch Super Retina XDR display, titanium design, and pro camera system."
  },
  {
    name: "MacBook Air M2",
    img: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/macbook-air-m2-hero-202206?wid=940&hei=1112&fmt=png-alpha&.v=1653493200207",
    price: 110000,
    desc: "Apple MacBook Air powered by M2 chip, with 13.6-inch Liquid Retina display, all-day battery life, and fanless design."
  },
  {
    name: "Apple Watch Series 9",
    img: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/watch-s9-hero-202309?wid=940&hei=1112&fmt=png-alpha&.v=1693520973675",
    price: 45000,
    desc: "Apple Watch Series 9 with brighter display, advanced health sensors, crash detection, and double-tap gesture control."
  },
  {
    name: "iPad Pro 12.9-inch (M2)",
    img: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/ipad-pro-12-select-202210?wid=940&hei=1112&fmt=png-alpha&.v=1664411207256",
    price: 125000,
    desc: "iPad Pro 12.9-inch with M2 chip, Liquid Retina XDR display, ProMotion, Apple Pencil hover, and 5G connectivity."
  },
  {
    name: "AirPods Pro (2nd Gen)",
    img: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/airpods-pro-2nd-gen-hero-202209?wid=940&hei=1112&fmt=png-alpha&.v=1660803972361",
    price: 24000,
    desc: "AirPods Pro (2nd generation) with Active Noise Cancellation, Adaptive Transparency, Personalized Spatial Audio, and MagSafe Charging Case."
  }
];

async function seedDB() {
  try {
    // Uncomment to clear old data:
    // await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Data seeded successfully with Apple products 🚀");
  } catch (err) {
    console.error("Error seeding database:", err);
  }
}

module.exports = seedDB;
