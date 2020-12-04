export const constants = {
  config: {
    /**Rutas */

    // Tipo Documento
    tipoDocumento: 'api/tipo-identificacion/',
    tipoDocumentoPaginationFilter: 'api/tipo-identificacion/pagination-filters/',
    tipoDocumentoActivarInactivar: 'api/tipo-identificacion/activar-inactivar/',

    // Paciente
    paciente: 'api/paciente/',
    pacientePaginationFilter: 'api/paciente/pagination-filters/',
    pacienteActivarInactivar: 'api/paciente/activar-inactivar/',

    // Ciudad
    ciudad: 'api/ciudad/',
    ciudadPorDepartamento: 'api/ciudad/departamento/',

    // Departamento
    departamento: 'api/departamento',

    // Profesional Salud
    profesionalSalud: 'api/profesional-salud/',
    funcionario:'api/funcionario/',
    funcionarioPaginationFilter: 'api/funcionario/pagination-filters/',
    funcionarioActivarInactivar: 'api/funcionario/activar-inactivar/',
    profesional:'api/profesionalS/',
    profesionalPaginationFilter: 'api/profesionalS/pagination-filters/',
    profesionalActivarInactivar: 'api/profesionalS/activar-inactivar/',
    eps:'api/EPS',
    universidad:'api/universidad'
  },
   /**DataTable */
   dtOptions: {
    language: {
      emptyTable: '',
      zeroRecords: 'No se encontraron registros',
      lengthMenu: 'Mostrar _MENU_ elementos',
      search: 'Buscar:',
      info: 'De _START_ a _END_ de _TOTAL_ elementos',
      infoEmpty: 'De 0 a 0 de 0 elementos',
      infoFiltered: '(filtrados de _MAX_ elementos totales)',
      paginate: {
        first: 'Prim.',
        last: 'Últ.',
        next: 'Sig.',
        previous: 'Ant.'
      },
    }
  }
};
