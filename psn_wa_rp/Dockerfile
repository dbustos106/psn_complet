FROM nginx

RUN apt-get update -qq && apt-get -y install apache2-utils
ENV NODE_ROOT /var/www/psn_wa
WORKDIR $NODE_ROOT
RUN mkdir log
COPY app.conf /tmp/app.nginx
RUN envsubst '$NODE_ROOT' < /tmp/app.nginx > /etc/nginx/conf.d/default.conf

COPY certificate.crt /etc/nginx/certificate.crt
COPY private.key /etc/nginx/private.key

EXPOSE 80
EXPOSE 443

CMD [ "nginx", "-g", "daemon off;" ]