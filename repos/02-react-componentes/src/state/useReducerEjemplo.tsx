/**
 * useReducerEjemplo.tsx - Estado con useReducer
 * Fuente: Sesión 05 - Estado con useReducer
 * Contador con INCREMENTAR/DECREMENTAR/RESETEAR
 */
import { useReducer } from 'react';

interface ContadorState {
    valor: number;
    incrementos: number;
}

type Accion =
    | { type: "INCREMENTAR"; payload: number }
    | { type: "DECREMENTAR" }
    | { type: "RESETEAR" };

function reducer(state: ContadorState, action: Accion): ContadorState {
    switch (action.type) {
        case "INCREMENTAR":
            return {
                valor: state.valor + action.payload,
                incrementos: state.incrementos + 1
            };
        case "DECREMENTAR":
            return { ...state, valor: state.valor - 1 };
        case "RESETEAR":
            return { valor: 0, incrementos: 0 };
        default:
            return state;
    }
}

function Contador() {
    const [state, dispatch] = useReducer(reducer, { valor: 0, incrementos: 0 });

    return (
        <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">{state.valor}</h2>
            <p>Incrementos totales: {state.incrementos}</p>
            <div className="space-x-2">
                <button onClick={() => dispatch({ type: "INCREMENTAR", payload: 1 })}
                    className="bg-blue-500 text-white px-4 py-2 rounded">+1</button>
                <button onClick={() => dispatch({ type: "DECREMENTAR" })}
                    className="bg-red-500 text-white px-4 py-2 rounded">-1</button>
                <button onClick={() => dispatch({ type: "RESETEAR" })}
                    className="bg-gray-500 text-white px-4 py-2 rounded">Reset</button>
            </div>
        </div>
    );
}

export default Contador;
