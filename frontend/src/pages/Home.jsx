import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import BannerSlider from '../components/BannerSlider';
import BrandFilter from '../components/BrandFilter';
import productsData from '../data/products';
import './Home.css';

const Home = ({ searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(12);
  const [selectedBrand, setSelectedBrand] = useState('All');

  useEffect(() => {
    // Giả lập thời gian load để có trải nghiệm mượt mà
    const timer = setTimeout(() => {
      setProducts(productsData);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Lọc sản phẩm theo từ khóa tìm kiếm và thương hiệu
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes((searchTerm || "").toLowerCase());
    const matchesBrand = selectedBrand === 'All' || product.name.toLowerCase().includes(selectedBrand.toLowerCase());
    return matchesSearch && matchesBrand;
  });

  const productsToDisplay = filteredProducts.slice(0, displayCount);

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 12);
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="home-title">Siêu thị Điện thoại</h1>
        <p className="home-subtitle">Trải nghiệm công nghệ đỉnh cao, giá cả cực kỳ ưu đãi</p>
      </header>

      <BannerSlider />

      <BrandFilter 
        selectedBrand={selectedBrand} 
        onSelectBrand={(brand) => {
          setSelectedBrand(brand);
          setDisplayCount(12); // Reset số lượng hiển thị khi đổi bộ lọc
        }} 
      />

      <div className="home-content">
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Đang chuẩn bị sản phẩm cho bạn...</p>
          </div>
        ) : (
          <>
            <div className="results-info">
              {searchTerm && (
                <p>Tìm thấy <strong>{filteredProducts.length}</strong> kết quả cho "{searchTerm}"</p>
              )}
            </div>

            {productsToDisplay.length > 0 ? (
              <div className="product-grid">
                {productsToDisplay.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="no-results">
                <div className="no-results-icon">🔍</div>
                <h3>Không tìm thấy sản phẩm nào</h3>
                <p>Vui lòng thử lại với từ khóa khác.</p>
              </div>
            )}

            {displayCount < filteredProducts.length && (
              <div className="load-more-section">
                <button className="load-more-btn" onClick={handleLoadMore}>
                  Khám phá thêm
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;