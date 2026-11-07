.PHONY: all

all: hello
	qemu-aarch64 ./hello

hello: hello.s
	aarch64-linux-gnu-gcc -static -nostdlib -o hello hello.s
