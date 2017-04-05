'use strict';

angular.module('app')
.controller('Familia.Controller', Controller);

/**
* @ngdoc controller
* @name Joaninha.controller:Familia
* @requires Joaninha.service:httpRequestInterceptor
* @requires Joaninha.controller:Bebes
* @requires Joaninha.controller:App
* @description
* Controller da view "app.arvore.familia". </br>
* Ao iniciar atualiza as opções de navegação, carrega o id do 
* bêbe e demais dados salvos no armazenamento local.</br>
* Inicialmente, a navegação é desabilitada. Só é reabilitada após a 
* verificação de paginação, iniciadas na função 
* {@link Joaninha.controller:Familia#methods_load_pagination load_pagination}.</br>
* Em seguida, faz uma requisição para "/baby/relative" para obter os dados dos parentes do bêbe.</br>
* Após, processa os dados, atualiza a view e salva o resultado do processamento no armazenamento local.</br>
* Caso existam mais de seis parentes as opções de paginação serão carregadas.</br>
* A ordem dos parentes exibidos é mesma ordem de cadastro no aplicativo.</br>
* Se não há dados, uma mensagem padrão é exibida. 
*/

function Controller($rootScope,$scope,$http,$localStorage, apiVersao){
	$rootScope.global_anterior = "app/arvore/familia";
	$rootScope.global_proxima = "app/arvore/familia";

	var parents_type_map={
		0:"Irmã",     1:"Irmão",   2:"Prima",
		3:"Primo",    4:"Mãe",     5:"Pai",
		6:"Tia",      7:"Tio",     8:"Avó",
		9:"Avô",     10:"Tia-Avó", 11:"Tio-Avô",
		12:"Bisavó", 13:"Bisavô"
 	};

 	/**
	* @ngdoc method
	* @name load_pagination
	* @methodOf Joaninha.controller:Familia
	* @description
	* Caso existam mais de seis parentes carrega as opções de paginação, 
	* definidas pelas funções  
	* {@link Joaninha.controller:Familia#methods_call_left call_left} 
	* e {@link Joaninha.controller:Familia#methods_call_right call_right}.</br>
	* Para isto utiliza as funções {@link Joaninha.controller:App#methods_set_left_callback set_left_callback} e 
	* {@link Joaninha.controller:App#methods_set_right_callback set_right_callback}
	* definidas no controller {@link Joaninha.controller:App App}.</br>
	* Caso existam menos, apenas atualiza as opções de navegação, liberando a navegação para outras views.
	*/

 	var load_pagination = function(){
			if($scope.parents.length>6){
				$scope.begin = $scope.begin || 0;
				$scope.set_left_callback(call_left);
				$scope.set_right_callback(call_right);
			} else{
				$rootScope.global_anterior = "app/arvore/pais";
				$rootScope.global_proxima = "app/gravidez";
			}
 	};
 	
 	var baby_id = $localStorage.baby.id;
 	$localStorage.arvore = $localStorage.arvore || {};
 	$localStorage.arvore[baby_id] = $localStorage.arvore[baby_id] || {};
 	$scope.parents = $localStorage.arvore[baby_id].parents;
 	$scope.loaded_parents = $localStorage.arvore[baby_id].loaded_parents;
 	$scope.begin = $localStorage.arvore[baby_id].begin;
 	if($scope.loaded_parents && $scope.parents.length>6){
 		load_pagination();
 	}


	var params = {baby_id : baby_id};
	$http.get(apiVersao + '/baby/relative', {timeout: 500000, params:params})
    .then(function (response) {
 		if(response.data.error){
 			alert(response.data.message);
 		} else{
 			var tmp_type = '';
 			for (var i = 0; i < response.data.result.length; i++) {
 				delete response.data.result[i].updated_at;
 				delete response.data.result[i].annotations;
 				tmp_type = response.data.result[i].type;
 				response.data.result[i].type_name = parents_type_map[tmp_type];
			};
			$scope.loaded_parents = true;
			$scope.parents=response.data.result;
			$localStorage.arvore[baby_id].parents = $scope.parents;
			$localStorage.arvore[baby_id].loaded_parents = true;
			load_pagination();
 		}
 	},function(response){
 		if(response.status<0){
 			alert("Verifique sua conexão com a internet");
 		}
 		$rootScope.global_anterior = "app/arvore/pais";
		$rootScope.global_proxima = "app/gravidez";
 	});

 	/**
	* @ngdoc method
	* @name call_left
	* @methodOf Joaninha.controller:Familia
	* @description
	* Chamada toda a vez que o usuário clicar na seta de navegação 
	* para a esquerda, se a paginação for carregada.</br>
	* Caso o usuário esteja visualizando os primeiros seis parentes, 
	* libera acesso para a view anterior e reseta
	* as funções {@link Joaninha.controller:App#methods_set_left_callback set_left_callback}
	* e {@link Joaninha.controller:App#methods_set_right_callback set_right_callback}.</br>
	* Caso o usuário não esteja nos seis parentes iniciais, carrega os seis parentes 
	* anteriores àqueles que está visualizando.</br>
	* @param {int} begin Índice que indica em que posição do array de parentes está o usuário.
	*/

 	var call_left = function(){				
		if($scope.begin>=6){
			$scope.begin -=6;
		} else{
			$scope.set_left_callback(function(){
				$scope.set_left_callback(function(){});
				$scope.set_right_callback(function(){});
			});
			$localStorage.arvore[baby_id].begin = $scope.begin;
			$rootScope.global_anterior = "app/arvore/pais";
		}
	};

 	/**
	* @ngdoc method
	* @name call_right
	* @methodOf Joaninha.controller:Familia
	* @description
	* Chamada toda a vez que o usuário clicar na seta de navegação para a direita,
	* se a paginação for carregada.</br>
	* Caso o usuário esteja visualizando os últimos seis parentes, libera acesso para 
	* a view posterior e reseta as funções 
	* {@link Joaninha.controller:App#methods_set_left_callback set_left_callback}
	* e {@link Joaninha.controller:App#methods_set_right_callback set_right_callback}.</br>
	* Caso o usuário não esteja nos seis parentes finais, 
	* carrega os seis parentes posteriores àqueles que está visualizando.
	* @param {int} begin Índice que indica em que posição do array de parentes está o usuário.
	*/

	var call_right = function(){
		if($scope.begin<$scope.parents.length-6){
			$scope.begin +=6;
		} else{
			$scope.set_right_callback(function(){
				$scope.set_left_callback(function(){});
				$scope.set_right_callback(function(){});
			});
			$localStorage.arvore[baby_id].begin = $scope.begin;
			$rootScope.global_proxima = "app/gravidez";
		}
	}; 	

};