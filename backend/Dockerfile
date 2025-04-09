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

# Định nghĩa các ARG để nhận giá trị khi build
ARG NODE_ENV
ARG MONGO_URI_ATLAS
ARG JWT_SECRET
ARG FRONTEND_URL
ARG CLOUDINARY_NAME
ARG CLOUDINARY_API_KEY
ARG CLOUDINARY_API_SECRET
ARG EMAIL_USER
ARG EMAIL_PASS

# Set các biến môi trường từ ARG
ENV NODE_ENV=${NODE_ENV}
ENV MONGO_URI_ATLAS=${MONGO_URI_ATLAS}
ENV JWT_SECRET=${JWT_SECRET}
ENV FRONTEND_URL=${FRONTEND_URL}
ENV CLOUDINARY_NAME=${CLOUDINARY_NAME}
ENV CLOUDINARY_API_KEY=${CLOUDINARY_API_KEY}
ENV CLOUDINARY_API_SECRET=${CLOUDINARY_API_SECRET}
ENV EMAIL_USER=${EMAIL_USER}
ENV EMAIL_PASS=${EMAIL_PASS}

# Lắng nghe trên cổng 8081
EXPOSE 8081

# Khởi động server bằng nodemon
CMD ["npx", "nodemon", "index.js"]
