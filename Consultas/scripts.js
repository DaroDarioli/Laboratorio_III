console.log(data);

/*
    realizar las operaciones usando los metodos map,  reduce y filter y combinaciones entre ellos
  */


var soluciones = {};

// Retornar un array con los nombres de los usuarios femeninos

soluciones.usuariosFemeninos = function(usuarios){
    return usuarios
    .filter(function(user){
        return user.genero === 'Female';
    })
    .map(function(user){
        return user.nombre;
    });
}

//console.log(soluciones.usuariosFemeninos(data));

// Retornar un array de strings (el email de los usuarios de sexo masculino)

soluciones.mailsVarones = function(usuarios){

    return usuarios
    .filter(function(user){
        return user.genero === 'Male';
    })
    .map(function(user){
        return user.email;
    });
   
}

//console.log(soluciones.mailsVarones(data));

// Retornar un array de objetos que solo contengan las claves nombre, email y edad, de todos los usuarios mayores que 'edad'

soluciones.usuariosMayores = function(usuarios, edad){

    return usuarios
    .filter(function(user){
        return user.edad > edad;
    })
    .map(function(user){

        var usuario =  [];
        usuario.nombre = user.nombre;
        usuario.edad = user.edad;
        
        return  usuario;
       
    });
    
}

//console.log(soluciones.usuariosMayores(data, 40));

  // Retornar un objeto que contenga solo el nombre y la edad del usuario mas grande.

soluciones.usuarioMasGrande = function(usuarios){

    previo = 0;
    
    return usuarios
    .reduce(function(actual,siguiente){
      if(actual.edad > siguiente.edad){
          return{
              nombre:actual.nombre,
              edad:actual.edad
          }          
      }
      return{
          nombre:siguiente.nombre,
          edad:siguiente.edad
      }

    });
    
}

//console.log(soluciones.usuarioMasGrande(data));

// Retornar el promedio de edad de los usuarios (number)

soluciones.promedio = function(usuarios){
  
    cantidad = usuarios.length;
    acumEdad = usuarios
    .reduce(function(previo,siguiente){
        
        return previo + siguiente.edad;
    },0);

   return (acumEdad /cantidad).toFixed(2);
}

console.log("Promedio edad usuarios " + soluciones.promedio(data));

// Retornar el promedio de edad de los usuarios hombres (number)

soluciones.promedioVarones = function(usuarios){
   
    cantidad = usuarios.length;
    acumEdad = usuarios
    .filter(function(usuarios){
        return usuarios.genero === 'Male';
    })
    .reduce(function(previo,usuarios){
        
        return previo + usuarios.edad;
    },0)
  
    return (acumEdad /cantidad).toFixed(2);
}

console.log("Promedio edad Varones " + soluciones.promedioVarones(data));

 // Retornar el promedio de edad de los usuarios mujeres (number)

soluciones.promedioMujeres = function(usuarios){
   
}

//console.log("Promedio edad Mujeres " + soluciones.promedioMujeres(data));