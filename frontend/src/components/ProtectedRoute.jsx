import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * ProtectedRoute component - Bảo vệ các route chỉ dành cho ADMIN.
 * Kiểm tra role từ localStorage, nếu không phải ADMIN sẽ redirect về trang chủ.
 */
const ProtectedRoute = ({ children }) => {
    const role = localStorage.getItem("role");

    if (role !== "ADMIN") {
        // Nếu không phải ADMIN, quay lại trang chủ
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
