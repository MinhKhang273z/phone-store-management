import React from 'react';
import './BrandFilter.css';

// Tự động quét logo trong assets/logophone
const logoModules = import.meta.glob('../assets/logophone/*.{png,jpg,jpeg,svg,webp}', { eager: true });

const BrandFilter = ({ selectedBrand, onSelectBrand }) => {
    // Danh sách các thương hiệu mặc định (phòng trường hợp thư mục ảnh trống)
    const defaultBrands = ['Iphone', 'Samsung', 'Oppo', 'Xiaomi', 'Vivo', 'Realme', 'Nokia'];

    // Chuyển đổi module ảnh thành danh sách có tên thương hiệu
    const brandLogos = Object.entries(logoModules).map(([path, module]) => {
        let brandName = path.split('/').pop().split('.')[0];

        // Chuẩn hóa tên (ví dụ: iphone -> Apple)
        if (brandName.toLowerCase() === 'iphone') brandName = 'Iphone';

        return {
            name: brandName.charAt(0).toUpperCase() + brandName.slice(1),
            image: module.default
        };
    });

    // Nếu không có logo trong thư mục, dùng tạm danh sách text
    const displays = brandLogos.length > 0
        ? [{ name: 'All', image: null }, ...brandLogos]
        : [{ name: 'All', image: null }, ...defaultBrands.map(name => ({ name, image: null }))];

    return (
        <div className="brand-filter-container">
            <div className="brand-filter-list">
                {displays.map((brand) => (
                    <div
                        key={brand.name}
                        className={`brand-item ${selectedBrand === brand.name ? 'active' : ''}`}
                        onClick={() => onSelectBrand(brand.name)}
                    >
                        {brand.image ? (
                            <div className="brand-logo-wrapper">
                                <img src={brand.image} alt={brand.name} className="brand-logo-img" />
                            </div>
                        ) : (
                            <span className="brand-name-text">{brand.name}</span>
                        )}
                        <span className="brand-label">{brand.name === 'All' ? 'Tất cả' : brand.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BrandFilter;
