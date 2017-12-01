$(document).ready(function () {

    empleados = new Array<Empleado>();
    
    CargarValoresSelect();
   
    $("#btnAgregar").click(Agregar);
    $("#btnSumar").click(Sumar);
    $("#modificarModulo").click(ModificarModulo);
   
    try {
        empleados = JSON.parse(localStorage["EmpleadosAlmacenados"]);
    } catch (e) {
        console.log(e)
    }
    ConstruirTabla(empleados); 
  
 });
 
 let foto_string:string|null = null;
 let foto_to_modify:string|null = null;
 let empleados:Empleado[];
 
 function Agregar() { 
    
    let nombreStr = String($("#nombreStr").val());
    let apellidoStr = String($("#apellidoStr").val());
    let edadNmbr = Number($("#edadStr").val());

    if((nombreStr == "") || (apellidoStr == "")||(edadNmbr == null))
    {
        alert("Por favor ingresar todos los valores!");
    }
    else{

        let generoStr = String($("#mySelect").find('option:selected').text());
        
        let emp:Empleado = new Empleado(nombreStr,apellidoStr,edadNmbr,foto_string,generoStr); 
        foto_string = null;
        empleados.push(emp); 
        GuardarEnLocalStorage();
        $("#nombreStr").val("");
        $("#apellidoStr").val("");
        $("#edadStr").val("");
        ConstruirTabla(empleados); 
       
    }

    
}

function GuardarEnLocalStorage()
{    
    localStorage.setItem("EmpleadosAlmacenados",JSON.stringify(empleados));     
}

function Sumar()
{
    let empl:Empleado[] = new Array<Empleado>();
    
    let cantidad = empleados.length;

    let generoStr = $("#selectMostrar").val();
        
    if(generoStr != "Todos"){

        empl  = empleados.filter(function(peliculas){
        return peliculas.Genero === generoStr;
    });
    }
    else{
        empl = empleados;
    }       
    let Total = empl.reduce(function(anterior,actual){
        return anterior + actual.Edad;
    },0);
   
   $("#resultado").val(Total/cantidad);

}

 
function ConstruirTabla(arr){
    
    if(arr.length < 1)
    {
        $("#tablaEmpleados").html("");
    }
    else{   
   
   
    let str="<thead><tr>";
    $.each(arr[0], function( key2, value2 ) {
        str+="<th class='"+key2+"'>"+key2+"</th>";
        console.log(key2);
    });
    str+="<th>Borrar</th><th>Modificar</th></tr></thead><tbody>";
    let cont=0;
    $.each(arr, function( key, value ) {
        str+="<tr class='"+value.Genero+"'>";
        
        $.each(arr[key], function( key2, value2 ) {
            if(key2 !="Imagen"){
                str+="<td class='"+key2+"'>"+value2+"</td>";           
            }else{
                str+="<td class='Imagen'><img src='"+value2+"'></td>";           
            }
    
          });

        str+="<td><button class='borrar' onclick='Borrar("+cont+")'>Borrar</button></td>";
        str+="<td><button class='modificar' onclick='Modificar("+cont+")'>Modificar</button></td>";
        str+="</tr>";
        cont++;
      });
      str+="</tbody>";

    $("#tablaEmpleados").html(str);
   
    let generoStr = $("#selectMostrar").val();
     
    if((generoStr != "Hombre") &&( generoStr != "Todos") ){$(".Hombre").hide();}
    else{$(".Hombre").show();}

    if((generoStr != "Mujer") &&( generoStr != "Todos") ){$(".Mujer").hide(); }
    else{$(".Mujer").show();}

    if ($("#genero_id").is(":checked")) {$(".Genero").show();}
    else {$(".Genero").hide()}

    if ($("#edad_id").is(":checked")) {$(".Edad").show();} 
    else {$(".Edad").hide()}

    if ($("#apellido_id").is(":checked")) {$(".Apellido").show();} 
    else {$(".Apellido").hide()}

    }

}

function Borrar(i){    
    
    empleados.splice(i,1);
    ConstruirTabla(empleados);    
    GuardarEnLocalStorage();
}

function ModificarModulo(){

   let auxiliar:number = Number($("#idm").val());
   let nombre = String($("#nombrem").val());
   let apellido = String($("#apellidom").val());
   let edad = Number($("#edadm").val());
   let sexo = String($("#sexo").val());
 
   let aux:Empleado = new Empleado(nombre,apellido,edad,foto_to_modify,sexo); 
 
    for (let i = 0; i < empleados.length; i++) {       
           if(auxiliar = i){            
               empleados.splice(auxiliar,auxiliar+ 1,aux);
               break;                 
           }       
       } 
       ConstruirTabla(empleados);
       foto_to_modify =  null;
}



function Modificar(index) {
       
    $(".modulo").show();
   

    let auxiliar:number = index;
     
    $("#btnModificar").click(function(){

    let nombre = String($("#nombre").val());
    let apellido = String($("#apellido").val());
    let edad = Number($("#edad").val());
    let sexo = String($("#sexo").val());

    let aux:Empleado = new Empleado(nombre,apellido,edad,foto_to_modify,sexo);
    
    
    for (let i = 0; i < empleados.length; i++) {
        
            if(index = i){
             
                empleados.splice(auxiliar,auxiliar+ 1,aux);
                break;
                  
            }
        
        } 
        $(".modulo").hide();
        ConstruirTabla(empleados);
        foto_to_modify =  null;
    });

    
}


function CargarValoresSelect()
{ 
    enum Genero { "Hombre","Mujer"}
     
    $.each(Genero, function(clave,valor) {
        
     if ( isNaN( parseInt(clave)) ){
        $("#mySelect").append(new Option(clave));  
        $("#selectMostrar").append(new Option(clave)); 
        $("#SelectModificar").append(new Option(clave));
        $("#SelectModificarM").append(new Option(clave));                     
     }
         
    });

}

function encodeImageFileAsURL() {
    var filesSelected = document.getElementById("inputFileToLoad").files;
    if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];
        var fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent) {
        var srcData = fileLoadedEvent.target.result;
        foto_string = srcData;
        }
        fileReader.readAsDataURL(fileToLoad);
    }
}

function encodeImage() {
    var filesSelected = document.getElementById("inputFileToModify").files;
    if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];
        var fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent) {
        var srcData = fileLoadedEvent.target.result;
        foto_to_modify = srcData;
        }
        fileReader.readAsDataURL(fileToLoad);
    }
}


 
 class Persona{

    Nombre:string;
    Apellido:string;
    Edad:number;    
    Imagen:string;

    public constructor(nombre?:string,apellido?:string,edad?:number,imagen?:string)
    {
        this.Nombre = nombre;
        this.Apellido = apellido;
        this.Edad= edad; 
        this.Imagen = imagen;
    }

 }

 class Empleado{

    Genero:string;
    
    Nombre:string;
    Apellido:string;
    Edad:number;    
    Imagen:string;

    
    public constructor(nombre?:string,apellido?:string,edad?:number,imagen?:string,genero?:string)
    {
        this.Nombre = nombre;
        this.Apellido = apellido;
        this.Edad= edad;         
        this.Imagen = imagen
        this.Genero = genero;
        
    }
    
}
 

/*
Dario
te confirmamos la entrevista mañana a las 15 hs en 25 de mayo 33, con dni, cv impreso y fotocopia del dni
Debes anunciarte por Carola
Muchas Gracias
Maria

*/