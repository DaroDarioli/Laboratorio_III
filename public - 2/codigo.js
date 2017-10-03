window.onload = function () {

   // recibirData();
}

addEventListener('load', () => {

    var btnLeer = document.getElementById("btnLogin");
    btnLeer.addEventListener('click', enviar)

});

xhr = new XMLHttpRequest();

function enviar() {

        var user = document.getElementById("usrStr").value;
        var pass = document.getElementById("usrStr").value;

        if(user == "") {
            document.getElementById("usrtStr").className = "error";
            alert("Falto cargar el nombre!!");
        }
        else if (pass == "") {
            document.getElementById("passStr").className = "error";
            alert("Faltó cargar el apellido!!");
        }
        else {

            alert("Se ingreso el usuario: "+user);

            var datos = 'usr=' + encodeURIComponent(user) + '&pass=' + encodeURIComponent(pass);
            xhr.onreadystatechange = gestionarRespuesta;
            xhr.open('POST', 'http://localhost:3000/loginUsuario', true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(datos);
            
        }

}

function gestionarRespuesta() {

    if (xhr.readyState == 4 && xhr.status == 200) {
       
        xhr.responseType = 'text';
        respuesta = JSON.parse(xhr.responseText);
        if(respuesta)
            alert("Se valida el usuario");
       
        else
            alert("Usuario Inválido");
    }
}


/*
function recibirData() {
    xhr.open('GET', 'http://localhost:3000/traerpersonas', true);
    xhr.responseType = 'text';
    xhr.onreadystatechange = traerLista;
    xhr.send();
}

function traerLista() {

    var indice = 0;
    cadena = "";
    var tcuerpo = document.getElementById("tablaUsuarios");

    if (xhr.readyState == 4 && xhr.status == 200) {

        objPersonas = JSON.parse(xhr.responseText);
        objPersonas.forEach(function (element) {

            var usuario = "<tr><td>" + element.nombre + "</td>" + "<td>" + element.apellido + "</td>" + "<td>" + indice + "</td>";
            var borrar = "<td>" + '<button type="button" onclick="borrarPersona(' + indice + ')" value=' + indice + 'id="btnBorrar">Borrar</button>';
            var modificar = "<td>" + '<button type="button" onclick="modificoPersona(' + indice + ')" value=' + indice + 'id="btnEliminar">Modificar</button>' + "</tr>";

            cadena += usuario + borrar + modificar;
            indice++;

        }, this);
        tcuerpo.children[2].innerHTML = cadena;
    }

}

function borrarPersona(index) {

    alert('Borramos al índice: ' + index);
    var datos = 'indice=' + encodeURIComponent(index);
    xhr.onreadystatechange = gestionarRespuesta; //?????
    xhr.open('POST', 'http://localhost:3000/eliminarpersona', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(datos);
}


//##############################################################################

function modificoPersona(index) {
    document.getElementById("btnEnviar").innerHTML = "Modificar";
    enviar(index);
}

*/