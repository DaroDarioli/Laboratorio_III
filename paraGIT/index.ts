$(document).ready(function () {

    peliculas = new Array<Pelicula>();

    CargarDeLocalStorage();
    CargarValoresSelect();
    CargarSelect();
    array2Tabla(peliculas);
    
    $("#btnAgregar").click(AgregarPelicula);
    $("#btnSumar").click(SumarCostos);
 });
 
 let peliculas:Pelicula[];
 let opcion:string;
 

 function SumarCostos()
 {
     let Total = peliculas.reduce(function(anterior,actual){
         return anterior + actual.Costo;
     },0);
    
    $("#resultado").val(Total);
 }

 
function array2Tabla(arr){
        
    let generoStr = String($('#selectMostrar option:selected').text()); 
    
    if(!(arr.length>0)) return -1;

    let str="<tr>";

    $.each(arr[0], function( key2, value2 ) {
        str+="<th class='"+key2+"'>"+key2+"</th>";
    });
    str+="</tr>";

 // ________Cuerpo de la Tabla

    for(let i = 0 ; i < arr.length; i++)    {
       
    
       if(arr[i].Genero != generoStr && generoStr != "Todos") continue;
       str+="<tr><td class='Titulo'>"+arr[i].Titulo+"</td><td class='Genero'>"+arr[i].Genero+"</td><td class='Pais'>"+arr[i].Pais+"</td><td class='Costo'>"+arr[i].Costo+"</td></tr>";

    }
 
    $("#tablaPeliculas").html(str);


    let gen= document.getElementById("genero_id").checked;
    let pais= document.getElementById("pais_id").checked;

   if(gen == false)
   {
    $(".Genero").hide()
   }else{
    $(".Genero").show()
   }
   if(pais == false)
   {
    $(".Pais").hide()
   }else{
    $(".Pais").show()
   }
    
}


 function AgregarPelicula() { 
    
    let tituloStr = String($("#peliculaStr").val());
    let paisStr = String($("#paisStr").val());
    let costoNmbr = Number($("#costoStr").val());

    let generoStr = String($("#mySelect").find('option:selected').text());    
    
   
    let peli:Pelicula = new Pelicula(tituloStr,generoStr,paisStr,costoNmbr);
    
    peliculas.push(peli);
    GuardarEnLocalStorage();
}

function CargarSelect()
{
   let arr2 = peliculas.map(function(item) {        
        return item.Genero; 
    });
    let str=""; 
    str+="<option>Todos</option>"; 
    
    for(let i=0; i<FiltarUnico(arr2).length; i++){
        str+="<option>"+FiltarUnico(arr2)[i]+"</option>";
    }
    $("#selectMostrar").html(str);
    console.log(str);
}


function HarcodearContenido(){

    let peli1:Pelicula = new Pelicula("Trainspotting","Drama","Escocia",4);
    let peli2:Pelicula = new Pelicula("9 Reinas","Drama","Argentina",5);
    peliculas.push(peli1,peli2);
    GuardarEnLocalStorage();
}

function CargarDeLocalStorage()
{  
    peliculas = JSON.parse(localStorage.getItem("peliculasAlmacenadas"));
    array2Tabla(peliculas);       
}


function GuardarEnLocalStorage()
{
    localStorage.setItem("peliculasAlmacenadas",JSON.stringify(peliculas)); 
    array2Tabla(peliculas);   
}

enum Genero { "Drama","Acción","Documental"}


function CargarValoresSelect()
{ 
    enum Genero { "Drama","Acción","Documental"}
   
    $.each(Genero, function(clave,valor) {
        
     if ( isNaN( parseInt(clave)) ){
        $("#mySelect").append(new Option(clave));         
     }
         
    });

}

function FiltarUnico(ar){
    var arr = [];
    for(var i = 0; i < ar.length; i++) {
        if(!arr.includes(ar[i])) {
            arr.push(ar[i]);
        }
    }
    return arr; 
}


 

//______________Clase Pelicula
 
 class Pelicula{
     
     Titulo:string;
     Genero:string;
     Pais:string;
     Costo:number;
     Anio:number;
    
     constructor(titulo?:string,genero?:string,pais?:string,costo?:number)
     {
         this.Titulo = titulo;
         this.Genero = genero;
         this.Pais = pais;
         this.Costo = costo;
       
     }
 
 }
 