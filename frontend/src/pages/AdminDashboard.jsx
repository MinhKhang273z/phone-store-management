import React from 'react';

const AdminDashboard = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Admin Dashboard</h1>
      <p>Chào mừng Admin đến với trang quản trị hệ thống!</p>
      <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
          <h3>Quản lý sản phẩm</h3>
          <p>Thêm, sửa, xóa sản phẩm trong cửa hàng.</p>
        </div>
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
          <h3>Quản lý đơn hàng</h3>
          <p>Xem và xử lý các đơn hàng của khách hàng.</p>
        </div>
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
          <h3>Quản lý người dùng</h3>
          <p>Quản lý tài khoản khách hàng.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
