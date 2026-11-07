FROM debian:bookworm-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends sqlite3 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /work
ENTRYPOINT ["sqlite3"]
CMD ["sandbox.db"]
