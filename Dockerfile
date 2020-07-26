FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY dist/ /var/vue/
COPY error/ /var/vue/
