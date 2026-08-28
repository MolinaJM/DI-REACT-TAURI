interface EntradaCache<T> {
  data: T;
  timestamp: number;
  expiraEn: number; // ms
}

class AlmacenPersistente<T extends object> {
  private store: Map<string, EntradaCache<unknown>> = new Map();

  constructor(private claveRaiz: string) {
    this.cargar();
  }

  private cargar(): void {
    const raw = localStorage.getItem(this.claveRaiz);
    if (raw) {
      const parsed = JSON.parse(raw) as [string, EntradaCache<unknown>][];
      this.store = new Map(parsed);
    }
  }

  private guardar(): void {
    localStorage.setItem(
      this.claveRaiz,
      JSON.stringify([...this.store.entries()])
    );
  }

  set<K extends keyof T>(clave: K, data: T[K], ttlMs: number = 300000): void {
    this.store.set(clave as string, {
      data,
      timestamp: Date.now(),
      expiraEn: ttlMs,
    });
    this.guardar();
  }

  get<K extends keyof T>(clave: K): T[K] | null {
    const entrada = this.store.get(clave as string);
    if (!entrada) return null;

    if (Date.now() - entrada.timestamp > entrada.expiraEn) {
      this.store.delete(clave as string);
      this.guardar();
      return null;
    }

    return entrada.data as T[K];
  }

  eliminar<K extends keyof T>(clave: K): void {
    this.store.delete(clave as string);
    this.guardar();
  }

  limpiar(): void {
    this.store.clear();
    localStorage.removeItem(this.claveRaiz);
  }
}

// Uso
interface DatosApp {
  usuario: { nombre: string; rol: string };
  preferencias: { tema: "claro" | "oscuro"; idioma: string };
  ultimaRuta: string;
}

const almacen = new AlmacenPersistente<DatosApp>("app-state");

almacen.set("usuario", { nombre: "Ana", rol: "admin" }, 3600000);
almacen.set("preferencias", { tema: "oscuro", idioma: "es" });

const usuario = almacen.get("usuario");
console.log(usuario?.nombre); // "Ana"
