import { Persona } from './persona.model';
export class RelacionPacienteIntegrantes {
  id:number;
  idParentesco: {
    id: number,
    nombre: string
  };
  idIntegrante: {
    idPersona: number,
    idPersona2: Persona
  };
}
