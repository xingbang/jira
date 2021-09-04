FROM nginx:1.20.1-alpine

COPY ./build/ /usr/share/nginx/html/

# RUN (删除文件)
RUN rm /etc/nginx/conf.d/*

COPY ./vhost.nginx.conf /etc/nginx/conf.d/jira.conf

EXPOSE 80

# 入口
ENTRYPOINT ["nginx","-g","daemon off;"]

