FROM oven/bun:latest

WORKDIR /app

COPY package.json ./

ARG GITHUB_TOKEN
ENV GITHUB_TOKEN=${GITHUB_TOKEN}
RUN echo "@cryptoscan-pro:registry=https://npm.pkg.github.com" > .npmrc && \
    echo "//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}" >> .npmrc

RUN bun install

COPY . .

EXPOSE 3000

CMD ["bun", "src/index.ts"]
