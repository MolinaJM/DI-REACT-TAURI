<a id="asincronismo-callbacks-promesas-y-asyncawait-en-typescript"></a>
# Asincronismo. CallBacks, Promesas y Async/Await en TypeScript 📝 🖥️

- [Asincronismo. CallBacks, Promesas y Async/Await en TypeScript 📝 🖥️](#asincronismo-callbacks-promesas-y-asyncawait-en-typescript)
  - [8.1. Sincronismo/Asincronismo en JavaScript](#81-sincronismoasincronismo-en-javascript)
    - [Operaciones Síncronas:](#operaciones-síncronas)
    - [Operaciones Asíncronas:](#operaciones-asíncronas)
  - [8.2. Los Callbacks](#82-los-callbacks)
    - [8.2.1 Callback Básico](#821-callback-básico)
  - [8.3. Las Promesas](#83-las-promesas)
    - [8.3.1 Creación de una Promesa](#831-creación-de-una-promesa)
    - [8.3.2 Resolución y Rechazo de Promesas](#832-resolución-y-rechazo-de-promesas)
      - [1. Método `then`:](#1-método-then)
      - [2. Método `catch`:](#2-método-catch)
      - [3. Método `finally`:](#3-método-finally)
    - [8.3.3 Encadenamiento de Promesas](#833-encadenamiento-de-promesas)
    - [8.3.4 Manejo de Errores con Promesas](#834-manejo-de-errores-con-promesas)
  - [8.4. Async/Await: Simplificando el Uso de Promesas](#84-asyncawait-simplificando-el-uso-de-promesas)
    - [8.4.1 Promesas en Paralelo](#841-promesas-en-paralelo)
    - [Otros Ejemplos:](#otros-ejemplos)
      - [4. Uso de Async/Await con Fetch:](#4-uso-de-asyncawait-con-fetch)
  - [8.5. La respuesta de `fetch`: la interfaz `Response`](#85-la-respuesta-de-fetch-la-interfaz-response)
- 🧪 **Ejercicios:** [Programación asíncrona (promesas y async/await)](../../../ejerciciosTS/ejerciciosTS.md#18-programación-asíncrona-promesas-y-asyncawait)

<a id="81-sincronismoasincronismo-en-javascript"></a>
## 8.1. Sincronismo/Asincronismo en JavaScript

En programación, el `sincronismo` y el `asincronismo` se refieren a la forma en que se ejecutan las tareas. En el **_sincronismo_**, las tareas se ejecutan una tras otra, en el orden en que se declaran. En el **_asincronismo_**, las tareas se pueden ejecutar al mismo tiempo, o en cualquier orden.

En JavaScript, el sincronismo es el modo de ejecución predeterminado. Cuando se ejecuta una tarea sincrónica, el navegador web detiene la ejecución del código hasta que la tarea se complete. Esto puede provocar problemas de rendimiento, ya que el navegador web puede estar esperando a que se complete una tarea que no es crítica para el flujo de la aplicación.

El asincronismo se puede utilizar para evitar estos problemas de rendimiento. Cuando se ejecuta una **tarea asíncrona, el navegador web continúa ejecutando el código siguiente, sin esperar a que la tarea se complete**. La tarea asíncrona se ejecuta en **segundo plano** y, cuando se completa, se notifica al navegador web.

> [!NOTE]
> Estas reglas del lenguaje son iguales en JS y TS. TypeScript no cambia la asincronía: **solo la tipa**. En este capítulo verás `Promise<T>` y `async`/`await` con tipos, que te avisan si usas mal el resultado de una operación asíncrona.

<a id="operaciones-síncronas"></a>
### Operaciones Síncronas:

- En las operaciones síncronas, cada instrucción espera a que la instrucción anterior se complete antes de ejecutarse.
- El flujo de ejecución sigue una secuencia lineal.
- Las operaciones bloquean la ejecución del código hasta que se resuelven.

_Ejemplo síncrono:_

```typescript
console.log("Inicio");
for (let i = 0; i < 5; i++) {
  console.log(i);
}
console.log("Fin");
```

En este ejemplo, cada número se imprimirá en orden, uno después del otro, antes de imprimir "Fin".

<a id="operaciones-asíncronas"></a>
### Operaciones Asíncronas:

- En las operaciones asíncronas, el código no espera a que una operación se complete y continúa ejecutándose.
- Permite realizar tareas en segundo plano sin bloquear la ejecución del código.
- Se utilizan **callbacks, Promesas y async/await** para manejar el resultado de las operaciones asíncronas.
  - Un **callback** es simplemente una función que le pasas a otra para que se ejecute cuando termine una tarea.
  - Una **promesa** es un objeto que representa un valor que estará disponible ahora, en el futuro o nunca.
  - **async/await**: 
    - **async**: Se coloca antes de una función para indicar que dentro de ella habrá operaciones asíncronas.
**await**: Significa literalmente "espera aquí". Le dice al programa: "Párate un momento en esta línea hasta que esta promesa se resuelva, pero sin congelar el resto de la aplicación".


_Ejemplo Asíncrono con Callback:_

```typescript
console.log("Inicio");
setTimeout(() => {
  console.log("Hola Profe. Ejecutando después de 2 segundos");
}, 2000);
console.log("Fin");
```

En este ejemplo, "Inicio" se imprimirá, luego "Fin", y finalmente, después de 2 segundos, se imprimirá "Hola Profe. Ejecutando después de 2 segundos".

`TypeScript (y JavaScript) proporciona varios mecanismos para gestionar el asincronismo en la versión ES6 y posteriores. Los más importantes serían los CallBacks, las promesas, el Async/Await, los Event Listeners (el pegamento entre Rust y React), Timers. Vamos a ver algunos de los que acabamos de mencionar.`

> [!IMPORTANT]
> **Este orden es didáctico, no es lo que usarás.** Aquí vamos de lo más básico a lo más cómodo: primero los **callbacks con `setTimeout`** (§8.2) para entender qué significa *delegar una tarea*, después las **promesas** (§8.3) para entender el contrato `pendiente → resuelta/rechazada`, y por último el **`async/await`** (§8.4), que es **en lo que se escribe de verdad en React** (dentro de `useEffect`, handlers y servicios).

<a id="82-los-callbacks"></a>
## 8.2. Los Callbacks

Los callbacks en JavaScript son como piezas de un rompecabezas que encajan perfectamente en el mundo asincrónico. Son funciones que se ejecutan después de que se completa una tarea. En lugar de bloquear el flujo de ejecución, los callbacks permiten que tu código continúe haciendo otras cosas mientras espera que una tarea finalice.

<a id="821-callback-básico"></a>
### 8.2.1 Callback Básico

Lo primero que tenemos que recordar es que las funciones son `objetos` (object) para Javascript — y en TypeScript tienen además un **tipo** (`() => void`, `(x: number) => string`, etc.).

Dicho lo cual, supongamos que deseamos realizar una tarea que puede tardar en el tiempo y luego ejecutar otra función cuando termine (estamos simulando lo que tantas veces nos va a ocurrir...). Aquí tenemos un ejemplo:

```typescript
//-------------------------------------
//Ejemplo 1: callback SIN parámetros
function hacerTarea(callback: () => void): void {
  console.log("Realizando tarea...");
  setTimeout(() => { //Timer de 2000ms (también es un callback)
    callback();
    console.log("Tarea completada.");
  }, 2000);
}
/* Al parámetro de hacerTarea lo podemos llamar como queramos (a,b...f), pero es una buena práctica usar la palabra callback 
para indicar el tipo de parámetro que se le tiene que pasar, una función callback. En TS además definimos su tipo:
`callback: () => void` significa "función sin parámetros que no devuelve nada".
 */

function miCallback(): void {
  console.log("El callback ha sido ejecutado (simulación de acceso a datos - API).");
}

hacerTarea(miCallback);

//-------------------------------------
//Ejemplo 2: callback CON parámetros
// 1. La función principal que recibe un callback sin parámetros
function hacerTareaParam(callback: () => void) {
  console.log("Iniciando tarea...");
  setTimeout(callback, 2000);
}

// 2. Definimos la función que recibirá ese valor
function miCallbackParam(valor: number): void {
  console.log(`El callback ha sido ejecutado con la variable externa: ${valor}`);
}

// 3. Usamos una función flecha anónima para "atrapar" la variable al llamar a hacerTarea
// Esto es así porque si hacemos miCallback(99) automáticamente llamaría al callback directamente
hacerTareaParam(() => {
  miCallbackParam(99); 
});
```

En este ejemplo, la función `hacerTarea` simula una tarea demorada en el tiempo con un setTimeout y luego llama al `callback` cuando está lista. Esto permite una ejecución no bloqueante.

<a id="83-las-promesas"></a>
## 8.3. Las Promesas

Las Promesas son un **patrón de programación** que simplifica la lógica de manejo de tareas asincrónicas en JavaScript. Proporcionan una forma más **estructurada y legible** para trabajar con operaciones que pueden demorar, como **solicitudes de red o lectura/escritura de archivos**.

<p align="center">
  <img src="https://lenguajejs.com/asincronia/promesas/que-son/promises.png" alt="Promesas" width="400" />
</p>

<a id="831-creación-de-una-promesa"></a>
### 8.3.1 Creación de una Promesa

Para crear una Promesa, utiliza el constructor `Promise`. En TypeScript, `Promise<T>` indica el tipo de valor con el que se resolverá (`T`); el rechazo siempre es `any` o `unknown` según la configuración. Una Promesa tiene dos estados: pendiente **_(pending)_** o resuelta **_(fulfilled)_**. También tiene el estado **_(Reject)_** que es cuando no se puede llevar a cabo una promesa y es por tanto rechazada.

Así los tres estados detalladamente serían:

- **pending:** este estado pendiente se da cuando no hemos obtenido respuesta a la solicitud hecha por la promesa. Cuando haces clic en"Buscar personaje" ( la GUI de tu APP) y el navegador está esperando a que la API de SWAPI responda con los datos de Luke Skywalker.»
- **fulfilled:** una promesa pasa del estado *pending al fulfilled* mediante el comando `resolve`. Este estado se da cuando hemos obtenido una respuesta satisfactoria a la solicitud. «Cuando la API de SWAPI responde correctamente y recibes el objeto con toda la información de Luke Skywalker gracias a resolve.»
- **rejected:** este estado se da, a través del comando `reject`, cuando obtenemos una respuesta negativa a la solicitud que ha hecho la promesa. «Cuando la API de SWAPI falla o no encuentra el recurso (como buscar un ID que no existe) y la promesa se rechaza mediante reject.»

Hay que recordar que `No obtener una respuesta` significaría estar en estado _pending_ (pero no _rejected_).

Aquí se pone un ejemplo básico de promesa usando `Promise` obviamente para su construcción (no estámos pidiendo obtener nada concreto, eso habría que escribirlo y definirlo). Más abajo ya sí tenemos un ejemplo construido y funcional.

```typescript
//------------------------------------------------  
//Un esqueleto de PROMISE  
const miPromesa: Promise<string> = new Promise<string>((resolve, reject) => {
  // Simula una operación asincrónica
  setTimeout(() => {
    const exito = true; // Cambia a false para simular un rechazo
    if (exito) {
      resolve("La Promesa se ha cumplido.");
    } else {
      reject("La Promesa ha sido rechazada.");
    }
  }, 2000);
});

// Consumir la promesa para mostrar el valor
miPromesa
  .then((mensaje) => console.log(mensaje)) //El then atrapa el éxito (resolve)
  .catch((error) => console.error(error)); //El then atrapa el error
```

> [!NOTE]
> `new Promise<string>((resolve, reject) => ...)` declara que la promesa se resolverá con un `string`. Entonces en `then` el `resultado` ya es `string` (se infiere, no necesitas averiguarlo). El `reject` puede llevar cualquier cosa (suele ser un `Error`).

Estamos usando una función flecha y los parámetros podrían llamarse como quisiéramos. PERO, poor convenio se utilizan como parámetros los nombres `resolve` y `reject`. Conviene seguir usando dichos nombres a pesar de que podemos colocar lo que deseemos.

<a id="832-resolución-y-rechazo-de-promesas"></a>
### 8.3.2 Resolución y Rechazo de Promesas

<p align="center">
  <img src="https://www.javascripttutorial.net/wp-content/uploads/2022/02/JavaScript-Promises.svg" alt="Promesas" width="300" />
</p>

Las Promesas son un objeto que representa el resultado eventual (éxito o fracaso) de una operación asíncrona. Las Promesas tienen varios métodos para manejar el flujo de ejecución y los resultados. Entre ellos, los más comunes son `then`, `catch` y `finally`. Aquí está una explicación de cada uno:

<a id="1-método-then"></a>
#### 1. Método `then`:

El método `then` se utiliza para manejar el resultado **exitoso** de una Promesa. Toma una función de devolución de llamada como argumento que se ejecutará cuando la Promesa se resuelva correctamente. La función de devolución de llamada recibe el valor resultante de la Promesa (tipado como `T`).

```typescript
const miPromesa: Promise<string> = new Promise<string>((resolve) => {
  // Operación asíncrona exitosa
  resolve("Ole!");
});

miPromesa.then((resultado) => {
  console.log("Resultado:", resultado); // Imprimirá 'Ole!'
});
```

<a id="2-método-catch"></a>
#### 2. Método `catch`:

El método `catch` se utiliza para manejar el **rechazo** de una Promesa. Toma una función de devolución de llamada como argumento que se ejecutará cuando la Promesa se rechace (cuando ocurra un error). La función de devolución de llamada recibe el motivo del rechazo.

```typescript
const miPromesa: Promise<string> = new Promise<string>((_, reject) => { //Usaamos _ porque no usamos then
  // Operación asíncrona que falla
  reject("Ups!");
});

miPromesa.catch((error) => {
  console.error("Error:", error); // Imprimirá 'Ups!'
});
```

<a id="3-método-finally"></a>
#### 3. Método `finally`:

El método `finally` se utiliza para agregar lógica que se ejecutará sin importar si la Promesa se resuelve o se rechaza. Es útil para realizar tareas que deben ocurrir sin importar el resultado de la Promesa, como limpiar recursos o ejecutar código de finalización.

```typescript
//No ponemos reject porque el código interno lanza directamente el resolve
const miPromesa: Promise<string> = new Promise<string>((resolve) => { 
  // Operación asíncrona que podría resolver o rechazar
  resolve("Ole!");
});

miPromesa
  .then((resultado) => {
    console.log("Resultado:", resultado);
  })
  .catch((error) => { //Aquí no va a llegar en la vida 
    console.error("Error:", error);
  })
  .finally(() => {
    console.log("Fin de la operación, independientemente del resultado.");
  });
```

> [!NOTE]
> `.finally` mantiene el tipo: después de `miPromesa.finally(() => {...})` sigues teniendo una `Promise<string>`. Es una *macro* que no cambia el valor, solo ejecuta lógica final.

En este ejemplo, el bloque `finally` se ejecutará siempre, independientemente de si la Promesa se resuelve o se rechaza. Estos métodos permiten estructurar y manejar de manera más efectiva el flujo de ejecución y los errores al trabajar con Promesas en JavaScript.

A continuación, un ejemplo completo con **FETCH SIN USAR async/await** (todo esto se verá más adelante) 

```typescript
//------------------------------------------------  
//Un ejemplo completo sobre SWAPI 
const miPromesa: Promise<string> = new Promise<string>((resolve, reject) => {
  // Petición real a SWAPI en lugar de un timeout simulado
  // En este punto es MUY IMPORTANTE, distinguir entre los .then y .catch que
  // usamos al CONSUMIR la promesa y los .then y .catch propios de FETCH
  // Cada .then de FETCH devuelve una PROMESA nueva
  fetch("https://swapi.dev/api/people/1/")
    .then((response) => { //response contiene METADATOS.
      if (!response.ok) {// Verificamos si la respuesta de la red fue exitosa
        //Más adelante se ven los códigos de respuesta de fetch que usaremos
        throw new Error(`Error en la petición: ${response.status}`);
      }
      return response.json(); //Le pasamos el objeto al siguiente then
    })
    .then((data) => {
      // Si todo va bien, cumplimos la promesa con el nombre del personaje
      resolve(`La Promesa se ha cumplido. Personaje obtenido: ${data.name}`);
    })
    .catch((error) => {
      // Si falla la red por lo que sea o hay un error, rechazmos la promesa
      // Probar a "alterar" la url de SWAPI
      reject(`La Promesa ha sido rechazada: ${error.message}`);
    });
});

// Consumir la promesa para mostrar el valor.
// mensaje y error son variables locales para capturar los mensajes devueltos (exito/error)
miPromesa
  .then((mensaje) => console.log(mensaje))
  .catch((error) => console.error(error))
  .finally(() => {
    // Esto se ejecuta SIEMPRE, tanto si hubo éxito como si hubo error
    console.log("Proceso de petición finalizado (esto se ejecuta siempre en el finally).");
  });
  
````
<a id="833-encadenamiento-de-promesas"></a>
### 8.3.3 Encadenamiento de Promesas

Hasta ahora, al consumir una promesa solamente hemos puest un .then (el único sitio donde hemos encadenado .then ha sido al usar fetch, pero eso no es un consumo, es una petición). Un beneficio clave de las Promesas es que puedes encadenar múltiples operaciones asincrónicas en secuencia. Esto mejora la legibilidad del código:

```typescript

// Consumo y encadenamiento
realizarTarea1
  .then((resultado1: string) => {
    console.log(resultado1);
    return realizarTarea2; // Devolvemos la siguiente promesa de la cadena
  })
  .then((resultado2: number) => {
    console.log(resultado2);
    return realizarTarea3; // Devolvemos la última promesa
  })
  .then((resultado3: boolean) => {
    console.log("Todas las tareas han sido completadas.");
  })
  .catch((error) => {
    console.error("Algo salió mal:", error);
  });
```

> [!TIP]
> En cada `then`, el parámetro recibe el tipo de la promesa anterior. El encadenamiento es "escalable" en tipos: si `realizarTarea2` devuelve `Promise<number>`, el `resultado2` es `number` — TS lo comprueba en cada eslabón.  

**Ejemplo con SWAPI**: Averigua, la primera película en la que sale el planeta natal de un personaje de SW. 
Primero pides el personaje de Luke para obtener la URL de su planeta natal (Tatooine), luego usas esa URL para consultar el planeta y extraer su lista de películas, y finalmente pides los detalles de la primera película de la lista para confirmar el éxito de todo el flujo encadenado, interrumpiendo el proceso en el catch si falla cualquiera de los pasos.

```typescript
// Función para realizar las peticiones encadenadas con la API de SWAPI
const obtenerDetallesDePeliculaDeLuke = () => {
  // Paso1: Pedir el personaje (Luke Skywalker
  return fetch("https://swapi.dev/api/people/1/")
    .then((response1) => {
      if (!response1.ok) throw new Error("Error al obtener el personaje");
      return response1.json();
    })
    .then((personaje: { name: string; homeworld: string }) => {
    // Aunque el servidor nos da 20 campos, aquí solo le dices a TypeScript 
  // que vas a usar "name" y "homeworld". El resto de campos se ignoran.
  //También estamos usando ASERCIÓN indicando campos en cabecera, 
  // aunque lo correcto sería usar un typeguard esPersonaje...
  //.then((data: unknown) => {
      // Aplicamos el Type Guard aquí para validar los datos del personaje
   //   if (!esPersonajeValido(data)) {
   //     throw new Error("Los datos del personaje no tienen el formato esperado");
    //  }
      console.log(`Paso 1: Personaje obtenido -> ${personaje.name}`);
      // Extraemos la URL del planeta (homeworld) y hacemos la segunda petición
      return fetch(personaje.homeworld); //Hago otra consulta
    })
    .then((response2) => {
      if (!response2.ok) throw new Error("Error al obtener el planeta");
      return response2.json(); //Devuelvo objeto completo
    })
    .then((planeta: { name: string; films: string[] }) => {
      console.log(`Paso 2: Planeta obtenido -> ${planeta.name}`);
      
      // Validamos o aseguramos a TypeScript que la URL de la película existe
      // No es necesario el optional chaining porque la firma de más arriba
      // indica que estamos pasando un array, podría estar vacío, pero NUNCA ser undefined o null
      const primeraPeliculaUrl = planeta.films[0];
      if (!primeraPeliculaUrl) {
        throw new Error("El planeta no tiene películas registradas");
      }
      
      return fetch(primeraPeliculaUrl);
    })
    .then((response3) => {
      if (!response3.ok) throw new Error("Error al obtener la película");
      return response3.json();
    })
    .then((pelicula: { title: string }) => {
      console.log(`Paso 3: Película obtenida -> ${pelicula.title}`);
      console.log("¡Todas las tareas encadenadas se han completado con éxito!");
    });
};

// Consumimos la cadena de promesas
obtenerDetallesDePeliculaDeLuke()
  .catch((error: Error) => {
    console.error("Algo salió mal en el flujo:", error.message);
  });
```

<a id="834-manejo-de-errores-con-promesas"></a>
### 8.3.4 Manejo de Errores con Promesas

El manejo de errores es esencial. Como ya he comentado podemos utilizar `catch` al final de una cadena de Promesas para capturar errores en cualquier parte de la secuencia:

```typescript
realizarTarea1()
  .then((resultado1: string) => realizarTarea2(resultado1))
  .then((resultado2: number) => realizarTarea3(resultado2))
  .catch((error) => {
    console.error("Algo salió mal:", error);
  });
```

<a id="84-asyncawait-simplificando-el-uso-de-promesas"></a>
## 8.4. Async/Await: Simplificando el Uso de Promesas

> <span style="font-size: 1.em; font-weight: bold;">🎯 **LA IDEA CLAVE:** CUALQUIER FUNCIÓN MARCADA COMO `async` VA A DEVOLVER IMPLÍCITAMENTE UNA `Promise`, Y `await` SE UTILIZA PARA ESPERAR LA RESOLUCIÓN DE ESA `Promise`.</span>

`async/await` es una característica introducida en ECMAScript 2017 (también conocido como ES8) que simplifica la escritura y gestión del código asíncrono en JavaScript (y en TypeScript no cambia nada: solo añade tipos). Permite escribir código asíncrono de manera más similar a código síncrono, haciendo que sea más legible y fácil de entender.

```typescript
//async indica que se va a devolver una Promise (acorta la cabecera)
async function realizarTareas(): Promise<void> {
  try {
    const resultado1: string = await realizarTarea1();
    const resultado2: number = await realizarTarea2(resultado1);
    const resultado3: boolean = await realizarTarea3(resultado2);
    console.log("Todas las tareas han sido completadas.");
  } catch (error) {
    console.error("Algo salió mal:", error);
  }
}

realizarTareas();

//Escrito con función flecha y completo:

// Implementación de realizarTarea1 utilizando una Promesa con un temporizador simulado.
// Aquí ya no estamos haciendo como antes, que guardábamos una Promesa en una variable:
// const miPromesa: Promise<string> = new Promise<string>((resolve, reject) => {...}
// Aquí hacemos una función, que crea una promesa y la devuelve directamente en el return
const realizarTarea1 = (): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {      
      resolve("HOLA"); // Simulamos que todo sale bien y resolvemos con un string
    }, 1000);
  });
};

async function realizarTareas() : Promise<void> {
  try {
    const resultado1: string = await realizarTarea1();
    const resultado2: number = await realizarTarea2(resultado1);
    const resultado3: boolean = await realizarTarea3(resultado2);
    console.log("Todas las tareas han sido completadas.");
  } catch (error) {
    console.error("Algo salió mal:", error);
  }

};

realizarTareas();
```

> [!IMPORTANT]
> Una función `async` devuelve SIEMPRE una `Promise`. Anota el tipo de retorno con `Promise<X>` (o `Promise<void>` si no devuelve nada). Con `await`, el valor "desempaquetado" ya tiene el tipo interno de la promesa.`await` pausa la ejecución hasta que la Promesa se resuelva o se rechace.

> [!TIP]
> **Secuencial vs. paralelo.** Un `await` dentro de un `for...of` espera a que termine una petición antes de lanzar la siguiente (serializa, pero permite `continue`/`break` según el resultado); si las peticiones son independientes, `await Promise.all([...])` las lanza a la vez (§8.4.1).

<a id="841-promesas-en-paralelo"></a>
### 8.4.1 Promesas en Paralelo

A menudo necesitas lanzar varias operaciones asincrónicas a la vez y esperar a que **todas** terminen. `Promise.all` recibe un array de promesas y devuelve una sola promesa con los resultados **en el mismo orden**:

```typescript
//Suponemos que tenemos un modelo Personaje y una función async cargaPersonaje que me da una promesa
//tipo Personaje 
async function damePareja(): Promise<[Personaje, Personaje]> {
  //Promise.all arranca ambas a la vez y tipa el resultado como tupla [Planeta, Planeta]
  const [primero, segundo] = await Promise.all([
    cargaPersonaje(`https://swapi.info/api/people/1`),
    cargaPersonaje(`https://swapi.info/api/people/2`),
  ]);
  return [primero, segundo];
}
```

> [!NOTE]
> `Promise.all([p1, p2, p3])` tipa el resultado como una **tupla** con los tipos en orden (`[string, number, boolean]`). Es decir: el `resultados[0]` es `string`, el `[1]` es `number`, etc. Mucho más seguro que un `any[]`.

En los primeros apuntes ya vimos un ejemplo de esto (00_Introducción.md), precisamente con SWAPI (leyendo personajes, naves y planetas a la vez).

<a id="otros-ejemplos"></a>
### Otros Ejemplos:Uso de Async/Await con Fetch:

<a id="4-uso-de-asyncawait-con-fetch"></a>

Ya hemos visto un ejemplo más arriba. Aquí va otro ejemplo con fetch (que devuelve también una promesa):

```typescript
interface DatosPost {
  name: string;
}

async function obtenerDatosDesdeAPI(): Promise<void> {
  try {
    const response = await fetch(
      "https://swapi.info/api/people/1",
    );
    if (!response.ok) {
      throw new Error("No se pudo obtener los datos");
    }

    //response.json() también es una promesa porque podría tardar tiempo 
    //en ejecutarse
    const datos = (await response.json()) as DatosPost; //Habría que hacer typeguard
    console.log("Datos desde la API:", datos.name);
  } catch (error) {
    console.error("Error:", error);
  }
}

obtenerDatosDesdeAPI();
```

> [!IMPORTANT]
> `response.json()` devuelve `Promise<unknown>` porque la respuesta JSON puede ser cualquier cosa. Definimos una `interface DatosPost` y validamos/casteamos el resultado, como vimos en el capítulo de `JSON.parse`. **No confies el tipo sin validar, habría que hacer un typeguard**

En este ejemplo, `fetch` se utiliza junto con `await` para realizar una solicitud HTTP y manejar los datos resultantes de manera asincrónica. Usamos `fetch` aquí como **vehículo didáctico**: en un proyecto Tauri este patrón es idéntico pero llamando a `invoke` — `const datos = await invoke<DatosPost>("obtener_datos")` — donde el backend Rust es el que hace el trabajo en vez de un servidor HTTP.


<a id="85-la-respuesta-de-fetch-la-interfaz-response"></a>
## 8.5. La respuesta de `fetch`: la interfaz `Response`

`fetch` no devuelve los datos: resuelve con un objeto **`Response`** (que suele instanciarse con `response`) que describe la respuesta HTTP. En la práctica solo necesitas saber si fue bien, con qué código y leer el cuerpo.

| Miembro | Tipo | Para qué lo usarás |
|---------|------|--------------------|
| `ok` | `boolean` | `true` si el status es 2xx: **el guardia antes de parsear** |
| `status` | `number` | código HTTP (200, 404, 500…) para ramificar o dar un mensaje |
| `headers` | `Headers` | cabeceras de la respuesta (`headers.get("content-type")`) |
| `bodyUsed` | `boolean` | `true` si ya se consumió el cuerpo(si ya se uso el response.json) |

| Lectura del cuerpo | Devuelve | Cuándo |
|--------------------|----------|--------|
| `.json()` | `Promise<any>` (o `unknown`) | respuesta JSON → **valida/estrecha** con un type guard |
| `.text()` | `Promise<string>` | texto plano/HTML (.txt, .csv, .md) |

> [!TIP]
> Para validar la forma de lo recibido (p. ej. comprobar que es un array) usa *type guards* + `Array.isArray` y el *narrowing* vistos en [§5.4. Narrowing](../s02/05_ControlDeFlujo.md#54-narrowing-el-control-de-flujo-tipado).

> [!NOTE]
> Códigos: **2xx** éxito (`ok === true`), **3xx** redirección (fetch la sigue sola), **4xx** error del cliente (404, 401…), **5xx** error del servidor.

> [!IMPORTANT]
> El cuerpo se lee **una sola vez**: al leerlo `bodyUsed` pasa a `true` y un segundo `.json()`/`.text()` lanza `TypeError: body already used`. Para releerlo, `response.clone()` **antes** de la primera lectura. (También existen `.blob()`, `.arrayBuffer()` y `.formData()` para binarios y formularios; apenas se usan aquí porque los ficheros van por el backend Rust.)

---

---

[Volver al índice general](../../../README.md#5-distribución-temporal-y-contenidos-s00s13)
