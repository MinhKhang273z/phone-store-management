import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import './Home.css';
import bannerImg from '../assets/phone/banner.png';

// Tự động nạp tất cả các file ảnh nằm trong thư mục ../assets/phone/
const imageModules = import.meta.glob('../assets/phone/*.{jpg,png,jpeg}', { eager: true });

// Xây dựng mảng dữ liệu sản phẩm từ danh sách các file ảnh
const allProducts = [];
let countId = 1;

for (const path in imageModules) {
  const filename = path.split('/').pop();
  
  // Loại bỏ các hình ảnh không phải là điện thoại (ví dụ: banner hoặc hero)
  if (filename === 'banner.png' || filename === 'hero.png') continue;
  
  // Tạo tên sản phẩm cơ bản từ tên file
  const baseName = filename.replace(/\.[^/.]+$/, "").replace(/-/g, ' ');
  
  allProducts.push({
    id: countId++,
    name: baseName.toUpperCase(),
    // Tạo giá ngẫu nhiên giả lập từ 10M đến 30M
    price: (Math.floor(Math.random() * 20) + 10) + ',000,000 đ', 
    image: imageModules[path].default || imageModules[path]
  });
}

const Home = ({ searchTerm }) => {
  // Quản lý số lượng hiển thị cho nút "Xem thêm"
  const [displayCount, setDisplayCount] = useState(12);

  // Lọc sản phẩm theo từ khóa
  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sản phẩm sẽ được render dựa trên displayCount
  const productsToDisplay = filteredProducts.slice(0, displayCount);

  // Xử lý khi nhấn nút xem thêm
  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 12);
  };

  return (
    <div className="home-container">
      {/* Tấm banner quảng cáo ở phía trên */}
      <div className="banner-wrapper">
        <img src={bannerImg} alt="Quảng cáo Phone Store" className="home-banner" />
      </div>
      
      {/* Lời chào mừng */}
      <h1 className="home-title">
        Chào mừng đến với Phone Store
      </h1>

      <div className="home-section-header">
        <h2>Sản phẩm nổi bật</h2>
      </div>

      {/* Danh sách sản phẩm dạng Grid */}
      <div className="product-grid">
        {productsToDisplay.length > 0 ? (
          productsToDisplay.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="no-products">
            Không tìm thấy sản phẩm nào phù hợp!
          </p>
        )}
      </div>

      {/* Nút Xem thêm */}
      {displayCount < filteredProducts.length && (
        <div className="load-more-container">
          <button className="btn-primary load-more-btn" onClick={handleLoadMore}>
            Xem thêm
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
