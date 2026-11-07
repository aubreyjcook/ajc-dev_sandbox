; Target: Linux x86-64
; Assembler: NASM (Intel syntax)
; Calling convention: System V, direct syscalls

section .rodata
    msg db "hello from x86-64", 10
    len equ $ - msg

section .text
    global _start

_start:
    mov rax, 1
    mov rdi, 1
    mov rsi, msg
    mov rdx, len
    syscall

    mov rax, 60
    xor rdi, rdi
    syscall
