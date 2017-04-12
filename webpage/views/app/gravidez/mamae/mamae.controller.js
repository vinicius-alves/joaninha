'use strict';

angular.module('app')
.controller('Mamae.Controller', Controller);

/**
* @ngdoc controller
* @name Joaninha.controller:Gravidez
* @requires Joaninha.service:httpRequestInterceptor
* @requires Joaninha.controller:Bebes
* @description
* Controller da view "app.gravidez.mamae".<br/> 
*/

function Controller($scope,$rootScope,$http,$localStorage,apiVersao){
	$rootScope.global_anterior = "app/arvore/familia";
	$rootScope.global_proxima = "";
	var baby_id = $localStorage.baby.id;
	var params ={baby_id : baby_id};

};