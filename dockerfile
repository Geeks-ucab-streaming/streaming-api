FROM node:18.0.0-alpine3.14 as builder
ENV NODE_ENV build

WORKDIR /home/node

COPY . /home/node
# Cambia el propietario de los archivos copiados
RUN chown -R node:node /home/node

USER node
RUN npm install && npm run build

# ---
FROM node:18.0.0-alpine3.14

ENV NODE_ENV production
ENV HOST=${HOST}

WORKDIR /home/node

COPY --from=builder --chown=node:node /home/node/package*.json /home/node/
COPY --from=builder --chown=node:node /home/node/node_modules/ /home/node/node_modules/
COPY --from=builder --chown=node:node /home/node/dist/ /home/node/dist/

CMD ["node", "dist/src/main.js"]