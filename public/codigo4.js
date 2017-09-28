window.onload = function () {

    recibirData();
}


addEventListener('load', () => {

    var btnLeer = document.getElementById("btnEnviar");
    btnLeer.addEventListener('click', enviar)   

});

xhr = new XMLHttpRequest();
var index;

function enviar() {

    var nombre = document.getElementById("nombrestr").value;
    var apellido = document.getElementById("apellidostr").value;

    if (nombre == "") {
        document.getElementById("nombrestr").className = "error";
        alert("Falto cargar el nombre!!");
    }
    else if (apellido == "") {
        document.getElementById("apellidostr").className = "error";
        alert("Faltó cargar el apellido!!");
    }
    else {

        var datos = 'nombre=' + encodeURIComponent(nombre) + '&apellido=' + encodeURIComponent(apellido);
        xhr.onreadystatechange = gestionarRespuesta; //?????
        xhr.open('POST', 'http://localhost:3000/agregarpersona', true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(datos);

    }

}


function borrarPersona(index) {
   
    alert(index);
  //  var indice = document.getElementById("btnBorrar").value;
    var datos = 'indice=' + encodeURIComponent(index);
    xhr.onreadystatechange = gestionarRespuesta; //?????
    xhr.open('POST', 'http://localhost:3000/eliminarpersona', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(datos);

}
    


function gestionarRespuesta() {

    if (xhr.readyState == 4 && xhr.status == 200) {
        //alert(xhr.responseText);
        recibirData();
    }
}

function recibirData() {
    xhr.open('GET', 'http://localhost:3000/traerpersonas', true);
    xhr.responseType = 'text';
    xhr.onreadystatechange = traerLista;
    xhr.send();
}


function traerLista() {

    var indice = 0;
    if (xhr.readyState == 4 && xhr.status == 200) {

        objPersonas = JSON.parse(xhr.responseText);
        var tcuerpo = document.getElementById("tablaUsuarios");
        //hacer con un for para eliminar la persona por indice
        objPersonas.forEach(function (element) {

            tcuerpo.children[2].innerHTML = tcuerpo.children[2].innerHTML + "<td>" + element.nombre + "</td>" + "<td>" + element.apellido + "</td>" + "<td>" + indice + "</td>" + "<td>" + '<button type="button"   onclick="borrarPersona(' + indice + ')" value=' + indice + 'id="btnBorrar">Borrar</button>';
            indice++;

        }, this);
    }

}


function traerListaIndexada() {

    var indice = 0;
    if (xhr.readyState == 4 && xhr.status == 200) {

        objPersonas = JSON.parse(xhr.responseText);
        var tcuerpo = document.getElementById("tablaUsuarios");
        //hacer con un for para eliminar la persona por indice
        objPersonas.forEach(function (element) {

            tcuerpo.children[2].innerHTML = tcuerpo.children[2].innerHTML + "<td>" + element.nombre + "</td>" + "<td>" + element.apellido + "</td>" + "<td>" + indice + "</td>";
            indice++;

        }, this);
    }

}


//tcuerpo.children[2].innerHTML = tcuerpo.children[2].innerHTML + "<td>" + element.nombre + "</td>" + "<td>" + element.apellido + "</td>" + "<td>" + indice + "</td>" + "<td>" + '<button type="button"   onclick="alert('+indice+')" value=' + indice + 'id="btnBorrar">Borrar</button>';

function retornarIndice() {

    var indice = 0;
    if (xhr.readyState == 4 && xhr.status == 200) {
        var objPersonas = JSON.parse(xhr.responseText);
        objPersonas.forEach(function (element) {
            indice++;
        }, this);
    }

    return indice;

}