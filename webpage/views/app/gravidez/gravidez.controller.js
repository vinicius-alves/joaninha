'use strict';

angular.module('app')
.controller('Gravidez.Controller', Controller);

/**
* @ngdoc controller
* @name Joaninha.controller:Gravidez
* @requires Joaninha.service:httpRequestInterceptor
* @requires Joaninha.controller:Bebes
* @description
* Controller da view "app.gravidez".<br/> 
* Ao iniciar atualiza as opções de navegação e carrega o 
* id do bêbe e demais dados salvos no armazenamento local.<br/>
* Em seguida, faz uma requisição para "/baby/pregnancy" para obter os dados das seções sobre a gravidez.<br/>
* Após, atualiza a view e salva os dados recebidos no armazenamento local.<br/>
* Se não há dados, uma mensagem padrão é exibida.
*/

function Controller($scope,$rootScope,$http,$localStorage,apiVersao){
	$rootScope.global_anterior = "app/arvore/familia";
	$rootScope.global_proxima = "";
	var baby_id = $localStorage.baby.id;

	var params ={baby_id : baby_id};
	var sections = ['discoveryReactions','discoveryPeopleAround','discoveryHowItWas'];
	$localStorage.gravidez = $localStorage.gravidez || {};
 	$localStorage.gravidez[baby_id] = $localStorage.gravidez[baby_id] || {};
 	for(var i=0;i<3;i++){
 		$scope[sections[i]]=$localStorage.gravidez[baby_id][sections[i]];
 	};	

	$http.get(apiVersao + '/baby/pregnancy', {timeout: 500000,params:params})
    .then(function (response) {
 		if(response.data.error){
 			alert(response.data.message);
 		} else{
 			for(var i=0;i<sections.length;i++){
 				if(!response.data.result[sections[i]]){
 					$scope[sections[i]] = "Você ainda não definiu esta informação :/ "+
 					"Acesse o aplicativo e preencha a seção de gravidez da sua criança! :D";
 				}else{
 					$scope[sections[i]] = response.data.result[sections[i]];
 				}
 				$localStorage.gravidez[baby_id][sections[i]]=$scope[sections[i]];
 			};
 		}
 	},function(response){
 		if(response.status<0){
 			alert("Verifique sua conexão com a internet");
 		}
 	});   
};