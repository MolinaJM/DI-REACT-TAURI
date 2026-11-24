# 14. React & TypeScript Cheatsheet: Decálogo

> Cheatsheet de las **10 reglas de oro** de React con TypeScript. Cada número **resume un concepto** de los apuntes y **cómo aplicarlo** en los proyectos del curso.

---

## 1. Componentes y props

- Las props son los parámetros de **entrada** que un padre le pasa a un hijo (**de solo lectura**).
- Padre e hijo han de **compartir el MISMO** nombre de la prop (ej. `onEnviar`).
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

- Usar `useState` es usar un **Hook** (ya sabemos que todas las funciones que empiezan con `use` son Hooks).
- Un **Hook** es la **memoria interna** del componente: cuando cambia, React **re-renderiza** el componente automáticamente.
- **Regla:** si un componente solo muestra datos que vienen de fuera y no necesita guardar ni comunicar nada (como `Saludo`), **no necesita estado**; solo props.
- **Componentes controlados:** los inputs necesitan estado propio para no quedarse congelados y almacenar lo que el usuario escribe letra a letra.
- **Estado pasarela:** el padre requiere estado propio cuando necesita guardar la información que le manda un hijo para transmitirla como prop a otro.

> 📦 **Dónde se ve en el proyecto:** [`App.tsx`](../../../repos/02-react-ejemplo-pelis/src/App.tsx) (`useState<Pelicula[]>`, `busqueda`, `enEdicion`) y [`PeliculaForm.tsx`](../../../repos/02-react-ejemplo-pelis/src/components/PeliculaForm.tsx) (un `useState` por campo controlado).

---

## 3. Reglas de oro de los hooks

- Llamarlos **solo en el nivel superior** del componente (**nunca** dentro de `if`, bucles `for` o funciones internas).
- Llamarlos **solo** desde componentes de función de React o **Custom Hooks**: funciones que empiezan por use... y permiten ser reutilizados. Ej: me creo un componente *contador* con useState, pero ahora quiero reutilizar ese "componente" en muchos más sitios. En vez de copiar/pegar código me creo un **Custom Hook** useContador y lo llamo desde donde quiera. 
- No confundir, un **Custom Hook NO es un componente**. El componente devuelve JSX, el otro no, solo sirve para manejar lógica, puede llamar a otros Hooks o te puede devolver por ejemplo un booleano.

> 📦 **Dónde se ve en el proyecto:** [`App.tsx`](../../../repos/02-react-ejemplo-pelis/src/App.tsx) y [`PeliculaForm.tsx`](../../../repos/02-react-ejemplo-pelis/src/components/PeliculaForm.tsx): todos los hooks se llaman en el nivel superior del componente, nunca dentro de un `if` o un bucle.

---

## 4. Estado y Virtual DOM

- El estado es el **disparador** del Virtual DOM.
- Al cambiar el estado, React genera un nuevo Virtual DOM, lo compara con el anterior (**diffing**) y actualiza únicamente las partes **estrictamente necesarias** en el DOM real del navegador.
- **Claves en listas (`key`):** cada elemento generado con `.map()` debe llevar un `key` **único** — es la pista que usa el diffing para saber qué filas cambian y no re-renderizar de más.

> 📦 **Dónde se ve en el proyecto:** cada `setPeliculas` de [`App.tsx`](../../../repos/02-react-ejemplo-pelis/src/App.tsx) provoca el re-render de la tabla; solo cambian las filas afectadas, y `key={pelicula.id}` en el `.map` de [`App.tsx`](../../../repos/02-react-ejemplo-pelis/src/App.tsx) guía ese diffing.

---

## 5. Inmutabilidad del estado

- **Nunca** modifiques el estado directamente (ej. `lista.push(x)` u `objeto.nombre = "x"`).
- Usa siempre la función setter creando un **objeto/array nuevo**: `setLista([...lista, x])` · `setObjeto({ ...objeto, nombre: "x" })`.

