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

var Imdb = (function () {
	
	var peliculas = [];

	var existePelicula = function (pelicula) {

		var posicion = -1; 

		for(i = 0; i < peliculas.length && posicion === -1; i++) {

			if (peliculas[i].id === pelicula.id) {

				posicion = i;
			}
		}

		return posicion;
	}

	var guardarPelicula = function () {

		var datos = JSON.stringify(peliculas); 

		localStorage.setItem('peliculas', datos);

	}

	var recuperarPelicula = function () {

		var datos = localStorage.getItem('peliculas'); 

		if (datos !== null) {

			peliculas = JSON.parse(datos);
		}
	}	

	var agregarPelicula = function (pelicula) {
		
		var posicion = existePelicula(pelicula);

			if (posicion === -1) {
				
				peliculas.push(pelicula);

				guardarPelicula();

			} else {

				alert('La pelicula con id: ' + pelicula.id + ' ya existe');
			}	
	}

	var eliminarPelicula = function (pelicula) {
		
		var posicion = existePelicula(pelicula); 

		if (posicion > -1) {

				peliculas.splice(posicion, 1);

				guardarPelicula();		

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

	recuperarPelicula();

	return {

		agregarPelicula: agregarPelicula,
		eliminarPelicula: eliminarPelicula,
		ordenarPeliculaId: ordenarPeliculaId 

	};

})()