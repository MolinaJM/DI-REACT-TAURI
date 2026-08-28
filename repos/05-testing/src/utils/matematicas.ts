export function sumar(a: number, b: number): number {
    return a + b;
}

export function filtrarPares(numeros: number[]): number[] {
    return numeros.filter(n => n % 2 === 0);
}
