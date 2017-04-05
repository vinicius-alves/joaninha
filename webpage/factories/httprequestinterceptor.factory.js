'use strict';

angular.module('app')
.factory('httpRequestInterceptor', factory);

/**
* @ngdoc service
* @name Joaninha.service:httpRequestInterceptor
* @requires Joaninha.service:AuthenticationService
* @description
* Embora descrito como um service, é uma factory. <br/>
* Após o login do usuário pela service 
* {@link Joaninha.service:AuthenticationService AuthenticationService}, 
* as informações client_id e auth_key são salvas no armazenamento local.<br/>
* Esta factory intercepta todas as requisições http posteriores ao login adicionando essas 
* informações como parâmetros.<br/>
* Para isto ela é registrada como um interceptador no {@link Joaninha.object:Router app.js}.
*/  

function factory($q, $location, $localStorage) {
return {
    request : function(config) {

        config.params = config.params || {};

        if ($localStorage.currentUser && config.headers.Accept=="application/json") {

        	config.params.client_id = $localStorage.currentUser.client_id;
            config.params.auth_key = $localStorage.currentUser.auth_key;
        }
        return config || $q.when(config);
    }
  };
};

