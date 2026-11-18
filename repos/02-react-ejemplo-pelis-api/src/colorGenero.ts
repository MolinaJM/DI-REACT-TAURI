// La tabla de colores se tipa con Record<string, string> — §13.3.1
export const COLORES_GENERO: Record<string, string> = {
  acción: "#d9534f",
  comedia: "#f0ad4e",
  drama: "#5bc0de",
  terror: "#6f42c1",
  "ciencia-ficción": "#20c997",
  romántica: "#e83e8c",
};

export function colorDeGenero(genero: string): string {
  return COLORES_GENERO[genero.toLowerCase()] ?? "#6c757d";
}
