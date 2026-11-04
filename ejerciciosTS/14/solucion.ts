export {};
import type { Planeta } from "./tipos.ts";
//JMM: Bloque 14 - Arrays: Métodos fundamentales

//JMM:// Ejercicio 1: map, filter, reduce sobre [1, 2, 3, 4, 5]
const numeros = [1, 2, 3, 4, 5];

const doblados = numeros.map(n => n * 2);
const pares = numeros.filter(n => n % 2 === 0);
const suma = numeros.reduce((acc, n) => acc + n, 0);

console.log("Ejercicio 1 - map, filter, reduce:");
console.log("Original:", numeros);
console.log("Doblados (map):", doblados);
console.log("Pares (filter):", pares);
console.log("Suma (reduce):", suma);

//JMM:// Datos de swapi.info/api/planets para el ejercicio de habitables (hardcodeados:
//JMM:// no se hace fetch, la asincronía se imparte en la sesión 9)
//JMM:// El interface Planeta vive en tipos.ts (modularidad).

const planetas: Planeta[] = [
  { name: "Tatooine", population: 200000, climate: "arid", films: ["films/1", "films/3", "films/4", "films/5", "films/6"] },
  { name: "Alderaan", population: 2000000000, climate: "temperate", films: ["films/1", "films/6"] },
  { name: "Yavin IV", population: 1000, climate: "temperate, tropical", films: ["films/1"] },
  { name: "Hoth", population: 0, climate: "frozen", films: ["films/2"] },
  { name: "Dagobah", population: 0, climate: "murky", films: ["films/2", "films/3", "films/6"] },
];

//JMM:// Ejercicio 2: toSorted, toReversed, with (ES2023) - sin mutar original
const original = [3, 1, 4, 1, 5, 9, 2, 6];

const ordenado = original.toSorted((a, b) => a - b);
const invertido = original.toReversed();
const conWith = original.with(2, 99);

console.log("\nEjercicio 2 - toSorted, toReversed, with (no mutan original):");
console.log("Original:", original);
console.log("Ordenado (toSorted):", ordenado);
console.log("Invertido (toReversed):", invertido);
console.log("Con with (posición 2 = 99):", conWith);
console.log("Original después de todo:", original);

//JMM:// Ejercicio 3: Búsqueda binaria en array de números (Parecidoa al juego de adivina un número)
function busquedaBinaria(arr: number[], objetivo: number): number {
  //JMM: Definimos los límites iniciales del terreno de búsqueda:
  //JMM: 'izquierda' empieza en el primer elemento (índice 0) y 'derecha' en el último.
  let izquierda = 0;
  let derecha = arr.length - 1;

  //JMM: El bucle se mantiene mientras haya terreno válido por buscar (izquierda no rebase a derecha)
  while (izquierda <= derecha) {
    //JMM: Punto medio SIN usar el Math.floor (no se ha impartido), así que lo hacemos manualmente: 
    // si la suma es impar, el ternario baja al entero inferior (el mismo efecto que floor())
    const suma = izquierda + derecha;
    const medio = suma % 2 === 0 ? suma / 2 : (suma - 1) / 2;

    //JMM: Ojo: con noUncheckedIndexedAccess, arr[medio] es number | undefined.
    //JMM: Capturamos el valor una vez y comprobamos (no puede pasar: medio está
    //JMM: siempre en rango, pero el flag del curso nos obliga a comprobarlo)
    const valor = arr[medio];
    if (valor === undefined) return -1;

    //JMM: Comparamos el valor del centro con el número que estamos buscando (objetivo)
    if (valor === objetivo) {
      return medio; //JMM: ¡Encontrado! Devolvemos la posición exacta.
    } else if (valor < objetivo) {
      izquierda = medio + 1; //JMM: El objetivo es mayor, descartamos toda la mitad izquierda.
    } else {
      derecha = medio - 1; //JMM: El objetivo es menor, descartamos toda la mitad derecha.
    }
  }

  //JMM: Si el bucle termina sin encontrar el número, devolvemos -1 (no existe).
  return -1;
}

console.log("\nEjercicio 3 - Búsqueda binaria:");
const listaOrdenada = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
console.log("Buscar 7 en lista ordenada:", busquedaBinaria(listaOrdenada, 7));
console.log("Buscar 10 en lista ordenada:", busquedaBinaria(listaOrdenada, 10));
console.log("Buscar 1 en lista ordenada:", busquedaBinaria(listaOrdenada, 1));
console.log("Buscar 19 en lista ordenada:", busquedaBinaria(listaOrdenada, 19));

//JMM:// Ejercicio 4: obtenerHabitable con interface Planeta (datos de swapi)
function obtenerHabitable(planetas: Planeta[]): Planeta[] {
  return planetas.filter(p => p.climate === "temperate");
}

console.log("\nEjercicio 4 - Obtener planetas habitables:");
console.log("Todos los planetas:", planetas.map(p => p.name).join(", "));
console.log("Planetas habitables (temperate):", obtenerHabitable(planetas).map(p => p.name).join(", "));

//JMM:// Ejercicio 5: Métodos mutantes - push, pop, sort
console.log("\nEjercicio 5 - Métodos mutantes (push, pop, sort):");

//JMM:// Stack con push y pop
const pila: number[] = [];
console.log("Pila vacía:", pila);
pila.push(10);
console.log("Después de push(10):", pila);
pila.push(20);
console.log("Después de push(20):", pila);
pila.push(30);
console.log("Después de push(30):", pila);
const ultimo = pila.pop();
console.log("pop() devolvió:", ultimo, "- Pila ahora:", pila);

//JMM:// Sort numérico con comparador
const desordenado = [30, 5, 1, 44, 12, 7];
console.log("\nArray antes de sort:", desordenado);
desordenado.sort((a, b) => a - b);
console.log("Array después de sort (a, b) => a - b:", desordenado);
console.log("El array original SÍ fue modificado por sort()");

//JMM:// Ejercicio 6: Copias con slice() y spread, contrastando con sort
console.log("\nEjercicio 6 - Copias con slice() y spread:");

const originalArr = [5, 3, 8, 1, 9];

//JMM:// Copia con slice()
const copiaSlice = originalArr.slice();
copiaSlice.sort((a, b) => a - b);
console.log("Original después de ordenar la copia con slice():", originalArr);
console.log("Copia con slice() ordenada:", copiaSlice);

//JMM:// Copia con spread
const copiaSpread = [...originalArr];
copiaSpread.sort((a, b) => a - b);
console.log("\nOriginal después de ordenar la copia con spread:", originalArr);
console.log("Copia con spread ordenada:", copiaSpread);

//JMM:// Contrastar: sort sí muta el original
const originalMutante = [5, 3, 8, 1, 9];
console.log("\n--- Contrastar: toSorted NO muta el original ---");
console.log("Antes de sort:", originalMutante);
originalMutante.toSorted();
console.log("Después de sort (NO mutó):", originalMutante);

console.log("\n--- Contrastar: sort muta el original ---");
console.log("Antes de sort:", originalMutante);
originalMutante.sort((a, b) => a - b);
console.log("Después de sort (sí mutó):", originalMutante);

