'use strict';

angular.module('app')
.controller('Cantinho.Controller', Controller);

/**
* @ngdoc controller
* @name Joaninha.controller:Gravidez
* @requires Joaninha.service:httpRequestInterceptor
* @requires Joaninha.controller:Bebes
* @description
* Controller da view "app.gravidez.cantinho".<br/> 
*/

function Controller($scope,$rootScope,$http,$localStorage,apiVersao){
	$rootScope.global_anterior = "app/gravidez/descoberta";
	$rootScope.global_proxima = "";
	var baby_id = $localStorage.baby.id;
	var params ={baby_id : baby_id};

};