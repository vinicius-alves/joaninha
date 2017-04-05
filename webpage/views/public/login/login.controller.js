'use strict';

angular.module('app')
.controller('Login.Controller', Controller);

/**
* @ngdoc controller
* @name Joaninha.controller:Login
* @requires Joaninha.service:AuthenticationService
* @description
* Controller da view "public.login". 
* Ao iniciar define as funções de escopo de login e login pelo facebook.
* Também chama a função Logout do AuthenticationService, 
* garantindo que o usuário esteja deslogado. <br/>Após isso, carrega a api do 
* facebook assincronamente, através da função 
* {@link Joaninha.service:AuthenticationService#methods_LoadFacebook LoadFacebook}
*  do {@link Joaninha.service:AuthenticationService AuthenticationService}.
*/


function Controller($scope,$location, AuthenticationService){

    $scope.loading = false;
    AuthenticationService.Logout();
    AuthenticationService.LoadFacebook();

    /**
    * @ngdoc method
    * @name login
    * @methodOf Joaninha.controller:Login
    * @description
    * Redireciona a requisição de login para o método 
    * {@link Joaninha.service:AuthenticationService#methods_Login Login} do 
    * {@link Joaninha.service:AuthenticationService AuthenticationService}.<br/>
    * Caso o resultado seja bem sucedido, redireciona o usuário para a view "bebes".<br/>
    * Caso não seja, exibe o erro ocorrido em um campo próprio na view.
    * @param {string} email O e-mail do usuário, disponível na view.
    * @param {string} password A senha do usuário, disponível na view de login.
    */
    
    $scope.login = function(){
        $scope.loading = true;
        AuthenticationService.Login($scope.email, $scope.password, 
            function (success,message,status) {
                if (success) {
                    $location.path('/bebes');
                } else {
                    if(status<0){
                        $scope.error = 'Verifique sua conexão com a internet';
                    }else{
                        $scope.error = message;
                    }
                }
                $scope.loading = false;
        });
    };

    /**
    * @ngdoc method
    * @name login_fb
    * @methodOf Joaninha.controller:Login
    * @description
    * Redireciona a requisição de login para o método 
    * {@link Joaninha.service:AuthenticationService#methods_LoginFacebook LoginFacebook} do 
    * {@link Joaninha.service:AuthenticationService AuthenticationService}.<br/>
    * Caso o resultado seja bem sucedido, redireciona o usuário para a view "bebes".<br/>
    * Caso não, exibe o erro ocorrido em um campo próprio na view.
    */

    $scope.login_fb = function(){
        AuthenticationService.LoginFacebook(
            function (success,message,status) {
                if (success) {
                    $location.path('/bebes');
                } else {
                    if(status<0){
                        $scope.error = 'Verifique sua conexão com a internet';
                    }else{
                        $scope.error = message;
                    }
                }
                $scope.loading = false;
        });
    };
};