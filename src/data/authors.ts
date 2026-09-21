export interface Person {
  id: string;
  name: string;
  role: string;
  bio: string;
}

export const people: Person[] = [
  {
    id: 'equipo-editorial',
    name: 'Equipo editorial',
    role: 'Redacción de rehabilitación',
    bio: 'Prepara guías para que una comunidad pueda ordenar el alcance de fachada, cubierta, SATE o accesibilidad antes de pedir presupuesto.',
  },
  {
    id: 'revision-tecnica',
    name: 'Revisión de contenidos',
    role: 'Revisión de exactitud',
    bio: 'Comprueba que rangos, normativas y ayudas se presenten como orientación fechada, no como cotización ni asesoramiento jurídico.',
  },
];

export function getPerson(id: string): Person | undefined {
  return people.find((person) => person.id === id);
}
