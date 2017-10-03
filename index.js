var express =require("express");
var cors = require("cors");
var corsOptions = {origin:"*",optionSucessStatus:200};
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cors(corsOptions));
app.use(express.static(__dirname + '/public'));

var noticias = [{"tema":"CSS","titulo":"Nuevos CSS3","noticia":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut tortor et ex viverra ullamcorper. Vivamus at lacinia quam. Aliquam a laoreet dui. In hac habitasse platea dictumst. Aliquam nec molestie magna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi tincidunt efficitur justo, at pulvinar arcu lobortis sit amet. Integer vel enim vitae urna dictum efficitur. Quisque nunc arcu, gravida sit amet elementum eu, tempor at libero. Vivamus in vulputate purus. Nunc quis dolor sed dui commodo malesuada ac in diam. Vestibulum sit amet eros accumsan, suscipit ex eget, rhoncus lorem.","fecha":"12/05/2018 17:26"},{"tema":"HTML","titulo":"Nuevos HTML5","noticia":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut tortor et ex viverra ullamcorper. Vivamus at lacinia quam. Aliquam a laoreet dui. In hac habitasse platea dictumst. Aliquam nec molestie magna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi tincidunt efficitur justo, at pulvinar arcu lobortis sit amet. Integer vel enim vitae urna dictum efficitur. Quisque nunc arcu, gravida sit amet elementum eu, tempor at libero. Vivamus in vulputate purus. Nunc quis dolor sed dui commodo malesuada ac in diam. Vestibulum sit amet eros accumsan, suscipit ex eget, rhoncus lorem.","fecha":"12/05/2018 17:30:02"}];
app.get("/login",function(req,res){
    
    res.send("ok");
});

app.get("/loginUsuario",function(req,res){
    console.log(req.query);
    if(req.query.usr!=undefined && req.query.pass!=undefined){
        if(req.query.usr==="usuario"&&req.query.pass==="1234")
            res.send("true");    
        else
            res.send("false");
        return;
    }
    res.send("Debe ingresar Usuario y Contraseña");
    
});
app.get("/noticias",function(req,res){
 
 res.send(noticias);    

        return;
   
   
    
});

app.post("/loginUsuario",function(req,res){
    setTimeout(function(){
        console.log(req.body)
        if(req.body.usr!=undefined && req.body.pass!=undefined){
            if(req.body.usr==="usuario"&&req.body.pass==="1234")
                res.send("true");    
            else
                res.send("false");
            return;
        }
        res.send("Debe ingresar Usuario y Contraseña");
    },2000);
    
});

app.post("/login",function(req,res){
    setTimeout(function(){
        console.log("Llego al servidor "+JSON.stringify(req.body));
        
       
        if(req.body.email!=undefined && req.body.password!=undefined){
            if(req.body.email==="usuario"&&req.body.password==="1234"){
                console.log("Sale del servidor "+"{'type': 'User'}")
                res.send({'type': 'User'});    
            }else if(req.body.email==="admin"&&req.body.password==="1234"){
                console.log("Sale del servidor "+"{'type': 'Admin'}")
                res.send({'type': 'Admin'});    
            }else{
                console.log("Sale del servidor "+"{'type': 'error'}")
                res.send({'type': 'error'});
            }
            return;
        }
        console.log("Sale del servidor "+"{'type': 'error'}")
        res.send({'type': 'error'});
    },2000);
    
});

app.post("/nuevaNoticia",function(req,res){
    setTimeout(function(){
        
       console.log(req.body);
        if((req.body.email!= undefined&&req.body.email!= "") &&(req.body.tema!= undefined&&req.body.tema!= "") 
			&&  (req.body.titulo!= undefined&&req.body.titulo!= "") && (req.body.noticia!= undefined&&req.body.noticia!= "")){
	
        var date ="12/12/12 12:35";//=new Date();
			
			var data = {"tema":req.body.tema,"titulo":req.body.titulo,"noticia":req.body.noticia,"fecha":date};
				noticias.push(data);
                res.send(data);    
     
            return;
        }
        res.send({'type': 'error'});
    },2000);
    
});

app.listen(3000,function(){
    console.log("Api en el puerto 3000");
});