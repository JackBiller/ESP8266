<html>
	<meta charset="utf-8">

<?php

try {
    $servidor = "SUPORTECDI\SQL2014";
    $instancia = "sql2014";
    // $instancia = "SQL2014";
    // $porta = 1433;
    $porta = 50207;
    $database = "CasaDuarte";
    $usuario = "sa";
    $senha = "teste";
    
    $conexao = new PDO( "sqlsrv:Server={$servidor}\\{$instancia},{$porta};Database={$database}", $usuario, $senha, array(PDO::SQLSRV_ENCODING_UTF8  => 1));
} catch ( PDOException $e ) {
    echo "Drivers disponiveis: " . implode( ",", PDO::getAvailableDrivers() );
    echo "\nErro: " . $e->getMessage();
    exit;
}


echo "<table border='1'>";

$sql = 'SELECT TOP 50 CODIGO, CPF_CGC, RAZAOSOCIAL 
		FROM CLIEFORNEC 
		WHERE RAZAOSOCIAL LIKE \'%Ã%\' ';

$resultado = $conexao->query($sql);

foreach ($resultado as $row) {
	echo "
	<tr>
		<td>" . $row['CODIGO']		. "</td>
		<td>" . $row['CPF_CGC']		. "</td>
		<td>" . $row['RAZAOSOCIAL']	. "</td>
	</tr>";
}

echo "</table>";





// $query = $conexao->prepare( "select @@version" );
// $query->execute();
// $resultado = $query->fetchAll();

// echo $resultado['0']['0'];

unset( $conexao );
// unset( $query ); 