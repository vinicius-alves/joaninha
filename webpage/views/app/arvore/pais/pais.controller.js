'use strict';

angular.module('app')
.controller('Pais.Controller', Controller);

/**
* @ngdoc controller
* @name Joaninha.controller:Pais
* @requires Joaninha.service:httpRequestInterceptor
* @requires Joaninha.controller:Bebes
* @description
* Controller da view "app.arvore.pais". <br/>
* Ao iniciar atualiza as opções de navegação, carrega o id do 
* bêbe e demais dados salvos no armazenamento local.<br/>
* Em seguida, faz uma requisição para "/baby/relative" para obter os dados dos parentes do bêbe.<br/>
* Após, processa os dados, atualiza a view e salva o resultado do processamento no armazenamento local.<br/>
* Caso exista mais de um pai ou uma mãe, apenas o que foi cadastrado primeiro será considerado.<br/>
* Se não há dados, uma mensagem padrão é exibida. <br/>
* Se há apenas uma mãe ou um pai, a view se adapta a isto.<br/>
*/

function Controller($rootScope,$scope,$http,$localStorage, apiVersao){
	$rootScope.global_anterior = "app/voce";
	$rootScope.global_proxima = "app/arvore/familia";

	var parents_type_map={
		0:"Irmã",     1:"Irmão",   2:"Prima",
		3:"Primo",    4:"Mãe",     5:"Pai",
		6:"Tia",      7:"Tio",     8:"Avó",
		9:"Avô",     10:"Tia-Avó", 11:"Tio-Avô",
		12:"Bisavó", 13:"Bisavô"
 	};
 	
 	var baby_id = $localStorage.baby.id;
 	$localStorage.arvore = $localStorage.arvore || {};
 	$localStorage.arvore[baby_id] = $localStorage.arvore[baby_id] || {};
 	$scope.relatives = $localStorage.arvore[baby_id].relatives;
 	$scope.loaded_relatives = $localStorage.arvore[baby_id].loaded_relatives;

	var params = {baby_id : baby_id};
	$http.get(apiVersao + '/baby/relative', {timeout: 500000, params:params})
    .then(function (response) {
 		if(response.data.error){
 			alert(response.data.message);
 		} else{
 			var found_pai = false;
 			var found_mae = false;
 			$scope.relatives =[];
 			var tmp_type ='';
 			for (var i = 0; i < response.data.result.length; i++) {
 				tmp_type = response.data.result[i].type;
 				if(!found_pai && parents_type_map[tmp_type] === "Pai"){
 					delete response.data.result[i].updated_at;
 					delete response.data.result[i].annotations;
 					$scope.relatives[0]=response.data.result[i];
 					found_pai=true;
 				}
 				if(!found_mae && parents_type_map[tmp_type] === "Mãe"){
 					delete response.data.result[i].updated_at;
 					delete response.data.result[i].annotations;
 					$scope.relatives[1]=response.data.result[i];
 					found_mae=true;
 				}
			};
			$scope.loaded_relatives = true;
			$localStorage.arvore[baby_id].relatives = $scope.relatives;
			$localStorage.arvore[baby_id].loaded_relatives = true;
 		}
 	},function(response){
 		if(response.status<0){
 			alert("Verifique sua conexão com a internet");
 		}
 	});
};