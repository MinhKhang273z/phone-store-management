import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { getAllProducts } from '../services/api'; // Import hàm gọi API đã tạo ở api.js
import './Home.css';
import bannerImg from '../assets/phone/banner.png';

const Home = ({ searchTerm }) => {
  // 1. Quản lý danh sách sản phẩm thực tế từ Database
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Quản lý số lượng hiển thị cho nút "Xem thêm"
  const [displayCount, setDisplayCount] = useState(12);

  // 2. useEffect để gọi API ngay khi trang Home vừa load
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Gọi hàm từ api.js (trỏ tới http://localhost:8081/api/products)
        const data = await getAllProducts(); 
        setProducts(data);
      } catch (error) {
        console.error("Lỗi kết nối Backend:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 3. Lọc sản phẩm theo từ khóa tìm kiếm (Search)
  const filteredProducts = products.filter(product =>
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
      {/* Tấm banner quảng cáo */}
      <div className="banner-wrapper">
        <img src={bannerImg} alt="Quảng cáo Phone Store" className="home-banner" />
      </div>
      
      <h1 className="home-title">Chào mừng đến với Phone Store</h1>

      <div className="home-section-header">
        <h2>Sản phẩm nổi bật từ hệ thống</h2>
      </div>

      {/* Hiển thị trạng thái đang tải */}
      {loading ? (
        <div className="loading">Đang kết nối tới máy chủ (Cổng 8081)...</div>
      ) : (
        <>
          {/* Danh sách sản phẩm dạng Grid */}
          <div className="product-grid">
            {productsToDisplay.length > 0 ? (
              productsToDisplay.map(product => (
                // Lưu ý: Backend dùng thuộc tính imageUrl, đảm bảo ProductCard nhận đúng props
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="no-products">
                Không tìm thấy sản phẩm nào phù hợp trong hệ thống!
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
        </>
      )}
    </div>
  );
};

export default Home;