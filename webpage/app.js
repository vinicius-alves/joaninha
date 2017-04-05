"use strict";

var app = angular.module('app', ['ui.router','ngMessages','ngStorage']);

/**
* @ngdoc object
* @name Joaninha.object:Router
* @description
* Referente ao arquivo app.js.<br/> 
* Este arquivo inicia o angular e toda a infraestrutura de views e controllers da aplicação.<br/> 
* Inicialmente se define as constantes: prefix, que é utilizada para navegação na view abstrata app,
* e apiVersao, que é utilizado para todas as requisições ao servidor joaninha em todos os controllers.<br/> 
* Em seguida, se configuram as rotas da aplicação. Há dois grupos, públicas e restritas, as restritas
* só podem ser acessadas por usuários já logados, este controle também é feito neste módulo.<br/> 
* Nas rotas públicas temos a public, que é abstrata, em seguida login. <br/> 
* Nas restritas temos dois grupos, primeiro para view bêbes, e outro para as views app.<br/> 
* Dentro de app também temos um grupo específico, árvore, que é pai tanto da view familia como pais. 
*/

/**
* @ngdoc property
* @name Urls
* @propertyOf Joaninha.object:Router
* @description
* A aplicação utiliza urls relativas e absolutas. <br/> 
* Especificamente, todas chamadas de dados para o servidor utilizam urls absolutas, pois são fácilmente
* configuráveis através da constante "apiVersao" caso necessário.<br/> 
* Enquanto que todas as chamadas para os arquivos da página utilizam urls relativas, isto para facilitar 
* a implementação do site em diferentes pastas. Repare que no index.html há uma base, esta é usada como prefixo
* para todas as urls relativas, também de fácil alteração.
*/

app.constant("apiVersao", "/joaninhapi/0.1");
app.constant("prefix", "/#!/");

//public routes
app.config(function ($stateProvider) {
  $stateProvider
    .state('public', {
        url: '/public',
        templateUrl: 'views/public/public.view.html',
        abstract:true
      })
    .state('public.login', {
        url: '/login',
        templateUrl: 'views/public/login/login.view.html',
        controller: 'Login.Controller'
      });
});

//restricted routes
app.config(function ($stateProvider) {
  $stateProvider
    .state('bebes', {
        url: '/bebes',
        templateUrl: 'views/bebes/bebes.view.html',
        controller:'Bebes.Controller'
     })
    .state('app', {
        url: '/app',
        templateUrl: 'views/app/app.view.html',
        controller:'App.Controller',
        abstract:true
     })
    .state('app.capa', {
        parent:'app',
        url: '/capa',
        templateUrl: 'views/app/capa/capa.view.html',
        controller: 'Capa.Controller'
     })
     .state('app.voce', {
        parent:'app',
        url: '/voce',
        templateUrl: 'views/app/voce/voce.view.html',
        controller: 'Voce.Controller'
     })
     .state('app.arvore', {
        parent:'app',
        url: '/arvore',
        templateUrl: 'views/app/arvore/arvore.view.html',
        abstract:true
     })
    .state('app.arvore.pais', {
        parent:'app.arvore',
        url: '/pais',
        templateUrl: 'views/app/arvore/pais/pais.view.html',
        controller: 'Pais.Controller'
     })
    .state('app.arvore.familia', {
        parent:'app.arvore',
        url: '/familia',
        templateUrl: 'views/app/arvore/familia/familia.view.html',
        controller: 'Familia.Controller'
     })
    .state('app.gravidez', {
        parent:'app',
        url: '/gravidez',
        templateUrl: 'views/app/gravidez/gravidez.view.html',
        controller: 'Gravidez.Controller'
     });
});

app.config(function($urlRouterProvider){
    // default route
    $urlRouterProvider.otherwise("/bebes");
});

// set client_id and auth_key as default arguments for every http request
app.config(function($httpProvider){
  $httpProvider.interceptors.push('httpRequestInterceptor');
});

app.run(function($rootScope, $http, $location, $localStorage) {

    // set default header
    $http.defaults.headers.common.Accept = 'application/json';

    // redirect to login page if not logged in and trying to access a restricted page
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        var publicPages = ['/public/login'];
        var restrictedPage = publicPages.indexOf($location.path()) === -1;
        if (restrictedPage && !$localStorage.currentUser) {
            $location.path('/public/login');
        } 
        // prevents a user from accessing the app pages without a selected baby
        else if($localStorage.currentUser && !$localStorage.baby){
            $location.path('/bebes');
        }
    });

});