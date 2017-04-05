"use strict";

angular
  .module('app')
  .service('PrinterService', Service);

/**
* @ngdoc service
* @name Joaninha.service:PrinterService
* @description
* Service responsável pela impressão das views "filhas" de 
* {@link Joaninha.controller:App app}.<br/>
* Para a correta impressão, a view deve se adaptar à tela, 
* portanto utilizar medidas relativas e media queries é essencial.
*/   

function Service() {

  	/**
    * @ngdoc method
    * @name print
    * @methodOf Joaninha.service:PrinterService
    * @description
    * Utiliza javascript puro para impressão das views em uma nova popup.<br/>
    * Ele copia o elemento base da página principal, assim sendo não precisa de 
    * alterações, caso a página mude de pasta.<br/>
    * Inicialmente carrega o conteúdo de estilo da view abstrata {@link Joaninha.controller:App app}.<br/>
    * Após, carrega o conteúdo completo, incluindo o estilo da view a ser impressa.<br/>
    * Em seguida, abre uma popup com a mesma dimensão da view e escreve 
    * nela um cabeçalho html, que contém o link para o carregamento do 
    * arquivo de estilo "css/style.css", acessível e utilizado por todo o site.<br/>
    * Assim que a popup termina de carregar, ela mesma chama a função window.print, que imprime a página.<br/>
    * Pode acontecer de o fundo das views não ser aparente na impressão, para corrigir isto deve-se habilitar
    * a impressão de backgrounds no próprio navegador, ou utilizar o Google Chrome, onde isto não é necessário. 
    */

  	this.print = function() {
      var base_href = document.getElementsByTagName('base')[0].href;
      if(base_href){
        var base = '<base href='+base_href+' target="_blank">';
      }

	  var printContents = document.getElementById('app-style').innerHTML;
	  printContents	+= document.getElementById('print-container').innerHTML;

	  var popupWin = window.open('', '_blank', 'width=800,height=630');
	  var html = 
    '<html>'+
    '   <head>'+
            base +
	  '     <link rel="stylesheet" type="text/css" href="css/style.css" />'+
	  '   </head>'+
    '   <body onload="window.print()">'
         + printContents + 
    '   </body>'+
    '</html>';
	  popupWin.document.open();
	  popupWin.document.write(html);
	  popupWin.document.close();
	}; 
};