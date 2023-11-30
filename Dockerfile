# 使用 Nginx 镜像作为基础镜像
FROM nginx:latest

# 将构建阶段的产物复制到 Nginx 的默认静态文件目录
COPY ./dist /usr/share/nginx/html

# 复制 Nginx 配置文件到容器
COPY nginx.conf /etc/nginx/nginx.conf

# 暴露容器的端口，确保与 Nginx 配置中的端口一致
EXPOSE 80

# 定义启动命令，Nginx 会在容器启动时启动
CMD ["nginx", "-g", "daemon off;"]
