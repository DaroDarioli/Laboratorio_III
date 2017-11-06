<?php

require_once 'AccesoDatos.php';

class empleado
{
    
    //_______________________Slim

    public function TraerUno($request, $response, $args) {
        
        $vector = $request->getParsedBody();

        $vMail = $vector['mail'];
        $vClave = $vector['clave'];
     
        $elEmpleado = empleado::TraerUnEmpleado($vMail,$vClave);
        $newResponse = $response->withJson($elEmpleado, 200);
     
        return $newResponse;
    }

    //_______________________Fin Slim

    
    public static function TraerUnEmpleado($vMail,$vClave){
    
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        //SELECT `id` FROM `empleados` WHERE `mail`='juanperez@gmail.com' AND `clave`='1234'
        $consulta =$objetoAccesoDato->RetornarConsulta("SELECT `id`, `nombre` FROM `empleados` WHERE  `mail` = '$vMail' AND `clave` = '$vClave'");
        $consulta->execute();      
        $eBuscado = $consulta->fetchObject('empleado');
        return $eBuscado; 

    }
}



?>