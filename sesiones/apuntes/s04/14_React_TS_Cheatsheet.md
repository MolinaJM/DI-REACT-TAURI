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

---

## 2. El estado (`useState`) y hooks

- Usar `useState` es usar un **Hook** (todas las funciones que empiezan con `use` son Hooks).
- Un **Hook** es la **memoria interna** del componente: cuando cambia, React **re-renderiza** el componente automáticamente.
- **Regla:** si un componente solo muestra datos que vienen de fuera y no necesita guardar ni comunicar nada (como `Saludo`), **no necesita estado**; solo props.
- **Componentes controlados:** los inputs necesitan estado propio para no quedarse congelados y almacenar lo que el usuario escribe letra a letra.
- **Estado pasarela:** el padre requiere estado propio cuando necesita guardar la información que le manda un hijo para transmitirla como prop a otro.

---

## 3. Reglas de oro de los hooks

- Llamarlos **solo en el nivel superior** del componente (**nunca** dentro de `if`, bucles `for` o funciones internas).
- Llamarlos **solo** desde componentes de función de React o **Custom Hooks**: funciones que empiezan por use... y permiten ser reutilizados. Ej: me creo un componente *contador* con useState, pero ahora quiero reutilizar ese "componente" en muchos más sitios. En vez de copiar/pegar código me creo un **Custom Hook** useContador y lo llamo desde donde quiera. 
- No confundir **Custom Hook** con un componente. El componente devuelve JSX, el otro no, solo sirve para manejar lógica, te puede devolver por ejemplo un booleano.

---

## 4. Estado y Virtual DOM

- El estado es el **disparador** del Virtual DOM.
- Al cambiar el estado, React genera un nuevo Virtual DOM, lo compara con el anterior (**diffing**) y actualiza únicamente las partes **estrictamente necesarias** en el DOM real del navegador.

---

## 5. Inmutabilidad del estado

- **Nunca** modifiques el estado directamente (ej. `lista.push(x)` u `objeto.nombre = "x"`).
- Usa siempre la función setter creando un **objeto/array nuevo**: `setLista([...lista, x])` · `setObjeto({ ...objeto, nombre: "x" })`.

---

## 6. Elevación del estado (Lifting State Up)

- Si dos componentes **hermanos** necesitan compartir datos, el estado se **sube al padre común más cercano**, que lo reparte después por props.
- Si los componentes están separados en la jerarquía convendría emplear `useContext`. 

---

## 7. Comunicación hijo → padre (callbacks)

- Para enviar datos hacia arriba, el padre le pasa al hijo una **función (o el setter del estado)** como prop.
- Al ejecutarse dentro del hijo, la función le **devuelve los datos al padre**.

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

---

## 9. Otros conceptos clave

- **Claves en listas (`key`):** cada elemento generado con `.map()` debe llevar un `key` **único**.
- **Efectos (`useEffect`):** hook para conectar con el **exterior** (APIs, `invoke` de Tauri, listeners de Rust). **Limpia siempre los listeners al desmontar**.
- **Regla de oro de interactividad:** ¿el usuario hace una acción que cambia algo fuera del componente? → **Sí:** pásale una prop de función. **No:** solo datos estáticos (props).

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

---

[← Volver a 11 · React de cero](11_Que_es_React.md)