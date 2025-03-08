# Sử dụng Node.js làm môi trường chạy
FROM node:18

# Đặt thư mục làm việc
WORKDIR /app

# Copy file package.json & package-lock.json trước để tối ưu cache layer
COPY package.json package-lock.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ code backend
COPY . .

# Lắng nghe trên cổng 8080
EXPOSE 8080

# Khởi động server bằng nodemon
CMD ["npx", "nodemon", "index.js"]
