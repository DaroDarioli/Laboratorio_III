<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once './composer/vendor/autoload.php';
require_once './clases/AccesoDatos.php';
require_once './clases/auto.php';
require_once './clases/empleado.php';

//require_once 'usuario.php';

//hide.memory_get_peak_usage
//eshost

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

$app = new \Slim\App(["settings" => $config]);


$app->get('[/]', function (Request $request, Response $response) {    
    $response->getBody()->write("GET => Bienvenido!!! ,a SlimFramework");
    return $response;

});

/*______________________________________________________________________*/


$app->group('/auto', function () {   
  
 
   // $this->delete('/{patente}', \auto::class . ':BorrarUno');
   // $this->get('/', \auto::class . ':traerTodos');  //verificar si borrar
  
  /*  $this->post('/Verificar',function (Request $request, Response $response) {
        
        $ArrayDeParametros = $request->getParsedBody();
        $vPatente = $ArrayDeParametros['patente'];
        $respuesta = auto::TraerUnAuto($vPatente)
        var_dump($respuesta);

    }); */
  
  //localhost/Estacionamiento_II/auto/
    $this->get('/', function (Request $request, Response $response) {
  
        $Autos=auto::TraerTodoLosAutos();        
        return $response->withJson($Autos, 200);       
 
    });  
 
    $this->post('/', function (Request $request, Response $response) {

        $ArrayDeParametros = $request->getParsedBody();
       
        $vPatente = $ArrayDeParametros['patente'];
        $vMarca = $ArrayDeParametros['marca'];
        $vColor = $ArrayDeParametros['color'];
        
        $miAuto = new auto();
        $miAuto->_patente = $vPatente;
        $miAuto->_marca = $vMarca;
        $miAuto->_color = $vColor;

        //Agregar validaciones
        $miAuto->InsertarElAutoParametros();   
        $response->getBody()->write("auto");    
        //agregar lo relativo a fotos
        return $response;
    
    });
    
         
    });


/*_______________________________________________________________________*/




$app->group('/empleado', function () {   
  
   // $this->get('/{mail}', \empleado::class . ':traerUno');
  
  $this->post('/login', \empleado::class . ':traerUno'); 



// $this->get('/{mail}/{clave}', \empleado::class . ':traerUno');
});
  


$app->run();