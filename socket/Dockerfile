# Sử dụng Node.js image làm base
FROM node:18

# Đặt thư mục làm việc trong container
WORKDIR /app

# Copy package.json và package-lock.json trước
COPY package.json package-lock.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ mã nguồn vào container
COPY . .

# Mở cổng 8900 để giao tiếp
EXPOSE 8900

# Chạy ứng dụng
CMD ["npx", "nodemon", "index.js"]