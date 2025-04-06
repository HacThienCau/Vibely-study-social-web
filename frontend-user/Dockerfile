# Sử dụng Node.js để build Next.js
FROM node:18 AS builder

# Đặt thư mục làm việc
WORKDIR /app

# Copy file package.json & package-lock.json
COPY package.json package-lock.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ code frontend
COPY . .

# Định nghĩa các ARG để nhận giá trị khi build
ARG URL
ARG NEXT_PUBLIC_BACKEND_URL
ARG PUBLIC_FOLDER

# Set các biến môi trường từ ARG
ENV URL=${URL}
ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}
ENV PUBLIC_FOLDER=${PUBLIC_FOLDER}

# Sử dụng lightweight server để chạy production
FROM node:18-alpine
WORKDIR /app

# Copy code đã build từ container trước
COPY --from=builder /app ./

# Lắng nghe trên cổng 3000
EXPOSE 3000

# Khởi động Next.js app
CMD ["npm", "run", "dev"]