> 📦 **Dónde se ve en el proyecto:** [`App.tsx`](../../../repos/02-react-ejemplo-pelis/src/App.tsx) — `añadir` usa `[...peliculas, nueva]`, `editar` usa `map` con spread y `borrar` usa `filter`.

---

## 6. Elevación del estado (Lifting State Up)

- Si dos componentes **hermanos** necesitan compartir datos, el estado se **sube al padre común más cercano**, que lo reparte después por props.
- Si los componentes están separados en la jerarquía convendría emplear `useContext` o incluso librerías externas como `Zustang`. 

> 📦 **Dónde se ve en el proyecto:** [`App.tsx`](../../../repos/02-react-ejemplo-pelis/src/App.tsx) es la fuente de la verdad (`peliculas`, `enEdicion`) y reparte datos y callbacks por props a `PeliculaRow` y `PeliculaForm`.

---

## 7. Comunicación hijo → padre (callbacks)

- Para enviar datos hacia arriba, el padre le pasa al hijo una **función (o incluso un setter de estado)** como prop.
- Al ejecutarse dentro del hijo, la función le **da los datos al padre** (ejecuta algo en el padre).
- **Regla de oro de interactividad:** ¿el usuario hace una acción que cambia algo fuera del componente? → **Sí:** pásale una prop de función. **No:** solo datos estáticos (props).

> 📦 **Dónde se ve en el proyecto:** [`PeliculaForm.tsx`](../../../repos/02-react-ejemplo-pelis/src/components/PeliculaForm.tsx) llama a `onGuardar(datos)` y [`PeliculaRow.tsx`](../../../repos/02-react-ejemplo-pelis/src/components/PeliculaRow.tsx) llama a `onEditar(id)`/`onBorrar(id)`.

---

## 8. TypeScript en React

- **Interfaces para props:** define el "contrato" de entrada que exige el componente (`interface PeliculaCardProps`).
- **Eventos HTML:** usa `React.ChangeEvent` para capturar lo que el usuario escribe en inputs antes de enviarlo.
- **Genéricos en `useState`:** tipa el estado (`useState<Pelicula[]>([])`) para manejar datos complejos de forma segura.

```tsx
const [nombre, setNombre] = useState<string>("");
const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setNombre(e.target.value);
```

> 📦 **Dónde se ve en el proyecto:** [`tipos.ts`](../../../repos/02-react-ejemplo-pelis/src/tipos.ts) (interfaces y utility types), [`PeliculaForm.tsx`](../../../repos/02-react-ejemplo-pelis/src/components/PeliculaForm.tsx) (`ChangeEvent`/`SubmitEvent`) y [`App.tsx`](../../../repos/02-react-ejemplo-pelis/src/App.tsx) (`useState<Pelicula[]>`).

---

## 9. Datos asíncronos y estados de la UI

- **Toda conexión con el exterior pasa por `useEffect`:** llamadas a APIs (`fetch`), listeners, timers. Se ejecuta tras el render y, si el efecto crea recursos (listeners, subscriptions), la función de limpieza (el `return`) los **elimina al desmontar (cleanup)**.
- **La UI pinta según el estado:** `cargando` / `error` / `vacio` / datos, con **ternarios** y renderizado condicional. Así la app nunca "se congela" mientras llegan los datos.
- **Aviso con `&&` en JSX:** `{0 && ...}` pinta un `0` literal en pantalla (porque aunque es falsy, JSX lo renderiza). Usa `> 0 &&` o un ternario. Quien dice 0 dice una variable que vale 0.

```tsx
const [lista, setLista] = useState<Pelicula[]>([]);
const [cargando, setCargando] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const cargarPeliculas = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/peliculas"); // conexión con el exterior: SIEMPRE en useEffect
      const datos = await respuesta.json();
      setLista(datos);
    } catch (e: unknown) {
      setError(String(e));
    } finally {
      setCargando(false);
    }
  };

  cargarPeliculas();
}, []);

// La UI se decide con ternarios (encadenados o anidados)
{error ? <p>{error}</p> : cargando ? <p>Cargando…</p> : <PeliculaTable peliculas={lista} />}
```

