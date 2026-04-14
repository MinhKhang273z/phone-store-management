import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/api';
import './ProductDetail.css'; // Bạn có thể tạo file CSS này để trang trí

const ProductDetail = () => {
    // 1. Lấy ID sản phẩm từ thanh địa chỉ (URL)
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    // 2. Gọi API lấy chi tiết sản phẩm theo ID
    useEffect(() => {
        const fetchDetail = async () => {
            try {
                setLoading(true);
                const data = await getProductById(id);
                setProduct(data);
            } catch (error) {
                console.error("Không thể lấy chi tiết sản phẩm:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [id]);

    if (loading) return <div className="loading">Đang tải thông tin sản phẩm...</div>;
    if (!product) return <div className="error">Không tìm thấy sản phẩm!</div>;

    return (
        <div className="product-detail-container" style={{ padding: '40px', display: 'flex', gap: '40px' }}>
            <div className="detail-image" style={{ flex: 1 }}>
                <img src={product.imageUrl} alt={product.name} style={{ width: '100%', borderRadius: '15px' }} />
            </div>
            
            <div className="detail-info" style={{ flex: 1 }}>
                <button onClick={() => navigate(-1)} style={{ marginBottom: '20px' }}>← Quay lại</button>
                <h1>{product.name}</h1>
                <h2 style={{ color: 'red' }}>{product.price?.toLocaleString()} VNĐ</h2>
                <div className="description" style={{ marginTop: '20px', lineHeight: '1.6' }}>
                    <h3>Mô tả sản phẩm:</h3>
                    <p>{product.description || "Đang cập nhật nội dung cho sản phẩm này..."}</p>
                </div>
                <button className="btn-add-cart" style={{ marginTop: '30px', padding: '15px 30px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Thêm vào giỏ hàng
                </button>
            </div>
        </div>
    );
};

export default ProductDetail;