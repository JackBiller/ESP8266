<?php  

//connect to the database 
// $connect = mysql_connect("localhost","username","password"); 
// mysql_select_db("mydatabase",$connect); //select the table 
// 
$sql = "";
$colunas = " (";
$dados = "";
$dadosLinha = "";

$row = 0;
if (($handle = fopen("Pasta1.csv", "r")) !== FALSE) {
	// echo $handle;
	// $conteudo = fread ($handle, 8000);
	// echo $conteudo;
	while (($data = fgetcsv($handle, 8000, "\t")) !== FALSE) {
		$num = count($data);
		// echo $num."<br>";
		if($row == 0){
			// $num = count($data);
			for ($c=0; $c < $num; $c++) {
				$dadosLinha = explode(";", $data[$c]);
				echo implode(" - ", $dadosLinha);
				// echo $dadosLinha[0];
				for ($j=0; $j < sizeof($dadosLinha); $j++) { 
					$colunas .= ($colunas == " (" ?  "`" . str_replace(" ", "", $dadosLinha[$j]) . "`" : ", `" . str_replace(" ", "", $dadosLinha[$j]) . "`");
				}
				$colunas .= ")";
			} 
		} else {
			$dados = "";
			// $num = count($data);
			for ($c=0; $c < $num; $c++) {
				$dadosLinha = explode(";", $data[$c]);
				echo implode(" - ", $dadosLinha)."<br>";

				for ($j=0; $j < sizeof($dadosLinha); $j++) { 
					$dados .= ($dados == "" ?  " ('" . str_replace(",", ".", $dadosLinha[$j]). "'" : ", '" . str_replace(",", ".", $dadosLinha[$j]) . "'");
				}
				$sql .= "
INSERT INTO `TABELA` $colunas VALUES $dados);";
			}
		}
			// $num = count($data);
			// echo "<p> $num campos na linha $row: <br /></p>\n";
			// for ($c=0; $c < $num; $c++) {
				// echo $data[$c] . "<br />\n";
			// }
			$row++;
	}
	fclose($handle);
	echo str_replace("\n", "<br>", $sql);
}

/*

$importer = new CsvImporter("Pasta2.txt",true); 
while($data = $importer->get(2000)) 
{ 
print_r($data); 
} 





class CsvImporter { 
	private $fp; 
	private $parse_header; 
	private $header; 
	private $delimiter; 
	private $length; 
	//-------------------------------------------------------------------- 
	function __construct($file_name, $parse_header=false, $delimiter="\t", $length=8000) 
	{ 
		$this->fp = fopen($file_name, "r"); 
		$this->parse_header = $parse_header; 
		$this->delimiter = $delimiter; 
		$this->length = $length; 
		// $this->lines = $lines; 

		if ($this->parse_header) { 
			$this->header = fgetcsv($this->fp, $this->length, $this->delimiter); 
		}
	} 
	//-------------------------------------------------------------------- 
	function __destruct() 
	{ 
		if ($this->fp) 
		{ 
			fclose($this->fp); 
		} 
	} 
	//-------------------------------------------------------------------- 
	function get($max_lines = 0) { 
		//if $max_lines is set to 0, then get all the data 
		$data = array(); 

		if ($max_lines > 0) 
			$line_count = 0; 
		else 
			$line_count = -1; // so loop limit is ignored 

		while ($line_count < $max_lines && ($row = fgetcsv($this->fp, $this->length, $this->delimiter)) !== FALSE) 
		{ 
			if ($this->parse_header) 
			{ 
				foreach ($this->header as $i => $heading_i) 
				{ 
					$row_new[$heading_i] = $row[$i]; 
				} 
				$data[] = $row_new; 
			} 
			else 
			{ 
				$data[] = $row; 
			} 

			if ($max_lines > 0) 
				$line_count++; 
		} 
		return $data; 
	} 
	//-------------------------------------------------------------------- 
} */

?>

<!-- 
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> 
<html xmlns="http://www.w3.org/1999/xhtml"> 
<head> 
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" /> 
<title>Import a CSV File with PHP & MySQL</title> 
</head> 

<body> 

<?php // if (!empty($_GET[success])) { echo "<b>Your file has been imported.</b><br><br>"; } //generic success notice ?> 

<form action="" method="post" enctype="multipart/form-data" name="form1" id="form1"> 
  Choose your file: <br /> 
  <input name="csv" type="file" id="csv" /> 
  <input type="submit" name="Submit" value="Submit" /> 
</form> 

</body> 
</html> -->