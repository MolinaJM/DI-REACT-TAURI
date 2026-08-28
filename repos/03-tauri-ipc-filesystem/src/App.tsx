import ComponenteIPC from './components/ComponenteIPC'
import FetchCRUD from './components/FetchCRUD'

function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Tauri IPC y Sistema de Archivos</h1>
      <section>
        <h2>Comunicacion IPC (React &lt;--&gt; Rust)</h2>
        <ComponenteIPC />
      </section>
      <hr style={{ margin: '2rem 0' }} />
      <section>
        <h2>CRUD con Fetch API y TypeScript</h2>
        <FetchCRUD />
      </section>
    </div>
  )
}

export default App
