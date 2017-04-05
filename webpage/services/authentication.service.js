"use strict";

angular
  .module('app')
  .service('AuthenticationService', Service);

/**
* @ngdoc service
* @name Joaninha.service:AuthenticationService
* @description
* Responsável pelo processamento das requisições de login, logout normais ou pelo Facebook.
*/    

function Service($http, $localStorage, apiVersao) {

    /**
    * @ngdoc method
    * @name Login
    * @methodOf Joaninha.service:AuthenticationService
    * @description
    * Inicialmente processa os dados para login e depois os envia ao servidor para ober um auth_key, 
    * que é um token para fornecer acesso as demais requisições posteriores aos dados do usuário. <br/>
    * Recebe o email, que deve ser previamente validado pela view, a senha, que é codificada por uma função Hash MD5
    * disponibilizado pela biblioteca CryptoJS e cria um client_id através da função 
    * {@link Joaninha.service:AuthenticationService#methods_generate_client_id generate_client_id}.<br/>
    * Também recebe como argumento uma callback, que será executada quando finalizar a requisição.<br/>
    * Após este processamento inicial faz uma requisição com os dados processados para "/user".<br/>
    * E assim que recebe a resposta passa os dados de erro, mensagem de erro e status da requisição para a callback.
    * Caso não ocorra erro, salva o token e o client_id no armazenamento local. <br/>
    * A partir daí toda nova requisição http possuíra estes campos, graças a factory httpRequestInterceptor.
    * @param {string} email O e-mail do usuário, disponível na view.
    * @param {string} password A senha do usuário, disponível na view de login.
    * @param {function} callback Callback a ser chamada após tentativa de realização do login
    */

    this.Login = function(email, password, callback) {

      password = CryptoJS.MD5(password).toString();

      var client_id = generate_client_id();
      var params =  
        {email: email, password: password, client_id: client_id};

      $http.get(apiVersao + '/user', {params: params,timeout: 500000})
        .then(function loginSuccess(response) {
          if(response.data.error){
            callback(false,response.data.message,response.status);

          } else{
            $localStorage.currentUser={};
            $localStorage.currentUser.client_id=client_id;
            $localStorage.currentUser.auth_key=response.data.result.auth_key;
            $localStorage.currentUser.name=response.data.result.name;
            callback(true,response.data.message,response.status);
          }

        }, function loginError(response){
          callback(false,response.data.message,response.status);
        });
    };

    /**
    * @ngdoc method
    * @name generate_client_id
    * @methodOf Joaninha.service:AuthenticationService
    * @description
    * Gera uma string aleatória de comprimento numa faixa previamente escolhida.<br/>
    * Esta string pode conter números e letras maiúsculas ou minúsculas.  
    */

    var generate_client_id = function(){
        var client_id = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var client_id_max = 26;
        var client_id_min = 22;
        var client_id_lenght = Math.floor(Math.random()*(client_id_max-client_id_min+1)+client_id_min);
        for( var i=0; i < client_id_lenght; i++ ){
            client_id += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return client_id;       
    };  

    /**
    * @ngdoc method
    * @name Logout
    * @methodOf Joaninha.service:AuthenticationService
    * @description
    * Apaga todo o armazenamento local, incluindo auth_key e client_id.<br/>
    * O que impossibilita de usuário ter acesso a dados da aplicação e a views restritas.
    */  

    this.Logout = function() {
      $localStorage.$reset();
    };

    /**
    * @ngdoc method
    * @name LoadFacebook
    * @methodOf Joaninha.service:AuthenticationService
    * @description
    * Carrega assíncronamente a api disponibilizada pelo facebook para login.<br/>
    * Nesta função é definido e utilizado o appId, que identifica o aplicativo 
    * no facebook no qual deverá ser feito o login.<br/>
    * Para obter esta chave, você precisa ter acesso ao app joaninha do facebook. 
    */  

    this.LoadFacebook = function(){  

        window.fbAsyncInit = function() {
          FB.init({
            appId      : '169833696683392',
            cookie      : true,
            version    : 'v2.8'
          });    
        };

        (function(d, s, id){
           var js, fjs = d.getElementsByTagName(s)[0];
           if (d.getElementById(id)) {return;}
           js = d.createElement(s); js.id = id;
           js.src = "//connect.facebook.net/pt_BR/sdk.js";
           fjs.parentNode.insertBefore(js, fjs);
         }(document, 'script', 'facebook-jssdk'));
    };

    /**
    * @ngdoc method
    * @name statusChangeCallback
    * @methodOf Joaninha.service:AuthenticationService
    * @description
    * É um função genérica, que poderia ser chamada toda vez que 
    * ocorre uma mudança de status de login do usuário.<br/>
    * Porém, não é necessário chavear todas as possibilidades de status. <br/>
    * Então apenas verifica se o usuário está conectado ao aplicativo do facebook da joaninha. <br/>
    * Se estiver, repassa os dados de autenticação do facebook para a função 
    * {@link Joaninha.service:AuthenticationService#methods_sendRequestServerFB sendRequestServerFB}.
    * @param {function} callback Callback a ser chamada após verficação do status do usuário
    */  

    var statusChangeCallback = function(response,callback){
        if(response.status === 'connected'){
            sendRequestServerFB(response.authResponse,callback);
        };
        return response.status;
    };

    /**
    * @ngdoc method
    * @name sendRequestServerFB
    * @methodOf Joaninha.service:AuthenticationService
    * @description
    * Se chegou a este ponto, o usuário está devidamente logado no aplicativo joaninha do facebook.<br/>
    * Então basta utilizar a api do facebook para obter os dados necessários, neste caso email e first_name.<br/>
    * Após receber estes, os utiliza como parâmetros, incluindo também o token de acesso 
    * que será utilizado para autenticar a requisição com o facebook no servidor e cria um client_id através da 
    * função {@link Joaninha.service:AuthenticationService#methods_generate_client_id generate_client_id}.<br/>
    * Após este processamento inicial faz uma requisição com os dados processados para "/user/facebook".<br/>
    * E assim que recebe a resposta passa os dados de erro, mensagem 
    * de erro e status da requisição para a callback.<br/>
    * Caso não ocorra erro, salva o token e o client_id no armazenamento local. <br/>
    * A partir daí toda nova requisição http possuíra estes campos, graças a factory 
    * {@link Joaninha.service:httpRequestInterceptor httpRequestInterceptor}.
    * @param {function} callback Callback a ser chamada após recebimento da resposta do servidor
    */  

    var sendRequestServerFB=function(authResponse,callback){
        FB.api('/me?fields=id, email,first_name, name',function(response){
            var client_id = generate_client_id();
            var params={email: response.email, name:response.first_name, 
              auth_token:authResponse.accessToken, client_id : client_id};

            $http.get(apiVersao + '/user/facebook', {params: params,timeout: 500000})
              .then(function loginSuccess(response) {
                if(response.data.error){
                  callback(false,response.data.message,response.status);

                } else{
                  $localStorage.currentUser={};
                  $localStorage.currentUser.client_id=client_id;
                  $localStorage.currentUser.auth_key=response.data.result.auth_key;
                  $localStorage.currentUser.name=response.data.result.name;
                  callback(true,response.data.message,response.status);
                }

              }, function loginError(response){
                callback(false,response.data.message,response.status);
              });
        });
    };

    /**
    * @ngdoc method
    * @name LoginFacebook
    * @methodOf Joaninha.service:AuthenticationService
    * @description
    * Chama a função de login disponibilizada pela api do facebook.<br/>
    * Quando o processo de login da api terminar, ela repassará a resposta para a função
    * {@link Joaninha.service:AuthenticationService#methods_statusChangeCallback statusChangeCallback}.
    * @param {function} callback Callback a ser chamada após tentativa de realização do login
    */    

    this.LoginFacebook = function(callback){
        FB.login(function(response){
            statusChangeCallback(response,callback);
        }, {scope: 'public_profile,email'});
    };

    /**
    * @ngdoc method
    * @name LogoutFacebook
    * @methodOf Joaninha.service:AuthenticationService
    * @description
    * Chama a função de logout disponibilizada pela api do facebook.<br/>
    * Embora implementado, não é utilizado no website em si.
    */  

    this.LogoutFacebook = function(){
       FB.logout(function(response){
          this.Logout();
       });
    };
  };
