'use strict';

angular.module('app')
.controller('Capa.Controller', Controller);

/**
* @ngdoc controller
* @name Joaninha.controller:Capa
* @requires Joaninha.controller:Bebes
* @description
* Controller da view "app.capa". <br/>
* Ao iniciar atualiza as opções de navegação e carrega o nome do bêbe salvo no armazenamento local.
*/

function Controller($scope,$rootScope,$localStorage){
	$rootScope.global_anterior = "bebes";
	$rootScope.global_proxima = "app/voce";
    $scope.baby_name=$localStorage.baby.name;   
};