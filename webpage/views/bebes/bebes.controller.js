'use strict';

angular.module('app')
.controller('Bebes.Controller', Controller);

/**
* @ngdoc controller
* @name Joaninha.controller:Bebes
* @requires Joaninha.service:httpRequestInterceptor
* @description
* Controller da view "bebes". <br/>
* Ao iniciar carrega os dados salvos no armazenamento local.<br/>
* Em seguida, faz uma requisição para "/baby" para obter os dados doss bêbes cadastrados.<br/>
* Após, processa os dados, atualiza a view e 
* salva o resultado do processamento no armazenamento local.<br/>
* Este dados serão usados por outras views para futuras requisições.<br/>
* Se não há dados, uma mensagem padrão é exibida.
*/


function Controller($scope,$localStorage,$http,$location,apiVersao){

	$scope.name=$localStorage.currentUser.name;
	$localStorage.bebes = $localStorage.bebes || {};
	$scope.babies = $localStorage.bebes.babies;
	$scope.loaded_babies = $localStorage.bebes.loaded_babies;

	var age_metric_map={
		0:["semana","semanas"],
		1:["mês","meses"],
		2:["ano","anos"]
 	};

	$http.get(apiVersao + '/baby', {timeout: 500000})
    .then(function (response) {
 		if(response.data.error){
 			alert(response.data.message);
 		}
 		for (var i = 0; i < response.data.result.length; i++) {
 			if(response.data.result[i].age == "1"){
 				response.data.result[i].age_metric = age_metric_map[response.data.result[i].age_metric][0];
 			} else{
 				response.data.result[i].age_metric = age_metric_map[response.data.result[i].age_metric][1];
 			}
 		}
 		$scope.babies = response.data.result;
 		$scope.loaded_babies = true;
 		$localStorage.bebes.loaded_babies = true;
 		$localStorage.bebes.babies = $scope.babies;
 	},function(response){
 		if(response.status<0){
 			alert("Verifique sua conexão com a internet");
 		}
 	});

 	$scope.selectBaby = function(baby){
 		$localStorage.baby=baby;
 		$location.path('/app/capa');
 	}; 
};