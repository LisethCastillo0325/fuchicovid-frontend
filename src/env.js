(function(window) {
    window.__env = window.__env || {};

    // API url
    /* window.__env.apiUrl = 'http://127.0.0.1:8000';*/

    //local
     window.__env.clientName = 'Base';
     window.__env.apiGatewayBackOffice = 'http://localhost:5000/';
     window.__env.urlPath = 'http://localhost:4200';

    //real

    // window.__env.clientName = 'Base';
    // window.__env.apiGatewayBackOffice = 'http://backend.william-patino.com/';
    // window.__env.urlPath = 'http://backoffice.william-patino.com';

    // Whether or not to enable debug mode
    // Setting this to false will disable console output
    window.__env.enableDebug = true;
}(this));
