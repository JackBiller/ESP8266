<?php

class PadraoObjeto{
	public function get($nome_campo){
		return $this->$nome_campo;
	}

	public function set($valor , $nome_campo){
		$this->$nome_campo = $valor;
	}

	public function push($valor , $nome_array){
		array_push($this->$nome_campo, $valor);
	}
}

?>