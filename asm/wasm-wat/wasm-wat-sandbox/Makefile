.PHONY: all

all: hello.wasm
	wasm-objdump -x hello.wasm

hello.wasm: hello.wat
	wat2wasm hello.wat -o hello.wasm
