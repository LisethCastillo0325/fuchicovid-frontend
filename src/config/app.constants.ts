export const constants = {
  config: {
    /**Rutas */
    tipoDocumento: 'api/tipo-identificacion/',
    tipoDocumentoPaginationFilter: 'api/tipo-identificacion/pagination-filters/',
    tipoDocumentoActivarInactivar: 'api/tipo-identificacion/activar-inactivar/',
    funcionario:'api/funcionario/',
    funcionarioPaginationFilter: 'api/funcionario/pagination-filters/',
    funcionarioActivarInactivar: 'api/funcionario/activar-inactivar/'
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
