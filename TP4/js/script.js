function Pelicula(id,descripcion,anio,duracion,actores,director) {
	this.id = id;
	this.titulo = titulo;
	this.descripcion = descripcion;
	this.anio = anio; 
	this.duracion = duracion;
	var actores = ['actor1', 'actor2', 'actor3', 'actor4', 'actor5'];
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
		        var nuevoActor = prompt('Ingresar nombre de nuevo actor');
				actores.push(nuevoActor);
				console.log(actores);
				var preguntaNuevoActor = prompt('¿Querés agregar otro actor? si / no' )
				if (preguntaNuevoActor === 'si') {
		        	var nuevoActor = prompt('Ingresar nombre de nuevo actor');
					actores.push(nuevoActor);
					console.log(actores);
				}
				else {
					console.log(actores);
				}
	}

	this.actualizarDirector = function(nuevoDirector) {
				var nuevoDirector = prompt('Ingresar nombre de nuevo director');
				this.director = nuevoDirector;
				console.log(this.director);
	}

}