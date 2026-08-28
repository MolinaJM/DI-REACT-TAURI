import { describe, it, expect } from 'vitest';

type FiltroTareas = 'todas' | 'pendientes' | 'completadas';

interface TareaItem {
  id: string;
  texto: string;
  completada: boolean;
}

interface EstadoTareas {
  tareas: TareaItem[];
  filtro: FiltroTareas;
  cargando: boolean;
  error: string;
}

function crearEstadoInicial(): EstadoTareas {
  return { tareas: [], filtro: 'todas', cargando: false, error: '' };
}

function agregarTarea(estado: EstadoTareas, texto: string): EstadoTareas {
  const textoLimpio = String(texto).trim();
  if (!textoLimpio) return estado;

  return {
    ...estado,
    tareas: [
      ...estado.tareas,
      { id: crypto.randomUUID(), texto: textoLimpio, completada: false },
    ],
  };
}

function cambiarFiltro(estado: EstadoTareas, filtro: FiltroTareas): EstadoTareas {
  return { ...estado, filtro };
}

function actualizarTarea(
  estado: EstadoTareas,
  id: string,
  cambios: Partial<Pick<TareaItem, 'texto' | 'completada'>>
): EstadoTareas {
  return {
    ...estado,
    tareas: estado.tareas.map((t) => (t.id === id ? { ...t, ...cambios } : t)),
  };
}

function obtenerTareasVisibles(estado: EstadoTareas): TareaItem[] {
  switch (estado.filtro) {
    case 'pendientes':
      return estado.tareas.filter((t) => !t.completada);
    case 'completadas':
      return estado.tareas.filter((t) => t.completada);
    default:
      return estado.tareas;
  }
}

describe('Tests de Estado (reducer)', () => {
  it('crearEstadoInicial debe retornar estado vacio', () => {
    const base = crearEstadoInicial();
    expect(base.tareas.length).toBe(0);
  });

  it('agregarTarea debe agregar sin mutar el original', () => {
    const base = crearEstadoInicial();
    const conTarea = agregarTarea(base, '  Estudiar React  ');
    expect(base.tareas.length).toBe(0);
    expect(conTarea.tareas.length).toBe(1);
    expect(conTarea.tareas[0].texto).toBe('Estudiar React');
    expect(typeof conTarea.tareas[0].id).toBe('string');
  });

  it('cambiarFiltro debe cambiar sin mutar el original', () => {
    const base = crearEstadoInicial();
    const conTarea = agregarTarea(base, 'Estudiar React');
    const filtrado = cambiarFiltro(conTarea, 'pendientes');
    expect(filtrado.filtro).toBe('pendientes');
    expect(conTarea.filtro).toBe('todas');
  });

  it('actualizarTarea debe actualizar sin mutar el original', () => {
    const base = crearEstadoInicial();
    const conTarea = agregarTarea(base, 'Estudiar React');
    const actualizado = actualizarTarea(conTarea, conTarea.tareas[0].id, { completada: true });
    expect(actualizado.tareas[0].completada).toBe(true);
    expect(conTarea.tareas[0].completada).toBe(false);
  });

  it('obtenerTareasVisibles debe filtrar segun el filtro activo', () => {
    const base = crearEstadoInicial();
    const conTarea = agregarTarea(base, 'Estudiar React');
    const conVarias: EstadoTareas = {
      ...conTarea,
      tareas: [...conTarea.tareas, { id: '2', texto: 'Repasar arrays', completada: true }],
    };

    expect(obtenerTareasVisibles({ ...conVarias, filtro: 'pendientes' }).length).toBe(1);
    expect(obtenerTareasVisibles({ ...conVarias, filtro: 'completadas' }).length).toBe(1);
    expect(obtenerTareasVisibles({ ...conVarias, filtro: 'todas' }).length).toBe(2);
  });
});
