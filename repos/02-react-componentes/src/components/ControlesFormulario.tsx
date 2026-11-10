/**
 * ControlesFormulario.tsx - Demo: agrupa los controles sueltos
 * Fuente: Sesión 04 - Controles de formulario
 * Los controles (TextInput, Select, RadioGroup, Checkbox, SearchBox) son "dumb":
 * no guardan estado propio. El contenedor lo guarda (lifting state up) y lo pasa
 * por props. Así el alumno ve el patrón: el padre es la fuente de la verdad.
 */
import { useState } from 'react';
import type { Opcion } from '../types';
import TextInput from './TextInput';
import Label from './Label';
import Select from './Select';
import RadioGroup from './RadioGroup';
import CheckboxGroup from './Checkbox';
import SearchBox from './SearchBox';

const SAGAS: Opcion[] = [
    { valor: "original", texto: "Original" },
    { valor: "prequel", texto: "Prequel" },
    { valor: "secuela", texto: "Secuela" },
];

const ETIQUETAS: Opcion[] = [
    { valor: "accion", texto: "Acción" },
    { valor: "drama", texto: "Drama" },
    { valor: "comedia", texto: "Comedia" },
];

function ControlesFormulario() {
    const [titulo, setTitulo] = useState("");
    const [saga, setSaga] = useState("original");
    const [etiquetas, setEtiquetas] = useState<string[]>([]);
    const [busqueda, setBusqueda] = useState("");

    return (
        <div className="space-y-4 max-w-md">
            <TextInput label="Título" value={titulo} onChange={setTitulo} placeholder="Título de la película" />

            <div>
                <Label htmlFor="saga-select">Saga (select)</Label>
                <div className="mt-1">
                    <Select value={saga} onChange={setSaga} opciones={SAGAS} />
                </div>
            </div>

            <RadioGroup
                label="Saga (radio)"
                nombre="saga-radio"
                valor={saga}
                onChange={setSaga}
                opciones={SAGAS}
            />

            <CheckboxGroup
                label="Etiquetas (checkbox)"
                valor={etiquetas}
                onChange={setEtiquetas}
                opciones={ETIQUETAS}
            />

            <div>
                <span className="block text-sm font-medium text-gray-700 mb-1">Buscador</span>
                <SearchBox value={busqueda} onChange={setBusqueda} placeholder="Buscar…" />
            </div>

            <p className="text-sm text-gray-500">
                Estado: {JSON.stringify({ titulo, saga, etiquetas, busqueda })}
            </p>
        </div>
    );
}

export default ControlesFormulario;
