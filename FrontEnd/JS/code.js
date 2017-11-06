$(document).ready(function () {
 //   CargarLista();
    $("#btnAgregar").click(ManejadorBtn);
    $("#btnLogin").click(MetodoLogueo);
    $("#btnPatente").click(VerificoPatente);
    //agregar un llamado a funcion que valide usuario


});

function VerificoPatente()
{
    ingresoPatente.style.display = "block";
    patenteStr = $("#patenteStr").val();   
    info = 'patente=' + encodeURIComponent(patenteStr);
    //console.log(patenteStr);

    $.ajax({
        url: 'http://localhost/Estacionamiento_II/auto/Verificar',
        data: {'patente':patenteStr},
        method: 'post',
        dataType: 'json',
        success: function (response) {
            
            if(response != false){

                alert("El auto ya existe, desea sacarlo?");
            }
            else{
                alert("El auto no existe, desea cargarlo?");
            }}

    })

}

//función que valida usuario y trae formulario para cagar autos

function MetodoLogueo()
{
    var  vMail = $("#mailStr").val();    
    var vPass = $("#passStr").val();

    $.ajax({
      
        url: 'http://localhost/Estacionamiento_II/empleado/login',
        data:{'mail':vMail,'clave':vPass},
        method: 'post',
        dataType: 'json', 
        success: function (response) {

            if(response != false){

                nuevaOpciones();
            }
            else{
                alert("el usuario y/o la contraseña son inválidos!!");
            }
           
        //console.log(response);


        }   
    })
    
}



//https://www.youtube.com/watch?v=kvlBmon98xg   
function ManejadorBtn(index) {

    var botonActuar = $("#btnAgregar").val();

    if (botonActuar == "Modificar") {
        $("#btnAgregar").click(function () {
            ModificarPersona(index);
        });
    }
    else {
        AgregarAuto();
    }
}

function AgregarAuto() {

    var patenteStr = $("#patenteStr").val();
    var marcaStr = $("#marcaStr").val();
    var colorStr = $("#colorStr").val();
    console.log(colorStr);
    info = 'patente=' + encodeURIComponent(patenteStr) + '&marca=' + encodeURIComponent(marcaStr) + '&color=' + encodeURIComponent(colorStr);

    $.ajax({
        url: 'http://localhost/Estacionamiento_II/auto/',
        data: info,
        method: 'post',
        dataType: 'json',     
    })
    CargarLista();
}

function nuevaOpciones() {
    
    ingresoAutos.style.display = "block";
    
    }

    /*
function CargarLista() {
      
        var autos = [];
        var body = "";
    
        console.log('Dentro de cargar lista')
        $.ajax({
            //debería pegar a traer todos
            url: 'http://localhost/Estacionamiento_II/auto/',
            method: 'get',
            dataType: 'json',
            success: function (response) {
            
                autos = $(response);
                for (i = 0; i < autos.length; i++) {
    
                    if (autos[i] == null) continue;
                    var cadena = "<tr><td>" + autos[i].patente + "</td><td>" + autos[i].marca + "</td><td>" + autos[i].color + "</td><td>" + autos[i].hora + "</td><tr>";
                    body += cadena;
                }
                $("#contenido").html(body);
            }
        })
    }
    
    


/*

function ModificarPersona(index) {

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
        dataType: 'json'        
    })
    $("#btnAgregar").attr('value', 'Agregar');
    CargarLista();

}

function ModificarJquery(index) {

    $("#btnAgregar").attr('value', 'Modificar');
    ManejadorBtn(index);
}


function CargarLista() {

    var personas = [];
    var body = "";

    $.ajax({
        url: 'http://localhost:3000/traerpersonas',
        method: 'get',
        dataType: 'json',
        success: function (response) {

            personas = $(response);
            for (i = 0; i < personas.length; i++) {

                if (personas[i] == null) continue;
                var cadena = "<tr><td>" + personas[i].nombre + "</td><td>" + personas[i].apellido + "</td><td><input type='button' onclick='BorrarJquery(" + i + ")' id='btnAgregar' value='Borrar'></td><td><input type='button' onclick='ModificarJquery(" + i + ")' id='btnAgregar' value='Modificar'></tr>";
                body += cadena;
            }
            $("#contenido").html(body);
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


*/
