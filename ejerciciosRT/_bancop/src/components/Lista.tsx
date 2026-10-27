import type {ListaProps} from "../tipos.ts"

function Lista({ nombres }: ListaProps) {
  return (
    <ul>
      {nombres.map((n) => (
        <li key={n}>{n}</li>
      ))}
    </ul>
  );
}

export default Lista; //No necesitamos llaves al importar