export interface estadoRecursoModelo {
  id: number;
  descripcion: string;
}

export const estadosRecursos: estadoRecursoModelo[] = [
  { id: 1, descripcion: 'Físicos' },
  { id: 2, descripcion: 'Humanos' },
  { id: 3, descripcion: 'Financieros' },
  { id: 4, descripcion: 'Tecnológicos' },
];

export interface EstadoCheck {
  id: number;
  value: string;
  descripcion: string;
  checked?: boolean;
}
