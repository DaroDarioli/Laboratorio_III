

/*
window.addEventListener('load', function () { imprimirContenido(); });

alert("funciona tuneado");
        function Cargar() {

            xhr = new XMLHttpRequest();
            nombreStr = document.getElementById('nombreStr').value;
            apellidoStr = document.getElementById('apellidoStr').value;

            data = 'nombre=' + encodeURIComponent(nombreStr) + '&apellido=' + encodeURIComponent(apellidoStr);

            xhr.responseType = "text";
            xhr.onreadystatechange = procesaRespuesta;
            xhr.open('POST', 'http://localhost:3000/agregarpersona', true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(data);
        }

        function procesaRespuesta() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                imprimirContenido();

            }
        }

        function imprimirContenido() {
            req = new XMLHttpRequest();
            req.onreadystatechange = traerLista;
            req.open('GET', 'http://localhost:3000/traerpersonas', true);
            req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            req.send();

        }


        function traerLista() {
            miLista = new Object();
            bodyTabla = document.getElementById('contenido');

            body = "";
            acumulador = 0;

            if (req.readyState == 4 && req.status == 200) {

                miLista = JSON.parse(req.responseText);
                miLista.forEach(function (element) {

                    cadena = "<tr><td>" + element.nombre + "</td><td>" + element.apellido + "</td><td><input type='button' onclick='Borrar(" + acumulador + ")' id='btnAgregar' value='Borrar'></td><td><input type='button' onclick='ModicarUsuario(" + acumulador + ")' id='btnAgregar' value='Modificar'></tr>";
                    body += cadena;
                    acumulador++;

                }, this);
                bodyTabla.innerHTML = body;

            }

        }

        function ModicarUsuario(indice) {

            nombreStr = document.getElementById('nombreStr').value;
            apellidoStr = document.getElementById('apellidoStr').value;

            alert(nombreStr);
            alert(indice);
            varPersona = new Object();
            varPersona.nombre = nombreStr;
            varPersona.apellido = apellidoStr;


            xhr1 = new XMLHttpRequest();
            xhr1.responseType = "text";
            xhr1.onreadystatechange = imprimirContenido;
            xhr1.open('POST', 'http://localhost:3000/modificarpersona', true);
            xhr1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

            data = 'indice=' + encodeURIComponent(indice) + '&persona=' + encodeURIComponent(JSON.stringify(varPersona));

            xhr1.send(data);

        }


        function Borrar(index) {

            alert('Borramos indice: ' + index)

            req.open('POST', 'http://localhost:3000/eliminarpersona', true);
            req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            data = '&indice=' + encodeURIComponent(index);
            req.send(data);
            imprimirContenido();

        }