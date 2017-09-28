//alert("primer js");
// --> javascript: 
var a=1;
//VERIFICAR CÓMO HACER UN SPINNER

/*
alert(a);
a="Afuera del mundial";
alert(a);
a=true;
alert(a);
a=1;
alert(a);*/
a=function(){alert("soy una funcion");}

var myArray = ["Abril",4,"marzo"];
typeof(myArray[0]); 


//arrow function, como funcion anonima sin la palabra "function"
var a = ()=>(var1, var2)
{
    //acá va el código
};

//===>la llamada sería: a(4,5); 



//Funciones Autoinvocadas

(function (){
    alert ("hago algo");
}());


// para conseguir un contador sobre las visitas a una página por ajemplo
//guardando el valor de counter cuando se cierra la página. 

var inc = (function (){
    
    var counter = 0;

    return function(){
        return counter++;
    }
}());



function Suma(a,b,callback){
    var resultado = parseInt(a)+parseInt(b);
    if(typeof(callback) === "function"){
        callback(resultado);
    }

}

/*
window.onload = function(){

//var a = document.getElementById("id1").value;
//var b = document.getElementById("id2").value;

var btnsuma = document.getElementById("btnsumar");
btnsuma.addEventListener('click',function(){
alert("ahroa sì dentro de sumar")

})
}  */


window.onload = function(){
    
    var btnsuma = document.getElementById("btnsumar");
    btnsuma.addEventListener('click',function(){
        var a1 = document.getElementById("id1").value;
        var b1 = document.getElementById("id2").value;
    
        Suma(a1,b1,function(res){
            alert("La suma es: "+res)
        })

    }
    
    )
    }

 
//  myDyv.InnerHtml ='<p class="miClase">'+fecha+'</p>';   ---> importante


 


// funciones constructor

var Auto = function(nafta){
    
    var _nafta = nafta;
    //this.setNafta  --> sería una propiedad haciendo un set de un atributo
    this.setNafta = function(value){
        _nafta = value;
    }

    this.getNafta = function(){
        return _nafta;
    }

}

var a1 = new  Auto(555555);
alert(a1.getNafta());

///notacion json

auto1 = {

    nafta:100,
    puertas: 5,
    patente:"AAA111"
}

auto3 = {

}

auto3 = {
    nafta:900
}




