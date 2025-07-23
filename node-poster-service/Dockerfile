# Dockerfile (适用于CI/CD云端构建的通用版)

# 使用官方Node.js 18 slim镜像作为基础
# 在CI/CD中，我们会明确指定平台，所以这里的 --platform 是可选的
FROM node:18-slim

# 直接从官方源安装系统依赖，不使用国内镜像
# GitHub服务器访问官方源速度非常快
RUN apt-get update && apt-get install -y \
    build-essential \
    libcairo2-dev \
    libpango1.0-dev \
    libjpeg-dev \
    libgif-dev \
    librsvg2-dev \
    fontconfig \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

# 复制package.json并直接从官方源安装Node.js依赖
COPY package*.json ./
RUN npm install

# 复制您的所有代码
COPY . .

# 暴露端口并启动服务
EXPOSE 3000
CMD [ "node", "server.js" ]