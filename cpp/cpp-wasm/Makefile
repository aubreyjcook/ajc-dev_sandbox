add.wasm: add.cpp
	clang++ --target=wasm32 -nostdlib -fno-exceptions -fno-rtti \
		-Wl,--no-entry -Wl,--export=add -o add.wasm add.cpp

clean:
	rm -f add.wasm
