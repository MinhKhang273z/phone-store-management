// Tự động quét toàn bộ ảnh trong thư mục assets/phone
export const imageModules = import.meta.glob('../assets/phone/*.{png,jpg,jpeg,webp}', { eager: true });

/**
 * Hàm giải mã URL ảnh từ tên file hoặc đường dẫn lưu trong DB
 * @param {string} imagePath - Tên file (ví dụ: iphone-16.jpg) hoặc đường dẫn đầy đủ
 * @returns {string} - URL đã được Vite xử lý
 */
export const resolveProductImage = (imagePath) => {
  if (!imagePath) return 'https://via.placeholder.com/200x250?text=No+Image';

  // Nếu là URL tuyệt đối (http...) thì trả về luôn
  if (imagePath.startsWith('http')) return imagePath;

  // Lấy tên file từ đường dẫn (để linh hoạt nếu DB lưu cả path)
  const filename = imagePath.split('/').pop();

  // Tìm trong danh sách modules quét được
  // Key trong imageModules có dạng "../assets/phone/filename.jpg"
  const targetKey = Object.keys(imageModules).find(key => key.endsWith(filename));

  if (targetKey && imageModules[targetKey]) {
    return imageModules[targetKey].default || imageModules[targetKey];
  }

  // Fallback nếu không tìm thấy
  return 'https://via.placeholder.com/200x250?text=No+Image';
};

export default resolveProductImage;
