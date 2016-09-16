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

//consulta si se quiere ordenar peliculas por id o por titulo.
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
       	if(elementoA.getId() < elementoB.getId()) {
			return -1;
		}
		if(elementoA.getId() === elementoB.getId()) {
			return 0;
		}
		if(elementoA.getId() > elementoB.getId()) {
		return 1;
		}
		return resultado;
}	

function ordenarPeliculaTitulo(elementoA, elementoB) {
        var resultado;
       	if(elementoA.getTitulo() < elementoB.getTitulo()) {
			return -1;
		}
		if(elementoA.getTitulo() === elementoB.getTitulo()) {
			return 0;
		}
		if(elementoA.getTitulo() > elementoB.getTitulo()) {
		return 1;
		}
		return resultado;
}