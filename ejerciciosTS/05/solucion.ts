export {};
//JMM:// ============================================================
//JMM:// BLOQUE 05 — Type Aliases
//JMM:// ============================================================

//JMM:// ---------------------------------------------------------------
//JMM:// 1) Type alias Coordenadas  -->  sistema de coordenadas para mapa
//JMM:// ---------------------------------------------------------------
console.log("=== 1) Type alias Coordenadas ===\n");

type Coordenadas = { x: number, y: number};

function calcularDistancia(p1: Coordenadas, p2: Coordenadas): number {
  let dx=p2.x-p1.x;
  let dy=p2.y-p1.y;
  return Math.sqrt(dx*dx + dy*dy);
}

function mostrarCoordenadas(nombre: string, coords: Coordenadas): void {
  console.log(`${nombre}: (${coords.x}, ${coords.y})`);
}

let puntoA: Coordenadas = {x: 0, y: 0};
let puntoB: Coordenadas = {x: 3, y: 4};

mostrarCoordenadas("Punto A", puntoA);
mostrarCoordenadas("Punto B", puntoB);
console.log(`Distancia entre A y B: ${calcularDistancia(puntoA, puntoB)}`);
//JMM: 3-4-5: la distancia es 5. Truco: los type aliases son ideales para
//JMM: tipos compuestos que reutilizas en múltiples funciones.

//JMM:// ---------------------------------------------------------------
//JMM:// 2) Type alias TarjetaProducto  -->  tarjeta de producto de una tienda
//JMM:// ---------------------------------------------------------------
console.log("\n=== 2) Type alias TarjetaProducto ===\n");

type TarjetaProducto = {
  titulo: string;
  precio: number;
  descripcion?: string;
};

function resumirProducto(producto: TarjetaProducto): string {
  return `${producto.titulo} — ${producto.precio}€${producto.descripcion ? ` · ${producto.descripcion}` : ""}`;
}

let teclado: TarjetaProducto = {titulo: "Teclado mecánico", precio: 59.99, descripcion: "switch rojo"};
let raton: TarjetaProducto = {titulo: "Ratón inalámbrico", precio: 24.5};

console.log(resumirProducto(teclado));
console.log(resumirProducto(raton));

//JMM: La propiedad opcional (descripcion?) evita tener que repetir el type
//JMM: para productos con y sin descripción: un solo alias cubre ambos casos.
//JMM: Nota: el ternario (condicion ? a : b) se ve en detalle más adelante;
//JMM: aquí lo usamos de forma sencilla para concatener un texto opcional.

//JMM:// ---------------------------------------------------------------
//JMM:// 3) Type alias objeto con readonly, opcionales y método  -->  ficha técnica de cerveza artesana
//JMM:// ---------------------------------------------------------------
console.log("\n=== 3) Type alias Cerveza (objeto con readonly, opcionales y método) ===\n");

type Cerveza = {
  readonly id: number;
  nombre: string;
  tipo?: string;
  precio: number;
  describir(): string;
};

function crearCerveza(id: number, nombre: string, tipo: string, precio: number): Cerveza {
  return { id, nombre, tipo, precio, describir() { //Ojo al uso de || (aún  no lo hemos visto, pero actúa como un OR)
      return `${this.nombre} (${this.tipo || "sin especificar"}) — €${this.precio}`;
    },
  };
}

let cerveza1: Cerveza = crearCerveza(1, "IPA del Norte", "IPA", 4.5);
let cerveza2: Cerveza = crearCerveza(2, "Rubia Suave", "Rubia", 3.8);

console.log(cerveza1.describir());
console.log(cerveza2.describir());

//JMM: readonly id : no se puede modificar después de crear
//JMM: tipo?: string : propiedad opcional, no hace falta pasarla
//JMM: describir(): string : método obligatorio dentro del type alias
//JMM: La misma definición cubre cervezas con y sin tipo específico.

//JMM: Intentar modificar el id  -->  TS da error en compile time
//JMM: cerveza1.id = 99;  //  Error: Cannot assign to 'id' because it is a read-only property

//JMM:// ---------------------------------------------------------------
//JMM:// 4) Type alias unión de literales  -->  tipos de cerveza del bar
//JMM:// ---------------------------------------------------------------
console.log("\n=== 4) Type alias unión: TipoCerveza ===\n");

