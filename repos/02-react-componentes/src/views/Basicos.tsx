/**
 * Basicos.tsx - Vista: Componentes básicos
 * Fuente: Sesión 04 - Componentes, props, children, useState, useEffect
 */
import Saludo from '../components/Saludo';
import Card from '../components/Card';
import ListaTareas from '../components/ListaTareas';
import ListaUsuarios from '../components/ListaUsuarios';

function Basicos() {
    return (
        <div className="space-y-8">
            <section>
                <h2 className="text-xl font-bold mb-3">Saludo (props tipadas)</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                    <Saludo nombre="María" edad={28} />
                    <Saludo nombre="Pedro" />
                </div>
            </section>

            <section>
                <h2 className="text-xl font-bold mb-3">Card (children)</h2>
                <Card titulo="Noticia">
                    <p>Este es el contenido de la tarjeta.</p>
                    <button className="mt-2 text-blue-600">Leer más</button>
                </Card>
            </section>

            <section>
                <h2 className="text-xl font-bold mb-3">Lista de tareas (useState)</h2>
                <ListaTareas />
            </section>

            <section>
                <h2 className="text-xl font-bold mb-3">Lista de usuarios (useEffect + fetch)</h2>
                <p className="text-sm text-gray-500 mb-2">
                    ⚠️ Anti-patrón a propósito: en Tauri se usaría <code>invoke()</code> en vez de <code>fetch</code>.
                </p>
                <ListaUsuarios />
            </section>
        </div>
    );
}

export default Basicos;
