$(document).ready(function () {

    //peliculas = new Array<Pelicula>();

    peliculas = [];
    CargarDeLocalStorage();
    CargarValoresSelect();
    CargarSelect();

    $("#btnAgregar").click(AgregarPelicula);
    $("#btnSumar").click(SumarCostos);
});

//let peliculas:Pelicula[];


function SumarCostos() {
        
    generoStr = $("#selectMostrar").val();
                
        if(generoStr != "Todos"){

                var seleccion   = peliculas.filter(function(peliculas){
                return peliculas.Genero === generoStr;
            });
        }
        else{

            var seleccion = peliculas;

        }    
        var Total =  seleccion.reduce(function (anterior, actual) {
            return parseInt(anterior) + parseInt(actual.Costo);
        }, 0);

    $("#resultado").val(Total);
}


function ArrayATabla(arr) {

    if (!(arr.length > 0)) return -1;

    //__________Cargo Select _____________
    
    generoStr = $("#selectMostrar").val();
    
    let str = "<tr>";

    $.each(arr[0], function (key, value) {
        str += "<th class='" + key + "'>" + key + "</th>";
    });
    str += "<th>Eliminar</th></tr>";

    // ________Cuerpo de la Tabla

    for (let i = 0; i < arr.length; i++) {

        if ((generoStr != "Todos") && (arr[i].Genero != generoStr)) continue;                                                                                                                                

        str += "<tr><td class='Titulo'>" + arr[i].Titulo + "</td><td class='Genero'>" + arr[i].Genero + "</td><td class='Pais'>" + arr[i].Pais + "</td><td class='Costo'>" + arr[i].Costo + "</td><td><button class='borrar' onclick='Borrar("+i+")'>Borrar</button></td></tr>";
    }
    $("#tablaPeliculas").html(str);


    let gen = document.getElementById("genero_id").checked;
    let pais = document.getElementById("pais_id").checked;

    if (gen == false) {

        $(".Genero").hide()

    } else {

        $(".Genero").show()
    }
    if (pais == false) {

        $(".Pais").hide()

    } else {

        $(".Pais").show()
    }

}


function Borrar(i){
    peliculas.splice(i,1);
    ArrayATabla(peliculas);
    GuardarEnLocalStorage();
}


function AgregarPelicula() {

    let tituloStr = $("#peliculaStr").val();
    let paisStr = $("#paisStr").val();
    let costoNmbr = $("#costoStr").val();
    let generoStr = $("#mySelect").val();

    
    if (tituloStr == "") {

         $("#peliculaStr").addClass('error');
        alert("Falto cargar el usuario!!");
    }
    else if (paisStr == "") {
        $("#paisStr").className = "error";
        alert("Faltó cargar la constraseña!!");
    }
    else {
        $("#peliculaStr").removeClass('error');

    let peli = new Pelicula(tituloStr, generoStr, paisStr, costoNmbr);

    peliculas.push(peli);
    GuardarEnLocalStorage();
    }
}

function CargarSelect() {
    let arr2 = peliculas.map(function (item) {
        return item.Genero;
    });
    let str = "";
    str += "<option>Todos</option>";

    for (let i = 0; i < FiltarUnico(arr2).length; i++) {
        str += "<option>" + FiltarUnico(arr2)[i] + "</option>";
    }
    $("#selectMostrar").html(str);

}


function HarcodearContenido() {

    let peli1 = new Pelicula("Trainspotting", "Drama", "Escocia", 4);
    let peli2 = new Pelicula("9 Reinas", "Drama", "Argentina", 5);
    peliculas.push(peli1, peli2);
    GuardarEnLocalStorage();
}

function CargarDeLocalStorage() {
    peliculas = JSON.parse(localStorage.getItem("peliculasAlmacenadas"));
    ArrayATabla(peliculas);
}


function GuardarEnLocalStorage() {
    localStorage.setItem("peliculasAlmacenadas", JSON.stringify(peliculas));
    ArrayATabla(peliculas);
}



function CargarValoresSelect() {

    var Genero = ["Drama", "Acción", "Documental"];

    var str = "";

    $.each(Genero, function (clave, valor) {

        str += "<option>" + valor + "</option>";            

    });

    $("#mySelect").html(str);

}

//enum Genero { "Drama","Acción","Documental"} -->type

/*function CargarValoresSelectType()
{ 
    enum Genero { "Drama","Acción","Documental"}
   
    $.each(Genero, function(clave,valor) {
        
     if ( isNaN( parseInt(clave)) ){
        $("#mySelect").append(new Option(clave));         
     }
         
    });

}*/

function FiltarUnico(vector) {

    var vec = [];

    for (var i = 0; i < vector.length; i++) {

        if (!vec.includes(vector[i])) {

            vec.push(vector[i]);
        }
    }
    return vec;
}


function Pelicula(titulo, genero, pais, costo) {
    this.Titulo = titulo;
    this.Genero = genero;
    this.Pais = pais;
    this.Costo = costo;

}



//______________Clase Pelicula

/*
 
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
 */