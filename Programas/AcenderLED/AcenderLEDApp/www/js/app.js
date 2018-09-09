var app = angular.module('myApp',['ngRoute']);

app.config(function($routeProvider)
{
  $routeProvider

  .when('/home', {
   templateUrl : 'views/home.htm',
})

  .when('/cadastrar', {
   templateUrl : 'views/cadastrar.htm',
})

  .when('/cadastro', {
   templateUrl : 'views/cadastro.htm',
})



  .when('/editar_cadastro', {
   templateUrl : 'views/editar_cadastro.htm',
})


   // Caminhões
   .when('/jogo', {
      templateUrl : 'views/jogo.htm',
   })

   .when('/jogo_da_velha', {
      templateUrl : 'views/jogo_da_velha.htm',
   })
   
   .when('/lista', {
      templateUrl : 'views/lista.htm',
   })


   // Terceiros
   .when('/login', {
      templateUrl : 'views/login.htm',
   })
   
   .otherwise ({ redirectTo: '/home' });
});