var peliculas = [];

function Pelicula(id,titulo) {
	this.id = id;
	this.titulo = titulo;

	this.getId = function () {
        return this.id;
	}
	this.getTitulo = function () {
        return this.titulo;
	}
}

function agregarPelicula(peliculas) {
	var continuar = 1;
	var nuevaId;
	var nuevoTitulo;
	var nuevaPelicula;
	do {
		nuevaId = prompt('Ingresar Id de nueva pelicula');
		nuevoTitulo = prompt('Ingresar titulo de nueva pelicula');                                
		nuevaPelicula = new Pelicula(nuevaId, nuevoTitulo);                            
		peliculas.push(nuevaPelicula);
		continuar = parseInt(prompt('Ingrese 1 para agregar otra pelicula o 0 para salir'));
	} while(continuar);
}

// Funcion indexOf para chequear si esta un id o titulo de pelicula.

function chequearPeliculaId(peliculas) {
	var ingresarId = parseInt(prompt('Ingresar id de pelicula'));
	for (i in peliculas) {
		if (peliculas.indexOf(ingresarId) !== -1) { 
			console.log('Esta este id.');
			break;
		} else {
			console.log('No esta este id.');
			break;
		}						
	}
}

function chequearPeliculaTitulo(peliculas) {
	var ingresarTitulo = prompt('Ingresar titulo de pelicula');
	for (i in peliculas) {
		if (peliculas.indexOf(ingresarTitulo) !== -1) { 
			console.log('Esta este este titulo');
			break;
		} else {
			console.log('No esta este titulo.');
			break;
		}						
	}
}

/*Funciones para ordenar peliculas por id o por titulo. 
Primero consulta si se quiere ordenar por id o por titulo.
*/
function ordenadorPelicula() {
    var respuestas = ['id', 'titulo'];
    var consulta = prompt('¿Quiere ordenar las peliculas por id o por titulo?');
    switch (consulta) {
    	case respuestas[0]:
			console.log(peliculas.sort(ordenarPeliculaId));
			break; 

    	case respuestas[1]:
			console.log(peliculas.sort(ordenarPeliculaTitulo));
			break;
	}
}	

function ordenarPeliculaId(elementoA, elementoB) {
        var resultado;
       	if (elementoA.getId() < elementoB.getId()) {
			return -1;
		}
		if (elementoA.getId() === elementoB.getId()) {
			return 0;
		}
		if (elementoA.getId() > elementoB.getId()) {
			return 1;
		}
		return resultado;
}	

function ordenarPeliculaTitulo(elementoA, elementoB) {
        var resultado;
       	if (elementoA.getTitulo() < elementoB.getTitulo()) {
			return -1;
		}
		if (elementoA.getTitulo() === elementoB.getTitulo()) {
			return 0;
		}
		if (elementoA.getTitulo() > elementoB.getTitulo()) {
			return 1;
		}
		return resultado;
}

//Función para eliminar pelicula.
function eliminarPeliculaId() {
	peliculas.splice(index,1);
	console.log('La pelicula fue eliminada');
}
