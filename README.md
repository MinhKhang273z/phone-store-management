<div align="center">
  <img src="https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=2670&auto=format&fit=crop" alt="E-commerce Cover" width="100%" style="max-height: 400px; object-fit: cover; border-radius:15px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
  <br/>
  <h1>📱 Hệ Thống Quản Lý Cửa Hàng Điện Thoại</h1>
  <p>Một ứng dụng web thương mại điện tử trọn vẹn giúp dễ dàng quản lý sản phẩm, đơn hàng và trải nghiệm mua sắm của khách hàng, được xây dựng với <b>Spring Boot</b> và <b>ReactJS</b>.</p>

  <p>
    <a href="#tổng-quan"><img src="https://img.shields.io/badge/Trạng_thái-Đang_phát_triển-brightgreen?style=for-the-badge" alt="Status"/></a>
    <a href="#công-nghệ-sử-dụng"><img src="https://img.shields.io/badge/Java-21-orange?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java"/></a>
    <a href="#công-nghệ-sử-dụng"><img src="https://img.shields.io/badge/Spring_Boot-3.2+-success?style=for-the-badge&logo=spring-boot&logoColor=white" alt="Spring Boot"/></a>
    <a href="#công-nghệ-sử-dụng"><img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react&logoColor=white" alt="React"/></a>
    <a href="#công-nghệ-sử-dụng"><img src="https://img.shields.io/badge/MySQL-8-blue?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL"/></a>
  </p>
</div>

<br/>

## 📖 Tổng quan

**Phone Store Management** là dự án ứng dụng web toàn diện (Full-stack) được thiết kế để quản lý các hoạt động bán lẻ của một cửa hàng điện thoại di động trực tuyến. 

Hệ thống cung cấp trải nghiệm mượt mà cho **Khách hàng** (từ xem sản phẩm đến đặt mua) và các công cụ mạnh mẽ dành cho **Quản trị viên** (quản lý kho hàng, theo dõi đơn hàng).

---

## 🛠️ Công nghệ sử dụng

Dự án áp dụng mô hình Frontend/Backend tách biệt, sử dụng công nghệ tiên tiến nhất:

| Lớp (Layer) | Cấu phần | Công nghệ / Thư viện |
| :--- | :--- | :--- |
| **Frontend** | Giao diện | ReactJS 19, React Router DOM, Vite |
| **Backend** | API Server | Java 21, Spring Boot, Spring Web MVC, Maven |
| **Bảo mật** | Xác thực & Quyền | Spring Security |
| **Cơ sở dữ liệu** | Lưu trữ | MySQL 8, Spring Data JPA |
| **DevOps** | Triển khai | Docker (Sẵn sàng container hoá) |

---

## 📁 Kiến trúc thư mục

```text
phone-store-management/
├── backend/            # Mã nguồn API Server Spring Boot (Java)
├── frontend/           # Mã nguồn Web Client React (Vite)
├── database/           # Script cấu trúc CSDL khởi tạo (init.sql)
└── docker/             # Cấu hình cài đặt môi trường bằng Docker
```

---

## 🚀 Hướng dẫn chạy dự án

### 1. Yêu cầu cấu hình
* [Java Development Kit (JDK) 21+](https://www.oracle.com/java/technologies/downloads/)
* [Node.js (v18+) & npm (LTS)](https://nodejs.org/en/)
* [MySQL database](https://dev.mysql.com/downloads/mysql/)
* *(Tuỳ chọn)* Docker & Docker Compose

### 2. Thiết lập Cơ sở dữ liệu (Database)
Khởi tạo CSDL với mã nguồn SQL được đính kèm:
```bash
# Đăng nhập vào MySQL:
mysql -u root -p

# Mở script init.sql tạo bảng (trỏ đúng đường dẫn lưu trữ source code):
source ./database/init.sql
```

### 3. Chạy Server (Backend)
Tiến hành nạp thư viện và khởi chạy máy chủ cung cấp API:
```bash
cd backend
# Sử dụng Maven để run ứng dụng
./mvnw spring-boot:run
```
> **Lưu ý**: Đừng quên cập nhật thông tin cấu hình username/password cho mySQL trong tệp `application.properties` (hoặc `application.yml`) của Spring Boot nhé. Server mặc định sẽ lắng nghe ở `http://localhost:8080`.

### 4. Chạy Client (Frontend)
Tiến hành tải modules và chạy giao diện tương tác:
```bash
cd frontend
# Cài đặt node_modules
npm install
# Chạy máy chủ phát triển (hot-reload)
npm run dev
```
> Truy cập ứng dụng trình duyệt tại địa chỉ được log trên terminal (thường là `http://localhost:5173`).

---

## 🤝 Đóng góp (Contributing)

Dự án đang trong quá trình phát triển, chúng tôi rất hoan nghênh những ý kiến và đóng góp từ thiết kế giao diện cho tới tối ưu code backend.
1. `Fork` kho lưu trữ (repository)
2. Tạo First Feature (`git checkout -b feature/NewFeature`)
3. Commit cập nhật (`git commit -m 'Thêm một chức năng gì đó xịn xò'`)
4. Push lên nhánh (`git push origin feature/NewFeature`)
5. Mở `Pull Request`

🌟 ***Hãy tặng dự án một ngôi sao (Star) nếu bạn thấy nó hữu ích!*** 🌟
