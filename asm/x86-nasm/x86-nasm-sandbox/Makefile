.PHONY: all

all: hello
	./hello

hello: hello.asm
	nasm -f elf64 -o hello.o hello.asm
	ld -nostdlib -o hello hello.o
