function unique(ar) {
    var arr = [];
    for (var i = 0; i < ar.length; i++) {
        if (!arr.includes(ar[i])) {
            arr.push(ar[i]);
        }
    }
    return arr;
}
////////////////////////////
$(document).ready(function () {
    peliculas = new Array();
    CargarDeLocalStorage();
    CargarValoresSelect();
    select();
    $("#btnAgregar").click(AgregarPelicula);
    $("#btnSumar").click(SumarCostos);
});
var peliculas;
function SumarCostos() {
    var Total = peliculas.reduce(function (anterior, actual) {
        return anterior + actual.Costo;
    }, 0);
    $("#resultado").val(Total);
}
function array2Tabla(arr) {
    //esta funcion asume que es una array de todo sobjetos iguales.
    if (!(arr.length > 0))
        return -1;
    var str = "<tr>";
    $.each(arr[0], function (key2, value2) {
        str += "<th class='" + key2 + "'>" + key2 + "</th>";
    });
    str += "</tr>";
    //  console.log(str);
    $.each(arr, function (key, value) {
        str += "<tr>";
        $.each(arr[key], function (key2, value2) {
            str += "<th class='" + key2 + "'>" + value2 + "</th>";
        });
        str += "</tr>";
    });
    $("#tablaTitulares").html(str);
    var gen = document.getElementById("genero_id").checked;
    var pais = document.getElementById("pais_id").checked;
    if (gen == false) {
        $(".Genero").hide();
    }
    else {
        $(".Genero").show();
    }
    if (pais == false) {
        $(".Pais").hide();
    }
    else {
        $(".Pais").show();
    }
}
function filtrarTabla() {
    var value = $("#selectMostrar").val();
    for (var i = 0; i < peliculas.length; i++) {
        if (peliculas[i].Genero != value) {
        }
    }
}
function AgregarPelicula() {
    var tituloStr = String($("#peliculaStr").val());
    var paisStr = String($("#paisStr").val());
    var costoNmbr = Number($("#costoStr").val());
    var generoStr = String($("#mySelect").val());
    var peli = new Pelicula(tituloStr, generoStr, paisStr, costoNmbr);
    peliculas.push(peli);
    GuardarEnLocalStorage();
}
function select() {
    var arr2 = peliculas.map(function (item) {
        return item.Genero;
    });
    var str = "";
    for (var i = 0; i < unique(arr2).length; i++) {
        str += "<option>" + unique(arr2)[i] + "</option>";
    }
    $("#selectMostrar").html(str);
    console.log(str);
}
function HarcodearContenido() {
    var peli1 = new Pelicula("Trainspotting", "Drama", "Escocia", 4);
    var peli2 = new Pelicula("9 Reinas", "Drama", "Argentina", 5);
    peliculas.push(peli1, peli2);
}
function CargarDeLocalStorage() {
    peliculas = JSON.parse(localStorage.getItem("peliculasAlmacenadas"));
    array2Tabla(peliculas);
}
function clonarArray(arr) {
    var nuevoArr = [];
    for (var i = 0; i < arr.length; i++) {
        nuevoArr.push(JSON.parse(JSON.stringify(arr[i])));
    }
    return nuevoArr;
}
function toggleGenero() {
    var gen = document.getElementById("genero_id").checked;
    var pais = document.getElementById("pais_id").checked;
    var arr = clonarArray(peliculas);
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
    console.log(gen, pais);
    for (var i = 0; i < arr.length; i++) {
        if (!gen)
            delete arr[i].Genero; //saco genero  
        if (!pais)
            delete arr[i].Pais;
    }
    array2Tabla(arr);
}
function GuardarEnLocalStorage() {
    localStorage.setItem("peliculasAlmacenadas", JSON.stringify(peliculas));
    array2Tabla(peliculas);
}
var Genero;
(function (Genero) {
    Genero[Genero["Drama"] = 0] = "Drama";
    Genero[Genero["Acci\u00F3n"] = 1] = "Acci\u00F3n";
    Genero[Genero["Documental sobre Mar\u00EDa"] = 2] = "Documental sobre Mar\u00EDa";
})(Genero || (Genero = {}));
function CargarValoresSelect() {
    $("#mySelect").append(new Option("Drama", "1"));
    $("#mySelect").append(new Option("Accion", "2"));
    $("#mySelect").append(new Option("Documental", "2"));
}
//______________Clase Pelicula
var Pelicula = /** @class */ (function () {
    function Pelicula(titulo, genero, pais, costo) {
        this.Titulo = titulo;
        this.Genero = genero;
        this.Pais = pais;
        this.Costo = costo;
    }
    return Pelicula;
}());
