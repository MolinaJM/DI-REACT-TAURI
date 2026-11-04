export {};
//JMM:// ============================================================
//JMM:// BLOQUE 04 — Interfaces
//JMM:// ============================================================

//JMM:// ---------------------------------------------------------------
//JMM:// 1) Interface Personaje  -->  base de datos de personajes de ciencia ficción
//JMM:// ---------------------------------------------------------------
console.log("=== 1) Interface Personaje ===\n");
//Flujo normal: interface-->constructor-->instancias

interface Personaje {
  nombre: string;
  planeta: string;
  nave?: string;
  presentarse(): void;
}

//crearPersonaje es una "especie de new" en Java (para entendernos)
function crearPersonaje( nombre: string, planeta: string, nave?: string): Personaje {
  return { nombre, planeta, nave, presentarse() {
      console.log(`Soy ${this.nombre}, de ${this.planeta}${this.nave ? `, piloto de ${this.nave}` : ""}`);
    },
  };
}

let personaje1 = crearPersonaje("Luke", "Tatooine", "X-Wing");
let personaje2 = crearPersonaje("Leia", "Alderaan");

personaje1.presentarse();
personaje2.presentarse();

//JMM:// ---------------------------------------------------------------
//JMM:// 2) Extender Personaje a Piloto
//JMM:// ---------------------------------------------------------------
console.log("\n=== 2) Interface Piloto (extiende Personaje) ===\n");

interface Piloto extends Personaje {
  velocidadMax: number;
  mision: string;
}

//Hecha con f.arrow
const crearPiloto=( nombre: string, planeta: string, nave: string, 
  velocidadMax: number,
  mision: string
): Piloto => {
  return { nombre, planeta, nave, velocidadMax, mision, presentarse() {
      console.log(`Soy ${this.nombre}, de ${this.planeta}. Piloto de ${this.nave} a ${this.velocidadMax} km/h. Misión: ${this.mision}`);
    },
  };
}

let piloto1 = crearPiloto("Han", "Corellia", "Millennium Falcon", 100000, "Contrabando");
piloto1.presentarse();

//JMM: Piloto hereda nombre, planeta y presentarse() de Personaje,
//JMM: y añade velocidadMax y mision. La herencia de interfaces es como
//JMM: extender una clase pero solo para tipos.

//JMM:// ---------------------------------------------------------------
//JMM:// 3) Declaration merging  :  dos interfaces con el mismo nombre
//JMM:// ---------------------------------------------------------------
console.log("\n=== 3) Declaraton merging \n");

//JMM: Realmente habría que poner las interfaces en ficheros separados
interface ConfigBase {
  nombreApp: string;
  version: string;
}

//JMM: Reabrimos la misma interface y añadimos más campos
interface ConfigBase {
  autor: string;
  licencia: string;
}

//JMM: TS fusiona ambas declaraciones. ConfigBase tiene los 4 campos.
let config: ConfigBase = {
  nombreApp: "Mi App",
  version: "1.0.0",
  autor: "Ana Dev",
  licencia: "MIT",
};

console.log("Config fusionada:", config);
//JMM: Esto es muy útil cuando tienes módulos separados que añaden
//JMM: configuración a la misma entidad. En React se usa poco, pero en
//JMM: librerías de terceros es común (declaration merging de interfaces).

//JMM:// ---------------------------------------------------------------
//JMM:// 4) Extender interface  -->  Rango y RangoOficial
//JMM:// ---------------------------------------------------------------
console.log("\n=== 4) Extender interface: Rango y RangoOficial ===\n");

interface Rango {
  nombre: string;
  nivel: number;
}

interface RangoOficial extends Rango {
  autoridad: number;
}

function crearRango(nombre: string, nivel: number): Rango {
  return { nombre, nivel };
}

function crearRangoOficial(nombre: string, nivel: number, autoridad: number): RangoOficial {
  return { nombre, nivel, autoridad };
}

//No ponemos tipo pero los infiere
let rango1 = crearRango("Cadete", 1);
let rango2 = crearRangoOficial("Capitán", 5, 100);

console.log("Rango básico:", rango1);
console.log("Rango oficial:", rango2);
//JMM: RangoOficial hereda nombre y nivel de Rango y añade autoridad.
//JMM: Con extends reutilizamos la definición sin repetir campos.

//JMM:// ---------------------------------------------------------------
//JMM:// 5) Interface Nave : tienda online de naves
//JMM:// ---------------------------------------------------------------
console.log("\n=== 5) Interface Nave ===\n");

interface Nave {
  id: number;
  precio: number;
  descuento?: number;
}

let corbeta: Nave = {id: 101,precio: 999.99,descuento: 15};
let destructor: Nave = {id: 102,precio: 29.99};//JMM: sin descuento

function calcularPrecioFinal(n: Nave): number {
  if (n.descuento) { //// Truthy narrowing: estrecha el tipo de (number|undefined) a (number)
    //Hay narrowing siempre que elimino algún tipo de dato del total.
    return n.precio*(1- n.descuento/100);
  }
  return n.precio;
}

console.log(`Corbeta: €${corbeta.precio}  -->  con ${corbeta.descuento}% dto: €${calcularPrecioFinal(corbeta).toFixed(2)}`);
console.log(`Destructor: €${destructor.precio}  -->  sin descuento: €${calcularPrecioFinal(destructor).toFixed(2)}`);

//JMM:// ---------------------------------------------------------------
//JMM:// 6) readonly  :  configuración de estación espacial
//JMM:// ---------------------------------------------------------------
console.log("\n=== 6) Interface readonly: ConfiguracionEstacion ===\n");

interface ConfiguracionEstacion {
  readonly modulo: string;
  readonly gravedad: number;
}

let estacion: ConfiguracionEstacion = {modulo: "Alpha", gravedad: 9.8};

console.log("Estación inicial:", estacion);

//JMM: Intentar modificar  -->  TS da error en compile time
estacion.modulo = "Beta";  //  Error: Cannot assign to 'modulo' because it is a read-only property
estacion.gravedad = 0;  //  Error: Cannot assign to 'gravedad' because it is a read-only property

//A PESAR DE ESTO, las variables cambian en RUNTIME (por como funciona JS: Pasa de las interfaces y types)

console.log("Intento de modificar modulo (error en compile time):");
console.log("  estacion.modulo = 'Beta'  -->  TS error: Cannot assign to 'modulo'");

//JMM: readonly es como const pero para propiedades de objetos.
//JMM: En React se usa mucho para props que no deben mutar.
//JMM: Cuidado: readonly es solo en compile time. En runtime, el objeto
//JMM: se puede modificar (a menos que uses Object.freeze).

//JMM: interface  -->  define la forma de objetos (contrato)
//JMM: campos opcionales con ?
//JMM: extends  -->  herencia de interfaces (solo interface, no type)
//JMM: declaration merging  -->  dos interfaces con mismo nombre se fusionan (solo interface, no type)
//JMM: readonly  -->  propiedad inmutable tras inicialización
//JMM: interface es preferible a type para objetos en React (Props, entidades)