> 📦 **Dónde se ve en el proyecto:** [`App.tsx`](../../../repos/02-react-ejemplo-pelis-api/src/App.tsx) gestiona `cargando`/`error` en el `useEffect` de carga y [`api.ts`](../../../repos/02-react-ejemplo-pelis-api/src/api.ts) encapsula las llamadas; [`Spinner.tsx`](../../../repos/02-react-ejemplo-pelis-componentes/src/components/Spinner.tsx) es el estado "cargando" hecho componente.

---

## 10. Estado derivado: calcúlalo, no lo almacenes

- Si un dato **se puede calcular de otro** (lista filtrada, media por género, total), **no lo guardes en `useState`**: derívalo durante el render. Menos estado = menos sitios donde desincronizarte.
- Usa `useMemo` solo si el cálculo es **caro** (filtra/agrupa miles de filas); el array de dependencias indica cuándo recalcular.
- **Antipatrón:** sincronizar una copia del estado con un `useEffect` (`setCopia(derivado)` en un efecto). Provoca un render extra y estados que pueden no coincidir.

```tsx
// BIEN: derivado durante el render; se recalcula solo cuando cambian sus dependencias
const visibles = useMemo(
  () => peliculas.filter((p) => p.titulo.toLowerCase().includes(busqueda.toLowerCase())),
  [peliculas, busqueda]
);

// MAL: copia sincronizada con useEffect (render extra + posible desincronización)
// useEffect(() => { setVisibles(peliculas.filter(...)); }, [peliculas]);
```

> 📦 **Dónde se ve en el proyecto:** [`App.tsx`](../../../repos/02-react-ejemplo-pelis-componentes/src/App.tsx) — `visibles` (filtrado por título o género) y `resumen` (media de puntuación por género) son `useMemo` derivados de `peliculas`; ninguno tiene su propio `useState`.

---

## Esqueleto de EXAMEN

La idea general es evaluar si se **comprende** y **adapta código** y si se **crea a partir de especificaciones**. De forma general el examen contendrá el scafolding inicial (*starter*), modelos de datos, .css, con ficheros vacíos o con código básico para su modificación.

A tener en cuenta sobre **TypeScript**:
- En el examen el modelo de datos se dará en el *starter* y no se pedirá *type guard*. Pero eso no quita que excluya conceptos vistos en la parte de TypeScript: Map, Set, Arrays, conversiones, operadores, funciones, etc. 

Posibles temas:
- **Lectura de datos** en local, .json o api. En el último caso, se daría el gestor.ts para acceso a la api.
- **Refactorizar** una estructura monolítica a NO monolítica. Ejemplo: el buscador que había en 15 pasa de etiqueta aislada (dentro de una estructura monolítica) a componente funcional (siguiendo una estructura NO monolítica). Mismo caso con la tabla de películas (15->16).
- **Búsqueda y solución de bugs** en código. Requiere entender completamente el funcionamiento de React: estados, renderizado, comunicación, etc.
- **Creación** de componentes funcionales a partir de especificaciones.
- **Composición de una GUI** a partir de especificaciones, dando de partida un esqueleto HTML vacío, completo o incompleto. 
- Y de foma general, **cualquier ejercicio que implique el entendimiento y uso de cualquier concepto visto**, etc..

## Cómo prepararlo

- Revisar y entender todos los apuntes y ejemplos
- Revisar y entender todos los ejercicios (ejerciciosRT.md) y soluciones.
- Revisar y entender todo el código de apoyo que hay en los repositorios.
- Practicar: lo más eficiente sería mediante ayuda "automática" indicar "Dame el scafolding y además, la solución de un examen de React que cumpla con el dominio "X", siguiendo los apuntes de https://github.com/MolinaJM/DI-REACT-TAURI/ hasta la sesion06.md. Ten en cuenta esto (copia/pega "Esqueleto de Examen" ) 


[← Volver a 11 · React de cero](11_Que_es_React.md)