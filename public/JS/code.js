$(document).ready(function () {
    CargarLista();
    $("#btnAgregar").click(ManejadorBtn);

});

function ManejadorBtn() {

    var apellidoStr = $("#apellidoStr").val();
    var nombreStr = $("#nombreStr").val();
    info = 'nombre=' + encodeURIComponent(nombreStr) + '&apellido=' + encodeURIComponent(apellidoStr);

    $.ajax({
        url: 'http://localhost:3000/agregarpersona',
        data: info,
        method: 'post',
        dataType: 'json',
        success: CargarLista
        //https://www.youtube.com/watch?v=kvlBmon98xg       

    })

}


function ModificarJquery(index) {
       
    $("#btnAgregar").attr('value', 'Modificar');  
    
    var apellidoStr = $("#apellidoStr").val();
    var nombreStr = $("#nombreStr").val();

    varPersona = new Object();
    varPersona.nombre = nombreStr;
    varPersona.apellido = apellidoStr;

    info = 'indice=' + encodeURIComponent(index) + '&persona=' + encodeURIComponent(JSON.stringify(varPersona));

    $.ajax({
        
        url: 'http://localhost:3000/modificarpersona',
        data: info,
        method: 'post',
        dataType: 'json', 
  
    })
    
    CargarLista();

}


function CargarLista() {

    var personas = [];
    cadena = "";

    $.ajax({
        url: 'http://localhost:3000/traerpersonas',
        method: 'get',
        dataType: 'json',
        success: function (response) {

            personas = $(response);
            for (i = 0; i < personas.length; i++)
                cadena += "<tr><td>" + personas[i].nombre + "</td><td>" + personas[i].apellido + "</td><td><input type='button' onclick='BorrarJquery(" + i + ")' id='btnAgregar' value='Borrar'></td><td><input type='button' onclick='ModificarJquery(" + i + ")' id='btnAgregar' value='Modificar'></tr>";

            $("#contenido").html(cadena);
        }
    })
}


function BorrarJquery(index) {

    info = 'indice=' + encodeURIComponent(index);
    $.ajax({
        url: 'http://localhost:3000/eliminarpersona',
        data: info,
        method: 'post',
        dataType: 'json',
    })
    CargarLista();
}



