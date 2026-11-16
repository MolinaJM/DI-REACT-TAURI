# 14. React & TypeScript Cheatsheet: Decálogo

> Cheatsheet de las **10 reglas de oro** de React con TypeScript y Tauri. Cada número resume un concepto del apunte y cómo aplicarlo en los proyectos del curso.

---

## 1. Componentes y props

- Las props son los parámetros de **entrada** que un padre le pasa a un hijo (**de solo lectura**).
- El padre elige el nombre de la prop (ej. `onEnviar`) y el hijo **debe** usar exactamente ese mismo nombre.
- Las props fluyen únicamente de **arriba hacia abajo** (Padre → Hijo).

```tsx
// El padre pone el nombre de la prop: onEnviar y lo instancia con setNombre
<FormularioNombre onEnviar={setNombre} />

// El hijo debe usar exactamente ese mismo nombre en el destructuring
function FormularioNombre({ onEnviar }: { onEnviar: (texto: string) => void }) {
  // ...
}
```

> 📦 **Dónde se ve en el proyecto:** [`App.tsx`](../../../repos/02-react-ejemplo-pelis/src/App.tsx) pasa `onEditar`/`onBorrar` a `PeliculaRow`, y [`PeliculaRow.tsx`](../../../repos/02-react-ejemplo-pelis/src/components/PeliculaRow.tsx) declara esas props en `PeliculaRowProps`.

---

## 2. El estado (`useState`) y hooks

- Usar `useState` es usar un **Hook** (todas las funciones que empiezan con `use` son Hooks).
- Un **Hook** es la **memoria interna** del componente: cuando cambia, React **re-renderiza** el componente automáticamente.
- **Regla:** si un componente solo muestra datos que vienen de fuera y no necesita guardar ni comunicar nada (como `Saludo`), **no necesita estado**; solo props.
- **Componentes controlados:** los inputs necesitan estado propio para no quedarse congelados y almacenar lo que el usuario escribe letra a letra.
- **Estado pasarela:** el padre requiere estado propio cuando necesita guardar la información que le manda un hijo para transmitirla como prop a otro.

> 📦 **Dónde se ve en el proyecto:** [`App.tsx`](../../../repos/02-react-ejemplo-pelis/src/App.tsx) (`useState<Pelicula[]>`, `busqueda`, `enEdicion`) y [`PeliculaForm.tsx`](../../../repos/02-react-ejemplo-pelis/src/components/PeliculaForm.tsx) (un `useState` por campo controlado).

---

## 3. Reglas de oro de los hooks

- Llamarlos **solo en el nivel superior** del componente (**nunca** dentro de `if`, bucles `for` o funciones internas).
- Llamarlos **solo** desde componentes de función de React o **Custom Hooks**: funciones que empiezan por use... y permiten ser reutilizados. Ej: me creo un componente *contador* con useState, pero ahora quiero reutilizar ese "componente" en muchos más sitios. En vez de copiar/pegar código me creo un **Custom Hook** useContador y lo llamo desde donde quiera. 
- No confundir **Custom Hook** con un componente. El componente devuelve JSX, el otro no, solo sirve para manejar lógica, te puede devolver por ejemplo un booleano.

> 📦 **Dónde se ve en el proyecto:** [`App.tsx`](../../../repos/02-react-ejemplo-pelis/src/App.tsx) y [`PeliculaForm.tsx`](../../../repos/02-react-ejemplo-pelis/src/components/PeliculaForm.tsx): todos los hooks se llaman en el nivel superior del componente, nunca dentro de un `if` o un bucle.

---

## 4. Estado y Virtual DOM

- El estado es el **disparador** del Virtual DOM.
- Al cambiar el estado, React genera un nuevo Virtual DOM, lo compara con el anterior (**diffing**) y actualiza únicamente las partes **estrictamente necesarias** en el DOM real del navegador.

> 📦 **Dónde se ve en el proyecto:** cada `setPeliculas` de [`App.tsx`](../../../repos/02-react-ejemplo-pelis/src/App.tsx) provoca el re-render de la tabla; solo cambian las filas afectadas.

---

## 5. Inmutabilidad del estado

- **Nunca** modifiques el estado directamente (ej. `lista.push(x)` u `objeto.nombre = "x"`).
- Usa siempre la función setter creando un **objeto/array nuevo**: `setLista([...lista, x])` · `setObjeto({ ...objeto, nombre: "x" })`.

