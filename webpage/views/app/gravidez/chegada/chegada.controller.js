'use strict';

angular.module('app')
.controller('Chegada.Controller', Controller);

/**
* @ngdoc controller
* @name Joaninha.controller:Gravidez
* @requires Joaninha.service:httpRequestInterceptor
* @requires Joaninha.controller:Bebes
* @description
* Controller da view "app.gravidez.chegada".<br/> 
*/

function Controller($scope,$rootScope,$http,$localStorage,apiVersao){
	$rootScope.global_anterior = "app/gravidez/mamae";
	$rootScope.global_proxima = "app/gravidez/cantinho";
	var baby_id = $localStorage.baby.id;
	var params ={baby_id : baby_id};


    var formatDate = function(date){
        var time = new Date(date);
        var day = ('0'+time.getDate()).substr(-2);
        var month_tmp = parseInt(time.getMonth())+1;
        var month = String(month_tmp);
        if(month_tmp<10){
            month = '0'+month;
        };
        var year = time.getFullYear().toString();
        return day+'/'+month+'/'+year;
    };
};