function Pelicula(id,descripcion,anio,duracion,actores,director) {
	this.id = id;
	this.titulo = titulo;
	this.descripcion = descripcion;
	this.anio = anio; 
	this.duracion = duracion;
	this.actores = actores;
	this.director = director;

	this.actualizarTitulo = function(nuevoTitulo) {
		 		var nuevoTitulo = prompt('Ingresar nuevo título')
  				this.titulo = nuevoTitulo;
  				console.log(this.titulo);
	}

	this.actualizarDescripcion = function(nuevaDescripcion) {
				var nuevaDescripcion = prompt('Ingresar nueva descripción');
  				this.descripcion = nuevaDescripcion;
  				console.log(this.descripcion);
	}

	this.actualizarAnio = function(nuevoAnio) {
				var nuevoAnio = parseInt(prompt('Ingresar nuevo año'));
 				this.anio = nuevoAnio;
 				console.log(this.anio);
	}

	this.actualizarDuracion = function(nuevaDuracion) {
				var nuevaDuracion = prompt('Ingresar nueva duración');
				this.duracion = nuevaDuracion;
				console.log(this.duracion);
	}

	this.agregarActores = function() {
    			var continuar = 1;
    			var actor;
    			do {
       				actor = prompt('Ingrese nombre y apellido del actor');
       				this.actores.push(actor);
       				continuar = parseInt(prompt('Ingrese 1 para agregar otro actor o 0 para salir'));
    			} while(continuar);
	}

	this.actualizarDirector = function(nuevoDirector) {
				var nuevoDirector = prompt('Ingresar nombre de nuevo director');
				this.director = nuevoDirector;
				console.log(this.director);
	}

}