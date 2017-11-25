$(document).ready(function () {
    peliculas = new Array();
    CargarDeLocalStorage();
    CargarValoresSelect();
    CargarSelect();
    array2Tabla(peliculas);
    $("#btnAgregar").click(AgregarPelicula);
    $("#btnSumar").click(SumarCostos);
});
var peliculas;
var opcion;
function SumarCostos() {
    var Total = peliculas.reduce(function (anterior, actual) {
        return anterior + actual.Costo;
    }, 0);
    $("#resultado").val(Total);
}
function array2Tabla(arr) {
    var generoStr = String($('#selectMostrar option:selected').text());
    if (!(arr.length > 0))
        return -1;
    var str = "<tr>";
    $.each(arr[0], function (key2, value2) {
        str += "<th class='" + key2 + "'>" + key2 + "</th>";
    });
    str += "</tr>";
    // ________Cuerpo de la Tabla
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].Genero != generoStr && generoStr != "Todos")
            continue;
        str += "<tr><td class='Titulo'>" + arr[i].Titulo + "</td><td class='Genero'>" + arr[i].Genero + "</td><td class='Pais'>" + arr[i].Pais + "</td><td class='Costo'>" + arr[i].Costo + "</td></tr>";
    }
    $("#tablaPeliculas").html(str);
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
function AgregarPelicula() {
    var tituloStr = String($("#peliculaStr").val());
    var paisStr = String($("#paisStr").val());
    var costoNmbr = Number($("#costoStr").val());
    var generoStr = String($("#mySelect").find('option:selected').text());
    var peli = new Pelicula(tituloStr, generoStr, paisStr, costoNmbr);
    peliculas.push(peli);
    GuardarEnLocalStorage();
}
function CargarSelect() {
    var arr2 = peliculas.map(function (item) {
        return item.Genero;
    });
    var str = "";
    str += "<option>Todos</option>";
    for (var i = 0; i < FiltarUnico(arr2).length; i++) {
        str += "<option>" + FiltarUnico(arr2)[i] + "</option>";
    }
    $("#selectMostrar").html(str);
    console.log(str);
}
function HarcodearContenido() {
    var peli1 = new Pelicula("Trainspotting", "Drama", "Escocia", 4);
    var peli2 = new Pelicula("9 Reinas", "Drama", "Argentina", 5);
    peliculas.push(peli1, peli2);
    GuardarEnLocalStorage();
}
function CargarDeLocalStorage() {
    peliculas = JSON.parse(localStorage.getItem("peliculasAlmacenadas"));
    array2Tabla(peliculas);
}
function GuardarEnLocalStorage() {
    localStorage.setItem("peliculasAlmacenadas", JSON.stringify(peliculas));
    array2Tabla(peliculas);
}
var Genero;
(function (Genero) {
    Genero[Genero["Drama"] = 0] = "Drama";
    Genero[Genero["Acci\u00F3n"] = 1] = "Acci\u00F3n";
    Genero[Genero["Documental"] = 2] = "Documental";
})(Genero || (Genero = {}));
function CargarValoresSelect() {
    var Genero;
    (function (Genero) {
        Genero[Genero["Drama"] = 0] = "Drama";
        Genero[Genero["Acci\u00F3n"] = 1] = "Acci\u00F3n";
        Genero[Genero["Documental"] = 2] = "Documental";
    })(Genero || (Genero = {}));
    $.each(Genero, function (clave, valor) {
        if (isNaN(parseInt(clave))) {
            $("#mySelect").append(new Option(clave));
        }
    });
}
function FiltarUnico(ar) {
    var arr = [];
    for (var i = 0; i < ar.length; i++) {
        if (!arr.includes(ar[i])) {
            arr.push(ar[i]);
        }
    }
    return arr;
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
