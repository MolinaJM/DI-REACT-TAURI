interface SaludoProps { //React siempre empaqueta los datos en objetos (interface/type) y no en tipos sueltos
  nombreAlumno: string; 
}

function Saludo({ nombreAlumno }: SaludoProps) {
  if (!nombreAlumno) {
    return null;
  }

  return <h2>¡Hola, {nombreAlumno}!</h2>;
}

export default Saludo;