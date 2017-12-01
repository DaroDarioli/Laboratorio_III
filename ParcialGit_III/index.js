$(document).ready(function () {
    empleados = new Array();
    CargarValoresSelect();
    $("#btnAgregar").click(Agregar);
    $("#btnSumar").click(Sumar);
    $("#modificarModulo").click(ModificarModulo);
    try {
        empleados = JSON.parse(localStorage["EmpleadosAlmacenados"]);
    }
    catch (e) {
        console.log(e);
    }
    ConstruirTabla(empleados);
});
var foto_string = null;
var foto_to_modify = null;
var empleados;
function Agregar() {
    var nombreStr = String($("#nombreStr").val());
    var apellidoStr = String($("#apellidoStr").val());
    var edadNmbr = Number($("#edadStr").val());
    if ((nombreStr == "") || (apellidoStr == "") || (edadNmbr == null)) {
        alert("Por favor ingresar todos los valores!");
    }
    else {
        var generoStr = String($("#mySelect").find('option:selected').text());
        var emp = new Empleado(nombreStr, apellidoStr, edadNmbr, foto_string, generoStr);
        foto_string = null;
        empleados.push(emp);
        GuardarEnLocalStorage();
        $("#nombreStr").val("");
        $("#apellidoStr").val("");
        $("#edadStr").val("");
        ConstruirTabla(empleados);
    }
}
function GuardarEnLocalStorage() {
    localStorage.setItem("EmpleadosAlmacenados", JSON.stringify(empleados));
}
function Sumar() {
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
    if (arr.length < 1) {
        $("#tablaEmpleados").html("");
    }
    else {
        var str_1 = "<thead><tr>";
        $.each(arr[0], function (key2, value2) {
            str_1 += "<th class='" + key2 + "'>" + key2 + "</th>";
            console.log(key2);
        });
        str_1 += "<th>Borrar</th><th>Modificar</th></tr></thead><tbody>";
        var cont_1 = 0;
        $.each(arr, function (key, value) {
            str_1 += "<tr class='" + value.Genero + "'>";
            $.each(arr[key], function (key2, value2) {
                if (key2 != "Imagen") {
                    str_1 += "<td class='" + key2 + "'>" + value2 + "</td>";
                }
                else {
                    str_1 += "<td class='Imagen'><img src='" + value2 + "'></td>";
                }
            });
            str_1 += "<td><button class='borrar' onclick='Borrar(" + cont_1 + ")'>Borrar</button></td>";
            str_1 += "<td><button class='modificar' onclick='Modificar(" + cont_1 + ")'>Modificar</button></td>";
            str_1 += "</tr>";
            cont_1++;
        });
        str_1 += "</tbody>";
        $("#tablaEmpleados").html(str_1);
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
        if ($("#edad_id").is(":checked")) {
            $(".Edad").show();
        }
        else {
            $(".Edad").hide();
        }
        if ($("#apellido_id").is(":checked")) {
            $(".Apellido").show();
        }
        else {
            $(".Apellido").hide();
        }
    }
}
function Borrar(i) {
    empleados.splice(i, 1);
    ConstruirTabla(empleados);
    GuardarEnLocalStorage();
}
function ModificarModulo() {
    var auxiliar = Number($("#idm").val());
    var nombre = String($("#nombrem").val());
    var apellido = String($("#apellidom").val());
    var edad = Number($("#edadm").val());
    var sexo = String($("#sexo").val());
    var aux = new Empleado(nombre, apellido, edad, foto_to_modify, sexo);
    for (var i = 0; i < empleados.length; i++) {
        if (auxiliar = i) {
            empleados.splice(auxiliar, auxiliar + 1, aux);
            break;
        }
    }
    ConstruirTabla(empleados);
    foto_to_modify = null;
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
