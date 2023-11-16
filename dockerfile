FROM node:18.0.0-alpine3.14 as builder
ENV NODE_ENV build

WORKDIR /home/node

COPY . /home/node
# Cambia el propietario de los archivos copiados
RUN chown -R node:node /home/node

USER node
RUN npm ci \
    && npm run build \
    && npm prune --production



# ---

FROM node:18.0.0-alpine3.14

ENV NODE_ENV prod
USER node

WORKDIR /home/node

COPY --from=builder --chown=node:node /home/node/package*.json /home/node/
COPY --from=builder --chown=node:node /home/node/node_modules/ /home/node/node_modules/
COPY --from=builder --chown=node:node /home/node/tsconfig*.json /home/node/dist/
COPY --from=builder --chown=node:node /home/node/dist/ /home/node/dist/
COPY ./deploy/.env.prod /home/node/deploy/.env.prod

CMD ["node", "dist/src/main.js"]