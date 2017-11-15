/**
 * 0-me fijo tener el arhivo tsconfig.json
 * 1-Creo el archivo clase.ts
 * 2-comando: tsc clase
 * 3-para que transpile: tsc -w
 * 4-Acordarse que se puede sacar el strict
 */

class Avenger{
    private _nombre:string|undefined;
    nombreReal:string;
    peleasGanadas:number;
    peleasPerdidas:number;

    //constructor(nombre:string,nombreReal:string,peleasGanadas?:number
    constructor(nombre:string,nombreReal:string,peleasGanadas?:number){
        this._nombre = nombre;
        this.nombreReal = nombreReal;
        this.peleasGanadas = peleasGanadas;
    }

    get nombre():string{
        return this._nombre;
    }

    set nombre(nombre:string){
        this._nombre = nombre;
    }

    Mostrar():string{
        return `${this._nombre},${this.nombreReal},${this.peleasGanadas}`;
    }

    Balance():number{
        return this.peleasGanadas - this.peleasPerdidas;
    }

}

class Wachin{nombreReal:string;}

let a1 = new Avenger("Tony","Antonio",5);
let a2 = new Avenger("J6","juan Perez");

a1.nombreReal = "Tony";
a1.peleasGanadas = 10;
//a1._nombre --> no se puede es privado 
a2.peleasGanadas = 10;
a2.peleasPerdidas = 2;
console.log(a1);
console.log(a2);
console.log(a2.Mostrar());
console.log(a2.Balance());

class Xmen extends Avenger implements IXmen{

    private _poder:string;
    Inombre:string;
    constructor(n:string,nr:string,pg:number,p:string){
        super(n,nr,pg);
        this._poder = p;
    }

    Imprimir(){
        console.log(this.Mostrar());
    }

    Mostrar():string{
        return super.Mostrar() + this._poder;
    }

}

let x1 = new Xmen("xx","Jacinto",5,"mucho poder");
console.log(x1.Mostrar());
x1.Imprimir();

let array = new Array<Avenger>(a1,a2);
array.push(x1);

let i:number;

for(i = 0; i < array.length; i++)
{

}

//······································

class Apocalipsis{
    private static _instance:Apocalipsis;
    public valor:string;
    private constructor(public nombre:string){

    }

    static get Instance():Apocalipsis{
        if(!(this._instance)){

            this._instance = new Apocalipsis("Heelllll");
            //this.valor = "hola";-->no se puede xq no es estático 
        }
        return this._instance;
    }
}
console.log(Apocalipsis.Instance);













