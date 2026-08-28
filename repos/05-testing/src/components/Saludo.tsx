interface SaludoProps {
    nombre: string;
    edad?: number;
}

export default function Saludo({ nombre, edad }: SaludoProps) {
    return (
        <div>
            <p>Hola, {nombre}</p>
            {edad !== undefined && <p>{edad} anios</p>}
        </div>
    );
}
