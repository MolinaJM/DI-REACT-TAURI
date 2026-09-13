// ============================================================
// 🏁 S02 · RETO FINAL · La máquina expendedora (ENUNCIADO)
// ============================================================
// Léelo entero ANTES de escribir la primera línea de código.
// ------------------------------------------------------------
// El objetivo de este reto es construir una pequeña máquina expendedora
// integrando en un único programa TODO lo visto en la sesión S02: uniones
// de literales, narrowing, type guards con predicados de tipo, parámetros
// por defecto, ternarios y el operador de coalescencia nula, bucles,
// un switch exhaustivo con el tipo never, aserciones, ámbito y closures.
//
// Cada función llega con su declaración (firma y tipos) ya escrita y el
// cuerpo vacío o con un return de relleno. Tu trabajo es completar SOLO
// los cuerpos: no cambies nombres, firmas ni tipos, ni añadas export de
// más. Resuélvelo apartado por apartado y en orden:
//
//   1) panelEstado(estado) → texto
//      Devuelve el nombre del estado en mayúsculas y en español. Es un
//      caso de libro del switch exhaustivo: un case por cada estado de la
//      máquina y una rama por defecto escrita de forma que, si mañana
//      alguien añade un estado nuevo, el compilador te avise de que falta
//      tratarlo (no un return más: la rama que no puede ejecutarse).
//
//   2) esMoneda(valor) → sí / no
//      Determina si el número recibido es una moneda válida (1, 2, 5 o 10
//      céntimos). Debe escribirse como predicado de tipo para que quien lo
//      llame obtenga, cuando responda que sí, un valor ya afinado del tipo
//      Moneda en lugar de un simple booleano.
//
//   3) calcularTotal(precios, descuentoCéntimos) → total
//      Suma todos los precios de la lista recorriéndola con un bucle que
//      recorre los elementos (no los índices). El descuento es opcional
//      (por defecto 0) y va en céntimos. Resta el descuento y, si el
//      resultado quedara negativo, devuelve 0. Elige entre total y 0 con
//      un ternario.
//
//   4) precioDe(productos, nombre) → precio
//      Define la interfaz Producto (nombre, precio y stock). Busca un
//      producto por su nombre y devuelve su precio; si no existe, devuelve
//      0, resolviendo el "no encontrado" con el operador de coalescencia
//      nula en lugar de un condicional.
//
//   5) formatoPrecio(céntimos) → texto
//      Convierte una cantidad en céntimos en texto legible con formato de
//      precio ("125" → "1,25 €"): parte entera, coma, dos decimales
//      siempre (rellena con un cero a la izquierda si hace falta) y el
//      símbolo de euro. Hazlo con las conversiones y utilidades de
//      números y cadenas de la sesión (redondeo, resto de la división,
//      paso a cadena, relleno). No uses formateadores automáticos ni
//      objetos de fecha.
//
//   6) darCambio(céntimos) → lista de monedas
//      Descompone una cantidad en la menor cantidad posible de monedas de
//      10, 5, 2 y 1 céntimo, probando siempre primero la mayor. Recorre
//      con un bucle la lista fija de monedas (declarada como constante de
//      solo lectura) y, por cada moneda, calcula cuántas veces cabe
//      (división entera), las añade al resultado y deja el resto
//      (módulo) para la siguiente moneda.
//
//   7) crearMaquina(productos) → máquina
//      Devuelve un objeto que guarda el catálogo y un contador de ventas
//      como datos privados de un closure (nadie de fuera debe poder leerlos
//      directamente), con estos métodos:
//        - vender(nombre, pagado?): busca el producto; si no existe,
//          falta stock o no llega el dinero, devuelve null. Si la venta es
//          válida, descontar una unidad de stock, suma una venta al
//          contador privado y devuelve el cambio correcto calculado con el
//          apartado 6.
//        - reabastecer(nombre, cantidad): suma esa cantidad al stock solo
//          si el producto existe.
//        - totalVentas(): devuelve el contador privado.
//        - inventario(): devuelve un texto con todos los productos y su
//          stock en el formato "nombre: cantidad · nombre2: cantidad2"
//          (constrúyelo uniendo el catálogo).
//
// Al terminar, comprueba el resultado ejecutando el reto y, si te atascas,
// compara TU versión con la solución de referencia (soluciones/s02/12-reto-s02.ts)
// solo como autocomprobación: lo importante es que lo acabes explicando tú.
//
// ============================================================
// ▶ RESUMEN EXPRÉS (recuerda la regla del reto)
// ============================================================
// Programa pequeño que integra TODO lo visto en S02:
//   - uniones de literales y narrowing
//   - type guards (predicados de tipo)
//   - parámetros por defecto, ternario, `??`, bucles
//   - switch exhaustivo con `never`
//   - ámbito y closures
//   - aserciones y manejo de `undefined` / `null`
// Completa. Solución: soluciones/s02/12-reto-s02.ts

