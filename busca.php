<?php
   
    require "Db.class.php";
    $db = new Db();
 
    $sqlBusca = $_POST['sql'];// Pega o cÃ³digo sql enviado pelo aplicativo
        //  $sqlBusca = ("select * from cliente");
    $resultado = $db->query($sqlBusca);
   
    // Transforma o resultado da consulta em um array associativo
    while ($array = mysqli_fetch_assoc($resultado)) {
        $dados[] = $array;
    }
        if (empty($dados)){
           echo "^";
        }
           else {
               echo json_encode($dados);// Retorna o resultado da consulta no formato JSON
 
    }
?>