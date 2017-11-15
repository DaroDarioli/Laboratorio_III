/*
function enviarMision(xmen:any){
    console.log(xmen.nombre)
}*/
function enviarMision(xmen) {
    console.log(xmen.nombre);
}
var xmen = {
    nombre: "Ciclope",
    peleasGanadas: 9
};
//enviarMision(22); //->no va xq está tipado
enviarMision(xmen);
var xmen2 = n;
/*
Parcial: ABM
class animal abstracta
atributos: nombre, edad, cantidadPatas;

class mascota hereda de animal; agrega id y tipo, tipo es enumerado,
en tipo mascota{perro,gato,reptil,ave,pez}

las dos entidades un mètodo ToJson, que devuelva un array de json de esa instancia

abm hecho en localstorage, que tiene set item, get item, clear; local storage guarda como string, por ende hay
que hacer json stringify y json.parse-->a un array de mascotas;
para mostrar se puede mostar con indice, o tag hidden

hacer:
animal.ts
mascota.ts
enumerados.ts

siempre usando map, filter, reduce

con bootstrap




*/ 