> 📦 **Dónde se ve en el proyecto:** [`App.tsx`](../../../repos/02-react-ejemplo-pelis/src/App.tsx) — `añadir` usa `[...peliculas, nueva]`, `editar` usa `map` con spread y `borrar` usa `filter`.

---

## 6. Elevación del estado (Lifting State Up)

- Si dos componentes **hermanos** necesitan compartir datos, el estado se **sube al padre común más cercano**, que lo reparte después por props.
- Si los componentes están separados en la jerarquía convendría emplear `useContext`. 

> 📦 **Dónde se ve en el proyecto:** [`App.tsx`](../../../repos/02-react-ejemplo-pelis/src/App.tsx) es la fuente de la verdad (`peliculas`, `enEdicion`) y reparte datos y callbacks por props a `PeliculaRow` y `PeliculaForm`.

---

## 7. Comunicación hijo → padre (callbacks)

- Para enviar datos hacia arriba, el padre le pasa al hijo una **función (o el setter del estado)** como prop.
- Al ejecutarse dentro del hijo, la función le **devuelve los datos al padre**.

> 📦 **Dónde se ve en el proyecto:** [`PeliculaForm.tsx`](../../../repos/02-react-ejemplo-pelis/src/components/PeliculaForm.tsx) llama a `onGuardar(datos)` y [`PeliculaRow.tsx`](../../../repos/02-react-ejemplo-pelis/src/components/PeliculaRow.tsx) llama a `onEditar(id)`/`onBorrar(id)`.

---

## 8. TypeScript en React y Tauri

- **Interfaces para props:** define el "contrato" de entrada que exige el componente (`interface PeliculaCardProps`).
- **Eventos HTML:** usa `React.ChangeEvent` para capturar lo que el usuario escribe en inputs antes de enviarlo.
- **Genéricos en `useState` e `invoke`:** tipa el estado (`useState<Pelicula[]>([])`) y el retorno de los comandos (`invoke<Pelicula[]>("...")`) para manejar datos complejos o la comunicación con Rust de forma segura.

```tsx
const [nombre, setNombre] = useState<string>("");
const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setNombre(e.target.value);

// Tauri: invoca a Rust tipando el retorno
const lista = await invoke<Pelicula[]>("listar_peliculas");
```

> 📦 **Dónde se ve en el proyecto:** [`tipos.ts`](../../../repos/02-react-ejemplo-pelis/src/tipos.ts) (interfaces y utility types), [`PeliculaForm.tsx`](../../../repos/02-react-ejemplo-pelis/src/components/PeliculaForm.tsx) (`ChangeEvent`/`SubmitEvent`) y [`App.tsx`](../../../repos/02-react-ejemplo-pelis/src/App.tsx) (`useState<Pelicula[]>`).

---

## 9. Otros conceptos clave

- **Claves en listas (`key`):** cada elemento generado con `.map()` debe llevar un `key` **único**.
- **Efectos (`useEffect`):** hook para conectar con el **exterior** (APIs, `invoke` de Tauri, listeners de Rust). **Limpia siempre los listeners al desmontar**.
- **Regla de oro de interactividad:** ¿el usuario hace una acción que cambia algo fuera del componente? → **Sí:** pásale una prop de función. **No:** solo datos estáticos (props).

> 📦 **Dónde se ve en el proyecto:** `key={pelicula.id}` en [`App.tsx`](../../../repos/02-react-ejemplo-pelis/src/App.tsx) y el `useEffect` de carga en [`App.tsx`](../../../repos/02-react-ejemplo-pelis-api/src/App.tsx).

---

## 10. Arquitectura asíncrona en Tauri (IPC Bridge)

- La comunicación entre React y Rust (vía `invoke`) es **siempre asíncrona**.
- **Estados de carga:** toda llamada a Rust requiere gestionar estados (`cargando`/`error`) en React para mantener la interfaz de escritorio fluida y **no bloquear la UI** durante operaciones del sistema (disco, red, comandos).

```tsx
const [cargando, setCargando] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  invoke<Pelicula[]>("listar_peliculas")
    .then(setLista)
    .catch((e: unknown) => setError(String(e)))
    .finally(() => setCargando(false));
}, []);
```

> 📦 **Dónde se ve en el proyecto:** [`App.tsx`](../../../repos/02-react-ejemplo-pelis-api/src/App.tsx) gestiona `cargando`/`error` en el `useEffect` de carga (con `fetch` en el navegador; en Tauri sería `invoke`), y [`api.ts`](../../../repos/02-react-ejemplo-pelis-api/src/api.ts) encapsula las llamadas asíncronas.

---

[← Volver a 11 · React de cero](11_Que_es_React.md)