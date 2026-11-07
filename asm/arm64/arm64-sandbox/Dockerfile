FROM debian:bookworm-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends gcc-aarch64-linux-gnu qemu-user make \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /src
