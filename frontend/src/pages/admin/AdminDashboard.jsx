import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    getAllProducts, createProduct, updateProduct, deleteProduct, 
    getAllOrdersApi, updateOrderStatusApi 
} from '../../services/api';

/**
 * AdminDashboard - Quản lý hệ thống tích hợp (Sản phẩm & Đơn hàng)
 */
const AdminDashboard = () => {
    // 1. States chung
    const [activeTab, setActiveTab] = useState("products"); // "products" hoặc "orders"
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");

    // 2. States cho Sản phẩm
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({ name: "", price: "", image: "", description: "" });
    const [isEdit, setIsEdit] = useState(false);

    // 3. States cho Đơn hàng
    const [orders, setOrders] = useState([]);

    // 4. Kiểm tra quyền Admin
    useEffect(() => {
        if (role !== "ADMIN") {
            alert("Bạn không có quyền truy cập trang này!");
            navigate("/");
        } else {
            loadData();
        }
    }, [role, navigate, activeTab]);

    const loadData = async () => {
        setLoading(true);
        try {
            if (activeTab === "products") {
                const data = await getAllProducts();
                setProducts(data);
            } else {
                const data = await getAllOrdersApi();
                setOrders(data);
            }
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu:", error);
        } finally {
            setLoading(false);
        }
    };

    // --- LOGIC SẢN PHẨM ---
    const handleDeleteProduct = async (id) => {
        if (window.confirm("Xóa sản phẩm này?")) {
            await deleteProduct(id);
            loadData();
        }
    };

    const handleProductSubmit = async (e) => {
        e.preventDefault();
        if (isEdit) await updateProduct(currentProduct.id, currentProduct);
        else await createProduct(currentProduct);
        setIsProductModalOpen(false);
        loadData();
    };

    // --- LOGIC ĐƠN HÀNG ---
    const handleUpdateStatus = async (orderId, newStatus) => {
        try {
            await updateOrderStatusApi(orderId, newStatus);
            alert("Cập nhật trạng thái thành công!");
            loadData();
        } catch (error) {
            alert("Lỗi khi cập nhật trạng thái");
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/login";
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
            {/* SIDEBAR */}
            <div style={{ width: '260px', backgroundColor: '#2c3e50', color: '#fff', padding: '20px 0' }}>
                <div style={{ padding: '0 20px 20px', borderBottom: '1px solid #3e4f5f', marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '1.2rem', margin: 0 }}>🛍️ Quản lý Cửa hàng</h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <button 
                        onClick={() => setActiveTab("products")}
                        style={{ padding: '15px 20px', textAlign: 'left', backgroundColor: activeTab === "products" ? '#34495e' : 'transparent', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '1rem', borderLeft: activeTab === "products" ? '4px solid #3498db' : '4px solid transparent' }}
                    >
                        📦 Quản lý sản phẩm
                    </button>
                    <button 
                        onClick={() => setActiveTab("orders")}
                        style={{ padding: '15px 20px', textAlign: 'left', backgroundColor: activeTab === "orders" ? '#34495e' : 'transparent', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '1rem', borderLeft: activeTab === "orders" ? '4px solid #3498db' : '4px solid transparent' }}
                    >
                        📜 Quản lý đơn hàng
                    </button>
                </div>
                <div style={{ marginTop: 'auto', padding: '20px', borderTop: '1px solid #3e4f5f', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '1.2rem' }}>👤</span>
                    <span style={{ fontSize: '0.9rem', color: '#bdc3c7' }}>{username} (Admin)</span>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* TOP BAR */}
                <div style={{ height: '70px', backgroundColor: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 30px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ margin: 0, color: '#333' }}>
                        {activeTab === "products" ? "Danh sách sản phẩm" : "Danh sách đơn hàng"}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <button onClick={() => navigate("/")} style={{ padding: '8px 15px', backgroundColor: '#3498db', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>🏠 Trang chủ</button>
                        <button onClick={handleLogout} style={{ padding: '8px 15px', color: '#e74c3c', border: '1px solid #e74c3c', borderRadius: '5px', backgroundColor: 'transparent', cursor: 'pointer', fontWeight: 'bold' }}>Đăng xuất</button>
                    </div>
                </div>

                {/* CONTENT AREA */}
                <div style={{ padding: '30px', overflowY: 'auto' }}>
                    {loading ? (
                        <div>Đang tải dữ liệu...</div>
                    ) : (
                        <>
                            {activeTab === "products" ? (
                                /* VIEW SẢN PHẨM */
                                <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                                        <input 
                                            type="text" 
                                            placeholder="Tìm sản phẩm..." 
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            style={{ padding: '10px', width: '300px', borderRadius: '5px', border: '1px solid #ddd' }}
                                        />
                                        <button 
                                            onClick={() => { setIsEdit(false); setCurrentProduct({ name: "", price: "", image: "/phone/", description: "" }); setIsProductModalOpen(true); }}
                                            style={{ padding: '10px 20px', backgroundColor: '#2ecc71', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                                        >
                                            + Thêm sản phẩm
                                        </button>
                                    </div>
                                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                        <thead>
                                            <tr style={{ backgroundColor: '#f8f9fa', textAlign: 'left', borderBottom: '2px solid #eee' }}>
                                                <th style={{ padding: '12px' }}>Ảnh</th>
                                                <th style={{ padding: '12px' }}>Tên</th>
                                                <th style={{ padding: '12px' }}>Giá</th>
                                                <th style={{ padding: '12px', textAlign: 'center' }}>Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map(p => (
                                                <tr key={p.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                                    <td style={{ padding: '12px' }}><img src={p.image} alt="" style={{ width: '40px' }} /></td>
                                                    <td style={{ padding: '12px', fontWeight: '500' }}>{p.name}</td>
                                                    <td style={{ padding: '12px', color: '#e74c3c' }}>{new Intl.NumberFormat('vi-VN').format(p.price)}₫</td>
                                                    <td style={{ padding: '12px', textAlign: 'center' }}>
                                                        <button onClick={() => { setIsEdit(true); setCurrentProduct(p); setIsProductModalOpen(true); }} style={{ marginRight: '10px', color: '#3498db', border: 'none', background: 'none', cursor: 'pointer' }}>Sửa</button>
                                                        <button onClick={() => handleDeleteProduct(p.id)} style={{ color: '#e74c3c', border: 'none', background: 'none', cursor: 'pointer' }}>Xóa</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                /* VIEW ĐƠN HÀNG */
                                <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                        <thead>
                                            <tr style={{ backgroundColor: '#f8f9fa', textAlign: 'left', borderBottom: '2px solid #eee' }}>
                                                <th style={{ padding: '12px' }}>ID Đơn</th>
                                                <th style={{ padding: '12px' }}>Người mua</th>
                                                <th style={{ padding: '12px' }}>Ngày đặt</th>
                                                <th style={{ padding: '12px' }}>Tổng tiền</th>
                                                <th style={{ padding: '12px' }}>Trạng thái</th>
                                                <th style={{ padding: '12px', textAlign: 'center' }}>Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map(o => (
                                                <tr key={o.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                                    <td style={{ padding: '12px', fontWeight: 'bold' }}>#{o.id}</td>
                                                    <td style={{ padding: '12px' }}>👤 {o.customerName || `User #${o.userId}`}</td>
                                                    <td style={{ padding: '12px' }}>{new Date(o.createdAt).toLocaleString('vi-VN')}</td>
                                                    <td style={{ padding: '12px', color: '#2ecc71', fontWeight: 'bold' }}>{new Intl.NumberFormat('vi-VN').format(o.totalPrice)}₫</td>
                                                    <td style={{ padding: '12px' }}>
                                                        <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem', backgroundColor: o.status === 'PENDING' ? '#fff3cd' : '#d4edda', color: o.status === 'PENDING' ? '#856404' : '#155724' }}>
                                                            {o.status}
                                                        </span>
                                                    </td>
                                                    <td style={{ padding: '12px', textAlign: 'center' }}>
                                                        <select 
                                                            value={o.status} 
                                                            onChange={(e) => handleUpdateStatus(o.id, e.target.value)}
                                                            style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                                                        >
                                                            <option value="PENDING">Đang chờ</option>
                                                            <option value="SHIPPED">Đang giao</option>
                                                            <option value="DELIVERED">Đã giao</option>
                                                            <option value="CANCELLED">Hủy bỏ</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* PRODUCT MODAL (Giữ nguyên logic form) */}
            {isProductModalOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                    <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '10px', width: '500px' }}>
                        <h3>{isEdit ? "Sửa sản phẩm" : "Thêm sản phẩm"}</h3>
                        <form onSubmit={handleProductSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <input type="text" placeholder="Tên" value={currentProduct.name} onChange={e => setCurrentProduct({...currentProduct, name: e.target.value})} required style={{ padding: '10px' }} />
                            <input type="number" placeholder="Giá" value={currentProduct.price} onChange={e => setCurrentProduct({...currentProduct, price: e.target.value})} required style={{ padding: '10px' }} />
                            <input type="text" placeholder="Ảnh" value={currentProduct.image} onChange={e => setCurrentProduct({...currentProduct, image: e.target.value})} required style={{ padding: '10px' }} />
                            <textarea placeholder="Mô tả" value={currentProduct.description} onChange={e => setCurrentProduct({...currentProduct, description: e.target.value})} style={{ padding: '10px' }} />
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                <button type="button" onClick={() => setIsProductModalOpen(false)}>Hủy</button>
                                <button type="submit" style={{ backgroundColor: '#3498db', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px' }}>Lưu</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
