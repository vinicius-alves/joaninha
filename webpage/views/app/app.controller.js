'use strict';

angular.module('app')
.controller('App.Controller', Controller);

/**
* @ngdoc controller
* @name Joaninha.controller:App
* @description
* Controller da view abstrata "app". <br/>
* Ao iniciar atribui a função {@link Joaninha.service:PrinterService#methods_print print} 
* do service {@link Joaninha.service:PrinterService PrinterService} ao botão "Imprimir" presente na view.<br/>
* Carrega o prefixo a ser utilizado pela url para navegação, definido como constante no
* {@link Joaninha.object:Router app.js}.<br/>
* Também carrega as setas de navegação e define as callbacks iniciais.
*/

function Controller($scope,PrinterService,prefix){
	$scope.print = PrinterService.print;
	$scope.prefix = prefix;

	$scope.callback_left_nav = function(){};
	$scope.callback_right_nav = function(){};

	/**
	* @ngdoc method
	* @name set_left_callback
	* @methodOf Joaninha.controller:App
	* @description
	* Define a função de callback que será invocada quando o usuário 
	* clicar na seta de navegação para a esquerda.<br/>
	* Função para ser usada pelas views "filhas" da view abstrata app.<br/>
	* @param {function} callback Função callback para esquerda
	*/
	
	$scope.set_left_callback=function(callback){
		$scope.callback_left_nav = callback;
	};

	/**
	* @ngdoc method
	* @name set_right_callback
	* @methodOf Joaninha.controller:App
	* @description
	* Define a função de callback que será invocada quando o usuário 
	* clicar na seta de navegação para a direita.<br/>
	* Função para ser usada pelas views "filhas" da view abstrata app.<br/>
	* @param {function} callback Função callback para direita
	*/

	$scope.set_right_callback=function(callback){
		$scope.callback_right_nav = callback;
	};
};