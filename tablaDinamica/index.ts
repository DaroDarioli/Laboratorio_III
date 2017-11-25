function unique(ar){
    var arr = [];
    for(var i = 0; i < ar.length; i++) {
        if(!arr.includes(ar[i])) {
            arr.push(ar[i]);
        }
    }
    return arr; 
}

////////////////////////////

$(document).ready(function () {

    peliculas = new Array<Pelicula>();

    CargarDeLocalStorage();
    CargarValoresSelect();
    select();
    
    $("#btnAgregar").click(AgregarPelicula);
    $("#btnSumar").click(SumarCostos);
 });
 
 let peliculas:Pelicula[];

 function SumarCostos()
 {
     let Total = peliculas.reduce(function(anterior,actual){
         return anterior + actual.Costo;
     },0);

    
    $("#resultado").val(Total);
 }


 
function array2Tabla(arr){
    //esta funcion asume que es una array de todo sobjetos iguales.
    if(!(arr.length>0)) return -1;

    let str="<tr>";

    $.each(arr[0], function( key2, value2 ) {
        str+="<th class='"+key2+"'>"+key2+"</th>";
    });
    str+="</tr>";

 //  console.log(str);


    $.each(arr, function( key, value ) {
        str+="<tr>";
        $.each(arr[key], function( key2, value2 ) {
           
            str+="<th class='"+key2+"'>"+value2+"</th>";           
    
          });
          str+="</tr>";

      });


    $("#tablaTitulares").html(str);


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


function filtrarTabla()
{
    
    let value = $("#selectMostrar").val();
    
    for(let i=0;i<peliculas.length;i++) {
        
        if(peliculas[i].Genero != value)
        {

        }
    
    }

}




 function AgregarPelicula() { 
    
    let tituloStr = String($("#peliculaStr").val());
    let paisStr = String($("#paisStr").val());
    let costoNmbr = Number($("#costoStr").val());

    let generoStr = String($("#mySelect").val());    
    
   
    let peli:Pelicula = new Pelicula(tituloStr,generoStr,paisStr,costoNmbr);
    
    peliculas.push(peli);
    GuardarEnLocalStorage();
}

function select()
{
   let arr2 = peliculas.map(function(item) {        
        return item.Genero; 
    });
    let str="";
  
    
    for(let i=0; i<unique(arr2).length; i++){
        str+="<option>"+unique(arr2)[i]+"</option>";
    }
    $("#selectMostrar").html(str);
    console.log(str);
}


function HarcodearContenido(){

    let peli1:Pelicula = new Pelicula("Trainspotting","Drama","Escocia",4);
    let peli2:Pelicula = new Pelicula("9 Reinas","Drama","Argentina",5);
    peliculas.push(peli1,peli2);
   
}

function CargarDeLocalStorage()
{  
    peliculas = JSON.parse(localStorage.getItem("peliculasAlmacenadas"));
    array2Tabla(peliculas);       
}

function clonarArray(arr){
    let nuevoArr=[]
    for(let i=0; i<arr.length;i++){
        nuevoArr.push(JSON.parse(JSON.stringify(arr[i])));
    }
    return nuevoArr;
}

function toggleGenero(){
 
    let gen= document.getElementById("genero_id").checked;
    let pais= document.getElementById("pais_id").checked;
    let arr=clonarArray(peliculas);


 /*   if(gen == false)
    {       
       arr2= arr.map(function(item) { 
            delete item.Genero; 
            return item; 
        });
    }else{
        arr2=arr;
    }


    if(pais == false)
    {
         arr2.map(function(item) { 
                delete item.Pais; 
                return item; 
            });         
    }

    array2Tabla(arr2); //muestro
    */


   console.log(gen,pais);

  for(let i=0;i<arr.length;i++) {
          if(!gen)   delete arr[i].Genero; //saco genero  
          if(!pais)   delete arr[i].Pais;       
    }
 
    
    array2Tabla(arr);

    

 


}

function GuardarEnLocalStorage()
{
    localStorage.setItem("peliculasAlmacenadas",JSON.stringify(peliculas)); 
    array2Tabla(peliculas);   
}


enum Genero { "Drama","Acción","Documental sobre María"}


function CargarValoresSelect()
{ 
    $("#mySelect").append(new Option("Drama", "1"));
    $("#mySelect").append(new Option("Accion", "2"));
    $("#mySelect").append(new Option("Documental", "2"));
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
 