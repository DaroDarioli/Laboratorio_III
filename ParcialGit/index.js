$(document).ready(function () {
    empleados = new Array();
    CargarValoresSelect();
    $("#btnAgregar").click(AgregarEmpleado);
    $("#btnSumar").click(SumarEdades);
    try {
        empleados = JSON.parse(localStorage["EmpleadosAlmacenados"]);
    }
    catch (e) {
        console.log(e);
    }
    ConstruirTabla(empleados);
    // carola 15hs; cv; dni; certificacion;
});
var foto_string = null;
var foto_to_modify = null;
var empleados;
function AgregarEmpleado() {
    var nombreStr = String($("#nombreStr").val());
    var apellidoStr = String($("#apellidoStr").val());
    var edadNmbr = Number($("#edadStr").val());
    var generoStr = String($("#mySelect").find('option:selected').text());
    var emp = new Empleado(nombreStr, apellidoStr, edadNmbr, foto_string, generoStr);
    foto_string = null;
    empleados.push(emp);
    GuardarEnLocalStorage();
    ConstruirTabla(empleados);
}
function GuardarEnLocalStorage() {
    localStorage.setItem("EmpleadosAlmacenados", JSON.stringify(empleados));
}
function SumarEdades() {
    var empl = new Array();
    var cantidad = empleados.length;
    var generoStr = $("#selectMostrar").val();
    if (generoStr != "Todos") {
        empl = empleados.filter(function (peliculas) {
            return peliculas.Genero === generoStr;
        });
    }
    else {
        empl = empleados;
    }
    var Total = empl.reduce(function (anterior, actual) {
        return anterior + actual.Edad;
    }, 0);
    $("#resultado").val(Total / cantidad);
}
function ConstruirTabla(arr) {
    var str = "<thead><tr>";
    $.each(arr[0], function (key2, value2) {
        str += "<th class='" + key2 + "'>" + key2 + "</th>";
        console.log(key2);
    });
    str += "<th>Modificar</th><th>Eliminar</th></tr></thead><tbody>";
    var cont = 0;
    $.each(arr, function (key, value) {
        str += "<tr class='" + value.Genero + "'>";
        $.each(arr[key], function (key2, value2) {
            if (key2 != "Imagen") {
                str += "<td class='" + key2 + "'>" + value2 + "</td>";
            }
            else {
                str += "<td class='Imagen'><img src='" + value2 + "'></td>";
            }
        });
        str += "<td><button class='borrar' onclick='Borrar(" + cont + ")'>Borrar</button></td>";
        str += "<td><button class='modificar' onclick='Modificar(" + cont + ")'>Modificar</button></td>";
        str += "</tr>";
        cont++;
    });
    str += "</tbody>";
    $("#tablaEmpleados").html(str);
    var generoStr = $("#selectMostrar").val();
    if ((generoStr != "Hombre") && (generoStr != "Todos")) {
        $(".Hombre").hide();
    }
    else {
        $(".Hombre").show();
    }
    if ((generoStr != "Mujer") && (generoStr != "Todos")) {
        $(".Mujer").hide();
    }
    else {
        $(".Mujer").show();
    }
    if ($("#genero_id").is(":checked")) {
        $(".Genero").show();
    }
    else {
        $(".Genero").hide();
    }
}
function Borrar(i) {
    empleados.splice(i, 1);
    ConstruirTabla(empleados);
    GuardarEnLocalStorage();
}
function Modificar(index) {
    $(".modulo").show();
    var auxiliar = index;
    $("#btnModificar").click(function () {
        var nombre = String($("#nombre").val());
        var apellido = String($("#apellido").val());
        var edad = Number($("#edad").val());
        var sexo = String($("#sexo").val());
        var aux = new Empleado(nombre, apellido, edad, foto_to_modify, sexo);
        console.log(aux);
        for (var i = 0; i < empleados.length; i++) {
            if (index = i) {
                empleados.splice(auxiliar, auxiliar + 1, aux);
                break;
            }
        }
        $(".modulo").hide();
        ConstruirTabla(empleados);
        foto_to_modify = null;
    });
}
function CargarValoresSelect() {
    var Genero;
    (function (Genero) {
        Genero[Genero["Hombre"] = 0] = "Hombre";
        Genero[Genero["Mujer"] = 1] = "Mujer";
    })(Genero || (Genero = {}));
    $.each(Genero, function (clave, valor) {
        if (isNaN(parseInt(clave))) {
            $("#mySelect").append(new Option(clave));
            $("#selectMostrar").append(new Option(clave));
        }
    });
}
function encodeImageFileAsURL() {
    var filesSelected = document.getElementById("inputFileToLoad").files;
    if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];
        var fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {
            var srcData = fileLoadedEvent.target.result;
            foto_string = srcData;
        };
        fileReader.readAsDataURL(fileToLoad);
    }
}
function encodeImage() {
    var filesSelected = document.getElementById("inputFileToModify").files;
    if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];
        var fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {
            var srcData = fileLoadedEvent.target.result;
            foto_to_modify = srcData;
        };
        fileReader.readAsDataURL(fileToLoad);
    }
}
var Persona = /** @class */ (function () {
    function Persona(nombre, apellido, edad, imagen) {
        this.Nombre = nombre;
        this.Apellido = apellido;
        this.Edad = edad;
        this.Imagen = imagen;
    }
    return Persona;
}());
var Empleado = /** @class */ (function () {
    function Empleado(nombre, apellido, edad, imagen, genero) {
        this.Nombre = nombre;
        this.Apellido = apellido;
        this.Edad = edad;
        this.Imagen = imagen;
        this.Genero = genero;
    }
    return Empleado;
}());
/*
Dario
te confirmamos la entrevista mañana a las 15 hs en 25 de mayo 33, con dni, cv impreso y fotocopia del dni
Debes anunciarte por Carola
Muchas Gracias
Maria

*/ 
