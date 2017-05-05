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

function Controller($scope,$rootScope,$http,$localStorage,apiVersao,ngDialog){
	$rootScope.global_anterior = "app/gravidez/chegada";
	$rootScope.global_proxima = "app/gravidez/chadebebe";
	var baby_id = $localStorage.baby.id;
	var params ={baby_id : baby_id};

	$scope.pictures = ["http://i.imgur.com/SqBNDlm.jpg","http://i.imgur.com/ZOCXcDJ.jpg",
	"http://i.imgur.com/VunDFZH.jpg","http://i.imgur.com/AyNquWT.jpg"];
	


	$scope.openModal = function(ev) {
		ngDialog.open({
	    template: 'views/app/modal/modal.view.html',
	    controller: 'Modal.Controller',
	    scope: $scope
	});
			

	};

};