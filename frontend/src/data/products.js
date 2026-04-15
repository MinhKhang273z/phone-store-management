// Tự động quét toàn bộ ảnh trong thư mục assets/phone
const imageModules = import.meta.glob('../assets/phone/*.{png,jpg,jpeg,webp}', { eager: true });

// Hàm xử lý tên từ file (ví dụ: iphone-16-pro-max.jpg -> iPhone 16 Pro Max)
const formatName = (filename) => {
  const name = filename.split('/').pop().split('.')[0];
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Hàm tạo giá ngẫu nhiên cho demo
const getRandomPrice = (name) => {
  if (name.toLowerCase().includes('iphone')) return Math.floor(Math.random() * (45 - 20) + 20) * 1000000;
  if (name.toLowerCase().includes('samsung')) return Math.floor(Math.random() * (35 - 15) + 15) * 1000000;
  if (name.toLowerCase().includes('nokia')) return Math.floor(Math.random() * (5 - 1) + 1) * 1000000;
  return Math.floor(Math.random() * (25 - 5) + 5) * 1000000;
};

const products = Object.entries(imageModules).map(([path, module], index) => {
  const name = formatName(path);
  return {
    id: index + 1,
    name: name,
    imageUrl: module.default,
    price: getRandomPrice(name),
    description: `${name} là một trong những sản phẩm công nghệ hàng đầu hiện nay, mang lại trải nghiệm đỉnh cao với thiết kế sang trọng và hiệu năng mạnh mẽ.`,
    specs: {
      brand: name.split(' ')[0],
      display: "6.7 inch, Super Retina XDR OLED",
      chip: "A18 Pro / Snapdragon 8 Gen 4",
      ram: "8GB / 12GB",
      storage: "128GB / 256GB / 512GB",
      battery: "5000 mAh, sạc nhanh 45W",
      camera: "48MP + 12MP + 12MP"
    }
  };
});

// Loại bỏ những file không phải là điện thoại (như banner hoặc logo hãng)
const filteredProducts = products.filter(p => {
  const nameLower = p.name.toLowerCase();
  const brands = ['Iphone', 'samsung', 'oppo', 'xiaomi', 'vivo', 'realme', 'nokia', 'banner', 'honor', 'asus', 'acer', 'hp', 'dell', 'lenovo', 'msi'];

  // Nếu tên sản phẩm CHỈ là tên thương hiệu (không có model) thì loại bỏ
  const isJustBrand = brands.includes(nameLower);
  const isBanner = nameLower.includes('banner');

  return !isJustBrand && !isBanner;
});

export default filteredProducts;
