# 📱 Phone Store Management Website

A modern, high-performance Full-stack E-commerce solution for mobile devices, built with **Spring Boot** and **React**.

---

## 📋 Table of Contents
- [🚀 Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📦 Installation](#-installation)
- [⚙️ Configuration](#️-configuration)
- [📁 Project Structure](#-project-structure)
- [📸 Screenshots](#-screenshots)
- [👤 Author](#-author)

---

## 🚀 Features

The system provides a seamless experience for both customers and administrators:

-   🔐 **Authentication**: Secure Register and Login functionality.
-   📱 **Product Catalog**: Browse a wide range of mobile devices.
-   🔍 **Detailed View**: Access full specifications, images, and pricing for each product.
-   🛒 **Smart Cart**: 
    -   Add products to the cart.
    -   Adjust quantities (automatic merging of identical items).
    -   Remove items from the cart.
-   📦 **Ordering**: Simple checkout process with total price calculation and order history.
-   🛠️ **Admin Management**: Full CRUD operations for products (Create, Read, Update, Delete).

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 (Vite)
- **Styling**: Vanilla CSS3 (Modern Flexbox/Grid)
- **State Management**: React Context API
- **API Client**: Axios

### Backend
- **Framework**: Spring Boot 3.x
- **Language**: Java 21
- **Database**: MySQL 8.0
- **ORM**: Spring Data JPA

---

## 📦 Installation

Follow these steps to set up the project locally.

### 1. Clone the repository
```bash
git clone https://github.com/MinhKhang273z/phone-store-management.git
cd phone-store-management
```

### 2. Setup Database
- Create a MySQL database named `phone_store`.
- Import the initialization script:
```bash
mysql -u root -p phone_store < database/init.sql
```

### 3. Run Backend (Spring Boot)
```bash
cd backend
./mvnw spring-boot:run
```

### 4. Run Frontend (React)
```bash
cd frontend
npm install
npm run dev
```

---

## ⚙️ Configuration

### Database Connection
Update the `backend/src/main/resources/application.properties` file with your credentials:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/phone_store
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

### Docker Support
The project includes a `docker-compose.yml` file for quick environment setup:
```bash
docker-compose up -d
```

---

## 📁 Project Structure

```text
phone-store-management/
├── backend/            # Spring Boot Application
│   ├── src/main/java   # Java Source Code
│   └── src/resources   # Configuration & Static Resources
├── frontend/           # React Application
│   ├── src/components  # Reusable UI Components
│   ├── src/pages       # Page Views
│   └── src/services    # API Service Layers
├── database/           # SQL initialization scripts
└── docker/             # Docker configuration files
```

---

## 📸 Screenshots

<div align="center">
  <img src="https://via.placeholder.com/800x400?text=Product+Catalog+Dashboard" alt="Dashboard" style="border-radius: 10px; margin-bottom: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);" />
  <img src="https://via.placeholder.com/800x400?text=Premium+Cart+Experience" alt="Cart" style="border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);" />
</div>

---

## 👤 Author

- **Minh Khang** - *Full Stack Developer* - [MinhKhang273z](https://github.com/MinhKhang273z)

---

<div align="center">
  <p>If you find this project helpful, please give it a ⭐!</p>
</div>
