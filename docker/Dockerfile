FROM node:13
ARG NODE_ENV
ENV npm_config_loglevel "error"
ENV RUN_MODE "app"

WORKDIR /app

RUN apt-get update \
    && apt-get install -y \
    nginx \
    supervisor \
    && rm -rf /var/lib/apt/lists/* \
    && update-rc.d -f nginx disable

COPY server/ /app/server/
COPY public/ /app/public/
COPY src/ /app/src/
COPY package.json package-lock.json /app/
RUN chown -R node:node /app \
    && su - node -c "cd /app && npm ci" \
    && su - node -c "cd /app && npm run-script build"

COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY docker/nginx.nginx /etc/nginx/nginx.conf
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
CMD /entrypoint.sh

