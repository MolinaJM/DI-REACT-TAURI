// ============================================================
// S02 · Ejercicio 2 · Interfaces
// ============================================================
// Catálogo: sesiones/EjerciciosPropuestos/ejerciciosTS.md · Bloque 4 · Interfaces
// Completa. Solución: soluciones/04-interfaces.ts

// 1) Define una interfaz `Usuario` con id (number), nombre (string) y email (string)
interface Usuario {
  // TODO
}


// 2) Define `Configuracion` con url (string) y puerto (number) OPCIONAL
interface Configuracion {
  url: string;
  // TODO: puerto?: number
}


// 3) Extiende: `Admin` = Usuario + rol ("admin" | "editor")
interface Admin {
  // TODO: extends Usuario
}


// 4) Crea un objeto `profe` de tipo Usuario
const profe: Usuario = {
  // TODO
};
