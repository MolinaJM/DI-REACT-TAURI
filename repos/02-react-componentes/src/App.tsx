/**
 * App.tsx - Componente principal que muestra todos los ejemplos
 * Extraído de las sesiones 04, 05 y 07
 */
import { useState } from 'react';

// S04 - Componentes básicos
import Saludo from './components/Saludo';
import Card from './components/Card';
import ListaTareas from './components/ListaTareas';
import ListaUsuarios from './components/ListaUsuarios';

// S07 - Componentes personalizados
import Boton from './components/Boton';
import Modal from './components/Modal';
import TablaGenerica from './components/TablaGenerica';

// S05 - Estado y formularios
import Contador from './state/useReducerEjemplo';
import FormularioRegistro from './state/FormularioRegistro';

function App() {
  const [modalAbierto, setModalAbierto] = useState(false);

  const usuariosEjemplo = [
    { id: 1, nombre: "Ana García", email: "ana@ejemplo.com", edad: 28 },
    { id: 2, nombre: "Pedro López", email: "pedro@ejemplo.com", edad: 35 },
    { id: 3, nombre: "María Ruiz", email: "maria@ejemplo.com", edad: 22 },
  ];

  return (
    <div style={{ maxWidth: 960, margin: '2rem auto', padding: '0 2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>
        React Componentes - Ejemplos Sesiones 4, 5 y 7
      </h1>

      {/* === SESION 4 === */}
      <section style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid #ccc', borderRadius: 8 }}>
        <h2 style={{ borderBottom: '2px solid #333', paddingBottom: '0.5rem' }}>S04 - Componente Saludo</h2>
        <Saludo nombre="María" edad={28} />
        <Saludo nombre="Pedro" />
      </section>

      <section style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid #ccc', borderRadius: 8 }}>
        <h2 style={{ borderBottom: '2px solid #333', paddingBottom: '0.5rem' }}>S04 - Card con Children</h2>
        <Card titulo="Noticia">
          <p>Este es el contenido de la tarjeta.</p>
          <button>Leer más</button>
        </Card>
      </section>

      <section style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid #ccc', borderRadius: 8 }}>
        <h2 style={{ borderBottom: '2px solid #333', paddingBottom: '0.5rem' }}>S04 - Lista de Tareas</h2>
        <ListaTareas />
      </section>

      <section style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid #ccc', borderRadius: 8 }}>
        <h2 style={{ borderBottom: '2px solid #333', paddingBottom: '0.5rem' }}>S04 - Lista de Usuarios (useEffect)</h2>
        <ListaUsuarios />
      </section>

      {/* === SESION 7 === */}
      <section style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid #ccc', borderRadius: 8 }}>
        <h2 style={{ borderBottom: '2px solid #333', paddingBottom: '0.5rem' }}>S07 - Botón Personalizado</h2>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
          <Boton variante="primary">Primary</Boton>
          <Boton variante="secondary">Secondary</Boton>
          <Boton variante="danger">Danger</Boton>
          <Boton variante="ghost">Ghost</Boton>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Boton variante="primary" tamano="sm">Pequeño</Boton>
          <Boton variante="primary" tamano="md">Mediano</Boton>
          <Boton variante="primary" tamano="lg">Grande</Boton>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Boton cargando>Cargando</Boton>
          <Boton disabled>Deshabilitado</Boton>
        </div>
      </section>

      <section style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid #ccc', borderRadius: 8 }}>
        <h2 style={{ borderBottom: '2px solid #333', paddingBottom: '0.5rem' }}>S07 - Modal</h2>
        <Boton onClick={() => setModalAbierto(true)}>Abrir Modal</Boton>
        <Modal abierto={modalAbierto} onCerrar={() => setModalAbierto(false)} titulo="Ejemplo Modal">
          <p>Contenido del modal con children.</p>
          <Boton onClick={() => setModalAbierto(false)} style={{ marginTop: '1rem' }}>Cerrar</Boton>
        </Modal>
      </section>

      <section style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid #ccc', borderRadius: 8 }}>
        <h2 style={{ borderBottom: '2px solid #333', paddingBottom: '0.5rem' }}>S07 - Tabla Genérica</h2>
        <TablaGenerica
          datos={usuariosEjemplo}
          columnas={[
            { key: 'id', titulo: 'ID' },
            { key: 'nombre', titulo: 'Nombre' },
            { key: 'email', titulo: 'Email' },
            { key: 'edad', titulo: 'Edad' },
          ]}
          keyExtractor={(item: typeof usuariosEjemplo[number]) => item.id}
        />
      </section>

      {/* === SESION 5 === */}
      <section style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid #ccc', borderRadius: 8 }}>
        <h2 style={{ borderBottom: '2px solid #333', paddingBottom: '0.5rem' }}>S05 - useReducer (Contador)</h2>
        <Contador />
      </section>

      <section style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid #ccc', borderRadius: 8 }}>
        <h2 style={{ borderBottom: '2px solid #333', paddingBottom: '0.5rem' }}>S05 - Formulario Controlado con Validación</h2>
        <FormularioRegistro />
      </section>
    </div>
  );
}

export default App;