type TipoCerveza = "IPA" | "Lager" | "Stout" | "Trigo" | "Rubia";

let cervezaDelDia: TipoCerveza = "IPA";
console.log(`Cerveza del día: ${cervezaDelDia}`);

cervezaDelDia = "Stout";
console.log(`Cerveza del día cambiada a: ${cervezaDelDia}`);

//JMM: Intentar asignar un valor no válido  -->  TS da error en compile time
cervezaDelDia = "Porter";  //  Error: Type '"Porter"' is not assignable to type 'TipoCerveza'
//JMM: Esto NO evita que la cambie!!!
console.log(`Cerveza del día cambiada a: ${cervezaDelDia}`);

//JMM: Las uniones de literales actúan como enums ligeros: restringen los valores posibles
//JMM: a un conjunto cerrado y autodescriptivo. En React se usan mucho para estados y tipos.

//JMM:// ---------------------------------------------------------------
//JMM:// 5) Type alias tupla  -->  ticket de bar
//JMM:// ---------------------------------------------------------------
console.log("\n=== 5) Type alias tupla: Ticket ===\n");

type Ticket = [numero: number, cervezas: string[], total: number];

function crearTicket(numero: number, cervezas: string[], total: number): Ticket {
  return [numero, cervezas, total];
}

function mostrarTicket(ticket: Ticket): void {
  let [num, lista, total] = ticket;
  console.log(`---Ticket #${num} ---`);
  for (let c of lista) { //El for-or se adelantó en apuntes anteriores, pero se verá a fondo más adelante.
    console.log(`  · ${c}`);
  }
  console.log(`  Total: €${total.toFixed(2)}`);
}

let ticket1: Ticket = crearTicket(101, ["IPA del Norte", "Rubia Suave"], 8.3);
let ticket2: Ticket = crearTicket(102, ["Stout Oscura", "Trigo Blanca", "Lager Clásica"], 12.9);

mostrarTicket(ticket1);
mostrarTicket(ticket2);

//JMM: Las tuplas son ideales cuando tienes un número fijo de campos con tipos distintos.
//JMM: La sintaxis [numero: number, cervezas: string[], total: number] etiqueta cada posición
//JMM: para que el destructuring sea más legible. 

//JMM:// ---------------------------------------------------------------
//JMM:// 6) Type alias función + objetos anidados  -->  sistema de reseñas del bar
//JMM:// ---------------------------------------------------------------
console.log("\n=== 6) Type alias función + objetos anidados: Bar y Reseña ===\n");

type Resena = (cerveza: Cerveza) => string; //Firma de función

type Bar = {
  nombre: string;
  menu: Cerveza[];
  resenar: Resena; //usamos la firma
};

//En la creación se le pasará la función específica
function crearBar(nombre: string, menu: Cerveza[], resenar: Resena): Bar {
  return { nombre, menu, resenar };
}

function resenarIPA(c: Cerveza): string {
  return `${c.nombre}: amargor intenso y aroma cítrico. Ideal para tardes de verano, o cuando sea....!`;
}

function resenarGeneral(c: Cerveza): string {
  return `${c.nombre}: una cerveza sólida para cualquier ocasión.`;
}

let bar1: Bar=crearBar("El Lúpulo Dorado", [cerveza1, cerveza2], resenarIPA);
let bar2: Bar=crearBar("La Canasta", [cerveza1, cerveza2], resenarGeneral);

console.log(`Bar: ${bar1.nombre}`);
console.log(`Menú: ${bar1.menu.map((c) => c.nombre).join(", ")}`); //Vemos otro ejemplo de .map que se tratará más adelante
console.log(`Reseña: ${bar1.resenar(cerveza1)}`);

console.log(`\nBar: ${bar2.nombre}`);
console.log(`Menú: ${bar2.menu.map((c) => c.nombre).join(", ")}`);
console.log(`Reseña: ${bar2.resenar(cerveza2)}`);

//JMM: Los type aliases de función (Resena) se reutilizan en múltiples objetos.
//JMM: Bar referencia Cerveza[] para el menú y Resena para el método de reseña.
//JMM: Esto es el patrón de composición: defines tipos pequeños y los combinas
//JMM: en estructuras más grandes. En React, las props de los componentes siguen
//JMM: exactamente este enfoque: type Props = { on_click: () => void; items: Item[] }.

console.log("\n¡Todos los ejercicios de Type Aliases completados!");