// 1) Estado de la máquina (unión de literales) + switch exhaustivo
export type EstadoMaquina = "apagada" | "encendida" | "averiada";
export function panelEstado(estado: EstadoMaquina): string {
  // TODO: switch con 3 cases y el default de exhaustividad con `never`
  // apagada → "APAGADA" · encendida → "ENCENDIDA" · averiada → "AVERIADA"
  return "";
}

// 2) Type guard: ¿el dinero es una moneda válida?
export type Moneda = 1 | 2 | 5 | 10;
export function esMoneda(valor: number): valor is Moneda {
  // TODO: true solo para 1, 2, 5 o 10
  return false;
}

// 3) Total con descuento: parámetro por defecto, `for...of`, ternario
export function calcularTotal(precios: number[], descuentoCentimos = 0): number {
  // TODO: suma con `for...of`; resta el descuento; si queda negativo → 0
  return 0;
}

// 4) Buscar un producto y devolver su precio («??» + narrowing de undefined)
export interface Producto {
  nombre: string;
  precio: number;
  stock: number;
}
export function precioDe(productos: Producto[], nombre: string): number {
  // TODO: busca con .find(); si NO existe devuelve 0 (usa `??`)
  return 0;
}

// 5) Formato de precios (conversión a string con padStart)
export function formatoPrecio(centimos: number): string {
  // TODO: 125 → "1,25 €" (Number, Math.trunc, %, String, padStart)
  return "";
}

// 6) Cambio: descomponer centimos en monedas (for...of + as const)
export function darCambio(centimos: number): Moneda[] {
  const monedas = [10, 5, 2, 1] as const; // mayor a menor
  const resultado: Moneda[] = [];
  // TODO: con `for...of` sobre `monedas`: cuántas veces cabe la moneda
  //       (Math.floor(restante / moneda)), añádelas y deja el resto (restante %= moneda)
  return resultado;
}

// 7) Closure: la máquina guarda su catálogo y sus ventas privadas
export type Maquina = {
  vender: (nombre: string, pagadoCentimos?: number) => { cambio: Moneda[] } | null;
  reabastecer: (nombre: string, cantidad: number) => void;
  totalVentas: () => number;
  inventario: () => string;
};

export function crearMaquina(productos: Producto[]): Maquina {
  // TODO: copia el catálogo, guarda un contador privado de ventas, y devuelve:
  //   - vender(): busca el producto (si no existe → null); si pagado < precio o
  //     stock <= 0 → null; si no, decrementa stock, suma una venta y
  //     devuelve el cambio con darCambio(pagado - precio)
  //   - reabastecer(): suma `cantidad` al stock si el producto existe
  //   - totalVentas(): el contador privado
  //   - inventario(): "nombre: Xu · nombre2: Yu" (map + join)
  return {
    vender: (nombre, pagadoCentimos) => null,
    reabastecer: (nombre, cantidad) => {},
    totalVentas: () => 0,
    inventario: () => "",
  };
}