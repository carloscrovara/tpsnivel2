function Pelicula (id, titulo) {
	
	this.id = id;
	
	this.titulo = titulo;

	this.getId = function () {

        return this.id;

	}

	this.getTitulo = function () {

        return this.titulo;

	}	
}

var imdb = (function () {
	
	var peliculas = [];

	var existePelicula = function (pelicula) {

		var posicion = -1; 

		var peliculaActual;

		for(i = 0; i < peliculas.length && posicion === -1; i++) {

			if (peliculaActual.id === pelicula.id) {

				posicion = i;
			}
		}

		return posicion;
	}	

	var agregarPeliculaPrivado = function (pelicula) {
		
		var posicion = existePelicula(pelicula);

			if (posicion === -1) {
				
				peliculas.push(pelicula);

				localStorage.setItem ('videoteca', peliculas);

				console.log(localStorage.getItem('videoteca');

			} else {

				alert('La pelicula con id: ' + pelicula.id + ' ya existe');
			}	
	}

	var eliminarPeliculaPrivado = function (pelicula) {
		
		var posicion = existePelicula(pelicula); 

		if (posicion > -1) {

				peliculas.splice(posicion, 1);

				localStorage.setItem ('videoteca', peliculas);

				console.log(localStorage.getItem('videoteca');			

		} else {

				alert('La pelicula con id: ' + pelicula.id + ' no existe');
		} 
	}

	var ordenarPeliculaId = function (elementoA, elementoB) {

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

		console.log (resultado);
	}

	return {

		agregarPeliculaPublico: agregarPeliculaPrivado

	};

})()