type ComponenteFn = () => string;

interface Ruta {
  patron: string;
  componente: ComponenteFn;
  titulo?: string;
}

class RouterSPA {
  private rutas: Map<string, Ruta> = new Map();
  private contenedor: HTMLElement;

  constructor(selector: string) {
    this.contenedor = document.querySelector(selector) as HTMLElement;

    window.addEventListener("popstate", () => {
      this.navegar(window.location.pathname, false);
    });
  }

  registrar(ruta: Ruta): void {
    this.rutas.set(ruta.patron, ruta);
  }

  navegar(path: string, pushState: boolean = true): void {
    const ruta = this.rutas.get(path) ?? this.rutas.get("*");

    if (!ruta) {
      this.contenedor.innerHTML = "<h1>404 - No encontrada</h1>";
      return;
    }

    if (pushState) {
      history.pushState({ path }, "", path);
    }

    if (ruta.titulo) document.title = ruta.titulo;
    this.contenedor.innerHTML = ruta.componente();
  }
}

// Uso
const app = new RouterSPA("#app");

app.registrar({
  patron: "/",
  componente: () => "<h1>Inicio</h1>",
  titulo: "Inicio",
});

app.registrar({
  patron: "/about",
  componente: () => "<h1>Acerca de</h1>",
  titulo: "Acerca de",
});

app.registrar({
  patron: "*",
  componente: () => "<h1>Error 404</h1>",
});

// Navegación mediante clicks en enlaces
document.addEventListener("click", (e: MouseEvent) => {
  const link = (e.target as HTMLElement).closest("a");
  if (!link) return;

  const href = link.getAttribute("href");
  if (href?.startsWith("/")) {
    e.preventDefault();
    app.navegar(href);
  }
});
