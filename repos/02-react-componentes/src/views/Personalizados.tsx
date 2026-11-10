/**
 * Personalizados.tsx - Vista: Componentes personalizados
 * Fuente: Sesión 06/07 - ButtonHTMLAttributes, Modal, Tabla genérica <T>
 */
import { useState } from 'react';
import Boton from '../components/Boton';
import Modal from '../components/Modal';
import Tabla from '../components/TablaGenerica';

const USUARIOS = [
    { id: 1, nombre: "Ana García", email: "ana@ejemplo.com", edad: 28 },
    { id: 2, nombre: "Pedro López", email: "pedro@ejemplo.com", edad: 35 },
    { id: 3, nombre: "María Ruiz", email: "maria@ejemplo.com", edad: 22 },
];

function Personalizados() {
    const [modalAbierto, setModalAbierto] = useState(false);

    return (
        <div className="space-y-8">
            <section>
                <h2 className="text-xl font-bold mb-3">Botón personalizado (ButtonHTMLAttributes)</h2>
                <div className="space-y-3">
                    <div className="flex gap-2 flex-wrap">
                        <Boton variante="primary">Primary</Boton>
                        <Boton variante="secondary">Secondary</Boton>
                        <Boton variante="danger">Danger</Boton>
                        <Boton variante="ghost">Ghost</Boton>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        <Boton variante="primary" tamano="sm">Pequeño</Boton>
                        <Boton variante="primary" tamano="md">Mediano</Boton>
                        <Boton variante="primary" tamano="lg">Grande</Boton>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        <Boton cargando>Cargando</Boton>
                        <Boton disabled>Deshabilitado</Boton>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-xl font-bold mb-3">Modal (portal + composición)</h2>
                <p className="text-sm text-gray-500 mb-2">
                    ⚠️ Anti-patrón a propósito: el <code>useEffect</code> toca <code>document.body</code>.
                </p>
                <Boton onClick={() => setModalAbierto(true)}>Abrir Modal</Boton>
                <Modal
                    abierto={modalAbierto}
                    onCerrar={() => setModalAbierto(false)}
                    titulo="Ejemplo Modal"
                >
                    <p>Contenido del modal con children.</p>
                    <Boton onClick={() => setModalAbierto(false)} className="mt-4">Cerrar</Boton>
                </Modal>
            </section>

            <section>
                <h2 className="text-xl font-bold mb-3">Tabla genérica &lt;T&gt;</h2>
                <p className="text-sm text-gray-500 mb-2">
                    El mismo componente sirve para cualquier entidad con <code>keyExtractor</code>.
                </p>
                <Tabla
                    datos={USUARIOS}
                    columnas={[
                        { key: 'id', titulo: 'ID' },
                        { key: 'nombre', titulo: 'Nombre' },
                        { key: 'email', titulo: 'Email' },
                        { key: 'edad', titulo: 'Edad' },
                    ]}
                    keyExtractor={(item: typeof USUARIOS[number]) => item.id}
                />
            </section>
        </div>
    );
}

export default Personalizados;
