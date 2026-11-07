.section .rodata
msg:
    .ascii "hello from aarch64\n"
.equ len, . - msg

.section .text
.globl _start
_start:
    mov x0, #1
    adr x1, msg
    mov x2, #len
    mov x8, #64
    svc #0

    mov x0, #0
    mov x8, #93
    svc #0
