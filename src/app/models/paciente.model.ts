import { TipoDocumento } from './tipo-documento.model';
import { RelacionPacienteIntegrantes } from './relacion-paciente-ntegrantes.model';
import { ContactoEmergencias } from './contacto-emergencias.model';
import { Persona } from './persona.model';
import { Ciudad } from './ciudad.model';
export class Paciente {
  id: number;
  nombre: string;
  numeroIdentificacion: string;
  estado: string;
  fechaNacimiento: string;
  idTipoIdentificacion: TipoDocumento;
  paciente: {
    idPersona:number,
    latitud:string,
    longitud:string,
    numeroIntegrantesHogar: number,
    estadoEnfermedad:string,
    idDoctorEncargado: {
      idPersona: number,
      idPersona2: Persona
    };
    idCiudadContagio: Ciudad;
    relacionPacienteIntegrantes: RelacionPacienteIntegrantes[],
    contactoEmergencias: ContactoEmergencias[]
  }
}
