<?php
       
    /**
    *  conexÃ£o com o banco de dados usando mysqli
    */
    class Db{
        private $con;
 
        // Faz a conexÃ£o com o banco assim que o objeto Ã© criado
        function __construct(){
            $this->con = mysqli_connect('mysql.conexaoinformatica.net.br', 'conexaoinforma10', 'n4abwzs2', 'conexaoinforma10');
            if (mysqli_connect_errno($this->con)) {
                echo "Problemas para conectar no banco. Verifique os dados!";
                die();
            }
        }
 
        // Faz a consulta sql
        public function query($sql){
            return mysqli_query($this->con, $sql);
        }
    }
 
?>