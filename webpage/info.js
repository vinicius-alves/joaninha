/**
* @ngdoc overview
* @name index
* @description
* <img src="../webpage/imgs/logo.png" style="height:250px; margin-left:200px;">
* <h1 style="text-align:center">Documentação do site Joaninha</h1>
* O site é um complemento ao aplicativo 
* <a href="https://play.google.com/store/apps/details?id=hbsoft.com.br.joaninha&hl=pt_BR">joaninha</a>, 
* permitindo aos usuários imprimir guias a serem utilizados
* como álbuns físicos de seus bêbes cadastrados.<br/> 
* Ele é um SPA (single page application) que utiliza Angularjs 1.6.1.
* Há uma estrutura de views e controllers.<br/> 
* Com exceção de "árvore" e "public", todas as views possuem um controller próprio.<br/> 
* Há três views abstratas "app","public" e "árvore". Estas não são acessíveis e são utilizadas como um
* template de suporte para as demais views da aplicação.<br/> 
* Em relação ao estilo, há um arquivo style.css na pasta css disponível para toda a aplicação,
* porém cada view tem seu estilo específico definido no próprio arquivo html, e algumas herdam estilos
* de views abstratas.<br/><br/>
*<section>
* Desenvolvido por Vinicius A. Alves em Fevereiro de 2017. <br/>
* Contato: vinicius.alves at poli ufrj br. <br/>
* Via Fluxo Consultoria. </section>
*/

/**
* @ngdoc property
* @name Joaninha
* @description
* <h1>Observações Gerais</h1><br/>
* <h2>Gerando a Documentação:</h2>
* Para gerar a documentação são necessários os pacotes Grunt e NPM.<br/>
* Após a instalação destes, na pasta em que estão os arquivos Gruntfile e package
* execute os comandos npm install, e grunt. Conforme abaixo:<br/><br/>
* sudo apt-get install grunt-cli<br/>
* sudo apt-get install npm<br/>
* npm install<br/>
* grunt<br/>
*<br/>
*<h2>Servidor:</h2>
* O conjunto de páginas só funciona corretamente enquanto no servidor.</br>
* Todo o conteúdo do código deve ser mantido na pasta "site" do servidor.
*/