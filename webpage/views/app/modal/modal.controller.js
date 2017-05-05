'use strict';

angular.module('app')
.controller('Modal.Controller', Controller);

/**
* @ngdoc controller
* @name Joaninha.controller:Modal
* @requires Joaninha.controller:Bebes
* @description
* Controller da view "app.voce". <br/>
* Ao iniciar atualiza as opções de navegação e carrega o link da foto do bêbe salvo no armazenamento local.
*/

function Controller($scope){
	//console.log("scopo parent: ",$scope.$parent.pictures);

	$scope.select = function(picture){
		console.log(picture);
	};

};