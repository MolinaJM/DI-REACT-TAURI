import { useState } from 'react';
import Saludo from './components/Saludo';
import Contador from './components/Contador';
import FormularioLogin from './components/FormularioLogin';

export default function App() {
    const [nombre, setNombre] = useState('Invitado');

    return (
        <main>
            <h1>Bienvenido</h1>
            <section>
                <Saludo nombre={nombre} edad={25} />
            </section>
            <section>
                <Contador />
            </section>
            <section>
                <FormularioLogin onSubmit={({ usuario }) => setNombre(usuario)} />
            </section>
        </main>
    );
}