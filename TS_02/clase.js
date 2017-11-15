/**
 * 0-me fijo tener el arhivo tsconfig.json
 * 1-Creo el archivo clase.ts
 * 2-comando: tsc clase
 * 3-para que transpile: tsc -w
 * 4-Acordarse que se puede sacar el strict
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Avenger = /** @class */ (function () {
    //constructor(nombre:string,nombreReal:string,peleasGanadas?:number
    function Avenger(nombre, nombreReal, peleasGanadas) {
        this._nombre = nombre;
        this.nombreReal = nombreReal;
        this.peleasGanadas = peleasGanadas;
    }
    Object.defineProperty(Avenger.prototype, "nombre", {
        get: function () {
            return this._nombre;
        },
        set: function (nombre) {
            this._nombre = nombre;
        },
        enumerable: true,
        configurable: true
    });
    Avenger.prototype.Mostrar = function () {
        return this._nombre + "," + this.nombreReal + "," + this.peleasGanadas;
    };
    Avenger.prototype.Balance = function () {
        return this.peleasGanadas - this.peleasPerdidas;
    };
    return Avenger;
}());
var Wachin = /** @class */ (function () {
    function Wachin() {
    }
    return Wachin;
}());
var a1 = new Avenger("Tony", "Antonio", 5);
var a2 = new Avenger("J6", "juan Perez");
a1.nombreReal = "Tony";
a1.peleasGanadas = 10;
//a1._nombre --> no se puede es privado 
a2.peleasGanadas = 10;
a2.peleasPerdidas = 2;
console.log(a1);
console.log(a2);
console.log(a2.Mostrar());
console.log(a2.Balance());
var Xmen = /** @class */ (function (_super) {
    __extends(Xmen, _super);
    function Xmen(n, nr, pg, p) {
        var _this = _super.call(this, n, nr, pg) || this;
        _this._poder = p;
        return _this;
    }
    Xmen.prototype.Imprimir = function () {
        console.log(this.Mostrar());
    };
    Xmen.prototype.Mostrar = function () {
        return _super.prototype.Mostrar.call(this) + this._poder;
    };
    return Xmen;
}(Avenger));
var x1 = new Xmen("xx", "Jacinto", 5, "mucho poder");
console.log(x1.Mostrar());
x1.Imprimir();
var array = new Array(a1, a2);
array.push(x1);
var i;
for (i = 0; i < array.length; i++) {
}
//······································
var Apocalipsis = /** @class */ (function () {
    function Apocalipsis(nombre) {
        this.nombre = nombre;
    }
    Object.defineProperty(Apocalipsis, "Instance", {
        get: function () {
            if (!(this._instance)) {
                this._instance = new Apocalipsis("Heelllll");
                //this.valor = "hola";-->no se puede xq no es estático 
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    return Apocalipsis;
}());
console.log(Apocalipsis.Instance);
