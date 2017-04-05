'use strict';

angular.module('app')
.controller('Voce.Controller', Controller);

/**
* @ngdoc controller
* @name Joaninha.controller:Voce
* @requires Joaninha.controller:Bebes
* @description
* Controller da view "app.voce". <br/>
* Ao iniciar atualiza as opções de navegação e carrega o link da foto do bêbe salvo no armazenamento local.
*/

function Controller($scope,$rootScope,$localStorage){
	$rootScope.global_anterior = "app/capa";
	$rootScope.global_proxima = "app/arvore/pais";
	$scope.url_photo=$localStorage.baby.url_photo;
};