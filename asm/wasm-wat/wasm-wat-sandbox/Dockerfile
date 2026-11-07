FROM debian:bookworm-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends wabt make \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /src
