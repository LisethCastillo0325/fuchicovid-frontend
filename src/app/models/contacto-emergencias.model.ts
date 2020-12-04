import { Persona } from './persona.model';
export class ContactoEmergencias {
  id: number;
  idTipoContacto: {
    id: number,
    tipoContacto: string
  };
  idIntegranteHogar: {
    idPersona: number,
    idPersona2: Persona
  };
}
